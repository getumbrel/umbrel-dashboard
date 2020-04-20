<template>
  <div id="app">
    <transition name="loading" mode>
      <loading v-if="loading" :text="loadingText" :progress="loadingProgress"></loading>
      <!-- component matched by the route will render here -->
      <router-view v-else></router-view>
    </transition>
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
      loading: false,
      loadingText: "Loading...",
      loadingProgress: 0,
      polling: null,
      pollInProgress: false
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
      //prevent multiple polls if previous poll already in progress
      if (this.pollInProgress) {
        return;
      }

      this.pollInProgress = true;

      //First check if API is active
      await this.$store.dispatch("system/getApi");
      if (!this.isApiOperational) {
        this.loading = true;
        this.loadingText = "Starting API...";
        this.loadingProgress = 20;
        this.pollInProgress = false;
        return;
      }

      // Then check if bitcoind is operational
      await this.$store.dispatch("bitcoin/getStatus");
      if (!this.isBitcoinOperational) {
        this.loading = true;
        this.loadingText = "Starting Bitcoin Core...";
        this.loadingProgress = 40;
        this.pollInProgress = false;
        return;
      }

      // Then check if bitcoind is calibrating
      if (this.isBitcoinCalibrating) {
        this.loading = true;
        this.loadingText = "Calibrating Bitcoin Core...";
        this.loadingProgress = 50;
        this.pollInProgress = false;
        return;
      }

      // Then check if lnd is operational

      // await this.$store.dispatch("lightning/getStatus");
      // if (!this.isLndOperational) {
      //   this.loading = true;
      //   this.loadingText = "Starting LND...";
      //   this.loadingProgress = 70;
      //   this.pollInProgress = false;
      //   return;
      // }

      //Then check if lnd is unlocked
      // if (!this.isLndUnlocked) {
      //   this.loading = true;
      //   this.loadingText = "Starting LND...";
      //   this.loadingProgress = 90;
      //   this.pollInProgress = false;
      //   return;
      // }

      this.loading = false;
      this.loadingProgress = 100;
      this.pollInProgress = false;
    }
  },
  created() {
    this.updateViewPortHeightCSS();
    //for 100vh consistency
    window.addEventListener("resize", this.updateViewPortHeightCSS);

    //trigger loading watcher
    this.loading = true;

    //immediately check loading on first load, watcher's interval takes care of polling
    this.checkIfLoading();
  },
  mounted() {
    const isDarkMode = this.$store.getters.isDarkMode;
    //onboarding
    // document.body.style.background = isDarkMode ? "#1C1C26" : "#ffffff";
    //dashboard
    // document.body.style.background = isDarkMode ? "#1C1C26" : "#F7F9FB";
    document.body.style.background = isDarkMode ? "#F7F9FB" : "#F7F9FB";
  },
  watch: {
    loading: function(nowLoading) {
      window.clearInterval(this.polling);
      //if loading, check every second
      if (nowLoading) {
        this.polling = window.setInterval(this.checkIfLoading, 1000);
      } else {
        //else check every 10s
        this.polling = window.setInterval(this.checkIfLoading, 10000);
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateViewPortHeightCSS);
    window.clearInterval(this.polling);
  },
  components: {
    Loading
  }
};
</script>

<style lang="scss" scoped>
// Loading transitions

.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.4s ease;
}
.loading-enter {
  opacity: 0;
  // filter: blur(70px);
}
.loading-enter-to {
  opacity: 1;
  // filter: blur(0);
}
.loading-leave {
  opacity: 1;
  // filter: blur(0);
}
.loading-leave-to {
  opacity: 0;
  // filter: blur(70px);
}
</style>
