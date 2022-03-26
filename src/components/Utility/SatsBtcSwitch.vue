<template>
  <div @click="toggleUnit" class="toggle" :class="`toggle-${size}`">
    <div class="toggle-bg-text justify-center flex items-center">
      <span class="text-center">Sats</span>
      <span class="text-center">BTC</span>
    </div>
    <div
      class="toggle-switch justify-center flex items-center"
      :class="{
        'toggle-left': unit === 'sats',
        'toggle-right': unit === 'btc',
      }"
    >
      <span class="text-gray-500" v-if="unit === 'sats'">Sats</span>
      <span class="text-gray-500" v-else-if="unit === 'btc'">BTC</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String, //sm, md, lg
      default: "md",
    },
  },
  data() {
    return {};
  },
  computed: {
    unit() {
      return this.$store.state.system.unit;
    },
  },
  methods: {
    toggleUnit() {
      if (this.unit === "sats") {
        this.$store.dispatch("system/changeUnit", "btc");
      } else if (this.unit === "btc") {
        this.$store.dispatch("system/changeUnit", "sats");
      }
    },
  },
};
</script>
