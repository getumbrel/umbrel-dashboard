<template>
  <div class="d-flex flex-column align-items-center justify-content-center min-vh100 p-2">
    <img alt="Umbrel" src="@/assets/logo.svg" class="mb-5 logo-loading" draggable="false" />

    <!-- <b-spinner class="my-4" variant="primary"></b-spinner> -->
    <b-progress
      :value="progress"
      class="mb-2 w-25 loading-progress"
      variant="light"
      :style="{ height: '4px' }"
    ></b-progress>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: { progress: Number },
  created() {},
  methods: {},
  components: {}
};
</script>

<style lang="scss" scoped>
.logo-loading {
  height: 18vh;
  max-height: 200px;
  width: auto;
}
.progress {
  background-color: rgba(255, 255, 255, 0.4) !important; 
}
.loading-progress {
  min-width: 260px;
}
</style>
