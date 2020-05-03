<template>
  <div @click="toggleUnit" class="toggle" :class="`toggle-${size}`">
    <div class="toggle-bg-text justify-content-center d-flex align-items-center">
      <span class="text-center">Sats</span>
      <span class="text-center">BTC</span>
    </div>
    <div
      class="toggle-switch justify-content-center d-flex align-items-center"
      :class="{ 'toggle-left': unit === 'sats', 'toggle-right': unit === 'btc' }"
    >
      <span class="text-muted" v-if="unit === 'sats'">Sats</span>
      <span class="text-muted" v-else-if="unit === 'btc'">BTC</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String, //sm, md, lg
      default: "md"
    }
  },
  data() {
    return {};
  },
  computed: {
    unit() {
      return this.$store.state.system.unit;
    }
  },
  methods: {
    toggleUnit() {
      if (this.unit === "sats") {
        this.$store.dispatch("system/changeUnit", "btc");
      } else if (this.unit === "btc") {
        this.$store.dispatch("system/changeUnit", "sats");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.toggle {
  border-radius: 54px;
  width: 120px;
  height: 36px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  cursor: pointer;
  transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  background: linear-gradient(346.78deg, #f7fcfc 0%, #fafcfa 100%);
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: inset 0px 5px 10px rgba(0, 0, 0, 0.1);
  .toggle-switch {
    margin: 2px;
    height: 30px;
    width: 60px;
    border-radius: 30px;
    transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    font-size: 1rem;
    font-weight: 600;
    background: #fff;
    //   color: #fff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    &.toggle-left {
      transform: translateX(0);
    }
    &.toggle-right {
      transform: translateX(54px);
    }
  }
  .toggle-bg-text {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    span {
      width: 60px;
      border-radius: 30px;
      font-size: 1rem;
      font-weight: 600;
      color: #cfd2d4;
    }
  }
  &.toggle-sm {
    width: 80px;
    height: 26px;
    border-radius: 30px;
    .toggle-bg-text {
      span {
        font-size: 0.75rem;
      }
    }
    .toggle-switch {
      margin: 2px;
      height: 20px;
      width: 40px;
      font-size: 0.75rem;
      border-radius: 30px;
      &.toggle-left {
        transform: translateX(0);
      }
      &.toggle-right {
        transform: translateX(34px);
      }
    }
  }
}
</style>
