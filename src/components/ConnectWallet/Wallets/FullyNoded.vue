<template>
  <card-widget header="Here's how to connect Fully Noded to your Umbrel">
    <div class="px-3 px-lg-4 pb-3">
      <ol class="connect-wallet-steps">
        <li class="connect-wallet-step">
          Open the Fully Noded app on your iPhone.
        </li>
        <li class="connect-wallet-step">
          Go to
          <span class="font-weight-bold">Settings > Node Manager > +</span>.
        </li>
        <li class="connect-wallet-step">
          Scan this QR Code
          <qr-code
            :value="urls.bitcoin.rpc.connectionString"
            :size="200"
            class="qr-image mt-2"
            showLogo
          ></qr-code>
        </li>
      </ol>
      <hr />
      <p class="text-muted">Or manually enter the following details</p>
      <ol class="connect-wallet-steps">
        <li class="connect-wallet-step">
          In the <span class="font-weight-bold">"RPC Username"</span>, enter
          <input-copy
            :value="urls.bitcoin.rpc.rpcuser"
            size="sm"
            auto-width
          ></input-copy>
        </li>
        <li class="connect-wallet-step">
          In the <span class="font-weight-bold">"RPC Password"</span>, enter
          <input-copy
            :value="urls.bitcoin.rpc.rpcpassword"
            size="sm"
            auto-width
          ></input-copy>
        </li>
        <li class="connect-wallet-step">
          In the <span class="font-weight-bold">"Address"</span>, enter
          <input-copy
            :value="`${urls.bitcoin.rpc.address}:${urls.bitcoin.rpc.port}`"
            size="sm"
            auto-width
          ></input-copy>
        </li>
        <li class="connect-wallet-step">
          Click <span class="font-weight-bold">"Save"</span>.
        </li>
        <li class="connect-wallet-step">
          Congratulations! You have successfully connected Fully Noded to your
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
