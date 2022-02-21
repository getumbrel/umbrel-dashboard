<template>
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
        <div :class="[(isUpdating) ? 'is-updating' : '', 'd-block justify-content-right update-btn-container']">
          <b-button variant="success" size="sm" @click="updateApp()" :disabled="isUpdating">{{
            isUpdating ? `Updating${".".repeat(updatingDotCount)}` : "Update"
          }}</b-button>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    app: Object
  },
  data() {
    return {
      updatingDotInterval: null,
      updatingDotCount: 3
    };
  },
  computed: {
    ...mapState({
      updating: (state) => state.apps.updating,
    }),
    isUpdating: function() {
      return this.updating.includes(this.app.id);
    }
  },
  methods: {
    updateApp: function() {
      if(this.isUpdating) return false;

      this.animateDots();

      this.$store.dispatch("apps/update", this.app.id);
    },
    animateDots: function() {
      this.updatingDotInterval = window.setInterval(() => {
        this.updatingDotCount = ++this.updatingDotCount % 4;
      }, 500);
    }
  },
  created() {
    if(this.isUpdating)
    {
      this.animateDots();
    }
  },
  unmounted() {
    if(this.updatingDotInterval != null)
    {
      clearInterval(this.updatingDotInterval);
    }
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

      &.is-updating {
        .btn {
          width: 100px;
        }
      }
    }
  }
}
</style>
