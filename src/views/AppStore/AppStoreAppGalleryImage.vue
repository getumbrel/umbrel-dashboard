<template>
  <div
    class="app-gallery-image-container mx-2"
  >
    <img
      class="app-gallery-image-preloader"
      :src="`https://static.getumbrel.com/umbrel-apps-gallery/${appId}/icon.svg`"
    />
    <img
      :class="!this.imageLoaded ? 'loading' : ''"
      class="app-gallery-image"
      :src="`https://static.getumbrel.com/umbrel-apps-gallery/${appId}/${image}`"
      @load="onGalleryImageLoad"
    />
  </div>
</template>

<script>
export default {
  props: {
    appId: String,
    image: String,
  },
  data() {
    return {
      imageLoaded: false
    };
  },
  methods: {
    onGalleryImageLoad() {
      this.imageLoaded = true;
    }
  },
  components: {},
};
</script>

<style lang="scss" scoped></style>
