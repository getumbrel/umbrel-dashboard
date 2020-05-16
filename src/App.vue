<template>
  <div id="app">
    <!-- component matched by the route will render here -->

    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import "@/global-styles/design-system.scss";
</style>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {},
  methods: {
    //to do: move this to the specific layout that needs this 100vh fix
    updateViewPortHeightCSS() {
      return document.documentElement.style.setProperty(
        "--vh100",
        `${window.innerHeight}px`
      );
    }
  },
  created() {
    this.updateViewPortHeightCSS();
    //for 100vh consistency
    window.addEventListener("resize", this.updateViewPortHeightCSS);
  },
  mounted() {
    const isDarkMode = this.$store.getters.isDarkMode;
    //onboarding
    // document.body.style.background = isDarkMode ? "#1C1C26" : "#ffffff";
    //dashboard
    // document.body.style.background = isDarkMode ? "#1C1C26" : "#F7F9FB";
    document.body.style.background = isDarkMode ? "#F7F9FB" : "#F7F9FB";
  },
  watch: {},
  beforeDestroy() {
    window.removeEventListener("resize", this.updateViewPortHeightCSS);
    window.clearInterval(this.polling);
  },
  components: {}
};
</script>

<style lang="scss" scoped>
</style>
