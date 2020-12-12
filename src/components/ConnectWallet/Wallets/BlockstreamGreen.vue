<template>
  <card-widget header="Here's how to connect Blockstream Green to your Umbrel">
    <div class="px-3 px-lg-4 pb-3">
      <ol class="connect-wallet-steps">
        <li class="connect-wallet-step">
          Open Green Wallet and go to <span class="font-weight-bold">Settings > SPV synchronization</span>.
        </li>
        <li class="connect-wallet-step">
          Check <span class="font-weight-bold">"Enable SPV"</span>.
        </li>
        <li class="connect-wallet-step">
          Click <span class="font-weight-bold">"Only connect to trusted node(s) for SPV"</span>.
        </li>
        <li class="connect-wallet-step">
          Enter
          <input-copy
            :value="`${urls.bitcoin.p2p.address}:${urls.bitcoin.p2p.port}`"
            size="sm"
            auto-width
          ></input-copy>
        </li>
        <li class="connect-wallet-step">
          Click <span class="font-weight-bold">"Ok"</span>.
        </li>
        <li class="connect-wallet-step">
          Restart the app.
        </li>
        <li class="connect-wallet-step">
          Congratulations! You have successfully connected Blockstream Green to
          your Umbrel.
        </li>
      </ol>
    </div>
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
