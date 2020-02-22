<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/global-styles/design-system.scss";
</style>

<script>
export default {
  name: "App",
  mounted() {
    const isDarkMode = this.$store.getters.isDarkMode;
    //onboarding
    // document.body.style.background = isDarkMode ? "#1C1C26" : "#ffffff";
    //dashboard
    document.body.style.background = isDarkMode ? "#1C1C26" : "#F7F9FB";
  }
};
</script>