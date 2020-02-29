<template>
  <authenticated-nav>
    <div class="p-2">
      <div class="my-3 pb-2">
        <h1>welcome back, satoshi</h1>
        <p class="text-muted">This is your Umbrel's dashboard</p>
      </div>
      <b-row>
        <b-col col sm="4">
          <card-widget
            header="Lightning Wallet"
            status="Running"
            status-type="success"
            title="162,500"
            sub-title="Sats"
            icon="icon-app-lightning.svg"
          >
            <b-list-group>
              <b-list-group-item href="#" class="flex-column align-items-start px-4">
                <div class="d-flex w-100 justify-content-between">
                  <h6 class="mb-0 font-weight-normal">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.5944 6.04611C13.6001 5.73904 13.3493 5.48755 13.0369 5.48712C12.7351 5.4867 12.4836 5.7375 12.4836 6.03895L12.4758 11.6999L4.94598 3.83615C4.72819 3.61848 4.16402 3.62477 3.94599 3.8422C3.72796 4.05963 3.73466 4.62433 3.95209 4.84236L11.6871 12.4864L6.03143 12.4733C5.72435 12.4782 5.47251 12.7293 5.47244 13.0308C5.47201 13.3431 5.72317 13.595 6.0299 13.5898L13.031 13.5994C13.3381 13.6051 13.5896 13.3543 13.5844 13.0476L13.5944 6.04611Z"
                        fill="#00CD98"
                      />
                    </svg>
                    <span style="margin-left: 6px;">Tips from Reddit</span>
                  </h6>
                  <span class="font-weight-bold">+125,000</span>
                </div>
                <small class="text-muted mt-0" style="margin-left: 24px;">6 mins ago</small>
              </b-list-group-item>
              <b-list-group-item href="#" class="flex-column align-items-start px-4">
                <div class="d-flex w-100 justify-content-between">
                  <h6 class="mb-0 font-weight-normal">
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.06802 4.71946C6.76099 4.71224 6.50825 4.96178 6.50627 5.27413C6.50435 5.57592 6.7539 5.82865 7.05534 5.83022L12.7162 5.86616L4.81508 13.3568C4.59632 13.5735 4.59981 14.1376 4.81615 14.3568C5.03249 14.5759 5.59723 14.572 5.81634 14.3556L13.4988 6.6587L13.4576 12.3143C13.4609 12.6214 13.7108 12.8745 14.0122 12.876C14.3246 12.878 14.5777 12.6281 14.574 12.3214L14.6184 5.32036C14.6257 5.01333 14.3761 4.76059 14.0694 4.76427L7.06802 4.71946Z"
                        fill="#5351FB"
                      />
                    </svg>

                    <span style="margin-left: 6px;">Blockstream Satellite</span>
                  </h6>
                  <span class="font-weight-bold">-37</span>
                </div>
                <small class="text-muted mt-0" style="margin-left: 24px;">2 hrs ago</small>
              </b-list-group-item>
              <b-list-group-item href="#" class="flex-column align-items-start px-4">
                <div class="d-flex w-100 justify-content-between">
                  <h6 class="mb-0 font-weight-normal">
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.06802 4.71946C6.76099 4.71224 6.50825 4.96178 6.50627 5.27413C6.50435 5.57592 6.7539 5.82865 7.05534 5.83022L12.7162 5.86616L4.81508 13.3568C4.59632 13.5735 4.59981 14.1376 4.81615 14.3568C5.03249 14.5759 5.59723 14.572 5.81634 14.3556L13.4988 6.6587L13.4576 12.3143C13.4609 12.6214 13.7108 12.8745 14.0122 12.876C14.3246 12.878 14.5777 12.6281 14.574 12.3214L14.6184 5.32036C14.6257 5.01333 14.3761 4.76059 14.0694 4.76427L7.06802 4.71946Z"
                        fill="#5351FB"
                      />
                    </svg>

                    <span style="margin-left: 6px;">Michael Shwebz</span>
                  </h6>
                  <span class="font-weight-bold">-1,302,532</span>
                </div>
                <small class="text-muted mt-0" style="margin-left: 24px;">1 day ago</small>
              </b-list-group-item>
            </b-list-group>
            <!-- <div class="px-4 py-2">
              <a href="#" class="card-link">View all transactions</a>
            </div>-->
            <div class="px-4 pt-2 pb-3">
              <a href="#" class="card-link">Manage</a>
            </div>
            <div class>
              <b-button-group class="w-100">
                <b-button
                  class="w-50"
                  variant="primary"
                  style="border-radius: 0; border-bottom-left-radius: 1rem; padding-top: 1rem; padding-bottom: 1rem;"
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-1"
                  >
                    <path
                      d="M7.06802 4.71946C6.76099 4.71224 6.50825 4.96178 6.50627 5.27413C6.50435 5.57592 6.7539 5.82865 7.05534 5.83022L12.7162 5.86616L4.81508 13.3568C4.59632 13.5735 4.59981 14.1376 4.81615 14.3568C5.03249 14.5759 5.59723 14.572 5.81634 14.3556L13.4988 6.6587L13.4576 12.3143C13.4609 12.6214 13.7108 12.8745 14.0122 12.876C14.3246 12.878 14.5777 12.6281 14.574 12.3214L14.6184 5.32036C14.6257 5.01333 14.3761 4.76059 14.0694 4.76427L7.06802 4.71946Z"
                      fill="#FFFFFF"
                    />
                  </svg>Send
                </b-button>
                <b-button
                  class="w-50"
                  variant="success"
                  style="border-radius: 0; border-bottom-right-radius: 1rem; padding-top: 1rem; padding-bottom: 1rem;"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-1"
                  >
                    <path
                      d="M13.5944 6.04611C13.6001 5.73904 13.3493 5.48755 13.0369 5.48712C12.7351 5.4867 12.4836 5.7375 12.4836 6.03895L12.4758 11.6999L4.94598 3.83615C4.72819 3.61848 4.16402 3.62477 3.94599 3.8422C3.72796 4.05963 3.73466 4.62433 3.95209 4.84236L11.6871 12.4864L6.03143 12.4733C5.72435 12.4782 5.47251 12.7293 5.47244 13.0308C5.47201 13.3431 5.72317 13.595 6.0299 13.5898L13.031 13.5994C13.3381 13.6051 13.5896 13.3543 13.5844 13.0476L13.5944 6.04611Z"
                      fill="#FFFFFF"
                    />
                  </svg>Receive
                </b-button>
              </b-button-group>
            </div>
          </card-widget>
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
        <b-col col sm="4">
          <!-- <card-widget
            header="BTCPay Server"
            status="Running"
            status-type="success"
            title="72"
            sub-title="New orders today"
            icon="icon-app-btcpay.svg"
          >
            <div class="px-4 pt-2 pb-3">
              <a href="#" class="card-link">Manage</a>
            </div>
          </card-widget>-->
          <card-widget
            header="Tor"
            status="Running"
            status-type="success"
            title="100%"
            sub-title="Traffic relayed over Tor"
            icon="icon-app-tor.svg"
          >
            <div class="px-4 pt-2 pb-3">
              <a href="#" class="card-link">Manage</a>
            </div>
          </card-widget>
          <!-- <card-widget
            header="Example App"
            status="Running"
            status-type="success"
            title="Title"
            sub-title="Subtitle"
            icon="icon-app-chaind.svg"
          ></card-widget>-->
        </b-col>
      </b-row>
    </div>
  </authenticated-nav>
</template>

<script>
// import Vue from "vue";
import AuthenticatedNav from "@/layouts/AuthenticatedNav";
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
  components: {
    AuthenticatedNav,
    CardWidget,
    Blockchain
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
