<template>
  <authenticated-nav>
    <div class="p-2">
      <div class="my-3 pb-2">
        <h1>welcome back, satoshi</h1>
        <p class="text-muted">This is your Umbrel's dashboard</p>
      </div>
      <b-row>
        <b-col col sm="6" xl="4">
          <lightning-wallet></lightning-wallet>
        </b-col>
        <b-col col sm="6" xl="4">
          <card-widget
            header="Bitcoin Core"
            status="Running"
            status-type="success"
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
                <a href="#" class="card-link">Manage</a>
              </div>
            </div>
          </card-widget>
        </b-col>
        <b-col col sm="6" xl="4">
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
            status="Running"
            status-type="success"
            title="100%"
            sub-title="Traffic relayed over Tor"
            icon="icon-app-tor.svg"
          >
            <div class="px-4 pt-2 pb-3">
              <a href="#" class="card-link">Manage</a>
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
  </authenticated-nav>
</template>

<script>
// import Vue from "vue";
import AuthenticatedNav from "@/layouts/AuthenticatedNav";
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
  components: {
    AuthenticatedNav,
    CardWidget,
    Blockchain,
    LightningWallet
  }
};
</script>

<style lang="scss" scoped>
.nav-horizontal,
.nav-vertical {
  background: #fff;
}

.nav-vertical {
  // width: 280px;
  height: calc(100vh - 84px);
}

.balance-container {
  border-top: solid 1px #eeeff3;
  border-bottom: solid 1px #eeeff3;
}

.input-search {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  width: 60vw;
  max-width: 600px;
  font-size: 1em;
}
::-webkit-input-placeholder {
  /* Edge */
  color: #c3c6d1;
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #c3c6d1;
}

::placeholder {
  color: #c3c6d1;
}
</style>
