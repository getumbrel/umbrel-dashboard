<template>
  <connection-details name="Zap (Desktop)">
    <step-list>
      <step>
        Open the Zap Desktop app on your computer.
      </step>
      <step>
        Click <span class="font-weight-bold">"Connect"</span> on the welcome screen.
      </step>
      <step>
        In the <span class="font-weight-bold">"Connection String"</span>, enter 
        <input-copy :value="urls.lnd.grpcLocal" auto-width></input-copy>
      </step>
      <step>
        Click <span class="font-weight-bold">"Next"</span> two times to confirm.
      </step>
      <step>
        Congratulations! You have successfully connected Zap (Desktop) to your Umbrel.
      </step>
    </step-list>
  </connection-details>
</template>

<script>
import ConnectionDetails from "@/components/ConnectWallet/ConnectionDetails";
import StepList from "@/components/ConnectWallet/StepList";
import Step from "@/components/ConnectWallet/Step";
import InputCopy from "@/components/Utility/InputCopy";
import QrCode from "@/components/Utility/QrCode";

export default {
  props: {
    urls: Object
  },
  components: {
    ConnectionDetails,
    StepList,
    Step,
    InputCopy,
    QrCode
  }
};
</script>
