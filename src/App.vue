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
      loading: true,
      loadingText: "Loading...",
      loadingProgress: 10,
      loadingPollInProgress: false
    };
  },
  computed: {
    ...mapState({
      isManagerApiOperational: state => state.system.managerApi.operational,
      isApiOperational: state => state.system.api.operational,
      isBitcoinOperational: state => state.bitcoin.operational,
      isLndOperational: state => state.lightning.operational
    })
  },
  methods: {
    //TODO: move this to the specific layout that needs this 100vh fix
    updateViewPortHeightCSS() {
      return document.documentElement.style.setProperty(
        "--vh100",
        `${window.innerHeight}px`
      );
    },
    async getLoadingStatus() {
      //first check if manager api is up
      await this.$store.dispatch("system/getManagerApi");
      if (!this.isManagerApiOperational) {
        this.loading = true;
        this.loadingText = "Starting Manager...";
        this.loadingProgress = 20;
        this.loadingPollInProgress = false;
        return;
      }

      //then check if middleware api is up
      await this.$store.dispatch("system/getApi");
      if (!this.isApiOperational) {
        this.loading = true;
        this.loadingText = "Starting Middleware...";
        this.loadingProgress = 40;
        this.loadingPollInProgress = false;
        return;
      }

      //then check if btc is operational
      await this.$store.dispatch("bitcoin/getStatus");
      if (!this.isBitcoinOperational) {
        this.loading = true;
        this.loadingText = "Starting Bitcoin Core...";
        this.loadingProgress = 60;
        this.loadingPollInProgress = false;
        return;
      }

      //then check if lnd is operational
      await this.$store.dispatch("lightning/getStatus");
      if (!this.isLndOperational) {
        this.loading = true;
        this.loadingText = "Starting LND...";
        this.loadingProgress = 80;
        this.loadingPollInProgress = false;
        return;
      }

      //all good
      // this.loadingText = "";
      this.loadingProgress = 100;
      this.loadingPollInProgress = false;

      //slight delay so the laoding progress bar makes
      //it to 100% before disappearing
      setTimeout(() => (this.loading = false), 300);
    }
  },
  created() {
    //first check if loading...

    //if not, check auth

    this.updateViewPortHeightCSS();
    //for 100vh consistency
    window.addEventListener("resize", this.updateViewPortHeightCSS);
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
    loading: {
      handler: function(isLoading) {
        window.clearInterval(this.loadingInterval);
        //if loading, check loading status every two seconds
        if (isLoading) {
          this.loadingInterval = window.setInterval(
            this.getLoadingStatus,
            2000
          );
        } else {
          //else check every 20s
          this.loadingInterval = window.setInterval(
            this.getLoadingStatus,
            20000
          );
        }
      },
      immediate: true
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateViewPortHeightCSS);
    window.clearInterval(this.loadingInterval);
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
