<template>
  <connection-details name="any other wallet that supports Electrum Server">
    <div class="d-lg-flex align-items-center justify-content-center">
      <qr-code
        :value="urls.bitcoin.electrum.connectionString"
        :size="260"
        level="M"
        class="qr-image mx-auto mb-3 mb-lg-0"
        showLogo
        @click="$emit('showQrModal', { wallet: 'Electrum Server', value: urls.bitcoin.electrum.connectionString })"
        v-bind:style="{ cursor: 'pointer' }"
      ></qr-code>
      <div class="w-100 align-self-center ml-lg-3 connect-wallet-steps">
        <div class="connect-wallet-step">
          <label class="mb-1 d-block"><small>Electrum Address</small></label>
          <input-copy :value="urls.bitcoin.electrum.address" auto-width></input-copy>
        </div>
        <div class="connect-wallet-step">
          <label class="mb-1 d-block"><small>Electrum Port</small></label>
          <input-copy :value="urls.bitcoin.electrum.port" auto-width></input-copy>
        </div>
      </div>
    </div>
  </connection-details>
</template>

<script>
import ConnectionDetails from "@/components/ConnectWallet/ConnectionDetails";
import InputCopy from "@/components/Utility/InputCopy";
import QrCode from "@/components/Utility/QrCode";

export default {
  props: {
    urls: Object
  },
  components: {
    ConnectionDetails,
    InputCopy,
    QrCode
  }
};
</script>
