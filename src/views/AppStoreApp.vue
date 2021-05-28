<template>
  <div class="p-sm-2">
    <div class="mt-3 mb-1 mb-sm-3 pb-lg-2">
      <router-link
        to="/app-store"
        class="card-link text-muted d-flex align-items-center mb-4"
        ><svg
          width="7"
          height="13"
          viewBox="0 0 7 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="mr-1"
        >
          <path
            d="M6.74372 11.4153C7.08543 11.7779 7.08543 12.3659 6.74372 12.7285C6.40201 13.0911 5.84799 13.0911 5.50628 12.7285L0.256283 7.15709C-0.0749738 6.80555 -0.0865638 6.23951 0.229991 5.87303L5.04249 0.301606C5.36903 -0.0764332 5.92253 -0.101971 6.27876 0.244565C6.63499 0.591101 6.65905 1.17848 6.33251 1.55652L2.08612 6.47256L6.74372 11.4153Z"
            fill="#C3C6D1"
          />
        </svg>
        Back</router-link
      >
      <div
        class="d-flex flex-column flex-sm-row justify-content-between align-items-center"
      >
        <div class="d-flex w-xs-100 justify-content-start pr-2">
          <div class="d-block">
            <img
              class="app-icon app-icon-lg mr-2 mr-sm-3 align-self-top"
              :src="
                `https://getumbrel.github.io/umbrel-apps-gallery/${app.id}/icon.svg`
              "
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
            variant="primary"
            size="lg"
            class="px-4"
            :href="url"
            target="_blank"
            >Open</b-button
          >
          <div class="mt-2 text-center" v-if="app.defaultPassword">
            <small class="">The default password of this app is</small>
            <input-copy
              size="sm"
              :value="app.defaultPassword"
              class="mt-1"
            ></input-copy>
          </div>
        </div>
        <div class="d-flex flex-column align-items-sm-center w-xs-100" v-else>
          <b-button
            v-if="isInstalling"
            variant="success"
            size="lg"
            class="px-4 fade-in-out"
            disabled
            >Installing...</b-button
          >
          <b-button
            v-else-if="isUninstalling"
            variant="warning"
            size="lg"
            class="px-4 fade-in-out"
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
          <div
            class="mt-2 text-center"
            v-if="isInstalling && app.defaultPassword"
          >
            <small class="">The default password of this app is</small>
            <input-copy
              size="sm"
              :value="app.defaultPassword"
              class="mt-1"
            ></input-copy>
          </div>
        </div>
      </div>
    </div>
    <div class="app-gallery pt-3 pb-4 mb-2 mb-sm-3">
      <img
        v-for="image in app.gallery"
        class="app-gallery-screen mr-3"
        :key="image"
        :src="
          `https://getumbrel.github.io/umbrel-apps-gallery/${app.id}/${image}`
        "
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
            <div class="d-flex justify-content-between mb-3">
              <span>Source Code</span>
              <a :href="app.repo" target="_blank">Open Source</a>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <span>Developer</span>
              <a :href="app.website" target="_blank">{{ app.developer }}</a>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <span>Compatibility</span>
              <span>Compatible</span>
            </div>
            <div class="mb-4">
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

import CardWidget from "@/components/CardWidget";
import InputCopy from "@/components/Utility/InputCopy";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      installedApps: state => state.apps.installed,
      appStore: state => state.apps.store,
      installing: state => state.apps.installing,
      uninstalling: state => state.apps.uninstalling
    }),
    app: function() {
      return this.appStore.find(app => app.id === this.$route.params.id);
    },
    isInstalled: function() {
      const installedAppIndex = this.installedApps.findIndex(
        app => app.id === this.app.id
      );
      return installedAppIndex !== -1;
    },
    isInstalling: function() {
      const index = this.installing.findIndex(appId => appId === this.app.id);
      return index !== -1;
    },
    isUninstalling: function() {
      const index = this.uninstalling.findIndex(appId => appId === this.app.id);
      return index !== -1;
    },
    url: function() {
      if (window.location.origin.indexOf(".onion") > 0) {
        const installedApp = this.installedApps.find(
          app => app.id === this.app.id
        );
        return `http://${installedApp.hiddenService}${this.app.path}`;
      } else {
        return `http://${window.location.hostname}:${this.app.port}${this.app.path}`;
      }
    }
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
    }
  },
  async created() {
    await this.$store.dispatch("apps/getAppStore");
  },
  components: {
    CardWidget,
    InputCopy
  }
};
</script>

<style lang="scss" scoped></style>
