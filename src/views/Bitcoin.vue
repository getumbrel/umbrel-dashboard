<template>
  <div class="p-sm-2">
    <div class="my-3 pb-2">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex justify-content-start align-items-center">
          <img
            style="height: auto; width: 12vw; max-width: 100px"
            class="mr-2 mr-sm-3"
            src="@/assets/icon-app-bitcoin.svg"
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
            <small class="ml-1 text-success">Running</small>
            <h3 class="d-block font-weight-bold mb-1">Bitcoin Core</h3>
            <span class="d-block text-muted">{{ version ? version : '...' }}</span>
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
            <b-dropdown-item href="#" disabled>Show QR</b-dropdown-item>
            <b-dropdown-item href="#" disabled>Check for update</b-dropdown-item>
            <b-dropdown-item href="#" disabled>View information</b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item variant="danger" href="#" disabled>Stop Bitcoin Core</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
    <b-row class="row-eq-height">
      <b-col col cols="12" md="6" xl="4">
        <bitcoin-wallet></bitcoin-wallet>
      </b-col>
      <b-col col cols="12" md="6" xl="4">
        <card-widget header="Blockchain" :hasMenu="true">
          <template v-slot:menu>
            <b-dropdown-item variant="danger" href="#" disabled>Resync Blockchain</b-dropdown-item>
          </template>
          <div class>
            <div class="px-3 px-sm-4 mb-4">
              <div class="w-100 d-flex justify-content-between mb-2">
                <span class="align-self-end">Synchronized</span>
                <h3 class="font-weight-normal mb-0">
                  {{ syncPercent }}
                  <small class>%</small>
                </h3>
              </div>
              <b-progress
                :value="100"
                class="mb-1"
                variant="success"
                :style="{ height: '4px' }"
                animated
                striped
              ></b-progress>
              <small
                class="text-muted d-block text-right"
              >{{ currentBlock.toLocaleString() }} of {{ blockHeight.toLocaleString() }}</small>
            </div>
            <!-- low storage mode  -->
            <!-- <div class="d-flex w-100 justify-content-between px-3 px-sm-4 mb-4">
              <div>
                <span class="d-block">Low Storage Mode</span>
                <small class="text-muted d-block">Discard old blocks</small>
              </div>
              <toggle-switch class="align-self-center"></toggle-switch>
            </div>-->
            <p class="px-3 px-sm-4 mb-3">Latest Blocks</p>
            <blockchain :numBlocks="3"></blockchain>
            <div class="px-3 px-sm-4 py-2"></div>
          </div>
        </card-widget>
      </b-col>
      <b-col col cols="12" md="6" xl="4">
        <card-widget header="Network">
          <div class>
            <div class="px-3 px-sm-4 pb-2">
              <b-row>
                <b-col col cols="6" v-for="stat in state.stats" :key="stat.title">
                  <bitcoin-network-stat
                    :title="stat.title"
                    :value="stat.value"
                    :suffix="stat.suffix"
                    :change="{
                      value: stat.change.value,
                      suffix: stat.change.suffix
                    }"
                  ></bitcoin-network-stat>
                </b-col>
              </b-row>
            </div>
          </div>
        </card-widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// import Vue from "vue";
import { mapState } from "vuex";

import CardWidget from "@/components/CardWidget";
import Blockchain from "@/components/Blockchain";
// import ToggleSwitch from "@/components/ToggleSwitch";
import BitcoinNetworkStat from "@/components/BitcoinNetworkStat";
import BitcoinWallet from "@/components/BitcoinWallet";

export default {
  data() {
    return {
      state: {
        stats: [
          {
            title: "Connections",
            value: 8,
            suffix: "Peers",
            change: {
              value: 1,
              suffix: ""
            }
          },
          {
            title: "Mempool",
            value: 4,
            suffix: "Mb",
            change: {
              value: -42,
              suffix: "%"
            }
          },
          {
            title: "Hashrate",
            value: 102,
            suffix: "Ehash/s",
            change: {
              value: 7,
              suffix: "%"
            }
          },
          {
            title: "Best Fee",
            value: 34,
            suffix: "Sats/vbyte",
            change: {
              value: -26,
              suffix: "%"
            }
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      syncPercent: state => state.bitcoin.percent,
      version: state => state.bitcoin.version,
      currentBlock: state => state.bitcoin.currentBlock,
      blockHeight: state => state.bitcoin.blockHeight
    }),
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    }
  },
  methods: {
    random(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    refreshAPI() {
      const randomStat = this.random(0, 3);
      const updatedStats = [
        {
          title: "Connections",
          value: this.random(4, 8),
          suffix: "Peers",
          change: {
            value: this.random(-4, 4),
            suffix: ""
          }
        },
        {
          title: "Mempool",
          value: this.random(2, 20),
          suffix: "Mb",
          change: {
            value: this.random(-40, 40),
            suffix: "%"
          }
        },
        {
          title: "Hashrate",
          value: this.random(95, 105),
          suffix: "Ehash/s",
          change: {
            value: this.random(-5, 5),
            suffix: "%"
          }
        },
        {
          title: "Best Fee",
          value: this.random(10, 70),
          suffix: "Sats/vbyte",
          change: {
            value: this.random(-60, 40),
            suffix: "%"
          }
        }
      ];
      this.state.stats.splice(randomStat, 1, updatedStats[randomStat]);
    }
  },
  created() {
    this.$store.dispatch("bitcoin/getVersion");

    window.setInterval(this.refreshAPI, 2000);
  },
  beforeDestroy() {
    window.clearInterval(this.refreshAPI);
  },
  components: {
    CardWidget,
    Blockchain,
    // ToggleSwitch,
    BitcoinNetworkStat,
    BitcoinWallet
  }
};
</script>

<style lang="scss" scoped></style>
