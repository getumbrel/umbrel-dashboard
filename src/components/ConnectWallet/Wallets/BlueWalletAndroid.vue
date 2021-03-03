<template>
  <connection-details name="BlueWallet (Android)" requires="electrum">
    <step-list>
      <step>
        Download
        <b-link
          href="https://play.google.com/store/apps/details?id=org.torproject.android"
          target="_blank"
          >Orbot</b-link
        >
        on your phone.
      </step>
      <step>
        Open Orbot, tap the gear icon under
        <span class="font-weight-bold">"Tor-Enabled apps"</span>
        and add BlueWallet.
      </step>
      <step>
        Tap <span class="font-weight-bold">"STOP"</span>, restart Orbot and turn
        on <span class="font-weight-bold">"VPN Mode"</span>.
      </step>
      <step>
        Start Tor by tapping the big onion icon.
      </step>
      <step>
        Open BlueWallet, tap the three dots to access the settings and go to
        <span class="font-weight-bold">Network > Electrum Server</span>.
      </step>
      <step>
        Tap <span class="font-weight-bold">"Scan or import a file"</span>.
      </step>
      <step>
        Scan this QR Code (click to enlarge)
        <qr-code
          :value="
            `${urls.bitcoin.electrum.address}:${urls.bitcoin.electrum.port}`
          "
          :size="300"
          class="qr-image mt-2"
          showLogo
          @click="
            $emit(
              'showQrModal',
              `${urls.bitcoin.electrum.address}:${urls.bitcoin.electrum.port}`
            )
          "
          v-bind:style="{ cursor: 'pointer' }"
        ></qr-code>
      </step>
      <step>
        Tap <span class="font-weight-bold">"Save"</span> and restart BlueWallet.
      </step>
      <step>
        Congratulations! You have successfully connected BlueWallet to your
        Umbrel.
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
  components: {
    ConnectionDetails,
    StepList,
    Step,
    QrCode
  }
};
</script>
