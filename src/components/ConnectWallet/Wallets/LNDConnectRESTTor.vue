<template>
  <connection-details name="any other wallet that supports LND REST on Tor">
    <div class="d-lg-flex align-items-center justify-content-center">
      <qr-code
        :value="urls.lnd.restTor"
        :size="260"
        level="M"
        class="qr-image mx-auto mb-3 mb-lg-0"
        showLogo
        @click="$emit('showQrModal', { wallet: 'LND REST (Tor)', value: urls.lnd.restTor })"
        v-bind:style="{ cursor: 'pointer' }"
      ></qr-code>
      <div class="w-100 align-self-center ml-lg-3">
        <label class="mb-1 d-block"><small>LNDConnect URL</small></label>
        <input-copy :value="urls.lnd.restTor"></input-copy>
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
