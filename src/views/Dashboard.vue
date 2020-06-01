<template>
  <div class="p-sm-2">
    <div class="my-3 pb-2">
      <h1 class="text-lowercase">
        welcome back{{ name ? `, ${name.split(" ")[0]}` : "" }}
      </h1>
      <p class="text-muted">This is your Umbrel's dashboard</p>
    </div>
    <b-row>
      <b-col col cols="12" md="6" xl="4">
        <lightning-wallet></lightning-wallet>
      </b-col>
      <!-- <b-col col cols="12" md="6" xl="4">
        <bitcoin-wallet></bitcoin-wallet>
      </b-col>-->
      <b-col col cols="12" md="6" xl="4">
        <card-widget
          header="Bitcoin Core"
          :status="{
            text: syncPercent !== 100 ? 'Synchronizing' : 'Running',
            variant: 'success',
            blink: false
          }"
          sub-title="Synchronized"
          icon="icon-app-bitcoin.svg"
          :loading="syncPercent !== 100 || blocks.length === 0"
        >
          <template v-slot:title>
            <CountUp
              :value="{
                endVal: syncPercent >= 99.99 ? 100 : syncPercent,
                decimalPlaces: syncPercent >= 99.99 ? 0 : 2
              }"
              suffix="%"
              v-if="syncPercent !== -1"
            />
            <span
              class="loading-placeholder loading-placeholder-lg"
              style="width: 140px;"
              v-else
            ></span>
          </template>
          <div class>
            <!-- <div class="d-flex w-100 justify-content-between px-3 px-lg-4">
                <p class="mb-1">Connected Peers</p>
                <p>8</p>
            </div>-->
            <!-- <p class="px-3 px-lg-4">Latest Blocks</p> -->
            <blockchain></blockchain>
            <div class="px-3 px-lg-4 py-3">
              <router-link to="/bitcoin" class="card-link">Manage</router-link>
            </div>
          </div>
        </card-widget>
      </b-col>
      <b-col col cols="12" xl="4">
        <b-row>
          <b-col col cols="12" md="6" xl="12">
            <card-widget
              header="Bitcoin Wallet"
              :status="{ text: 'Active', variant: 'success', blink: false }"
              :sub-title="unit | formatUnit"
              icon="icon-app-bitcoin.svg"
            >
              <template v-slot:title>
                <div
                  v-b-tooltip.hover.right
                  :title="btcBalanceInSats | satsToUSD"
                  v-if="btcBalance !== -1"
                >
                  <CountUp
                    :value="{
                      endVal: btcBalance,
                      decimalPlaces: unit === 'sats' ? 0 : 5
                    }"
                  />
                </div>

                <span
                  class="loading-placeholder loading-placeholder-lg"
                  style="width: 140px;"
                  v-else
                ></span>
              </template>
              <div class="px-3 px-lg-4 pt-2 pb-3">
                <router-link to="/bitcoin" class="card-link"
                  >Manage</router-link
                >
              </div>
            </card-widget>
          </b-col>
          <b-col col cols="12" md="6" xl="12">
            <card-widget
              header="Tor"
              :status="{ text: 'Running', variant: 'success', blink: false }"
              title="100%"
              sub-title="Traffic relayed through Tor"
              icon="icon-app-tor.svg"
            >
              <div class="px-3 px-lg-4 pt-2 pb-3">
                <router-link to="/settings" class="card-link"
                  >Manage</router-link
                >
              </div>
            </card-widget>
          </b-col>
        </b-row>
        <!-- <card-widget
            header="Example App"
            status="Running"
            status-type="success"
            title="Title"
            sub-title="Subtitle"
            icon="icon-app-chaind.svg"
        ></card-widget>-->
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { satsToBtc } from "@/helpers/units.js";

import CountUp from "@/components/Utility/CountUp";
import CardWidget from "@/components/CardWidget";
import Blockchain from "@/components/Blockchain";
import LightningWallet from "@/components/LightningWallet";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      name: state => state.user.name,
      syncPercent: state => state.bitcoin.percent,
      blocks: state => state.bitcoin.blocks,
      btcBalance: state => {
        //skip if still loading
        if (state.bitcoin.balance.total === -1) {
          return -1;
        }
        if (state.system.unit === "btc") {
          return satsToBtc(state.bitcoin.balance.total);
        }
        return state.bitcoin.balance.total;
      },
      btcBalanceInSats: state => state.bitcoin.balance.total,
      unit: state => state.system.unit
    })
  },
  methods: {},
  components: {
    CountUp,
    CardWidget,
    Blockchain,
    LightningWallet
  }
};
</script>

<style lang="scss" scoped></style>
