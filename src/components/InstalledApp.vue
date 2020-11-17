<template>
  <div class="mb-4 installed-app d-flex flex-column align-items-center">
    <a class="d-block mb-3 installed-app-link" :href="url" target="_blank"
      ><img
        class="installed-app-icon app-icon"
        :alt="name"
        :src="require(`@/assets/apps/${id}/icon.svg`)"
    /></a>
    <span class="text-center text-truncate mb-1">{{ name }}</span>
    <!-- <status variant="success">Running</status> -->
    <b-button variant="outline-danger" size="sm" @click="uninstall(name, id)"
      ><small><b-icon icon="trash"></b-icon> Uninstall</small></b-button
    >
  </div>
</template>

<script>
// import Status from "@/components/Utility/Status";

export default {
  props: {
    id: String,
    name: String,
    hiddenService: String
  },
  data() {
    return {};
  },
  computed: {
    url: function() {
      const origin = window.location.origin;
      if (origin.indexOf(".onion") > 0) {
        return `http://${this.hiddenService}`;
      } else {
        return `${origin}/app/${this.id}`;
      }
    }
  },
  methods: {
    uninstall(name, id) {
      if (
        window.confirm(
          `Are you sure you want to uninstall ${name}? This is will also delete all of its data.`
        )
      ) {
        this.$store.dispatch("apps/uninstallFakeApp", id);
      }
    }
  },
  components: {
    // Status
  }
};
</script>

<style lang="scss" scoped>
.installed-app {
  width: 200px;
  .installed-app-link {
    text-decoration: none;
    .installed-app-icon {
      box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5);
    }
  }
}
</style>
