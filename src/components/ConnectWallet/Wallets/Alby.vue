<template>
  <connection-details name="Alby" requires="lnd">
    <step-list>
      <step>
        Add the Alby extension to your browser and open the app.
      </step>
      <step>
        Click on <span class="font-weight-bold">"Get Started"</span>.
      </step>
      <step>
        Enter and confirm your password, then click
        <span class="font-weight-bold">"Next"</span>.
      </step>
      <step>
        Select Umbrel from the connector options.
      </step>
      <step>
        Copy this value into the
        <span class="font-weight-bold">"lndconnect REST URL"</span>.
        <input-copy
          :value="urls.lnd.restTor.replace(/cert=(.*)&/gm, '')"
          auto-width
        ></input-copy>
      </step>
      <step>Click <span class="font-weight-bold">"Continue"</span>.</step>
      <step>
        Congratulations! You have successfully connected Alby to your Umbrel.
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
    urls: Object,
  },
  components: {
    ConnectionDetails,
    StepList,
    Step,
    InputCopy,
  },
};
</script>
