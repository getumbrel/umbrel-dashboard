<template>
  <svg class="icon" 
      :style="{ width: `${width}px`, height: `${height}px` }" 
      :viewBox="`0 0 ${width} ${height}`">
    <path v-for="(path, index) in svgPaths()" :key="index" :d="path" :fill="color" />
  </svg>
</template>

<script>
import icons from '@/assets/svg-icons.json';

export default {
  name: 'SvgIcon',
  props: {
    name: String,
    color: String,
    width: String,
    height: String
  },
  methods: { 
    svgPaths() {
        return [icons[this.name]].flat();
    }
  },
};
</script>