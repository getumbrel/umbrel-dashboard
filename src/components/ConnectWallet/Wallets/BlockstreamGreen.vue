<template>
  <connection-details name="Blockstream Green">
    <step-list>
      <step>
        Open Green Wallet and go to <span class="font-weight-bold">Settings > SPV synchronization</span>.
      </step>
      <step>
        Check <span class="font-weight-bold">"Enable SPV"</span>.
      </step>
      <step>
        Click <span class="font-weight-bold">"Only connect to trusted node(s) for SPV"</span>.
      </step>
      <step>
        Enter <input-copy :value="`${urls.bitcoin.p2p.address}:${urls.bitcoin.p2p.port}`" auto-width></input-copy>
      </step>
      <step>
        Click <span class="font-weight-bold">"Ok"</span>.
      </step>
      <step>
        Restart the app.
      </step>
      <step>
        Congratulations! You have successfully connected Blockstream Green to your Umbrel.
      </step>
    </step-list>
  </connection-details>
</template>

<script>
import ConnectionDetails from "@/components/ConnectWallet/ConnectionDetails";
import StepList from "@/components/ConnectWallet/StepList";
import Step from "@/components/ConnectWallet/Step";
import InputCopy from "@/components/Utility/InputCopy";

export default {
  props: {
    urls: Object
  },
  components: {
    ConnectionDetails,
    StepList,
    Step,
    InputCopy
  }
};
</script>
