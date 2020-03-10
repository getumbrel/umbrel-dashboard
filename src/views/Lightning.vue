<template>
  <div class="p-2">
    <div class="my-3 pb-2">
      <h1>lightning</h1>
      <p class="text-muted">⚡️ Work in progress</p>
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
