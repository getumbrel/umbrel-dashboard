<template>
  <connection-details name="Zeus (iOS)" requires="lnd">
    <step-list>
      <step>
        Open Zeus on your iPhone.
      </step>
      <step>
        Click <span class="font-weight-bold">"Scan lndconnect config"</span>.
      </step>
      <step>
        Scan this QR Code (click to enlarge)
        <qr-code
          :value="urls.lnd.restTor.replace(/cert=(.*)&/gm,'')"
          :size="300"
          class="qr-image mt-2"
          showLogo
          @click="$emit('showQrModal', urls.lnd.restTor.replace(/cert=(.*)&/gm,''))"
          v-bind:style="{ cursor: 'pointer' }"
        ></qr-code>
      </step>
      <step>
        Check <span class="font-weight-bold">"Use Tor"</span>.
      </step>
      <step>
        Tap <span class="font-weight-bold">"Save Node Config"</span>.
      </step>
      <step>
        Tap <span class="font-weight-bold">"I understand, save my node config"</span>.
      </step>
      <step>
        Congratulations! You have successfully connected Zeus (iOS) to your Umbrel.
      </step>
    </step-list>
  </connection-details>
</template>

<script>
import ConnectionDetails from "@/components/ConnectWallet/ConnectionDetails";
import StepList from "@/components/ConnectWallet/StepList";
import Step from "@/components/ConnectWallet/Step";
import QrCode from "@/components/Utility/QrCode";

export default {
  props: {
    urls: Object
  },
  computed: {
    macaroonHex() {
      return Buffer.from(Array.from(this.urls.lnd.restLocal.matchAll(/macaroon=(.*)/gm), m => m[1])[0], 'base64').toString('hex');
    }
  },
  components: {
    ConnectionDetails,
    StepList,
    Step,
    QrCode
  }
};
</script>
