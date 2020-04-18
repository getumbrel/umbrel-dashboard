<template>
  <div id="app">
    <loading v-if="loading" :text="loadingText" :progress="loadingProgress"></loading>
    <!-- component matched by the route will render here -->
    <router-view v-else></router-view>
  </div>
</template>

<style lang="scss">
@import "@/global-styles/design-system.scss";
</style>

<script>
import { mapState } from "vuex";
import Loading from "@/components/Loading";

export default {
  name: "App",
  data() {
    return {
      loading: true,
      loadingText: "Loading...",
      loadingProgress: 0
    };
  },
  computed: {
    ...mapState({
      isApiOperational: state => state.system.api.operational,
      isBitcoinOperational: state => state.bitcoin.operational,
      isBitcoinCalibrating: state => state.bitcoin.calibrating,
      isLndOperational: state => state.lightning.operational,
      isLndUnlocked: state => state.lightning.unlocked
    })
  },
  methods: {
    //to do: move this to the specific layout that needs this 100vh fix
    updateViewPortHeightCSS() {
      return document.documentElement.style.setProperty(
        "--vh100",
        `${window.innerHeight}px`
      );
    },
    async checkIfLoading() {
      //First check if API is activx
      await this.$store.dispatch("system/getApi");
      if (!this.isApiOperational) {
        this.loading = true;
        this.loadingText = "Starting API...";
        this.loadingProgress = 20;
        return;
      }

      // Then check if bitcoind is operational
      await this.$store.dispatch("bitcoin/getStatus");
      if (!this.isBitcoinOperational) {
        this.loading = true;
        this.loadingText = "Starting Bitcoin Core...";
        this.loadingProgress = 40;
        return;
      }

      // Then check if bitcoind is calibrating
      if (this.isBitcoinCalibrating) {
        this.loading = true;
        this.loadingText = "Calibrating Bitcoin Core...";
        this.loadingProgress = 50;
        return;
      }

      // Then check if lnd is operational

      await this.$store.dispatch("lightning/getStatus");
      if (!this.isLndOperational) {
        this.loading = true;
        this.loadingText = "Starting LND...";
        this.loadingProgress = 70;
        return;
      }

      //Then check if lnd is unlocked
      if (!this.isLndUnlocked) {
        this.loading = true;
        this.loadingText = "Unlocking LND...";
        this.loadingProgress = 90;
        return;
      }

      this.loading = false;
    }
  },
  created() {
    this.updateViewPortHeightCSS();
    //for 100vh consistency
    window.addEventListener("resize", this.updateViewPortHeightCSS);

    //immediately check loading on first load, then check every 3 seconds...
    this.checkIfLoading();
    window.setInterval(this.checkIfLoading, 5000);
  },
  mounted() {
    const isDarkMode = this.$store.getters.isDarkMode;
    //onboarding
    // document.body.style.background = isDarkMode ? "#1C1C26" : "#ffffff";
    //dashboard
    document.body.style.background = isDarkMode ? "#1C1C26" : "#F7F9FB";
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateViewPortHeightCSS);
    window.clearInterval(this.checkIfLoading);
  },
  components: {
    Loading
  }
};
</script>