<template>
  <div>
    <b-form-select v-model="selectedWallet" class="mb-3">
      <b-form-select-option
        :value="{ walletName: 'Select your wallet', type: null }"
        disabled
        >Select your wallet</b-form-select-option
      >
      <b-form-select-option
        :value="{ walletName: 'Zap Desktop', type: 'grpcLocal' }"
        >Zap Desktop</b-form-select-option
      >
      <b-form-select-option
        :value="{ walletName: 'Zap on Android', type: 'grpcTor' }"
        >Zap Android</b-form-select-option
      >
      <b-form-select-option
        :value="{ walletName: 'Zap on iOS', type: 'restTor' }"
        >Zap iOS</b-form-select-option
      >
      <b-form-select-option
        :value="{
          walletName: 'Zeus on Android (using Orbot)',
          type: 'restTor'
        }"
        >Zeus Android</b-form-select-option
      >
      <b-form-select-option
        :value="{ walletName: 'Zeus on iOS', type: 'restLocal' }"
        >Zeus iOS</b-form-select-option
      >
      <b-form-select-option-group label="Other">
        <b-form-select-option
          :value="{
            walletName: 'any other wallet that supports lndconnect gRPC',
            type: 'grpcLocal'
          }"
          >lndconnect gRPC</b-form-select-option
        >
        <b-form-select-option
          :value="{
            walletName:
              'any other wallet that supports lndconnect gRPC over Tor',
            type: 'grpcTor'
          }"
          >lndconnect gRPC (Tor)</b-form-select-option
        >
        <b-form-select-option
          :value="{
            walletName: 'any other wallet that supports lndconnect REST',
            type: 'restLocal'
          }"
          >lndconnect REST</b-form-select-option
        >
        <b-form-select-option
          :value="{
            walletName:
              'any other wallet that supports lndconnect REST over Tor',
            type: 'restTor'
          }"
          >lndconnect REST (Tor)</b-form-select-option
        >
      </b-form-select-option-group>
    </b-form-select>
    <div
      class="d-lg-flex align-items-center"
      v-if="selectedWallet.type && urls[selectedWallet.type]"
    >
      <!-- Pubkey QR Code -->
      <qr-code
        :value="urls[selectedWallet.type]"
        :size="200"
        level="M"
        class="qr-image mb-3 mb-lg-0"
        showLogo
      ></qr-code>
      <div class="w-100 align-self-center ml-lg-3">
        <p class="text-center text-lg-left">
          Connect {{ selectedWallet.walletName }} to your Umbrel using the
          following url
        </p>
        <input-copy
          class="mb-2"
          size="sm"
          :value="urls[selectedWallet.type]"
        ></input-copy>
      </div>
    </div>
  </div>
</template>

<script>
import QrCode from "@/components/Utility/QrCode";
import InputCopy from "@/components/Utility/InputCopy";

export default {
  props: {
    urls: Object
  },
  data() {
    return {
      selectedWallet: {
        walletName: "Select your wallet",
        type: null
      }
    };
  },
  methods: {},
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
