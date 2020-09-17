<template>
  <div>
    <b-form-select v-model="selectedWallet" class="mb-3">
      <b-form-select-option
        :value="{walletName: 'Select your wallet', walletType: null}"
        disabled
      >Select your wallet</b-form-select-option>
      <b-form-select-option :value="{walletName: 'Zap Desktop', walletType: 'grpc'}">Zap Desktop</b-form-select-option>
      <b-form-select-option :value="{walletName: 'Zap Mobile', walletType: 'rest'}">Zap Mobile</b-form-select-option>
      <b-form-select-option :value="{walletName: 'Zeus', walletType: 'rest'}">Zeus</b-form-select-option>
      <b-form-select-option-group label="Other">
        <b-form-select-option
          :value="{walletName: 'any other wallet that uses lndconnect REST', walletType: 'rest'}"
        >lndconnect REST</b-form-select-option>
        <b-form-select-option
          :value="{walletName: 'any other wallet that uses lndconnect gRPC', walletType: 'grpc'}"
        >lndconnect gRPC</b-form-select-option>
      </b-form-select-option-group>
    </b-form-select>
    <div class="d-lg-flex align-items-center" v-if="lndConnectUrl && selectedWallet.walletType">
      <!-- Pubkey QR Code -->
      <qr-code :value="lndConnectUrl" :size="200" level="M" class="qr-image mb-3 mb-lg-0" showLogo></qr-code>
      <div class="w-100 align-self-center ml-lg-3">
        <p
          class="text-center text-lg-left"
        >Connect {{ selectedWallet.walletName }} to your Umbrel using the following url</p>
        <input-copy class="mb-2" size="sm" :value="lndConnectUrl"></input-copy>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import QrCode from "@/components/Utility/QrCode";
import InputCopy from "@/components/Utility/InputCopy";

export default {
  data() {
    return {
      selectedWallet: { walletName: "Select your wallet", walletType: null }
    };
  },
  computed: {
    ...mapState({
      lndConnectUrl: state => state.lightning.lndConnectUrl
    })
  },
  methods: {},
  watch: {
    selectedWallet: async function(wallet) {
      console.log(wallet.walletType);
      await this.$store.dispatch(
        "lightning/getLndConnectUrl",
        wallet.walletType
      );
      console.log(this.lndConnectUrl);
    }
  },
  components: {
    QrCode,
    InputCopy
  }
};
</script>

<style lang="scss">
.logo {
  height: 20vh;
  max-height: 200px;
  width: auto;
}
</style>
