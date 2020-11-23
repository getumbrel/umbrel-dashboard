<template>
  <card-widget header="Here's how to connect Specter Wallet to your Umbrel">
    <div class="px-3 px-lg-4 pb-3">
      <ol class="connect-wallet-steps">
        <li class="connect-wallet-step">
          Make sure Tor is up and running on your system.
          <b-link v-b-modal.tor-modal>Click here</b-link> for instructions.
        </li>
        <li class="connect-wallet-step">
          Open Specter Wallet and click
          <span class="font-weight-bold">"Configure Node"</span>.
        </li>
        <li class="connect-wallet-step">
          Disable <span class="font-weight-bold">"Auto-detect"</span>.
        </li>
        <li class="connect-wallet-step">
          In the <span class="font-weight-bold">"Username"</span>, enter
          <input-copy
            :value="urls.bitcoin.rpc.rpcuser"
            size="sm"
            auto-width
          ></input-copy>
        </li>
        <li class="connect-wallet-step">
          In the <span class="font-weight-bold">"Password"</span>, enter
          <input-copy
            :value="urls.bitcoin.rpc.rpcpassword"
            size="sm"
            auto-width
          ></input-copy>
        </li>
        <li class="connect-wallet-step">
          In the <span class="font-weight-bold">"Host"</span>, enter
          <input-copy
            :value="urls.bitcoin.rpc.address"
            size="sm"
            auto-width
          ></input-copy>
        </li>
        <li class="connect-wallet-step">
          In the <span class="font-weight-bold">"Port"</span>, enter
          <input-copy
            :value="urls.bitcoin.rpc.port"
            size="sm"
            auto-width
          ></input-copy>
        </li>
        <li class="connect-wallet-step">
          Click <span class="font-weight-bold">"Test"</span> to verify if
          Specter is able to connect to your Umbrel.
        </li>
        <li class="connect-wallet-step">
          After verifying, click
          <span class="font-weight-bold">"Save"</span>.
        </li>
        <li class="connect-wallet-step">
          Congratulations! You have successfully connected Specter Wallet to
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
