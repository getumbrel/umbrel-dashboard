<template>
  <div id="app">
    <transition name="loading" mode>
      <loading
        v-if="updating"
        :text="`${updateStatus.description}...`"
        :progress="updateStatus.progress"
      ></loading>
      <loading v-else-if="loading" :text="loadingText" :progress="loadingProgress"></loading>
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
      loadingText: "",
      loadingProgress: 0,
      loadingPollInProgress: false
    };
  },
  computed: {
    ...mapState({
      isManagerApiOperational: state => state.system.managerApi.operational,
      isApiOperational: state => state.system.api.operational,
      isBitcoinOperational: state => state.bitcoin.operational,
      isLndOperational: state => state.lightning.operational,
      jwt: state => state.user.jwt,
      updateStatus: state => state.system.updateStatus
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
        // this.loadingText = "Starting Manager...";
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
        // this.loadingText = "Starting Middleware...";
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
        // this.loadingText = "Starting Bitcoin Core...";
        this.loadingProgress = 60;
        await this.$store.dispatch("bitcoin/getStatus");
        if (!this.isBitcoinOperational) {
          this.loading = true;
          this.loadingPollInProgress = false;
          return;
        }
      }

      // Then check if lnd is operational
      if (this.loadingProgress <= 80) {
        // this.loadingText = "Starting LND...";
        this.loadingProgress = 80;
        await this.$store.dispatch("lightning/getStatus");
        if (!this.isLndOperational) {
          this.loading = true;
          this.loadingPollInProgress = false;
          return;
        }
      }

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
      handler: function(isUpdating) {
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
