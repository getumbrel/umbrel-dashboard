<template>
  <card-widget :header="`Here's how to connect ${name} to your Umbrel`">
    <div class="px-3 px-lg-4 pb-3">
      <slot></slot>
    </div>
  </card-widget>
</template>

<script>
import CardWidget from "@/components/CardWidget";

export default {
  data() {
    return {};
  },
  props: {
    name: String
  },
  computed: {},
  methods: {},
  components: {
    CardWidget
  }
};
</script>

<style lang="scss" scoped></style>