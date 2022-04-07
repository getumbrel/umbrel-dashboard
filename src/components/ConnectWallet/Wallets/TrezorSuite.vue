<template>
  <connection-details name="Trezor Suite" requires="electrum">
    <step-list>
      <step>
        Open Trezor Suite and connect your Trezor.
      </step>
      <step>
        Go to <span class="font-weight-bold">Settings > Application</span> and make sure <span class="font-weight-bold">"Tor"</span> is enabled.
      </step>
      <step>
        Go to <span class="font-weight-bold">Settings > Crypto</span>.
      </step>
      <step>
        Hover above <span class="font-weight-bold">"Bitcoin"</span> and click the gear icon.
      </step>
      <step>
        Under <span class="font-weight-bold">"Backends"</span> click <span class="font-weight-bold">"Trezor servers"</span> and select
        <span class="font-weight-bold">"Custom Electrum server"</span> from the dropdown menu.
      </step>
      <step>
        In the next field enter:
        <input-copy class="my-1" :value="`${urls.bitcoin.electrum.address}:${urls.bitcoin.electrum.port}:t`" auto-width></input-copy>
      </step>
      <step>
        Press the <span class="font-weight-bold">"Confirm"</span> button.
      </step>
      <step>
        Congratulations! You've successfully connected Trezor Suite to your Umbrel.
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
