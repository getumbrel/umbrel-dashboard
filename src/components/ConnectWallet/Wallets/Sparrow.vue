<template>
  <card-widget header="Here's how to connect Sparrow to your Umbrel">
    <div class="px-3 px-lg-4 pb-3">
      <ol class="connect-wallet-steps">
        <li class="connect-wallet-step">
          From the Welcome screen, click <span class="font-weight-bold">"Configure Server"</span> 
          to add the details of your Umbrel&#39;s Electrum server, or go to 
          <span class="font-weight-bold">Preferences > Server</span>.
        </li>
        <li class="connect-wallet-step">
          In the <span class="font-weight-bold">"URL"</span>, enter
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
          Disable <span class="font-weight-bold">"Use SSL"</span>.
        </li>
        <li class="connect-wallet-step">
          Click <span class="font-weight-bold">"Test Connection"</span> to verify if
          Sparrow is able to connect to your Umbrel.
        </li>
        <li class="connect-wallet-step">
          After verifying, click
          <span class="font-weight-bold">"Close"</span>.
        </li>
        <li class="connect-wallet-step">
          At any moment, you can turn on or off the connection using the switch 
          in the bottom right of the window.
        </li>
        <li class="connect-wallet-step">
          Congratulations! You have successfully connected Sparrow to
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
