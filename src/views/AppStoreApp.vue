<template>
  <div class="p-sm-2">
    <div class="mt-3 mb-1 mb-sm-3 pb-lg-2">
      <router-link
        to="/app-store"
        class="card-link text-muted d-flex align-items-center mb-4"
        >
        <svg-icon class="mr-1" name="left-caret" color="#C3C6D1" width="7" height="13" />
        Back</router-link
      >
      <div
        class="d-flex flex-column flex-sm-row justify-content-between align-items-center"
      >
        <div class="d-flex w-xs-100 justify-content-start pr-2">
          <div class="d-block">
            <img
              class="app-icon app-icon-lg mr-2 mr-sm-3 align-self-top"
              :src="`https://getumbrel.github.io/umbrel-apps-gallery/${app.id}/icon.svg`"
            />
          </div>
          <div>
            <h3 class="d-block font-weight-bold mb-1">
              {{ app.name }}
            </h3>
            <p class="text-muted">{{ app.tagline }}</p>
            <p>
              <small>{{ app.developer }}</small>
            </p>
          </div>
        </div>
        <div
          class="w-xs-100 d-flex flex-column align-items-sm-center"
          v-if="isInstalled && !isUninstalling"
        >
          <b-button
            v-if="isOffline"
            variant="success"
            size="lg"
            class="px-4 fade-in-out cursor-wait"
            disabled
            >Starting...</b-button
          >
          <b-button
            v-else
            variant="primary"
            size="lg"
            class="px-4"
            :href="url"
            target="_blank"
            v-on:click="openApp($event)"
            >Open</b-button
          >
          <div class="mt-2 text-center d-flex justify-content-center" v-if="app.defaultPassword">
            <div class="text-left mr-2" v-if="app.defaultUsername">
              <small class="">Default app username</small>
              <input-copy
                width="140px"
                size="sm"
                :value="app.defaultUsername"
                class="mt-1"
              ></input-copy>
            </div>
            <div :class="app.defaultUsername ? 'text-left': ''">
              <small class="">Default app password</small>
              <input-copy
                :width="app.defaultUsername ? '140px' : 'auto'"
                size="sm"
                :value="app.defaultPassword"
                class="mt-1"
              ></input-copy>
            </div>
          </div>
        </div>
        <div class="d-flex flex-column align-items-sm-center w-xs-100" v-else>
          <b-button
            v-if="isInstalling"
            variant="success"
            size="lg"
            class="px-4 fade-in-out cursor-wait"
            disabled
            >Installing...</b-button
          >
          <b-button
            v-else-if="isUninstalling"
            variant="warning"
            size="lg"
            class="px-4 fade-in-out cursor-wait"
            disabled
            >Uninstalling...</b-button
          >
          <b-button
            v-else
            variant="success"
            size="lg"
            class="px-4"
            @click="installApp"
            >Install</b-button
          >
          <small
            :style="{ opacity: isInstalling || isUninstalling ? 1 : 0 }"
            class="mt-1 d-block text-muted text-center"
            >This may take a few minutes</small
          >
          <div class="mt-2 text-center d-flex justify-content-center" v-if="isInstalling && app.defaultPassword">
            <div class="text-left mr-2" v-if="app.defaultUsername">
              <small class="">Default app username</small>
              <input-copy
                width="140px"
                size="sm"
                :value="app.defaultUsername"
                class="mt-1"
              ></input-copy>
            </div>
            <div :class="app.defaultUsername ? 'text-left': ''">
              <small class="">Default app password</small>
              <input-copy
                :width="app.defaultUsername ? '140px' : 'auto'"
                size="sm"
                :value="app.defaultPassword"
                class="mt-1"
              ></input-copy>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="app-gallery pt-3 pb-4 mb-2 mb-sm-3">
      <img
        v-for="image in app.gallery"
        class="app-gallery-screen mr-3"
        :key="image"
        :src="`https://getumbrel.github.io/umbrel-apps-gallery/${app.id}/${image}`"
      />
      <div class="d-block" style="padding: 1px"></div>
    </div>
    <b-row>
      <b-col col cols="12" lg="6" xl="8">
        <card-widget header="About this app">
          <div class="px-3 px-lg-4 pb-4">
            <p class="text-newlines">{{ app.description }}</p>
          </div>
        </card-widget>
      </b-col>
      <b-col col cols="12" lg="6" xl="4">
        <card-widget header="Information">
          <div class="px-3 px-lg-4 pb-4">
            <div class="d-flex justify-content-between mb-3">
              <span>Version</span>
              <span>{{ app.version }}</span>
            </div>
            <div class="d-flex justify-content-between mb-3" v-if="app.repo">
              <span>Source Code</span>
              <a :href="app.repo" target="_blank">Public</a>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <span>Developer</span>
              <a :href="app.website" target="_blank">{{ app.developer }}</a>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <span>Compatibility</span>
              <span>Compatible</span>
            </div>
            <div class="mb-4" v-if="app.dependencies.length">
              <span class="d-block mb-3">Requires</span>
              <div
                class="d-flex align-items-center justify-content-between mb-3"
                v-for="dependency in app.dependencies"
                :key="dependency"
              >
                <div class="d-flex align-items-center">
                  <img
                    :src="
                      require(`@/assets/app-store/dependencies/${dependency}.svg`)
                    "
                    style="width: 50px; height: 50px"
                    class="mr-2"
                  />
                  <span class="text-muted my-0">{{
                    formatDependency(dependency)
                  }}</span>
                </div>
                <div>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.3035 10.7643C19.5718 10.4486 20.0451 10.4103 20.3607 10.6785C20.6763 10.9468 20.7147 11.4201 20.4464 11.7357L14.0714 19.2357C13.799 19.5563 13.3162 19.5901 13.0017 19.3105L9.62671 16.3105C9.31712 16.0354 9.28924 15.5613 9.56443 15.2517C9.83962 14.9421 10.3137 14.9142 10.6233 15.1894L13.4251 17.68L19.3035 10.7643Z"
                      fill="#00CD98"
                    />
                  </svg>
                  <small class="text-success">Installed</small>
                </div>
              </div>
            </div>
            <b-link
              :href="app.support"
              target="_blank"
              size="sm"
              class="mb-2 py-1"
              block
              >Get support</b-link
            >
          </div>
        </card-widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

import delay from "@/helpers/delay";

import CardWidget from "@/components/CardWidget";
import InputCopy from "@/components/Utility/InputCopy";
import SvgIcon from '@/components/Utility/SvgIcon.vue';

export default {
  data() {
    return {
      isOffline: false,
      checkIfAppIsOffline: true
    };
  },
  computed: {
    ...mapState({
      installedApps: (state) => state.apps.installed,
      appStore: (state) => state.apps.store,
      installing: (state) => state.apps.installing,
      uninstalling: (state) => state.apps.uninstalling,
    }),
    app: function () {
      return this.appStore.find((app) => app.id === this.$route.params.id);
    },
    isInstalled: function () {
      const installedAppIndex = this.installedApps.findIndex(
        (app) => app.id === this.app.id
      );
      return installedAppIndex !== -1;
    },
    isInstalling: function () {
      const index = this.installing.findIndex((appId) => appId === this.app.id);
      return index !== -1;
    },
    isUninstalling: function () {
      const index = this.uninstalling.findIndex(
        (appId) => appId === this.app.id
      );
      return index !== -1;
    },
    url: function () {
      if (window.location.origin.indexOf(".onion") > 0) {
        const installedApp = this.installedApps.find(
          (app) => app.id === this.app.id
        );
        return `http://${installedApp.hiddenService}${this.app.path}`;
      } else {
        if (this.app.torOnly) {
          return "#";
        }
        return `http://${window.location.hostname}:${this.app.port}${this.app.path}`;
      }
    },
  },
  methods: {
    formatDependency(dependency) {
      let name;
      if (dependency === "bitcoind") {
        name = "Bitcoin Core";
      } else if (dependency === "lnd") {
        name = "LND";
      } else if (dependency === "electrum") {
        name = "Electrum Server";
      }
      return name;
    },
    installApp() {
      this.$store.dispatch("apps/install", this.app.id);
      this.isOffline = true;
      this.pollOfflineApp();
    },
    openApp(event) {
      if (this.app.torOnly && window.location.origin.indexOf(".onion") < 0) {
        event.preventDefault();
        alert(`${this.app.name} can only be used over Tor. Please access your Umbrel in a Tor browser on your remote access URL (Settings > Tor > Remote Access URL) to open this app.`);
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
  async created() {
    await this.$store.dispatch("apps/getAppStore");
    if (this.isInstalled) {
      this.pollOfflineApp();
    }
  },
  beforeDestroy() {
    this.checkIfAppIsOffline = false;
  },
  components: {
    CardWidget,
    InputCopy,
    SvgIcon
  },
};
</script>

<style lang="scss" scoped>
</style>
