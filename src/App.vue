<template>
  <div id="app">
    <transition name="loading" mode>
      <loading v-if="updating" :progress="updateStatus.progress">
        <div class="text-center">
          <small class="text-muted d-block">{{`${updateStatus.description}...`}}</small>
          <b-alert class="system-alert" variant="warning" show>
            <small>Please do not refresh this page or turn off your Umbrel while the update is in progress</small>
          </b-alert>
        </div>
      </loading>
      <shutdown
        v-else-if="hasShutdown || shuttingDown || rebooting"
        :hasShutdown="hasShutdown"
        :shuttingDown="shuttingDown"
        :rebooting="rebooting"
      >
        <div class="text-center" v-if="shuttingDown || rebooting">
          <b-alert class="system-alert" variant="warning" show>
            <small>Please do not refresh this page or turn off your Umbrel while it is {{ shuttingDown ? 'shutting down' : 'rebooting'}}</small>
          </b-alert>
        </div>
      </shutdown>
      <loading v-else-if="loading" :progress="loadingProgress">
        <small class="text-muted w-75 text-center">{{ loadingText }}</small>
        <div v-if="showDebugOption">
          <small class="text-muted w-75 text-center">If the loading is stuck, click here to debug: </small>
          <b-button variant="outline-warning" size="sm" @click="debugPrompt">Debug</b-button>
        </div>
      </loading>
      <!-- component matched by the route will render here -->
      <router-view v-else></router-view>
    </transition>

    <b-modal
        ref="debug-modal"
        title="Results"
        no-close-on-backdrop
        no-close-on-esc
        cancel-title="Run again"
        @cancel="debugPrompt"
        @ok="clearDebugInterval"
      >
        <div v-if="this.loadingDebug">
          <p>Processing...</p>
        </div>
        <div v-else>
            <p>Please share the following links with a description of your problem in the <a href="https://t.me/getumbrel">Umbrel Telegram group</a> so we can help you.</p>
            <input-copy class="mb-1" size="sm" auto-width :value="this.debugResult.linkDebug"></input-copy>
            <input-copy size="sm" auto-width :value="this.debugResult.linkDmesg"></input-copy>
          </div>
      </b-modal>
  </div>
</template>

<style lang="scss">
@import "@/global-styles/design-system.scss";
</style>

<script>
import { mapState } from "vuex";
import delay from "@/helpers/delay";
import Shutdown from "@/components/Shutdown";
import Loading from "@/components/Loading";
import InputCopy from "@/components/Utility/InputCopy";

const SECONDS_IN_MS = 1000;

export default {
  name: "App",
  data() {
    return {
      loading: true,
      loadingText: "",
      loadingProgress: 0,
      bitcoinPollStarted: 0,
      lndPollStarted: 0,
      loadingPollInProgress: false,
      loadingDebug: false,
      showDebugOption: false
    };
  },
  computed: {
    ...mapState({
      hasShutdown: state => state.system.hasShutdown,
      shuttingDown: state => state.system.shuttingDown,
      rebooting: state => state.system.rebooting,
      isManagerApiOperational: state => state.system.managerApi.operational,
      isApiOperational: state => state.system.api.operational,
      isBitcoinOperational: state => state.bitcoin.operational,
      isLndOperational: state => state.lightning.operational,
      jwt: state => state.user.jwt,
      updateStatus: state => state.system.updateStatus,
      debugResult: state => state.system.debugResult
    }),
    updating() {
      return this.updateStatus.state === "installing";
    }
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
      // Skip if previous poll in progress or if system is updating
      if (this.loadingPollInProgress || this.updating) {
        return;
      }

      this.loadingPollInProgress = true;

      // First check if manager api is up
      if (this.loadingProgress <= 20) {
        this.loadingText = "Loading Manager...";
        this.loadingProgress = 20;
        await this.$store.dispatch("system/getManagerApi");
        if (!this.isManagerApiOperational) {
          this.loading = true;
          this.loadingPollInProgress = false;
          return;
        }
      }

      // Then check if middleware api is up
      if (this.loadingProgress <= 40) {
        this.loadingText = "Loading Middleware...";
        this.loadingProgress = 40;
        await this.$store.dispatch("system/getApi");
        if (!this.isApiOperational) {
          this.loading = true;
          this.loadingPollInProgress = false;
          return;
        }
      }

      // Then check if btc is operational
      if (this.loadingProgress <= 60) {
        this.loadingText = "Loading Bitcoin Core...";

        // Warn users against pulling power if Core is taking a while
        const bitcoinSlowDelay = 10 * SECONDS_IN_MS;
        const bitcoinErrorDelay = 15 * SECONDS_IN_MS;
        if (!this.bitcoinPollStarted) {
          this.bitcoinPollStarted = Date.now();
        } else if (Date.now() - this.bitcoinPollStarted > bitcoinSlowDelay) {
          this.loadingText += " This can take a while, please don't turn off your Umbrel!";

          if (Date.now() - this.bitcoinPollStarted > bitcoinErrorDelay) {
            this.showDebugOption = true;
          }
        }

        this.loadingProgress = 60;
        await this.$store.dispatch("bitcoin/getStatus");
        if (!this.isBitcoinOperational) {
          this.loading = true;
          this.loadingPollInProgress = false;
          return;
        }
      }
      this.bitcoinPollStarted = 0;
      this.showDebugOption = false;

      // Then check if lnd is operational
      if (this.loadingProgress <= 80) {
        this.loadingText = "Loading LND...";

        // Warn users against pulling power if LND is taking a while
        const lndSlowDelay = 15 * SECONDS_IN_MS;
        if (!this.lndPollStarted) {
          this.lndPollStarted = Date.now();
        } else if (Date.now() - this.lndPollStarted > lndSlowDelay) {
           this.showDebugOption = true;
        }

        this.loadingProgress = 80;
        await this.$store.dispatch("lightning/getStatus");
        if (!this.isLndOperational) {
          this.loading = true;
          this.loadingPollInProgress = false;
          return;
        }
      }
      this.lndPollStarted = 0;
      this.showDebugOption = false;

      // Then trigger auth check
      if (this.loadingProgress <= 95 && this.jwt) {
        this.loadingProgress = 95;
        try {
          await this.$store.dispatch("user/refreshJWT");
        } catch (error) {
          // it will error if jwt has expired and automatically redirect the user to login page
          null;
        }
      }

      this.loadingProgress = 100;
      this.loadingPollInProgress = false;

      // Add slight delay so the progress bar makes
      // it to 100% before disappearing
      setTimeout(() => (this.loading = false), 300);
    },
    async getDebugLoadingStatus() {
      await this.$store.dispatch("system/getDebugResult");

      if(this.debugResult.status != "success") {
        this.loadingDebug = true;
      } else {
        this.loadingDebug = false;
      }
    },
    clearDebugInterval() {
      window.clearInterval(this.loadingDebugInterval);
    },
    async debugPrompt() {
      let toastText = "";
      let toastOptions = {
        autoHideDelay: 3000,
        solid: true,
        toaster: "b-toaster-bottom-right"
      };

      try {
        await this.$store.dispatch("system/debug");
      } catch (e) {
        toastText = "Debug request failed";
        toastOptions.title =
          "Something went wrong and Umbrel was not able to run the debug script";
        toastOptions.variant = "danger";
      }

      this.$bvToast.toast(toastText, toastOptions);
      this.loadingDebug = true;
      this.$refs["debug-modal"].show();
    }
  },
  created() {
    //check if system is updating
    this.$store.dispatch("system/getUpdateStatus");

    //for 100vh consistency
    this.updateViewPortHeightCSS();
    window.addEventListener("resize", this.updateViewPortHeightCSS);
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
    },
    updating: {
      handler: function(isUpdating, wasUpdating) {
        window.clearInterval(this.updateStatusInterval);
        // if updating, check loading status every two seconds
        if (isUpdating) {
          this.updateStatusInterval = window.setInterval(() => {
            this.$store.dispatch("system/getUpdateStatus");
          }, 2 * 1000);
        } else {
          //else check every minute
          this.updateStatusInterval = window.setInterval(() => {
            this.$store.dispatch("system/getUpdateStatus");
          }, 60 * 1000);

          // if it just finished updating, then show success/failure toast
          if (wasUpdating) {
            const toastOptions = {
              title: "Update successful",
              autoHideDelay: 2000,
              variant: "success",
              solid: true,
              toaster: "b-toaster-bottom-right"
            };

            if (this.updateStatus.state === "failed") {
              toastOptions.title = "Update failed";
              toastOptions.variant = "danger";
            }

            this.$bvToast.toast(this.updateStatus.description, toastOptions);

            //refresh window to fetch latest code of dashboard
            delay(2000).then(() => {
              window.location.reload(true);
            });
          }
        }
      },
      immediate: true
    },
    loadingDebug: {
      handler: function(isLoading) {
        window.clearInterval(this.loadingDebugInterval);

        if (isLoading) {
          this.loadingDebugInterval = window.setInterval(
            this.getDebugLoadingStatus,
            2000
          );
        }
      },
      immediate: true
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateViewPortHeightCSS);
    window.clearInterval(this.loadingInterval);
    window.clearInterval(this.updateStatusInterval);
  },
  components: {
    Loading,
    Shutdown,
    InputCopy
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

.system-alert {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
