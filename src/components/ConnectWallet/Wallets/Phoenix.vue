<template>
  <connection-details name="Phoenix">
    <step-list>
      <step>
        Go to <span class="font-weight-bold">Settings > Electrum Server</span>.
      </step>
      <step>
        Click <span class="font-weight-bold">"Set an Electrum server"</span>.
      </step>
      <step>
        Check <span class="font-weight-bold">"Use custom Electrum server"</span>.
      </step>
      <step>
        In the <span class="font-weight-bold">"URL"</span>, enter
        <input-copy
          :value="`${urls.bitcoin.electrum.address}:${urls.bitcoin.electrum.port}`"
          auto-width
        ></input-copy>
      </step>
      <step>
        Click <span class="font-weight-bold">"Confirm"</span>.
      </step>
      <step>
        Restart the app.
      </step>
      <step>
        Congratulations! You have successfully connected Phoenix to your Umbrel.
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
