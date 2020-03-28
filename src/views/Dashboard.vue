<template>
  <div class="p-2">
    <div class="my-3 pb-2">
      <h1>welcome back, satoshi</h1>
      <p class="text-muted">This is your Umbrel's dashboard</p>
    </div>
    <b-row>
      <b-col col cols="12" md="6" xl="4">
        <lightning-wallet></lightning-wallet>
      </b-col>
      <b-col col cols="12" md="6" xl="4">
        <card-widget
          header="Bitcoin Core"
          :status="{text: 'Running', variant: 'success', blink: false}"
          title="100%"
          sub-title="Synchronized"
          icon="icon-app-bitcoin.svg"
        >
          <div class>
            <!-- <div class="d-flex w-100 justify-content-between px-4">
                <p class="mb-1">Connected Peers</p>
                <p>8</p>
            </div>-->
            <!-- <p class="px-4">Latest Blocks</p> -->
            <blockchain></blockchain>
            <div class="px-4 py-3">
              <router-link to="/bitcoin" class="card-link">Manage</router-link>
            </div>
          </div>
        </card-widget>
      </b-col>
      <b-col col cols="12" md="6" xl="4">
        <!-- <card-widget
            header="BTCPay Server"
            status="Running"
            status-type="success"
            title="72"
            sub-title="New orders today"
            icon="icon-app-btcpay.svg"
          >
            <div class="px-4 pt-2 pb-3">
              <a href="#" class="card-link">Manage</a>
            </div>
        </card-widget>-->
        <card-widget
          header="Tor"
          :status="{text: 'Running', variant: 'success', blink: false}"
          title="100%"
          sub-title="Traffic relayed over Tor"
          icon="icon-app-tor.svg"
        >
          <div class="px-4 pt-2 pb-3">
            <router-link to="/settings" class="card-link">Manage</router-link>
          </div>
        </card-widget>
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
// import Vue from "vue";
import CardWidget from "@/components/CardWidget";
import Blockchain from "@/components/Blockchain";
import LightningWallet from "@/components/LightningWallet";

export default {
  data() {
    return {};
  },
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    }
  },
  methods: {},
  mounted() {
    // disable dark mode on dashboard
    if (this.$store.getters.isDarkMode) {
      this.$store.commit("toggleDarkMode");
    }
  },
  components: {
    CardWidget,
    Blockchain,
    LightningWallet
  }
};
</script>

<style lang="scss" scoped>
</style>
