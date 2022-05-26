<template>
<!-- mb-2 mb-sm-3  -->
  <div class="installed-app d-flex flex-column align-items-center">
    <a
      :href="url"
      target="_blank"
      class="d-block mb-1 mb-sm-2 installed-app-link"
      :class="isUninstalling || isOffline ? 'dim-in-out cursor-wait' : ''"
      :disabled="isUninstalling || isOffline"
      v-on:click="openApp($event)"
      ><img
        class="installed-app-icon app-icon"
        :alt="app.name"
        :src="`https://static.getumbrel.com/umbrel-apps-gallery/${app.id}/icon.svg`"
        draggable="false"
        />
    </a>
    <transition name="grow-transition">
      <span 
        class="btn-uninstall cursor-pointer"
        v-if="showUninstallButton && !isUninstalling"
        @click="confirmUninstall"
      >
        <svg class="" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.41421 0.585786C2.63316 -0.195262 1.36684 -0.195262 0.585786 0.585786C-0.195262 1.36684 -0.195262 2.63316 0.585786 3.41421L5.96528 8.7937L0.585872 14.1731C-0.195177 14.9542 -0.195177 16.2205 0.585872 17.0015C1.36692 17.7826 2.63325 17.7826 3.4143 17.0015L8.7937 11.6221L14.1731 17.0015C14.9542 17.7826 16.2205 17.7826 17.0015 17.0015C17.7826 16.2205 17.7826 14.9542 17.0015 14.1731L11.6221 8.7937L17.0016 3.41421C17.7827 2.63316 17.7827 1.36684 17.0016 0.585786C16.2206 -0.195262 14.9542 -0.195262 14.1732 0.585786L8.7937 5.96528L3.41421 0.585786Z" fill="white" fill-opacity="1"/>
        </svg>
      </span>
    </transition>
    <span v-if="isUninstalling" class="installed-app-title px-1 text-center text-small text-white text-truncate">Uninstalling...</span>
    <span v-else-if="isOffline" class="installed-app-title px-1 text-center text-small text-white text-truncate">Starting...</span>
    <span v-else class="installed-app-title px-1 text-center font-weight-medium text-truncate text-white">{{ app.name }}</span>
  
    <!-- app dependants modal -->
    <b-modal v-if="dependants.length" ref="app-dependants-modal" body-class="pt-1" size="sm" centered hide-footer>
      <template v-slot:modal-header="{ close }">
        <div class="pt-2 d-flex justify-content-between w-100 px-2">
          <span class="font-weight-bol mb-0">{{ app.name }} is being used by</span>
          <!-- Emulate built in modal header close button action -->
          <a href="#" class="align-self-center" v-on:click.stop.prevent="close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6003 4.44197C13.3562 4.19789 12.9605 4.19789 12.7164 4.44197L9.02116 8.1372L5.32596 4.442C5.08188 4.19792 4.68615 4.19792 4.44207 4.442C4.198 4.68607 4.198 5.0818 4.44207 5.32588L8.13728 9.02109L4.44185 12.7165C4.19777 12.9606 4.19777 13.3563 4.44185 13.6004C4.68592 13.8445 5.08165 13.8445 5.32573 13.6004L9.02116 9.90497L12.7166 13.6004C12.9607 13.8445 13.3564 13.8445 13.6005 13.6004C13.8446 13.3563 13.8446 12.9606 13.6005 12.7165L9.90505 9.02109L13.6003 5.32585C13.8444 5.08178 13.8444 4.68605 13.6003 4.44197Z" fill="#6c757d"/>
            </svg>
          </a>
        </div>
      </template>
      <template #default="{ hide }">
        <div class="px-2">
          <div
            class="d-flex align-items-center justify-content-between mb-2"
            v-for="dependant in dependants"
            :key="dependant.id"
          >
            <div class="d-flex align-items-center">
              <img
                :src="`https://static.getumbrel.com/umbrel-apps-gallery/${dependant.id}/icon.svg`"
                class="mr-2 app-icon app-icon-xs"
              />
              <span class="">{{ dependant.name }}</span>
            </div>
          </div>
          <small class="text-muted" style="line-height: 1;">Uninstall {{dependants.length > 1 ? 'these apps' : dependants[0]['name']}} first to uninstall {{ app.name }}</small>
          <b-button
            variant="success"
            class="my-2"
            block
            @click="hide"
          >
            Ok
          </b-button>
        </div>
      </template>
    </b-modal>

    <!-- uninstall confirmation modal -->
    <b-modal v-if="showUninstallConfirmation" ref="uninstall-modal" body-class="pt-1" size="sm" centered hide-footer v-model="showUninstallConfirmation">
      <template v-slot:modal-header="{ close }">
        <div class="pt-2 d-flex justify-content-between  w-100 px-2">
          <span class="font-weight-bold mb-0">Uninstall {{ app.name }}?</span>
          <!-- Emulate built in modal header close button action -->
          <a href="#" class="align-self-center" v-on:click.stop.prevent="close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6003 4.44197C13.3562 4.19789 12.9605 4.19789 12.7164 4.44197L9.02116 8.1372L5.32596 4.442C5.08188 4.19792 4.68615 4.19792 4.44207 4.442C4.198 4.68607 4.198 5.0818 4.44207 5.32588L8.13728 9.02109L4.44185 12.7165C4.19777 12.9606 4.19777 13.3563 4.44185 13.6004C4.68592 13.8445 5.08165 13.8445 5.32573 13.6004L9.02116 9.90497L12.7166 13.6004C12.9607 13.8445 13.3564 13.8445 13.6005 13.6004C13.8446 13.3563 13.8446 12.9606 13.6005 12.7165L9.90505 9.02109L13.6003 5.32585C13.8444 5.08178 13.8444 4.68605 13.6003 4.44197Z" fill="#6c757d"/>
            </svg>
          </a>
        </div>
      </template>
      <template #default="{ close }">
        <div class="px-2">
          This will also delete its data.
          <div class="mt-3 mb-2 d-flex flex-wra">
            <b-button
              variant="outline-primary"
              class="mr-1 w-100"
              @click="close"
            >
              Cancel
            </b-button>
            <b-button
              variant="danger"
              class="ml-1 w-100"
              @click="uninstall"
            >
              Uninstall
            </b-button>
          </div>
        </div>
      </template>
    </b-modal>

  </div>
</template>

<script>
import { mapState } from "vuex";

import delay from "@/helpers/delay";

export default {
  props: {
    app: Object,
    showUninstallButton: {
      type: Boolean,
      default: false,
    },
    isUninstalling: {
      type: Boolean,
      default: false,
    },
    torOnly: {
      type: Boolean,
      default: false,
    },
    dependencies: Array
  },
  data() {
    return {
      isOffline: false,
      checkIfAppIsOffline: true,
      showUninstallConfirmation: false
    };
  },
  computed: {
    ...mapState({
      installedApps: (state) => state.apps.installed
    }),
    url: function () {
      if (window.location.origin.indexOf(".onion") > 0) {
        return `http://${this.app.hiddenService}${this.app.path}`;
      } else {
        if (this.torOnly) {
          return "#";
        }
        return `http://${window.location.hostname}:${this.app.port}${this.app.path}`;
      }
    },
    dependants: function() {
      return this.installedApps.filter(app => app.dependencies.includes(this.app.id));
    }
  },
  methods: {
    confirmUninstall() {
      if (this.dependants.length) {
        return this.$refs['app-dependants-modal'].show();
      }
      return this.showUninstallConfirmation = true;
    },
    uninstall() {
      this.$store.dispatch("apps/uninstall", this.app.id);
      this.showUninstallConfirmation = false;
    },
    openApp(event) {
      if (this.torOnly && window.location.origin.indexOf(".onion") < 0) {
        event.preventDefault();
        alert(`${this.app.name} can only be used over Tor. Please access your Umbrel in a Tor browser on your remote access URL (Settings > Account > Remote access) to open this app.`);
        return;
      }
      if (this.isUninstalling || this.isOffline) {
        event.preventDefault();
        return;
      }
      return;
    },
    async pollOfflineApp() {
      this.checkIfAppIsOffline = true;
      while (this.checkIfAppIsOffline) {
        try {
          await window.fetch(this.url, {mode: "no-cors" });
          this.isOffline = false;
          this.checkIfAppIsOffline = false;
        } catch (error) {
          this.isOffline = true;
        }
        await delay(1000);
      }
    }
  },
  created() {
    this.pollOfflineApp();
  },
  beforeDestroy() {
    this.checkIfAppIsOffline = false;
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.installed-app {
  width: var(--app-width, 140px);
  height: 140px;
  position: relative;
  .installed-app-link {
    text-decoration: none;
    .installed-app-icon {
      border: none;
      width: 72px;
      height: 72px;
      border-radius: 18px;
      box-shadow: 1px 2px 14px rgba(0, 0, 0, 0.20);
      transition: transform 0.2s ease;
    }
    &:hover {
      .installed-app-icon {
        transform: scale3d(1.03, 1.03, 1.03);
      }
    }
    &:active {
      .installed-app-icon {
        filter: brightness(0.5)
      }
    }
  }
  .installed-app-title {
    text-shadow: 1px 1px 3px rgb(0 0 0 / 30%);
  }
  .btn-uninstall {
    position: absolute;
    top: -7px;
    right: 26px;
    height: 26px;
    width: 26px;
    background: #FF4E4E;
    border-radius: 50%;
    box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.4s, opacity 0.4s ease;
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      height: 10px;
      width: 10px;
      transform: translate3d(-50%, -50%, 0);
    }
    &:hover {
      transform: scale3d(1.1, 1.1, 1.1);
    }
  }
}

.dim-in-out {
  animation: dim-in-out 1s infinite linear;
}
@keyframes dim-in-out {
  0%,
  100% {
      filter: brightness(0.6);
  }
  50% {
      filter: brightness(0.4);
  }
}

</style>
