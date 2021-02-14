<template>
  <connection-details name="Electrum Wallet (Android)">
    <step-list>
      <step>
        Download
        <b-link
          href="https://play.google.com/store/apps/details?id=org.torproject.android"
          target="_blank"
        >Orbot</b-link> on your phone.
      </step>
      <step>
        Open Orbot, tap the gear icon under <span class="font-weight-bold">"Tor-Enabled apps"</span> and add
        Electrum Wallet.
      </step>
      <step>
        Tap <span class="font-weight-bold">"STOP"</span>, restart Orbot and turn on
         <span class="font-weight-bold">"VPN Mode"</span>.
      </step>
      <step>
        Start Tor by tapping the big onion icon.
      </step>
      <step>
        Open Electrum Wallet, tap the settings icon and select
        <span class="font-weight-bold">"Network"</span>.
      </step>
      <step>
        Set <span class="font-weight-bold">"Auto-connect"</span> to OFF and
        <span class="font-weight-bold">"One-server mode"</span> to ON.
      </step>
      <step>
        Set the <span class="font-weight-bold">"Proxy"</span> settings with
        the following details, and select
        <span class="font-weight-bold">"socks5"</span> mode.
      </step>
      <step>
        In the <span class="font-weight-bold">"Proxy"</span>, enter
        <input-copy value="localhost" auto-width></input-copy>
      </step>
      <step>
        In the <span class="font-weight-bold">"Port"</span>, enter
        <input-copy value="9050" auto-width></input-copy>
      </step>
      <step>
        Set the <span class="font-weight-bold">"Server"</span> settings with
        the following details.
      </step>
      <step>
        In the <span class="font-weight-bold">"Server"</span>, enter
        <input-copy :value="urls.bitcoin.electrum.address" auto-width></input-copy>
      </step>
      <step>
        In the <span class="font-weight-bold">"Port"</span>, enter
        <input-copy :value="urls.bitcoin.electrum.port" auto-width></input-copy>
      </step>
      <step>
        Congratulations! You have successfully connected Electrum Wallet to your Umbrel.
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
