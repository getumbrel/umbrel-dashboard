<template>
  <card-widget header="Here's how to connect Zap (iOS) to your Umbrel">
    <div class="px-3 px-lg-4 pb-3">
      <ol class="connect-wallet-steps">
        <li class="connect-wallet-step">
          Open the Zap app on your iPhone.
        </li>
        <li class="connect-wallet-step">
          Click
          <span class="font-weight-bold">"Connect"</span> on the welcome screen.
        </li>
        <li class="connect-wallet-step">
          Scan this QR Code (click to enlarge)
          <qr-code
            :value="urls.lnd.restTor"
            :size="300"
            class="qr-image mt-2"
            showLogo
            @click="$emit('showQrModal', { wallet: 'Zap (iOS)', value: urls.lnd.restTor })"
            v-bind:style="{ cursor: 'pointer' }"
          ></qr-code>
        </li>
      </ol>
      <hr />
      <p class="text-muted">Or manually enter the following details</p>
      <ol class="connect-wallet-steps">
        <li class="connect-wallet-step">
          Copy 
          <input-copy
            :value="urls.lnd.restTor"
            size="sm"
            auto-width
          ></input-copy>
        </li>
        <li class="connect-wallet-step">
          Click <span class="font-weight-bold">"Paste"</span> and <span class="font-weight-bold">"Save"</span>.
        </li>
        <li class="connect-wallet-step">
          Congratulations! You have successfully connected Zap (iOS) to your
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
  components: {
    CardWidget,
    InputCopy,
    QrCode,
  },
};
</script>
