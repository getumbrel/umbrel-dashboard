<template>
  <div class="p-2">
    <div class="my-3 pb-2">
      <h1>bitcoin</h1>
      <p class="text-muted">🛠 Under heavy development</p>
    </div>
    <b-row>
      <b-col col cols="12" md="6" xl="4">
        <card-widget
          header="Bitcoin Core"
          status="Running"
          status-type="success"
          title="100%"
          sub-title="Synchronized"
          icon="icon-app-bitcoin.svg"
        >
          <div class>
            <!-- <div class="d-flex w-100 justify-content-between px-4">
                <p class="mb-1">Connected Peers</p>
                <p>8</p>
            </div>-->
            <!-- <p class="px-4">Latest Blocks</p> -->
            <blockchain></blockchain>
            <div class="px-4 py-3">
              <a href="#" class="card-link">Manage</a>
            </div>
          </div>
        </card-widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// import Vue from "vue";
import CardWidget from "@/components/CardWidget";
import Blockchain from "@/components/Blockchain";

export default {
  data() {
    return {};
  },
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    }
  },
  methods: {},
  mounted() {
    // disable dark mode on dashboard
    if (this.$store.getters.isDarkMode) {
      this.$store.commit("toggleDarkMode");
    }
  },
  components: {
    CardWidget,
    Blockchain
  }
};
</script>

<style lang="scss" scoped>
</style>
