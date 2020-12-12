<template>
  <card-widget
    header="Here's how to connect BlueWallet (Android) to your Umbrel"
  >
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
          Open Orbot, tap the gear icon under <span class="font-weight-bold">"Tor-Enabled apps"</span> 
          and add BlueWallet.
        </li>
        <li class="connect-wallet-step">
          Click <span class="font-weight-bold">"STOP"</span>, restart Orbot and turn 
          on the <span class="font-weight-bold">"VPN Mode"</span>.
        </li>
        <li class="connect-wallet-step">
          Start Tor by tapping the big onion icon.
        </li>
        <li class="connect-wallet-step">
          Open BlueWallet, tap the three dots to access the settings and go to 
          <span class="font-weight-bold">Network > Electrum server</span>.
        </li>
        <li class="connect-wallet-step">
          In the <span class="font-weight-bold">"Host"</span>, enter
          <input-copy
            :value="urls.bitcoin.electrum.address"
            size="sm"
            auto-width
          ></input-copy>
        </li>
        <li class="connect-wallet-step">
          In the <span class="font-weight-bold">"TCP Port"</span>, enter
          <input-copy
            :value="urls.bitcoin.electrum.port"
            size="sm"
            auto-width
          ></input-copy>
        </li>
       <li class="connect-wallet-step">
            Click <span class="font-weight-bold">"Save"</span> and restart the app.
          </li>
        <li class="connect-wallet-step">
          Congratulations! You have successfully connected BlueWallet to
          your Umbrel.
        </li>
      </ol>
    </div>
  </card-widget>
</template>

<script>
import CardWidget from "@/components/CardWidget";
import InputCopy from "@/components/Utility/InputCopy";

export default {
  props: {
    urls: Object,
  },
  components: {
    CardWidget,
    InputCopy,
  },
};
</script>
