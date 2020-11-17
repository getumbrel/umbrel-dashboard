<template>
  <div class="p-sm-2">
    <div class="my-3 pb-3">
      <div class="d-flex justify-content-between align-items-center">
        <h1>apps</h1>
      </div>
    </div>
    <div class="d-flex flex-wrap justify-content-start apps-container">
      <installed-app
        v-for="app in apps"
        :key="app.id"
        :id="app.id"
        :name="app.name"
        :hiddenService="app.hiddenService"
      >
      </installed-app>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import InstalledApp from "@/components/InstalledApp";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      apps: state => state.apps.installed
    })
  },
  created() {
    this.$store.dispatch("apps/getInstalledApps");
  },
  watch: {
    apps: function(newApps) {
      if (newApps.length === 0) {
        this.$router.push("/dashboard");
      }
    }
  },
  components: {
    InstalledApp
  }
};
</script>

<style lang="scss" scoped>
.apps-container {
  column-gap: 2rem;
}
</style>
