<template>
  <card-widget header="Here's how to connect Zeus (iOS) to your Umbrel">
    <div class="px-3 px-lg-4 pb-3">
      <ol class="connect-wallet-steps">
        <li class="connect-wallet-step">
          Open the Zeus app on your iPhone connected to the same local network as your Umbrel.
        </li>
        <li class="connect-wallet-step">
          Click
          <span class="font-weight-bold">"Scan lndconnect config"</span>.
        </li>
        <li class="connect-wallet-step">
          Scan this QR Code
          <qr-code
            :value="urls.lnd.restLocal"
            :size="300"
            class="qr-image mt-2"
            showLogo
          ></qr-code>
        </li>
      </ol>
      <hr />
      <p class="text-muted">Or manually enter the following details</p>
      <ol class="connect-wallet-steps">
        <li class="connect-wallet-step">
          In the <span class="font-weight-bold">"Host"</span>, enter
          <input-copy
            value="umbrel.local"
            size="sm"
            auto-width
          ></input-copy>
        </li>
        <li class="connect-wallet-step">
          In the <span class="font-weight-bold">"REST Port"</span>, enter
          <input-copy
            value="8080"
            size="sm"
            auto-width
          ></input-copy>
        </li>
        <li class="connect-wallet-step">
          In the <span class="font-weight-bold">"Macaroon (Hex format)"</span>, enter
          <input-copy
            :value="macaroonHex"
            size="sm"
          ></input-copy>
        </li>
        <li class="connect-wallet-step">
          Click <span class="font-weight-bold">"Save Node Config"</span>.
        </li>
        <li class="connect-wallet-step">
          Congratulations! You have successfully connected Zeus (iOS) to your
          Umbrel.
        </li>
      </ol>
    </div>
  </card-widget>
</template>

<script>
import CardWidget from "@/components/CardWidget";
import InputCopy from "@/components/Utility/InputCopy";
import QrCode from "@/components/Utility/QrCode.vue";

export default {
  props: {
    urls: Object,
  },
  computed: {
    macaroonHex() {
      return Buffer.from(Array.from(this.urls.lnd.restLocal.matchAll(/macaroon=(.*)/gm), m => m[1])[0], 'base64').toString('hex');
    }
  },
  components: {
    CardWidget,
    InputCopy,
    QrCode,
  },
};
</script>
