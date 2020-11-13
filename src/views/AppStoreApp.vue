<template>
  <div class="p-sm-2">
    <div class="my-3 pb-2">
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
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex justify-content-start">
          <img
            style="height: auto; width: 12vw; max-width: 140px; border-radius: 20px;"
            class="mr-2 mr-sm-3"
            :src="require(`@/assets/apps/${app.id}/icon.svg`)"
          />
          <div>
            <h3 class="d-block font-weight-bold my-1">{{ app.name }}</h3>
            <p class="text-muted">{{ app.tagline }}</p>
            <p>
              <small>{{ app.developer }}</small>
            </p>
          </div>
        </div>
        <b-button
          variant="primary"
          size="lg"
          class="px-4"
          v-if="isInstalled"
          :href="url"
          target="_blank"
          >Open</b-button
        >
        <div class="d-flex flex-column align-items-center" v-else>
          <b-button
            variant="success"
            size="lg"
            class="px-4"
            :class="isInstalling ? 'fade-in-out' : ''"
            @click="installApp"
            :disabled="isInstalling"
            >{{ isInstalling ? "Installing..." : "Install" }}</b-button
          >
          <small
            :style="{ opacity: isInstalling ? 1 : 0 }"
            class="mt-1 d-block text-muted"
            >This may take a few minutes</small
          >
        </div>
      </div>
    </div>
    <div class="gallery pt-3 pb-4 px-4 mb-3">
      <img
        class="gallery-screen mr-3"
        v-for="image in app.gallery"
        :key="image"
        :src="require(`@/assets/apps/${app.id}/gallery/${image}`)"
      />
    </div>
    <b-row>
      <b-col col cols="12" sm="8">
        <card-widget header="About this app">
          <div class="px-3 px-lg-4 pb-4">
            <p class="text-newlines">{{ app.description }}</p>
          </div>
        </card-widget>
      </b-col>
      <b-col col cols="12" sm="4">
        <card-widget header="Information">
          <div class="px-3 px-lg-4 pb-4">
            <div class="d-flex justify-content-between mb-3">
              <span>Version</span>
              <span>{{ app.version }}</span>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <span>Developer</span>
              <span>{{ app.developer }}</span>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <span>Source Code</span>
              <a :href="app.repo" target="_blank">Open Source</a>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <span>Developer Website</span>
              <a :href="app.website" target="_blank">View</a>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <span>Compatibility</span>
              <span>Compatible</span>
            </div>
            <div class="mb-3">
              <span class="d-block mb-3">Requires</span>
              <div
                class="d-flex align-items-center justify-content-between mb-3"
                v-for="dependency in app.dependencies"
                :key="dependency.id"
              >
                <div class="d-flex align-items-center">
                  <img
                    :src="
                      require(`@/assets/app-store/dependencies/${dependency.id}.svg`)
                    "
                    style="width: 50px; height: 50px;"
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
          </div>
        </card-widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

// import API from "@/helpers/api";

import CardWidget from "@/components/CardWidget";

export default {
  data() {
    return {
      isInstalling: false
    };
  },
  computed: {
    ...mapState({
      installedApps: state => state.apps.installed,
      appStore: state => state.apps.store
    }),
    isInstalled: function() {
      const installedAppIndex = this.installedApps.findIndex(
        app => app.id === this.$route.params.id
      );
      return installedAppIndex !== -1;
    },
    url: function() {
      const origin = window.location.origin;
      if (origin.indexOf(".onion") > 0) {
        const installedApp = this.installedApps.find(
          app => app.id === this.$route.params.id
        );
        return `http://${installedApp.hiddenService}`;
      } else {
        return `${origin}/app/${this.app.id}`;
      }
    },
    app: function() {
      return this.appStore.find(app => app.id === this.$route.params.id);
    }
  },
  methods: {
    formatDependency(dependency) {
      let name;
      if (dependency.id === "bitcoind") {
        name = "Bitcoin Core";
      } else if (dependency.id === "lnd") {
        name = "LND";
      } else if (dependency.id === "electrs") {
        name = "Electrs";
      }
      return `${name} v${dependency.version}+`;
    },
    async installApp() {
      this.isInstalling = true;

      // const appId = this.app.id;
      // try {
      //   await API.post(
      //     `${process.env.VUE_APP_MANAGER_API_URL}/v1/apps/install`,
      //     {
      //       id: appId
      //     }
      //   );
      // } catch (error) {
      //   if (error.response && error.response.data) {
      //     this.$bvToast.toast(error.response.data, {
      //       title: "Error",
      //       autoHideDelay: 3000,
      //       variant: "danger",
      //       solid: true,
      //       toaster: "b-toaster-bottom-right"
      //     });
      //   }
      //   this.isInstalling = false;
      //   return;
      // }

      setTimeout(async () => {
        await this.$store.dispatch("apps/installFakeApp", this.app);
        await this.$store.dispatch("apps/getAppStore");
        this.isInstalling = false;
      }, 1000);
    }
  },
  async created() {
    await this.$store.dispatch("apps/getAppStore");
  },
  components: {
    CardWidget
  }
};
</script>

<style lang="scss" scoped>
.gallery {
  display: flex;
  overflow-x: scroll;
  margin-left: -40px;
  margin-right: -40px;
  .gallery-screen {
    height: 350px;
    width: auto;
    display: block;
    box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.8);
    border-radius: 5px;
  }
}
</style>
