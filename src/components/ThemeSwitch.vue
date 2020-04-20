<template>
  <div
    @click="toggleDarkMode"
    class="toggle"
    :class="{ 'light-toggle': !isDarkMode, 'dark-toggle': isDarkMode }"
  >
    <div
      class="toggle-switch justify-content-center d-flex"
      :class="{ 'toggle-left': !isDarkMode, 'toggle-right': isDarkMode }"
    >
      <img class="align-center" v-if="!isDarkMode" src="@/assets/sun.svg" />
      <img class="align-center" v-if="isDarkMode" src="@/assets/moon.svg" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ThemeSwitch",
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    }
  },
  methods: {
    toggleDarkMode() {
      this.$store.commit("toggleDarkMode");
    }
  }
};
</script>

<style scoped lang="scss">
.toggle {
  border-radius: 54px;
  width: 130px;
  box-sizing: border-box;
  display: flex;
  cursor: pointer;
  transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.light-toggle {
  background: linear-gradient(346.78deg, #f7fcfc 0%, #fafcfa 100%);
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: inset 0px 5px 10px rgba(0, 0, 0, 0.1);
}
.dark-toggle {
  background: #2a3244;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: inset 0px 5px 10px rgba(255, 255, 255, 0.05);
}
.toggle-switch {
  margin: 2px;
  height: 65px;
  width: 65px;
  border-radius: 65px;
  transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.toggle-left {
  transform: translateX(0);
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
.toggle-right {
  transform: translateX(60px);
  background: #1c1c26;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
