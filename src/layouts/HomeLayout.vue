<template>
  <div :class="{'mobile-scroll-container': isMobileDevice}">
    <home 
      :isOnHome="this.$route.name === 'home'" 
      :isMobileDevice="isMobileDevice"
      :isTouchDevice="isTouchDevice"
      :isRunningLowOnRam="isRunningLowOnRam"
      :isRunningLowOnStorage="isRunningLowOnStorage"
      :isRunningHot="isRunningHot"
    />
      <div class="d-flex justify-content-center">
        <router-view :isMobileDevice="isMobileDevice"></router-view>
      </div>

    <dock
      :position="isMobileDevice ? 'left' : 'botton'"
      :appStoreNotifications="appsWithUpdate.length"
      :settingsNotifications="settingsNotifications"
    />

    <b-modal
      id="confirm-update-modal"
      size="md"
      centered
      hide-footer
      v-if="availableUpdate.version"
      v-model="showUpdateConfirmationModal"
      >
        <template v-slot:modal-header>
          <div class="px-2 px-sm-3 pt-2 d-flex justify-content-between align-items-center w-100">
            <h3 class="mb-0">Umbrel {{ availableUpdate.version }}</h3>
            <!-- Emulate built in modal header close button action -->
            <a
              href="#"
              class="align-self-center"
              v-on:click.stop.prevent="hideUpdateConfirmationModal"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.6003 4.44197C13.3562 4.19789 12.9605 4.19789 12.7164 4.44197L9.02116 8.1372L5.32596 4.442C5.08188 4.19792 4.68615 4.19792 4.44207 4.442C4.198 4.68607 4.198 5.0818 4.44207 5.32588L8.13728 9.02109L4.44185 12.7165C4.19777 12.9606 4.19777 13.3563 4.44185 13.6004C4.68592 13.8445 5.08165 13.8445 5.32573 13.6004L9.02116 9.90497L12.7166 13.6004C12.9607 13.8445 13.3564 13.8445 13.6005 13.6004C13.8446 13.3563 13.8446 12.9606 13.6005 12.7165L9.90505 9.02109L13.6003 5.32585C13.8444 5.08178 13.8444 4.68605 13.6003 4.44197Z"
                  fill="#6c757d"
                />
              </svg>
            </a>
          </div>
        </template>
        <div class="px-2 px-sm-3 pb-2 pb-sm-3">
          <div class>
            <p class="text-newlines mb-4" v-if="availableUpdate.notes.trim()">
              {{ availableUpdate.notes }}
            </p>
            <b-button
              block
              variant="success"
              :disabled="isUpdating"
              @click="startUpdate"
              >{{
                isUpdating ? "Starting update..." : "Install now"
              }}</b-button
            >
          </div>
        </div>
      </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import API from "@/helpers/api";

import Home from "@/views/Home/Home";
import Dock from "@/components/Dock";

export default {
  data() {
    return {
      isUpdating: false,
      isVerticalDockOpen: false
    };
  },
  computed: {
    ...mapState({
      name: (state) => state.user.name,
      updateStatus: (state) => state.system.updateStatus,
      appStore: (state) => state.apps.store,
      availableUpdate: (state) => state.system.availableUpdate,
      showUpdateConfirmationModal: (state) => state.system.showUpdateConfirmationModal,
      ram: (state) => state.system.ram,
      storage: (state) => state.system.storage,
      cpuTemperature: (state) => state.system.cpuTemperature,
    }),
    isTouchDevice: () => 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0,
    isMobileDevice: () => window.innerWidth < 456,
    isRunningLowOnRam() {
      // over 95% RAM used
      if (this.ram && this.ram.total) {
        return this.ram.used / this.ram.total > 0.95
      }
      return false;
    },
    isRunningLowOnStorage() {
      // less than 1GB remaining
      if (this.storage && this.storage.total) {
        return this.storage.total - this.storage.used < 1000000000;
      }
      return false;
    },
    isRunningHot() {
      // over 80'C
      if (this.cpuTemperature) {
        return this.cpuTemperature > 80;
      }
      return false;
    },
    settingsNotifications() {
      let notifications = 0;

      if (this.availableUpdate.version) notifications++;
      if (this.isRunningLowOnRam) notifications++;
      if (this.isRunningLowOnStorage) notifications++;
      if (this.isRunningHot) notifications++;

      return notifications;
    },
    appsWithUpdate() {
      return this.appStore.filter(app => app.updateAvailable)
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
    },
    fetchData() {
      this.$store.dispatch("system/getAvailableUpdate");
      this.$store.dispatch("system/getRam");
      this.$store.dispatch("system/getStorage");
      this.$store.dispatch("system/getCpuTemperature");
      this.$store.dispatch("apps/getAppStore");
    },
    toggleMobileMenu() {
      this.$store.commit("toggleMobileMenu");
    },
    hideUpdateConfirmationModal() {
      this.$store.dispatch("system/hideUpdateConfirmationModal");
    },
    confirmUpdate() {
      this.$store.dispatch("system/confirmUpdate");
    },
    async startUpdate() {
      try {
        await API.post(
          `${process.env.VUE_APP_MANAGER_API_URL}/v1/system/update`,
          {}
        );
        this.isUpdating = true;
        // poll update status every 2s until the update process begins
        // because after it's updated, the loading view will take over
        this.pollUpdateStatus = window.setInterval(async () => {
          await this.$store.dispatch("system/getUpdateStatus");
          if (this.updateStatus.state === "installing") {
            window.clearInterval(this.pollUpdateStatus);
          }
        }, 2 * 1000);
      } catch (error) {
        this.$bvToast.toast(`Unable to start the update process`, {
          title: "Error",
          autoHideDelay: 3000,
          variant: "danger",
          solid: true,
          toaster: "b-toaster-bottom-right",
        });
      }
    },
  },
  created() {
    //load this data once:
    this.$store.dispatch("user/getInfo");
    this.$store.dispatch("system/getIsUmbrelOS");

    //refresh this data every 20s:
    this.fetchData();
    this.interval = window.setInterval(this.fetchData, 20000);
  },
  beforeDestroy() {
    window.clearInterval(this.interval);
    if (this.pollUpdateStatus) {
      window.clearInterval(this.pollUpdateStatus);
    }
  },
  watch: {},
  components: {
    Home,
    Dock,
  },
};
</script>

<style lang="scss" scoped>
.mobile-scroll-container {
  height: var(--vh100);
  overflow-y: scroll;
}
</style>
