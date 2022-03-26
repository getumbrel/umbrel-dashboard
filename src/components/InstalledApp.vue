<template>
  <div class="pb-3 mb-2 installed-app d-flex flex-column align-items-center">
    <a
      :href="url"
      target="_blank"
      class="d-block mb-3 installed-app-link"
      :class="isUninstalling || isOffline ? 'fade-in-out cursor-wait' : ''"
      :disabled="isUninstalling || isOffline"
      v-on:click="openApp($event)"
      ><img
        class="installed-app-icon app-icon"
        :alt="name"
        :src="`https://getumbrel.github.io/umbrel-apps-gallery/${id}/icon.svg`"
      />
    </a>
    <span
      v-if="isUninstalling"
      class="text-center text-small text-muted text-truncate mb-1"
      >Uninstalling...</span
    >
    <span
      v-else-if="isOffline"
      class="text-center text-small text-muted text-truncate mb-1"
      >Starting...</span
    >
    <span v-else class="text-center text-truncate mb-1">{{ name }}</span>
    <b-button
      class="uninstall-btn"
      v-if="showUninstallButton && !isUninstalling"
      variant="outline-danger"
      size="sm"
      @click="uninstall(name, id)"
      ><small><b-icon icon="trash"></b-icon> Uninstall</small></b-button
    >
  </div>
</template>

<script>
import { mapState } from "vuex";

import delay from "@/helpers/delay";

export default {
  props: {
    id: String,
    name: String,
    hiddenService: String,
    port: Number,
    path: String,
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
  },
  data() {
    return {
      isOffline: false,
      checkIfAppIsOffline: true,
    };
  },
  computed: {
    ...mapState({
      installedApps: (state) => state.apps.installed,
    }),
    url: function () {
      if (window.location.origin.indexOf(".onion") > 0) {
        return `http://${this.hiddenService}${this.path}`;
      } else {
        if (this.torOnly) {
          return "#";
        }
        return `http://${window.location.hostname}:${this.port}${this.path}`;
      }
    },
  },
  methods: {
    uninstall(name, appId) {
      if (
        !window.confirm(
          `Are you sure you want to uninstall ${name}? This is will also delete all of its data.`
        )
      ) {
        return;
      }
      this.$store.dispatch("apps/uninstall", appId);
    },
    openApp(event) {
      if (this.torOnly && window.location.origin.indexOf(".onion") < 0) {
        event.preventDefault();
        alert(
          `${this.name} can only be used over Tor. Please access your Umbrel in a Tor browser on your remote access URL (Settings > Tor > Remote Access URL) to open this app.`
        );
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
          await window.fetch(this.url, { mode: "no-cors" });
          this.isOffline = false;
          this.checkIfAppIsOffline = false;
        } catch (error) {
          this.isOffline = true;
        }
        await delay(1000);
      }
    },
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
  width: 200px;
  position: relative;
  .installed-app-link {
    text-decoration: none;
    .installed-app-icon {
      box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5);
    }
  }
  .uninstall-btn {
    position: absolute;
    bottom: 0;
  }
}
</style>
