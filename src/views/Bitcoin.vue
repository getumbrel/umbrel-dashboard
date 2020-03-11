<template>
  <div class="p-2">
    <div class="my-3 pb-2">
      <h1>bitcoin</h1>
      <p class="text-muted">🛠 Under heavy development</p>
    </div>
    <b-row class="row-eq-height">
      <b-col col cols="12" md="6" xl="4">
        <card-widget header="Blockchain">
          <div class>
            <div class="px-4 mb-4">
              <div class="w-100 d-flex justify-content-between mb-2">
                <span>Synchronized</span>
                <span class="font-weight-bold">100%</span>
              </div>
              <b-progress
                :value="100"
                class="mb-3"
                variant="success"
                :style="{height: '4px'}"
                animated
                striped
              ></b-progress>
            </div>
            <div class="d-flex w-100 justify-content-between px-4 mb-4">
              <div>
                <span class="d-block">Low Storage Mode</span>
                <small class="text-muted d-block">Discard old blocks</small>
              </div>
              <toggle-switch class="align-self-center"></toggle-switch>
            </div>
            <p class="px-4 mb-3">Latest Blocks</p>
            <blockchain :numBlocks="4"></blockchain>
            <div class="px-4 py-2"></div>
          </div>
        </card-widget>
      </b-col>
      <b-col col cols="12" md="6" xl="8">
        <card-widget header="Network">
          <div class>
            <div class="px-4 pb-2">
              <b-row>
                <b-col col cols="6" xl="3" v-for="stat in state.stats" :key="stat.title">
                  <bitcoin-network-stat
                    :title="stat.title"
                    :value="stat.value"
                    :suffix="stat.suffix"
                    :change="{value: stat.change.value, suffix: stat.change.suffix}"
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
import CardWidget from "@/components/CardWidget";
import Blockchain from "@/components/Blockchain";
import ToggleSwitch from "@/components/ToggleSwitch";
import BitcoinNetworkStat from "@/components/BitcoinNetworkStat";

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
    window.setInterval(this.refreshAPI, 2000);
  },
  beforeDestroy() {
    window.clearInterval(this.refreshAPI);
  },
  components: {
    CardWidget,
    Blockchain,
    ToggleSwitch,
    BitcoinNetworkStat
  }
};
</script>

<style lang="scss" scoped>
</style>
