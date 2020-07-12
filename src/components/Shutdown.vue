<template>
  <div class="d-flex flex-column align-items-center justify-content-center min-vh100 p-2">
    <img alt="Umbrel" src="@/assets/logo.svg" class="mb-5 logo" />

    <span class="text-muted w-75 text-center">
      <small>Shutdown complete. You can close this window now.</small>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  components: {}
};
</script>

<style lang="scss" scoped>
.logo {
  height: 20vh;
  max-height: 200px;
  width: auto;
  filter: grayscale(100%);
}
</style>
