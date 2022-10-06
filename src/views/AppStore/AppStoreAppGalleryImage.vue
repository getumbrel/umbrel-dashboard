<template>
  <div
    class="app-gallery-image-container mx-2"
  >
    <img
      class="app-gallery-image-preloader"
      :class="!imageLoaded ? 'loading' : ''"
      :src="`https://getumbrel.github.io/umbrel-apps-gallery/${appId}/icon.svg`"
    />
    <img
      :class="!imageLoaded ? 'loading' : ''"
      class="app-gallery-image"
      :src="`https://getumbrel.github.io/umbrel-apps-gallery/${appId}/${image}`"
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
