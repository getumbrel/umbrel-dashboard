<template>
  <form @submit.prevent="openChannel">
    <b-row>
      <b-col col cols="12" sm="6">
        <label class="sr-onlsy" for="peer-connection">Peer address</label>
        <b-input
          id="peer-connection"
          class="mb-3 neu-input"
          placeholder="pubkey@ip:port"
          type="text"
          size="lg"
          v-model="peerConnectionCode"
          :disabled="isOpening"
          autofocus
        ></b-input>
      </b-col>
      <b-col col cols="12" sm="6">
        <label class="sr-onlsy" for="funding-amount">Amount</label>
        <div class="mb-3">
          <b-input-group class="neu-input-group">
            <b-input
              id="funding-amount"
              class="neu-input"
              type="text"
              size="lg"
              v-model="fundingAmountInput"
              @input="fetchFees"
              style="padding-right: 82px"
              :disabled="isOpening"
            ></b-input>
            <b-input-group-append class="neu-input-group-append">
              <sats-btc-switch class="align-self-center" size="sm"></sats-btc-switch>
            </b-input-group-append>
          </b-input-group>
          <small
            class="text-muted mt-2 d-block text-right mb-0"
            :style="{opacity: fundingAmount > 0 ? 1 : 0}"
          >~ {{ fundingAmount | satsToUSD }}</small>
        </div>

        <!-- <small>{{ btc.confirmed.toLocaleString() }} Sats available out of {{ btc.total.toLocaleString() }} and {{ btc.pending.toLocaleString() }} pending</small> -->
      </b-col>
    </b-row>
    <b-row>
      <b-col col cols="12" sm="6">
        <small class="text-muted mb-4 d-block">Mining Fee</small>
        <vue-slider
          v-model="value2"
          absorb
          marks
          :data="data"
          :dotSize="[22, 22]"
          :tooltip-formatter="formatter1"
          contained
          tooltip="always"
          class="pl-3 pb-4"
          :disabled="fee.fast.total <= 0"
        ></vue-slider>
      </b-col>
      <b-col class="d-flex" col cols="12" sm="6">
        <div class="mt-4 mt-sm-0 d-flex w-100 justify-content-between align-self-end">
          <span>
            <small class="text-danger align-self-center" v-if="error">
              {{
              error
              }}
            </small>
          </span>
          <b-button type="submit" variant="success" :disabled="isOpening || !!error">
            {{
            this.isOpening ? "Opening..." : "Open Channel"
            }}
          </b-button>
        </div>
      </b-col>
    </b-row>
    <!-- <div class="mt-2 d-flex w-100 justify-content-between">
      <div>
      </div>
      <b-button type="submit" variant="success" :disabled="isOpening">
        {{
        this.isOpening ? "Opening..." : "Open Channel"
        }}
      </b-button>
    </div>-->
  </form>
</template>

<script>
import { mapState } from "vuex";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

import API from "@/helpers/api";
import { btcToSats } from "@/helpers/units.js";

import SatsBtcSwitch from "@/components/Utility/SatsBtcSwitch";

export default {
  props: {},
  data() {
    return {
      peerConnectionCode: "",
      fundingAmountInput: "",
      fundingAmount: 0,
      isOpening: false,
      value2: "normal",
      data: ["cheapest", "slow", "normal", "fast"],
      formatter1: v => `${this.fee[v]["total"]} Sats`,
      fee: {
        fast: {
          total: 0,
          perByte: "--",
          error: ""
        },
        normal: {
          total: 0,
          perByte: "--",
          error: ""
        },
        slow: {
          total: 0,
          perByte: "--",
          error: ""
        },
        cheapest: {
          total: 0,
          perByte: "--",
          error: ""
        }
      },
      error: "",
      feeTimeout: null
    };
  },
  computed: {
    ...mapState({
      unit: state => state.system.unit
    })
  },
  methods: {
    async openChannel() {
      this.isOpening = true;

      if (!this.peerConnectionCode || this.fundingAmount <= 0) {
        this.error = "Please fill all fields";
        this.isOpening = false;
        return;
      }

      if (this.fee.fast.error) {
        this.isOpening = false;
        this.error = this.fee.fast.error;
        return;
      }

      this.error = "";

      const payload = {
        amt: parseInt(this.fundingAmount) || 0,
        name: "",
        purpose: "",
        satPerByte: parseInt(this.fee.fast.perByte)
      };

      const parsedConnectionCode = this.peerConnectionCode.match(
        /^(.*?)@(.*?)(?::([0-9]+))?$/
      );

      if (parsedConnectionCode) {
        payload.pubKey = parsedConnectionCode[1];
        payload.ip = parsedConnectionCode[2];

        // If we matched a port in the connection code
        // Otherwise the backend will automatically determine which port to use
        if (parsedConnectionCode[3]) {
          payload.port = parsedConnectionCode[3];
        }
      } else {
        this.isOpening = false;
        this.error = "Please check the peer connection code";
        return;
      }

      //to do: connect to onion node if only the user's node is running tor

      try {
        await API.post(
          `${process.env.VUE_APP_API_URL}/v1/lnd/channel/open`,
          payload
        );
        this.isOpening = false;
        this.$emit("channelopen");
        //channel
        setTimeout(() => {
          this.$bvToast.toast(
            `Channel of ${this.fundingAmount} Sats opened successfully`,
            {
              title: "Lightning Network",
              autoHideDelay: 3000,
              variant: "success",
              solid: true,
              toaster: "b-toaster-bottom-right"
            }
          );
        }, 200);
      } catch (error) {
        if (error.response && error.response.data) {
          this.isOpening = false;
          this.error = error.response.data;
        }
      }
    },

    async fetchFees() {
      if (this.feeTimeout) {
        clearTimeout(this.feeTimeout);
      }
      this.feeTimeout = setTimeout(async () => {
        this.error = "";
        if (this.fundingAmount) {
          const payload = {
            confTarget: 0,
            amt: this.fundingAmount
          };

          let estimates;

          try {
            estimates = await API.get(
              `${process.env.VUE_APP_API_URL}/v1/lnd/channel/estimateFee`,
              { params: payload }
            );
          } catch (error) {
            if (error.response && error.response.data) {
              this.error = error.response.data;
            }
          }

          if (estimates) {
            for (const [speed, estimate] of Object.entries(estimates)) {
              // If the API returned an error message
              if (estimate.text) {
                this.fee[speed].total = 0;
                this.fee[speed].perByte = "N/A";
                this.fee[speed].error = estimate.text;
                this.error = estimate.text;
              } else {
                this.fee[speed].total = estimate.feeSat;
                this.fee[speed].perByte = estimate.feerateSatPerByte;
                this.fee[speed].sweepAmount = estimate.sweepAmount;
                this.fee[speed].error = false;
              }
            }
          }
        }
      }, 500);
    }
  },
  watch: {
    unit: function(val) {
      if (val === "sats") {
        this.fundingAmount = Number(this.fundingAmountInput);
      } else if (val === "btc") {
        this.fundingAmount = btcToSats(this.fundingAmountInput);
      }
      this.fetchFees();
    },
    fundingAmountInput: function(val) {
      if (this.unit === "sats") {
        this.fundingAmount = Number(val);
      } else if (this.unit === "btc") {
        this.fundingAmount = btcToSats(val);
      }
    }
  },
  components: {
    SatsBtcSwitch,
    VueSlider
  }
};
</script>

<style lang="scss">
/* Set the theme color of the component */
$themeColor: #edeef1;

$bgColor: #edeef1;
$railBorderRadius: 15px !default;

$dotShadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
$dotShadowFocus: 0px 4px 10px rgba(0, 0, 0, 0.4);
$dotBgColor: #fff !default;
$dotBgColorDisable: #ccc !default;
$dotBorderRadius: 50% !default;

$tooltipBgColor: #141821 !default;
$tooltipColor: #fff !default;
$tooltipBorderRadius: 5px !default;
$tooltipPadding: 2px 5px !default;
$tooltipMinWidth: 20px !default;
$tooltipArrow: 10px !default;
$tooltipFontSize: 0.8rem !default;

$stepBorderRadius: 50% !default;
$stepBgColor: rgba(0, 0, 0, 0.1) !default;

$labelFontSize: 0.8rem;

/* import theme style */
@import "~vue-slider-component/lib/theme/default.scss";

.vue-slider-ltr .vue-slider-mark-label,
.vue-slider-rtl .vue-slider-mark-label {
  margin-top: 1.2rem;
}

.vue-slider-dot-handle {
  transition: box-shadow 0.2s, background-color 0.2s ease;
}
.vue-slider-dot-tooltip {
  transition: opacity 0.2s ease;
}

.vue-slider-rail {
  cursor: pointer;
}
.vue-slider-disabled {
  .vue-slider-rail {
    cursor: not-allowed;
  }
}
.vue-slider-dot-handle-disabled {
  box-shadow: none;
}
.vue-slider-mark-label {
  text-transform: capitalize;
}
// .vue-slider-ltr {
//   .vue-slider-mark:first-child {
//     .vue-slider-mark-label,
//     .vue-slider-mark-label {
//       left: 0;
//       transform: translateX(0);
//     }
//   }
//   .vue-slider-mark:last-child {
//     .vue-slider-mark-label,
//     .vue-slider-mark-label {
//       left: 0;
//       transform: translateX(calc(-100% + 4px));
//     }
//   }
// }
</style>
