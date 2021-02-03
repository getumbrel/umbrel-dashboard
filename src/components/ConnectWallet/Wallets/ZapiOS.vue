<template>
  <connection-details name="Zap (iOS)">
    <step-list>
      <step>
        Open the Zap app on your iPhone.
      </step>
      <step>
        Click <span class="font-weight-bold">"Connect"</span> on the welcome screen.
      </step>
      <step>
        Scan this QR Code (click to enlarge)
        <qr-code
          :value="urls.lnd.restTor"
          :size="300"
          class="qr-image mt-2"
          showLogo
          @click="$emit('showQrModal', { wallet: 'Zap (iOS)', value: urls.lnd.restTor.replace(/cert=(.*)&/gm,'') })"
          v-bind:style="{ cursor: 'pointer' }"
        ></qr-code>
      </step>
    </step-list>
    <hr />
    <p class="text-muted">Or manually enter the following details</p>
    <step-list>
      <step>
        Copy <input-copy :balue="urls.lnd.restTor.replace(/cert=(.*)&/gm,'')" auto-width></input-copy>
      </step>
      <step>
        Click <span class="font-weight-bold">"Paste"</span> and <span class="font-weight-bold">"Save"</span>.
      </step>
      <step>
        Congratulations! You have successfully connected Zap (iOS) to your Umbrel.
      </step>
    </step-list>
  </connection-details>
</template>

<script>
import ConnectionDetails from "@/components/ConnectWallet/ConnectionDetails";
import StepList from "@/components/ConnectWallet/StepList";
import Step from "@/components/ConnectWallet/Step";
import InputCopy from "@/components/Utility/InputCopy.vue";
import QrCode from "@/components/Utility/QrCode";

export default {
  props: {
    urls: Object
  },
  components: {
    ConnectionDetails,
    StepList,
    InputCopy,
    Step,
    QrCode
  }
};
</script>
