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
        ></b-input>
      </b-col>
      <b-col col cols="12" sm="6">
        <label class="sr-onlsy" for="funding-amount">Sats</label>
        <b-input
          id="funding-amount"
          class="mb-3 neu-input"
          type="number"
          size="lg"
          v-model="fundingAmount"
          @input="fetchFees"
          :disabled="isOpening"
        ></b-input>

        <!-- <small>{{ btc.confirmed.toLocaleString() }} Sats available out of {{ btc.total.toLocaleString() }} and {{ btc.pending.toLocaleString() }} pending</small> -->
      </b-col>

      <b-col col cols="12">
        <div class="mt-2 d-flex w-100 justify-content-between">
          <div>
            <small class="text-danger align-self-center" v-if="error">{{ error }}</small>
            <small
              class="text-muted align-self-center"
              v-else-if="fee.fast.total"
            >Mining fee: {{ fee.fast.total }} Sats</small>
          </div>
          <b-button
            type="submit"
            variant="success"
            :disabled="isOpening"
          >{{ this.isOpening ? 'Opening...' : 'Open Channel' }}</b-button>
        </div>
      </b-col>
    </b-row>
  </form>
</template>

<script>
import API from "@/helpers/api";
export default {
  props: {},
  data() {
    return {
      peerConnectionCode: "",
      fundingAmount: "",
      isOpening: false,
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
    // btc() {
    //   return this.$store.state.bitcoin.balance;
    // }
  },
  methods: {
    async openChannel() {
      this.isOpening = true;

      if (!this.peerConnectionCode || !this.fundingAmount) {
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

          const estimates = await API.get(
            `${process.env.VUE_APP_API_URL}/v1/lnd/channel/estimateFee`,
            { params: payload }
          );

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
  components: {}
};
</script>

<style lang="scss" scoped>
</style>
