<template>
  <div>
    <b-form-select v-model="selectedWallet" class="mb-3">
      <b-form-select-option
        :value="{walletName: 'Select your wallet', type: null}"
        disabled
      >Select your wallet</b-form-select-option>
      <b-form-select-option :value="{walletName: 'Blockstream Green', type: 'p2p'}">Blockstream Green</b-form-select-option>
      <b-form-select-option :value="{walletName: 'BlueWallet (on-chain only)', type: 'electrum'}">BlueWallet</b-form-select-option>
      <b-form-select-option :value="{walletName: 'Electrum', type: 'electrum'}">Electrum</b-form-select-option>
      <b-form-select-option :value="{walletName: 'Phoenix', type: 'electrum'}">Phoenix</b-form-select-option>
      <b-form-select-option :value="{walletName: 'Sparrow', type: 'electrum'}">Sparrow</b-form-select-option>
      <b-form-select-option :value="{walletName: 'Wasabi', type: 'p2p'}">Wasabi</b-form-select-option>
      <b-form-select-option-group label="Other">
        <b-form-select-option
:value="{walletName: 'any other wallet that supports Bitcoin Core\'s P2P port', type: 'p2p'}"
        >Bitcoin Core P2P</b-form-select-option>
        <b-form-select-option
:value="{walletName: 'any other wallet that supports an Electrum server', type: 'electrum'}"
        >Electrum Server</b-form-select-option>
      </b-form-select-option-group>
    </b-form-select>
    <div class="d-lg-flex align-items-center" v-if="connectionString && selectedWallet.type">
      <!-- Pubkey QR Code -->
      <qr-code :value="connectionString" :size="200" level="M" class="qr-image mb-3 mb-lg-0" showLogo></qr-code>
      <div class="w-100 align-self-center ml-lg-3">
        <p
          class="text-center text-lg-left"
        >Connect {{ selectedWallet.walletName }} to your Umbrel using the following url</p>
        <input-copy class="mb-2" size="sm" :value="connectionString"></input-copy>
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
      selectedWallet: {
        walletName: "Select your wallet",
        type: null
      }
    };
  },
  computed: {
    ...mapState({
      onionAddress: state => state.bitcoin.onionAddress,
      electrumAddress: state => state.bitcoin.electrumAddress
    })
  },
  methods: {},
  watch: {
    selectedWallet(wallet) {
      if (wallet.type === 'p2p') {
        this.connectionString = this.onionAddress;
      }
      if (wallet.type === 'electrum') {
        this.connectionString = this.electrumAddress;
      }
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
