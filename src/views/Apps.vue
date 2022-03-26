<template>
  <div class="sm:p-2">
    <div v-if="installedApps.length">
      <div class="my-3 pb-3">
        <div class="flex justify-between items-center">
          <h1>apps</h1>
          <div>
            <b-button variant="outline-primary" size="sm" @click="toggleEdit">{{
              isEditing ? "Done" : "Edit"
            }}</b-button>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap justify-content-start apps-container">
        <installed-app
          v-for="app in installedApps"
          :key="app.id"
          :id="app.id"
          :name="app.name"
          :port="app.port"
          :path="app.path"
          :hiddenService="app.hiddenService"
          :torOnly="app.torOnly"
          :showUninstallButton="isEditing"
          :isUninstalling="uninstallingApps.includes(app.id)"
        >
        </installed-app>
      </div>
    </div>
    <div v-else>
      <div class="my-3 pb-3">
        <h1>apps</h1>
        <div class="flex flex-col justify-center items-center py-5 lg:mb-12">
          <p class="text-gray-500 mb-2">
            You don't have any apps installed yet
          </p>
          <b-button variant="success" class="px-4" :to="'app-store'"
            >Go to App Store</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import InstalledApp from "@/components/InstalledApp";

export default {
  data() {
    return {
      isEditing: false,
    };
  },
  computed: {
    ...mapState({
      installedApps: (state) => state.apps.installed,
      uninstallingApps: (state) => state.apps.uninstalling,
    }),
  },
  created() {
    this.$store.dispatch("apps/getInstalledApps");
  },
  methods: {
    toggleEdit() {
      this.isEditing = !this.isEditing;
    },
  },
  components: {
    InstalledApp,
  },
};
</script>

<style lang="scss" scoped>
.apps-container {
  column-gap: 2rem;
}
</style>
