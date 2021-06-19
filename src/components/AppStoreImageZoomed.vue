<template>
  <component :is="layout" @close-modal="close">
    <img :src="image" :width="width" alt="" />
  </component>
</template>

<script>
import LayoutModal from "@/layouts/Modal";

export default {
  props: {
    image: String
  },
  data() {
    let width = window.innerWidth;
    if (width > window.innerHeight) width /= 1.3;
    return {
      width: width,
      layout: LayoutModal
    };
  },
  methods: {
    close() {
      this.$emit("close-modal");
    },
    resizeHandler(e) {
      let width = e.target.innerWidth;
      if (width > e.target.innerHeight) width /= 1.3;
      this.width = width + "px";
      console.log(e.target.innerWidth);
    }
  },
  created() {
    window.addEventListener("resize", this.resizeHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeHandler);
  },

};
</script>
