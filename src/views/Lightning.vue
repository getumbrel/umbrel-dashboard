<template>
  <div class="p-2">
    <div class="my-3 pb-2">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex justify-content-start align-items-center">
          <img
            style="height: auto; width: 12vw; max-width: 100px"
            class="mr-2 mr-sm-3"
            src="@/assets/icon-app-lnd.svg"
          />
          <div>
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="4" cy="4" r="4" fill="#00CD98" />
            </svg>
            <small class="ml-1 text-success">Running</small>
            <h3 class="d-block font-weight-bold mb-1">Lightning Network</h3>
            <span class="d-block text-muted">lnd v0.9.2-beta</span>
          </div>
        </div>
        <div>
          <svg
            width="18"
            height="4"
            viewBox="0 0 18 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0C0.89543 0 0 0.89543 0 2C0 3.10457 0.89543 4 2 4Z"
              fill="#C3C6D1"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9 4C10.1046 4 11 3.10457 11 2C11 0.89543 10.1046 0 9 0C7.89543 0 7 0.89543 7 2C7 3.10457 7.89543 4 9 4Z"
              fill="#C3C6D1"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16 4C17.1046 4 18 3.10457 18 2C18 0.89543 17.1046 0 16 0C14.8954 0 14 0.89543 14 2C14 3.10457 14.8954 4 16 4Z"
              fill="#C3C6D1"
            />
          </svg>
        </div>
      </div>
    </div>
    <b-row>
      <b-col col cols="12" md="6" xl="4">
        <lightning-wallet></lightning-wallet>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import LightningWallet from "@/components/LightningWallet";

export default {
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {
    LightningWallet
  }
};
</script>

<style lang="scss" scoped>
</style>
