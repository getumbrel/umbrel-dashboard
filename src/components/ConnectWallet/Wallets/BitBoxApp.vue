<template>
  <card-widget header="Here's how to connect BitBoxApp to your Umbrel">
    <div class="px-3 px-lg-4 pb-3">
      <ol class="connect-wallet-steps">
        <li class="connect-wallet-step">
          Make sure Tor is up and running on your system.
          <b-link v-b-modal.tor-modal>Click here</b-link> for instructions.
        </li>
        <li class="connect-wallet-step">
          Open BitBoxApp and go to <span class="font-weight-bold">Settings > Enable tor proxy</span>.
        </li>
        <li class="connect-wallet-step">
          Check <span class="font-weight-bold">"Enable tor proxy"</span>
          and enter:
          <input-copy
            value="127.0.0.1:9050"
            size="sm"
            auto-width
          ></input-copy>
        </li>
        <li class="connect-wallet-step">
          Click <span class="font-weight-bold">"Set proxy address"</span> and restart the app.
        </li>
        <li class="connect-wallet-step">
          Go to <span class="font-weight-bold">Settings > Connect your own full node</span>.
        </li>
        <li class="connect-wallet-step">
          In the <span class="font-weight-bold">"Endpoint"</span>, enter
          <input-copy
            :value="`${urls.bitcoin.electrum.address}:${urls.bitcoin.electrum.port}`"
            size="sm"
            auto-width
          ></input-copy>
        </li>
        <li class="connect-wallet-step">
          Click <span class="font-weight-bold">"Check"</span> to verify if
          BitBoxApp is able to connect to your Umbrel.
        </li>
        <li class="connect-wallet-step">
          Click <span class="font-weight-bold">"Add"</span> and restart the app.
        </li>
        <li class="connect-wallet-step">
          Congratulations! You have successfully connected BitBoxApp to
          your Umbrel.
        </li>
      </ol>
    </div>
    <b-modal id="tor-modal" centered hide-footer>
      <tor-setup></tor-setup>
    </b-modal>
  </card-widget>
</template>

<script>
import CardWidget from "@/components/CardWidget";
import TorSetup from "@/components/ConnectWallet/TorSetup.vue";
import InputCopy from "@/components/Utility/InputCopy";

export default {
  props: {
    urls: Object,
  },
  components: {
    CardWidget,
    InputCopy,
    TorSetup,
  },
};
</script>
