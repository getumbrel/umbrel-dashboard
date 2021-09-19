<template>
  <connection-details name="Zap (Android)" requires="lnd">
    <step-list>
      <step>
        Open the Zap app on your phone.
      </step>
      <step>
        Tap <span class="font-weight-bold">"Setup Wallet"</span> on the home screen. If you're already using Zap, go to <span class="font-weight-bold">Menu > Wallets</span> and tap <span class="font-weight-bold">+</span>.
      </step>
      <step>
        Scan this QR Code (click to enlarge)
        <qr-code
          :value="urls.lnd.grpcTor"
          :size="300"
          class="qr-image mt-2"
          showLogo
          @click="$emit('showQrModal', urls.lnd.grpcTor )"
          v-bind:style="{ cursor: 'pointer' }"
        ></qr-code>
        <step>
          Tap <span class="font-weight-bold">"OK"</span> to validate your Umbrel hostname.
        </step>
        <hr/>
        <p class="text-muted">Or manually enter the following details</p>
        <ul class="connect-wallet-substeps">
          <li class="connect-wallet-substep">
            Copy
            <input-copy class="my-1" :value="urls.lnd.grpcTor"></input-copy>
          </li>
          <li class="connect-wallet-substep">
            Tap <span class="font-weight-bold">"Paste"</span> and <span class="font-weight-bold">"Save"</span>.
          </li>
        </ul>
      </step>
      <step>
        Congratulations! You have successfully connected Zap (Android) to your Umbrel.
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
  components: {
    ConnectionDetails,
    StepList,
    Step,
    InputCopy,
    QrCode
  }
};
</script>
