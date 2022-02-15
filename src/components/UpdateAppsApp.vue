<template>
    <div>
      <div class="app-list d-flex justify-content-between align-items-center mt-3">
          <div class="d-flex app">
            <div class="d-block">
              <img
                class="app-icon mr-2 mr-lg-3"
                :src="`https://getumbrel.github.io/umbrel-apps-gallery/${app.id}/icon.svg`"
              />
            </div>
            <div class="d-flex justify-content-center flex-column app-info-container">
              <h3 class="app-name font-weight-bolder text-dark mb-1">
                {{ app.name }}
              </h3>
              <p class="text-muted mb-0">
                {{ app.version }}
              </p>
            </div>
            <div class="d-block justify-content-right update-btn-container">
              <b-button variant="success" size="sm" @click="updateApp()" :disabled="isUpdating">{{
                isUpdating ? "Updating..." : "Update"
              }}</b-button>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    app: Object
  },
  data() {
    return {
      isUpdating: false
    };
  },
  computed: {},
  methods: {
    updateApp: function() {
      if(this.isUpdating) return false;

      this.isUpdating = true;

      this.$store.dispatch("apps/update", this.app.id);
    }
  },
  components: {
  }
};
</script>

<style lang="scss" scoped>
.app-list {
  .app {
    width: 100%;
    .app-info-container {
      width: 100%;
    }
    .update-btn-container {
      width: 100px;
      text-align: right;

      .btn {
        margin-top: 26px;
      }
    }
  }
}
</style>
