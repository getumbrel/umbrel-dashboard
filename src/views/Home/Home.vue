<template>
  <div class="position-relative" :class="{'mobile-view': isMobileDevice}" >

    <!-- Wallpaper menu toggle button -->
    <transition name="wallpaper-menu-toggle-button-transition">
      <div v-if="isOnHome && isNotScrolling">
        <wallpaper-menu-toggle-button @toggle="toggleWallpaperMenu" />
      </div>
    </transition>

    <!-- Wallpaper menu -->
    <transition name="wallpaper-menu-transition">
      <wallpaper-menu v-if="showWallpaperMenu" @close="toggleWallpaperMenu" />
    </transition>

    <!-- Wallpaper menu background overlay to close menu on click -->
    <div v-if="showWallpaperMenu" class="wallpaper-close-background" @click="toggleWallpaperMenu"></div>

    <!-- Home content -->
    <div class="home-container d-flex flex-column" v-on:scroll.passive="onScroll">
      <div class="mt-3 mt-sm-3 mb-2">
        <div class="d-flex flex-column justify-content-center align-items-center">
          <svg class="mb-2 umbrel-logo" width="128" height="63" viewBox="0 0 128 63" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M63.2131 11.7526C77.231 11.4832 88.2667 15.2548 96.8267 22.6791C103.045 28.0727 108.246 35.6454 112.268 45.6467C109.203 44.8917 105.964 44.5215 102.573 44.5215C95.399 44.5215 88.9611 46.181 83.5973 49.7923C77.5879 46.1253 71.1232 44.1979 64.2757 44.1979C57.2723 44.1979 50.5495 46.2127 44.1689 49.9949C38.0103 46.1206 31.0708 44.1979 23.4993 44.1979C20.7653 44.1979 18.1493 44.4516 15.6814 44.982C19.2979 35.7838 24.0824 28.693 29.8914 23.4963C38.1921 16.0706 49.1296 12.0232 63.2131 11.7526ZM9.82851 61.4166C10.0384 61.2253 10.235 61.0184 10.4162 60.797C12.9782 57.8239 16.9889 55.9371 23.4993 55.9371C29.6392 55.9371 34.9062 57.6433 39.512 61.015L39.6938 61.1503C42.1964 63.0133 45.6034 63.0901 48.1874 61.3418C53.6911 57.6181 59.0238 55.9371 64.2757 55.9371C69.4346 55.9371 74.4405 57.5573 79.4026 61.0801L79.5061 61.1541C82.2606 63.1246 86.0058 62.9538 88.5695 60.7408C91.8469 57.9117 96.3323 56.2607 102.573 56.2607C109.139 56.2607 114.229 58.0926 118.249 61.4864C118.437 61.6511 118.634 61.8036 118.84 61.9429C119.378 62.3076 119.959 62.572 120.56 62.7383C121.467 62.9906 122.446 63.0279 123.424 62.8063C123.942 62.6895 124.446 62.5023 124.921 62.2458C126.451 61.4203 127.52 59.9599 127.873 58.2959C128.018 57.6127 128.042 56.8951 127.928 56.173C127.894 55.9515 127.847 55.7318 127.787 55.5151C123.13 37.4749 115.517 23.3503 104.518 13.8108C93.4022 4.16947 79.3898 -0.299596 62.9876 0.0155562C46.651 0.329447 32.8403 5.10715 22.0645 14.7471C11.3826 24.303 4.22946 38.1473 0.178326 55.6457C0.118718 55.8829 0.0742537 56.1228 0.044812 56.364C-0.165626 58.0565 0.37625 59.7025 1.43574 60.9265C1.98837 61.5649 2.68183 62.0886 3.4828 62.4442C3.99072 62.6707 4.52237 62.8205 5.06113 62.895C6.83849 63.1446 8.57209 62.5615 9.82851 61.4166Z" fill="white"/>
          </svg>
          <span class="text-greeting text-white text-lowercase text-center d-block mb-4">{{ greeting }}, {{ name.split(" ")[0] }}</span>
          
          <!-- Umbrel update notification -->
          <transition name="notification-transition" appear>
            <notification v-if="availableUpdate.version" :text="`Umbrel ${availableUpdate.version} is now available`">
              <b-button @click.prevent="confirmUpdate" variant="alert-glass" size="sm" class="px-3 mr-2 mr-sm-3" pill>View</b-button>
            </notification>
          </transition>

          <!-- Low RAM notification -->
          <transition name="notification-transition" appear>
            <notification v-if="isRunningLowOnRam" text="Your Umbrel is running low on RAM">
              <router-link to="/settings#ram" class="btn btn-sm btn-alert-glass rounded-pill px-3 mr-2 mr-sm-3" pill>View</router-link>
            </notification>
          </transition>

          <!-- Low storage notification -->
          <transition name="notification-transition" appear>
            <notification v-if="isRunningLowOnStorage" text="Your Umbrel is running low on storage">
              <router-link to="/settings#storage" class="btn btn-sm btn-alert-glass rounded-pill px-3 mr-2 mr-sm-3" pill>View</router-link>
            </notification>
          </transition>

          <!-- High CPU temperature -->
          <transition name="notification-transition" appear>
            <notification v-if="isRunningHot" text="Your Raspberry Pi's temperature is too hot">
              <router-link to="/settings#temperature" class="btn btn-sm btn-alert-glass rounded-pill px-3 mr-2 mr-sm-3" pill>View</router-link>
            </notification>
          </transition>

        </div>
      </div>

      <!-- Show suggested apps if no apps are installed  -->
      <transition name="app-drawer-transition" appear>
        <app-suggestions v-if="appStore.length && noAppsInstalled && isOnHome" />
      </transition>

      <!-- App drawer -->
      <transition name="app-drawer-transition" appear>
        <app-drawer v-if="installedApps.length && isOnHome" :isTouchDevice="isTouchDevice" :isMobileDevice="isMobileDevice" />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import WallpaperMenuToggleButton from '@/views/Home/WallpaperMenuToggleButton.vue';
import WallpaperMenu from '@/views/Home/WallpaperMenu.vue';
import Notification from '@/views/Home/Notification.vue';
import AppDrawer from '@/views/Home/AppDrawer.vue';
import AppSuggestions from './AppSuggestions.vue';

export default {
  data() {
    return {
      showWallpaperMenu: false,
      isNotScrolling: true
    };
  },
  props: {
    isOnHome: Boolean,
    isMobileDevice: Boolean,
    isTouchDevice: Boolean,
    isRunningLowOnRam: Boolean,
    isRunningLowOnStorage: Boolean,
    isRunningHot: Boolean
  },
  computed: {
    ...mapState({
      name: state => state.user.name,
      noAppsInstalled: state => state.apps.noAppsInstalled,
      installedApps: (state) => state.apps.installed,
      appStore: state => state.apps.store,
      availableUpdate: state => state.system.availableUpdate,
      ram: (state) => state.system.ram,
      storage: (state) => state.system.storage,
      cpuTemperature: (state) => state.system.cpuTemperature,
    }),
    greeting: () => {
      const currentHour = new Date().getHours();

      const greetingMessage =
        currentHour >= 4 && currentHour < 12 // after 4:00AM and before 12:00PM
          ? "Good morning"
          : currentHour >= 12 && currentHour <= 16 // after 12:00PM and before 4:00PM
          ? "Good afternoon"
          : currentHour > 16 || currentHour < 4 // after 4:00PM or before 4:00AM (to accommodate our fellow hackers)
          ? "Good evening"
          : "Welcome back"; // if for some reason the calculation didn't work

      return greetingMessage;
    },
  },
  methods: {
    onScroll({ target: { scrollTop }}) {
      if (scrollTop < 40) {
        this.isNotScrolling = true;
      } else {
        this.isNotScrolling = false;
      }
    },
    toggleWallpaperMenu() {
      this.showWallpaperMenu = !this.showWallpaperMenu;
    },
    confirmUpdate() {
      this.$store.dispatch("system/confirmUpdate");
    },
  },
  components: {
    WallpaperMenuToggleButton,
    WallpaperMenu,
    Notification,
    AppDrawer,
    AppSuggestions,
  }
};
</script>

<style lang="scss" scoped>
.home-container {
  height: calc(var(--vh100) - 126px);
}
.mobile-view {
  .home-container {
    height: var(--vh100);
    overflow-y: auto;
  }
}
.text-greeting {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1;
  text-shadow: 1px 1px 3px rgb(0 0 0 / 10%);
}
.umbrel-logo {
  width: 100%;
  max-width: 120px;
}

.wallpaper-close-background {
  position: fixed;
  content: "";
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}

.wallpaper-menu-toggle-button-transition-enter-active,
.wallpaper-menu-toggle-button-transition-leave-active {
  transition: opacity 0.2s linear;
}
.wallpaper-menu-toggle-button-transition-enter {
  opacity: 0;
}
.wallpaper-menu-toggle-button-transition-enter-to {
  opacity: 1;
}
.wallpaper-menu-toggle-button-transition-leave {
  opacity: 1;
}
.wallpaper-menu-toggle-button-transition-leave-to {
  opacity: 0;
}

.app-drawer-transition-enter-active,
.app-drawer-transition-leave-active {
  transition: transform 1s, opacity 0.6s ease;
}
.app-drawer-transition-enter {
  transform: scale3d(0.9, 0.9, 0.9);
  opacity: 0;
}
.app-drawer-transition-enter-to {
  transform: scale3d(1, 1, 1);
  opacity: 1;
}
.app-drawer-transition-leave {
  transform: scale3d(1, 1, 1);
  opacity: 1;
}
.app-drawer-transition-leave-to {
  transform: scale3d(0.9, 0.9, 0.9);
  opacity: 0;
}

.notification-transition-enter-active,
.notification-transition-leave-active {
  transition: transform 0.4s, opacity 0.4s ease;
}
.notification-transition-enter {
  transform: scale3d(0.7, 0.7, 0.7);
  opacity: 0;
}
.notification-transition-enter-to {
  transform: scale3d(1, 1, 1);
  opacity: 1;
}
.notification-transition-leave {
  transform: scale3d(1, 1, 1);
  opacity: 1;
}
.notification-transition-leave-to {
  transform: scale3d(0.7, 0.7, 0.7);
  opacity: 0;
}
</style>
