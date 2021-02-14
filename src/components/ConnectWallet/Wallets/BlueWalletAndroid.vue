<template>
  <connection-details name="BlueWallet (Android)">
    <step-list>
      <step>
        Download
        <b-link
          href="https://play.google.com/store/apps/details?id=org.torproject.android"
          target="_blank"
        >Orbot</b-link> on your phone.
      </step>
      <step>
        Open Orbot, tap the gear icon under <span class="font-weight-bold">"Tor-Enabled apps"</span>
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
        In the <span class="font-weight-bold">"Host"</span>, enter
        <input-copy class="my-1" :value="urls.bitcoin.electrum.address" auto-width></input-copy>
      </step>
      <step>
        In the <span class="font-weight-bold">"TCP Port"</span>, enter
        <input-copy class="my-1" :value="urls.bitcoin.electrum.port" auto-width></input-copy>
      </step>
      <step>
          Tap <span class="font-weight-bold">"Save"</span> and restart BlueWallet.
      </step>
      <step>
        Congratulations! You have successfully connected BlueWallet to your Umbrel.
      </step>
    </step-list>
  </connection-details>
</template>

<script>
import ConnectionDetails from "@/components/ConnectWallet/ConnectionDetails";
import StepList from "@/components/ConnectWallet/StepList";
import Step from "@/components/ConnectWallet/Step";
import InputCopy from "@/components/Utility/InputCopy";

export default {
  props: {
    urls: Object
  },
  components: {
    ConnectionDetails,
    StepList,
    Step,
    InputCopy
  }
};
</script>
