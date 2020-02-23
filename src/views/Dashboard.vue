<template>
  <authenticated-nav>
    <div class="p-2">
      <div class="my-3 pb-2">
        <h1>welcome back, mayank</h1>
        <p class="text-muted">This is your Umbrel's dashboard.</p>
      </div>
      <b-row>
        <b-col col sm="4">
          <card-widget
            header="Lightning Network"
            status="Running"
            status-type="success"
            title="162,500"
            sub-title="Sats"
            icon="icon-app-lightning.svg"
          ></card-widget>
        </b-col>
        <b-col col sm="4">
          <card-widget
            header="Bitcoin Core"
            status="Running"
            status-type="success"
            title="100%"
            sub-title="Synchronized"
            icon="icon-app-bitcoin.svg"
          >
            <div class="px-4">
              <div class="d-flex w-100 justify-content-between">
                <p class="mb-1">Connected Peers</p>
                <p>8</p>
              </div>
              <p>Latest Blocks</p>
              <b-list-group>
                <b-list-group-item href="#" class="flex-column align-items-start">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1 font-weight-normal">Block 618555</h5>
                    <small class="text-muted">7 mins ago</small>
                  </div>
                  <small class="text-muted">1708 transactions</small>
                </b-list-group-item>
                <b-list-group-item href="#" class="flex-column align-items-start">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1 font-weight-normal">Block 618554</h5>
                    <small class="text-muted">18 mins ago</small>
                  </div>
                  <small class="text-muted">1893 transactions</small>
                </b-list-group-item>
                <b-list-group-item href="#" class="flex-column align-items-start">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1 font-weight-normal">Block 618553</h5>
                    <small class="text-muted">32 mins ago</small>
                  </div>
                  <small class="text-muted">1680 transactions</small>
                </b-list-group-item>
              </b-list-group>
              <div class="px-4 pt-4 pb-3">
                <a href="#" class="card-link">Manage</a>
              </div>
            </div>
          </card-widget>
        </b-col>
      </b-row>
    </div>
  </authenticated-nav>
</template>

<script>
// import Vue from "vue";
import AuthenticatedNav from "@/layouts/AuthenticatedNav";
import CardWidget from "@/components/CardWidget";

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
  components: {
    AuthenticatedNav,
    CardWidget
  }
};
</script>

<style lang="scss" scoped>
.nav-horizontal,
.nav-vertical {
  background: #fff;
}

.nav-vertical {
  // width: 280px;
  height: calc(100vh - 84px);
}

.balance-container {
  border-top: solid 1px #eeeff3;
  border-bottom: solid 1px #eeeff3;
}

.input-search {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  width: 60vw;
  max-width: 600px;
  font-size: 1em;
}
::-webkit-input-placeholder {
  /* Edge */
  color: #c3c6d1;
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #c3c6d1;
}

::placeholder {
  color: #c3c6d1;
}
</style>
