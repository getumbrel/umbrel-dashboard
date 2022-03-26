<template>
  <div
    class="d-flex flex-column align-items-center justify-content-center min-vh100 p-2"
  >
    <img
      alt="Umbrel"
      src="@/assets/logo.svg"
      class="mb-5 logo"
      :class="hasShutdown ? 'logo-gray' : ''"
    />
    <span class="text-muted w-75 text-center">
      <small v-if="hasShutdown"
        >Shutdown complete. You can now safely unplug your Umbrel from the power
        and internet.</small
      >
      <small v-else-if="shuttingDown">
        <b-spinner small class="mr-2"></b-spinner>Shutting down...
      </small>
      <small v-else-if="rebooting">
        <b-spinner small class="mr-2"></b-spinner>Rebooting...
      </small>
    </span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  components: {},
  props: {
    hasShutdown: Boolean,
    shuttingDown: Boolean,
    rebooting: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.logo {
  height: 20vh;
  max-height: 200px;
  width: auto;
  transition: filter 0.3s ease;
  &.logo-gray {
    filter: grayscale(100%);
  }
}
</style>
