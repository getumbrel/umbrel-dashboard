<template>
  <card-widget
    header="Here's how to connect Electrum Wallet (Android) to your Umbrel"
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
          Open Orbot, tap the gear icon under "Tor-Enabled apps" and add
          Electrum Wallet.
        </li>
        <li class="connect-wallet-step">
          Click "STOP", restart Orbot and turn on the "VPN Mode".
        </li>
        <li class="connect-wallet-step">
          Start Tor by tapping the big onion icon.
        </li>
        <li class="connect-wallet-step">
          Open Electrum Wallet, tap the settings icon and select
          <span class="font-weight-bold">"Network"</span>.
        </li>
        <li class="connect-wallet-step">
          Set <span class="font-weight-bold">"Auto-connect"</span> to OFF and
          <span class="font-weight-bold">"One-server mode"</span> to ON.
        </li>
        <li class="connect-wallet-step">
          Set the <span class="font-weight-bold">"Proxy"</span> settings with
          the following details, and select
          <span class="font-weight-bold">"socks5"</span> mode.
        </li>
        <li class="connect-wallet-step">
          In the <span class="font-weight-bold">"Proxy"</span>, enter
          <input-copy value="localhost" size="sm" auto-width></input-copy>
        </li>
        <li class="connect-wallet-step">
          In the <span class="font-weight-bold">"Port"</span>, enter
          <input-copy value="9050" size="sm" auto-width></input-copy>
        </li>
        <li class="connect-wallet-step">
          Set the <span class="font-weight-bold">"Server"</span> settings with
          the following details.
        </li>
        <li class="connect-wallet-step">
          In the <span class="font-weight-bold">"Server"</span>, enter
          <input-copy
            :value="urls.bitcoin.electrum.address"
            size="sm"
            auto-width
          ></input-copy>
        </li>
        <li class="connect-wallet-step">
          In the <span class="font-weight-bold">"Port"</span>, enter
          <input-copy
            :value="urls.bitcoin.electrum.port"
            size="sm"
            auto-width
          ></input-copy>
        </li>
        <li class="connect-wallet-step">
          Congratulations! You have successfully connected Electrum Wallet to
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
