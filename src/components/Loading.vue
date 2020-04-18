<template>
  <div class="d-flex flex-column align-items-center justify-content-center min-vh100 p-2">
    <img alt="Umbrel" src="@/assets/logo.svg" class="mb-2 logo" />

    <!-- <h1 class="text-center mb-2">loading</h1> -->
    <b-spinner class="my-4" variant="primary"></b-spinner>
    <p class="text-muted w-75 text-center">{{ text }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: { text: String },
  created() {},
  methods: {},
  components: {}
};
</script>

<style lang="scss">
.logo {
  height: 20vh;
  max-height: 200px;
  width: auto;
}
</style>
