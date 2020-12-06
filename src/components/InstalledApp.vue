<template>
  <div class="mb-4 installed-app d-flex flex-column align-items-center">
    <a class="d-block mb-3 installed-app-link" :href="url" target="_blank"
      ><img
        class="installed-app-icon app-icon"
        :alt="name"
        :src="require(`@/assets/apps/${id}/icon.svg`)"
    /></a>
    <span class="text-center text-truncate mb-1">{{ name }}</span>
    <b-button
      v-if="showUninstallButton"
      variant="outline-danger"
      size="sm"
      @click="uninstall(name, id)"
      ><small><b-icon icon="trash"></b-icon> Uninstall</small></b-button
    >
  </div>
</template>

<script>
import API from "@/helpers/api";

export default {
  props: {
    id: String,
    name: String,
    hiddenService: String,
    port: Number,
    showUninstallButton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    url: function () {
      if (window.location.origin.indexOf(".onion") > 0) {
        return `http://${this.hiddenService}`;
      } else {
        return `http://${window.location.hostname}:${this.port}`;
      }
    },
  },
  methods: {
    async uninstall(name, id) {
      if (
        !window.confirm(
          `Are you sure you want to uninstall ${name}? This is will also delete all of its data.`
        )
      ) {
        return;
      }
      try {
        await API.post(
          `${process.env.VUE_APP_MANAGER_API_URL}/v1/apps/${id}/uninstall`
        );
      } catch (error) {
        if (error.response && error.response.data) {
          this.$bvToast.toast(error.response.data, {
            title: "Error",
            autoHideDelay: 3000,
            variant: "danger",
            solid: true,
            toaster: "b-toaster-bottom-right",
          });
        }
      }
    },
  },
  components: {},
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
