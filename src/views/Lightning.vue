<template>
  <div class="p-2">
    <div class="my-3 pb-2">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex justify-content-start align-items-center">
          <img
            style="height: auto; width: 12vw; max-width: 100px"
            class="mr-2 mr-sm-3"
            src="@/assets/icon-app-lnd.svg"
          />
          <div>
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="4" cy="4" r="4" fill="#00CD98" />
            </svg>
            <small class="ml-1 text-success">{{ state.status }}</small>
            <h3 class="d-block font-weight-bold mb-1">Lightning Network</h3>
            <span
              class="d-block text-muted"
              v-if="state.lndVersion"
            >lnd v{{state.lndVersion.split(" commit")[0]}}</span>
            <span class="d-block text-muted" v-else>&nbsp;</span>
          </div>
        </div>
        <div>
          <b-dropdown variant="link" toggle-class="text-decoration-none p-0" no-caret right>
            <template v-slot:button-content>
              <svg
                width="18"
                height="4"
                viewBox="0 0 18 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0C0.89543 0 0 0.89543 0 2C0 3.10457 0.89543 4 2 4Z"
                  fill="#C3C6D1"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9 4C10.1046 4 11 3.10457 11 2C11 0.89543 10.1046 0 9 0C7.89543 0 7 0.89543 7 2C7 3.10457 7.89543 4 9 4Z"
                  fill="#C3C6D1"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16 4C17.1046 4 18 3.10457 18 2C18 0.89543 17.1046 0 16 0C14.8954 0 14 0.89543 14 2C14 3.10457 14.8954 4 16 4Z"
                  fill="#C3C6D1"
                />
              </svg>
            </template>
            <b-dropdown-item href="#" @click="showPubKey">View Public Key</b-dropdown-item>
            <b-dropdown-item href="#" disabled>Check for update</b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item variant="danger" href="#" disabled>Stop Lightning</b-dropdown-item>
          </b-dropdown>
          <b-modal
            id="public-key-modal"
            ref="public-key-modal"
            title="Node Public Key"
            centered
            hide-footer
          >
            <!-- QR Code element -->
            <qrcode-vue
              :value="state.pubKey"
              :size="150"
              level="H"
              renderAs="svg"
              class="d-flex justify-content-center qr-image my-2"
            ></qrcode-vue>
            <input-copy size="sm" :value="state.pubKey" class="p-2"></input-copy>
          </b-modal>
        </div>
      </div>
    </div>
    <b-row class="row-eq-height">
      <b-col col cols="12" md="6" xl="4">
        <lightning-wallet></lightning-wallet>
      </b-col>
      <b-col col cols="12" md="6" xl="8">
        <card-widget header="Channels">
          <div class>
            <div class="px-4 pb-2">
              <b-row>
                <b-col col cols="6" xl="3" v-for="stat in stats" :key="stat.title">
                  <bitcoin-network-stat
                    :title="stat.title"
                    :value="stat.value"
                    :suffix="stat.suffix"
                    :numberSuffix="stat.numberSuffix || ''"
                  ></bitcoin-network-stat>
                </b-col>
              </b-row>

              <!-- List of channels -->
              <!-- <div>
                <h4
                  v-for="channel in state.channels"
                  :key="channel.channelPoint"
                >{{channel.capacity}}</h4>
              </div>-->
            </div>
          </div>
        </card-widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

import API from "@/helpers/api";

import CardWidget from "@/components/CardWidget";
import BitcoinNetworkStat from "@/components/BitcoinNetworkStat";
import LightningWallet from "@/components/LightningWallet";
import InputCopy from "@/components/InputCopy";

const abbreviateNumber = n => {
  if (n < 1e3) return [Number(n.toFixed(1)), ""];
  if (n >= 1e3 && n < 1e6) return [Number((n / 1e3).toFixed(1)), "K"];
  if (n >= 1e6 && n < 1e9) return [Number((n / 1e6).toFixed(1)), "M"];
  if (n >= 1e9 && n < 1e12) return [Number((n / 1e9).toFixed(1)), "B"];
  if (n >= 1e12) return [Number(+(n / 1e12).toFixed(1)), "T"];
};

window.abv = abbreviateNumber;

export default {
  data() {
    return {
      state: {
        lndVersion: null,
        numActiveChannels: 0,
        numPeers: 0,
        status: "Running",
        pubKey: "",
        channels: []
      }
    };
  },
  computed: {
    stats() {
      // let activeChannels = 0;
      let totalLocalBalance = 0;
      let totalRemoteBalance = 0;
      // let totalCapacity = 0;

      for (let channel of this.state.channels) {
        if (!channel.active) continue;
        // activeChannels++;
        totalLocalBalance += Number(channel.localBalance);
        totalRemoteBalance += Number(channel.remoteBalance);
        // totalCapacity += Number(channel.capacity);
      }

      // totalCapacity = totalLocalBalance + totalRemoteBalance;

      return [
        // {
        //   title: "Total Capacity",
        //   value: abbreviateNumber(totalCapacity)[0],
        //   numberSuffix: abbreviateNumber(totalCapacity)[1],
        //   suffix: "Sats",
        //   change: {
        //     value: 1,
        //     suffix: ""
        //   }
        // },
        {
          title: "Peers",
          value: this.state.numPeers,
          suffix: "Peers",
          change: {
            value: 1,
            suffix: ""
          }
        },
        {
          title: "Active Channels",
          value: this.state.numActiveChannels,
          suffix: "Channels",
          change: {
            value: -42,
            suffix: ""
          }
        },
        {
          title: "Max Send",
          value: abbreviateNumber(totalLocalBalance)[0],
          numberSuffix: abbreviateNumber(totalLocalBalance)[1],
          suffix: "Sats",
          change: {
            value: 7,
            suffix: ""
          }
        },
        {
          title: "Max Receive",
          value: abbreviateNumber(totalRemoteBalance)[0],
          numberSuffix: abbreviateNumber(totalRemoteBalance)[1],
          suffix: "Sats",
          change: {
            value: -26,
            suffix: ""
          }
        }
      ];
    }
  },
  methods: {
    async showPubKey() {
      this.$refs["public-key-modal"].show();
    }
  },
  created() {
    //Get LND Status
    // axios
    //   .get(`v1/lnd/info/status`)
    //   .then(res => {
    //     const { operational, unlocked } = res.data;

    //     if (operational && unlocked) {
    //       return (this.state.status = "Running");
    //     }
    //     if (operational && !unlocked) {
    //       return (this.state.status = "Waiting");
    //     }
    //     if (!operational) {
    //       return (this.state.status = "Stopped");
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     alert(error);
    //   })
    //   .finally(() => {
    //     // this.state.loading = false;
    //   });

    //Get LND Info for showing stats
    API.get(`v1/pages/lnd/`)
      .then(res => {
        this.state.pubKey = res.lightningInfo.identityPubkey;
        this.state.lndVersion = res.lightningInfo.version;
        this.state.numPeers = res.lightningInfo.numPeers;
        this.state.numActiveChannels = res.lightningInfo.numActiveChannels;
        this.state.channels = res.channels;
      })
      .catch(error => {
        console.log(error);
        alert(error);
      })
      .finally(() => {
        // this.state.loading = false;
      });
  },
  watch: {},
  components: {
    LightningWallet,
    CardWidget,
    BitcoinNetworkStat,
    QrcodeVue,
    InputCopy
  }
};
</script>

<style lang="scss" scoped>
</style>
