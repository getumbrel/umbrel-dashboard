<template>
  <card-widget header="Here's how to connect Zeus (Android) to your Umbrel">
    <div class="px-3 px-lg-4 pb-3">
      <ol class="connect-wallet-steps">
        <li class="connect-wallet-step">
          Download
          <b-link
            href="https://play.google.com/store/apps/details?id=org.torproject.android"
            target="_blank"
            >Orbot</b-link
          >.
        </li>
        <li class="connect-wallet-step">
          Open Orbot, tap the gear icon under <span class="font-weight-bold">"Tor-Enabled apps"</span> and add
          Zeus.
        </li>
        <li class="connect-wallet-step">
          Click <span class="font-weight-bold">"STOP"</span>, restart Orbot and turn on 
          the <span class="font-weight-bold">"VPN Mode"</span>.
        </li>
        <li class="connect-wallet-step">
          Start Tor by tapping the big onion icon.
        </li>
        <li class="connect-wallet-step">
          Open the Zeus app on your Android.
        </li>
        <li class="connect-wallet-step">
          Click
          <span class="font-weight-bold">"Scan lndconnect config"</span>.
        </li>
        <li class="connect-wallet-step">
          Scan this QR Code
          <qr-code
            :value="urls.lnd.restTor"
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
            :value="Array.from(urls.lnd.restTor.matchAll(/lndconnect:\/\/(.*):/gm), m => m[1])[0]"
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
          Congratulations! You have successfully connected Zeus (Android) to your
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
      return Buffer.from(Array.from(this.urls.lnd.restTor.matchAll(/macaroon=(.*)/gm), m => m[1])[0], 'base64').toString('hex');
    }
  },
  components: {
    CardWidget,
    InputCopy,
    QrCode,
  },
};
</script>
