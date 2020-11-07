<template>
  <div class="mr-2 mb-4 installed-app d-flex flex-column align-items-center">
    <a class="d-block mb-3 installed-app-link" :href="url"
      ><img
        class="installed-app-icon"
        :alt="name"
        :src="require(`@/assets/apps/${id}/icon.svg`)"
    /></a>
    <span class="text-center mb-1">{{ name }}</span>
    <!-- <status variant="success">Running</status> -->
  </div>
</template>

<script>
// import Status from "@/components/Utility/Status";

export default {
  props: {
    id: String,
    name: String,
    hiddenService: String
  },
  data() {
    return {};
  },
  computed: {
    url: function() {
      const origin = window.location.origin;
      if (origin.indexOf(".onion") > 0) {
        return this.hiddenService;
      } else {
        return `${origin}/app/${this.id}`;
      }
    }
  },
  methods: {},
  components: {
    // Status
  }
};
</script>

<style lang="scss" scoped>
.installed-app {
  width: 200px;
  .installed-app-link {
    width: 100px;
    height: 100px;
    text-decoration: none;
    .installed-app-icon {
      width: 100px;
      height: 100px;
      border-radius: 18px;
      box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5);
    }
  }
}
</style>
