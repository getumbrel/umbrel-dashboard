<template>
  <div class="channel-bar" :style="{background: getChannelBarGradient(local, remote)}"></div>
</template>

<script>
export default {
  computed: {},
  data() {
    return {};
  },
  methods: {
    getChannelBarGradient(leftValue, rightValue) {
      const leftPercent = Math.round(
        (leftValue * 100) / (leftValue + rightValue)
      );
      if (leftPercent === 100) {
        return `#5351FB`;
      }
      if (leftPercent === 0) {
        return `#00CD98`;
      }
      return `linear-gradient(90deg, #5351FB 0%, #5351FB ${leftPercent -
        7}%, #00CD98 ${leftPercent + 7}%, #00CD98 100%)`;
    }
  },
  props: {
    local: Number,
    remote: Number
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.channel-bar {
  height: 4px;
  border-radius: 4px;
}
</style>
