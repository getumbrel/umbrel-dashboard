<template>
  <connection-details name="Sparrow">
    <step-list>
      <step>
        From the Welcome screen, click <span class="font-weight-bold">"Configure Server"</span> 
        to add the details of your Umbrel&#39;s Electrum server, or go to 
        <span class="font-weight-bold">Preferences > Server</span>.
      </step>
      <step>
        In the <span class="font-weight-bold">"URL"</span>, enter
        <input-copy :value="urls.bitcoin.electrum.address" auto-width></input-copy>
        <input-copy :value="urls.bitcoin.electrum.port" auto-width></input-copy>
      </step>
      <step>
        Disable <span class="font-weight-bold">"Use SSL"</span>.
      </step>
      <step>
        Click <span class="font-weight-bold">"Test Connection"</span> to verify if
        Sparrow is able to connect to your Umbrel.
      </step>
      <step>
        After verifying, click <span class="font-weight-bold">"Close"</span>.
      </step>
      <step>
        At any moment, you can turn on or off the connection using the switch 
        in the bottom right of the window.
      </step>
      <step>
        Congratulations! You have successfully connected Sparrow to
        your Umbrel.
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
