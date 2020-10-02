<template>
  <div>
    <b-form-select v-model="selectedWallet" class="mb-3">
      <b-form-select-option
        :value="{ walletName: 'Select your wallet', type: null }"
        disabled
        >Select your wallet</b-form-select-option
      >
      <b-form-select-option
        :value="{ walletName: 'BitBoxApp', type: 'electrum' }"
        >BitBoxApp</b-form-select-option
      >
      <b-form-select-option
        :value="{ walletName: 'Blockstream Green', type: 'p2p' }"
        >Blockstream Green</b-form-select-option
      >
      <b-form-select-option
        :value="{ walletName: 'BlueWallet (on-chain only)', type: 'electrum' }"
        >BlueWallet</b-form-select-option
      >
      <b-form-select-option
        :value="{ walletName: 'Electrum', type: 'electrum' }"
        >Electrum</b-form-select-option
      >
      <b-form-select-option :value="{ walletName: 'Fully Noded', type: 'rpc' }"
        >Fully Noded</b-form-select-option
      >
      <b-form-select-option :value="{ walletName: 'Phoenix', type: 'electrum' }"
        >Phoenix</b-form-select-option
      >
      <b-form-select-option :value="{ walletName: 'Sparrow', type: 'electrum' }"
        >Sparrow</b-form-select-option
      >
      <b-form-select-option
        :value="{ walletName: 'Specter Desktop', type: 'rpc' }"
        >Specter Desktop</b-form-select-option
      >
      <b-form-select-option :value="{ walletName: 'Wasabi', type: 'p2p' }"
        >Wasabi</b-form-select-option
      >
      <b-form-select-option-group label="Other">
        <b-form-select-option
          :value="{
            walletName:
              'any other wallet that supports Bitcoin Core\'s P2P port',
            type: 'p2p'
          }"
          >Bitcoin Core P2P</b-form-select-option
        >
        <b-form-select-option
          :value="{
            walletName: 'any other wallet that supports Bitcoin Core\'s RPC',
            type: 'rpc'
          }"
          >Bitcoin Core RPC</b-form-select-option
        >
        <b-form-select-option
          :value="{
            walletName: 'any other wallet that supports an Electrum server',
            type: 'electrum'
          }"
          >Electrum Server</b-form-select-option
        >
      </b-form-select-option-group>
    </b-form-select>
    <div
      class="d-lg-flex align-items-center"
      v-if="
        selectedWallet.type &&
          urls[selectedWallet.type] &&
          selectedWallet.type !== 'rpc'
      "
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
    <div
      class="d-lg-flex align-items-center"
      v-else-if="
        selectedWallet.type &&
          urls[selectedWallet.type] &&
          selectedWallet.type === 'rpc'
      "
    >
      <!-- Pubkey QR Code -->
      <qr-code
        :value="urls.rpc.connectionString"
        :size="200"
        level="M"
        class="qr-image mb-3 mb-lg-0"
        showLogo
      ></qr-code>
      <div class="w-100 align-self-center ml-lg-3">
        <p class="text-center text-lg-left">
          Connect {{ selectedWallet.walletName }} to your Umbrel using the
          following details
        </p>
        <b-row>
          <b-col col cols="6">
            <label class="mb-1 d-block"><small>RPC Username</small></label>
            <input-copy
              class="mb-2"
              size="sm"
              :value="urls.rpc.rpcuser"
            ></input-copy>
          </b-col>
          <b-col col cols="6">
            <label class="mb-1 d-block"><small>RPC Password</small></label>
            <input-copy
              class="mb-2"
              size="sm"
              :value="urls.rpc.rpcpassword"
            ></input-copy> </b-col
          ><b-col col cols="12">
            <label class="mb-1 d-block"><small>Address</small></label>
            <input-copy
              class="mb-2"
              size="sm"
              :value="urls.rpc.address"
            ></input-copy>
          </b-col>
        </b-row>
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
