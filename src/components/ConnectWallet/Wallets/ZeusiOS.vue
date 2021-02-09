<template>
  <connection-details name="Zeus (iOS)">
    <step-list>
      <step>
        Make sure your iPhone is connected to the same network as your Umbrel.
      </step>
      <step>
        Open Zeus on your iPhone.
      </step>
      <step>
        Click <span class="font-weight-bold">"Scan lndconnect config"</span>.
      </step>
      <step>
        Scan this QR Code (click to enlarge)
        <qr-code
          :value="urls.lnd.restLocal"
          :size="300"
          class="qr-image mt-2"
          showLogo
          @click="$emit('showQrModal', urls.lnd.restLocal)"
          v-bind:style="{ cursor: 'pointer' }"
        ></qr-code>
      </step>
    </step-list>
    <hr />
    <p class="text-muted">Or manually enter the following details</p>
    <step-list>
      <step>
        In the <span class="font-weight-bold">"Host"</span>, enter
        <input-copy value="umbrel.local" auto-width></input-copy>
      </step>
      <step>
        In the <span class="font-weight-bold">"REST Port"</span>, enter
        <input-copy value="8080" auto-width></input-copy>
      </step>
      <step>
        In the <span class="font-weight-bold">"Macaroon (Hex format)"</span>, enter 
        <input-copy :value="macaroonHex" class="d-block mt-2"></input-copy>
      </step>
      <step>
        Tap <span class="font-weight-bold">"Save Node Config"</span>.
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
import InputCopy from "@/components/Utility/InputCopy";
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
    InputCopy,
    QrCode
  }
};
</script>
