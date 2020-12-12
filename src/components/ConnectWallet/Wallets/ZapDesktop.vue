<template>
  <card-widget header="Here's how to connect Zap (Desktop) to your Umbrel">
    <div class="px-3 px-lg-4 pb-3">
      <ol class="connect-wallet-steps">
        <li class="connect-wallet-step">
          Open the Zap Desktop app on your computer.
        </li>
        <li class="connect-wallet-step">
          Click
          <span class="font-weight-bold">"Connect"</span> on the welcome screen.
        </li>
        <li class="connect-wallet-step">
          In the <span class="font-weight-bold">"Connection String"</span>, enter 
          <input-copy
            :value="urls.lnd.grpcLocal"
            size="sm"
            auto-width
          ></input-copy>
        </li>
        <li class="connect-wallet-step">
          Click <span class="font-weight-bold">"Next"</span> two times to confirm.
        </li>
        <li class="connect-wallet-step">
          Congratulations! You have successfully connected Zap (Desktop) to your
          Umbrel.
        </li>
      </ol>
    </div>
  </card-widget>
</template>

<script>
import CardWidget from "@/components/CardWidget";
import InputCopy from "@/components/Utility/InputCopy";
import QrCode from "@/components/Utility/QrCode.vue";

export default {
  props: {
    urls: Object,
  },
  components: {
    CardWidget,
    InputCopy,
    QrCode,
  },
};
</script>
