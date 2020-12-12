<template>
  <card-widget header="Here's how to connect Phoenix to your Umbrel">
    <div class="px-3 px-lg-4 pb-3">
      <ol class="connect-wallet-steps">
        <li class="connect-wallet-step">
          Go to <span class="font-weight-bold">Settings > Electrum Server</span>.
        </li>
        <li class="connect-wallet-step">
          Click <span class="font-weight-bold">"Set an Electrum server"</span>.
        </li>
        <li class="connect-wallet-step">
          Check <span class="font-weight-bold">"Use custom Electrum server"</span>.
        </li>
        <li class="connect-wallet-step">
          In the <span class="font-weight-bold">"URL"</span>, enter
          <input-copy
            :value="`${urls.bitcoin.electrum.address}:${urls.bitcoin.electrum.port}`"
            size="sm"
            auto-width
          ></input-copy>
        </li>
        <li class="connect-wallet-step">
          Click <span class="font-weight-bold">"Confirm"</span>.
        </li>
        <li class="connect-wallet-step">
          Restart the app.
        </li>
        <li class="connect-wallet-step">
          Congratulations! You have successfully connected Phoenix to
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
