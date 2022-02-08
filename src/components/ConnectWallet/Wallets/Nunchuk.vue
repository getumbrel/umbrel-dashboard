<template>
  <connection-details name="Nunchuk Wallet" requires="electrum">
    <step-list>
      <step>
        Open Nunchuk Wallet on your phone or your desktop.
      </step>
      <step>
        Go to <span class="font-weight-bold">"Account > Settings"</span>.
      </step>
      <step>
        Under <span class="font-weight-bold">"Network Settings"</span>, select
        <span class="font-weight-bold">"Connect to Electrum server"</span>.
      </step>
      <step>
        Select <span class="font-weight-bold">"Mainnet server"</span> and enter
        <input-copy
          :value="`${urls.bitcoin.electrum.address}:${urls.bitcoin.electrum.port}`"
          auto-width
        ></input-copy>
      </step>
      <step>
        Disable <span class="font-weight-bold">"Set SSL Certificate"</span>.
      </step>
      <step>
        Disable <span class="font-weight-bold">"Enable TOR Proxy"</span>.
      </step>
      <step>
        Click <span class="font-weight-bold">"Save network settings"</span>
      </step>
      <step>
        Congratulations! You have successfully connected Nunchuk Wallet to your Umbrel.
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
