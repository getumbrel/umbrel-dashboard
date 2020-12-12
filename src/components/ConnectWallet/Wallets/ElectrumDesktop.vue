<template>
  <card-widget header="Here's how to connect Electrum (Desktop) to your Umbrel">
    <div class="px-3 px-lg-4 pb-3">
      <ol class="connect-wallet-steps">
        <li class="connect-wallet-step">
          Make sure Tor is up and running on your system.
          <b-link v-b-modal.tor-modal>Click here</b-link> for instructions.
        </li>
        <li class="connect-wallet-step">
          Open Electrum and click on the colored dot at the bottom right to open server setttings.
        </li>
        <li class="connect-wallet-step">
          Disable <span class="font-weight-bold">"Select server automatically"</span>. 
          You may also want to add "oneserver: true" to your Electrum config file (usually "~/.electrum/config").
        </li>
        <li class="connect-wallet-step">
          In the <span class="font-weight-bold">"Server"</span>, enter
          <input-copy
            :value="urls.bitcoin.electrum.address"
            size="sm"
            auto-width
          ></input-copy>
          <input-copy
            :value="urls.bitcoin.electrum.port"
            size="sm"
            auto-width
          ></input-copy>
        </li>
        <li class="connect-wallet-step">
          Go to the <span class="font-weight-bold">"Proxy"</span> tab.
        </li>
        <li class="connect-wallet-step">
          Check <span class="font-weight-bold">"Use Tor proxy at port 9050"</span>
          or manually enter this:
          <input-copy
            value="127.0.0.1"
            size="sm"
            auto-width
          ></input-copy>
          <input-copy
            value="9050"
            size="sm"
            auto-width
          ></input-copy>
        </li>
        <li class="connect-wallet-step">
          Close the server settings.
        </li>
        <li class="connect-wallet-step">
          If the dot turns blue, congratulations! You've successfully connected Electrum to your Umbrel.
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
