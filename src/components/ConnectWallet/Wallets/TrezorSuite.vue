<template>
  <connection-details name="Trezor Suite" requires="electrum">
    <step-list>
      <step>
        Open Trezor Suite and connect your Trezor.
      </step>
      <step>
        Make sure Tor is enabled in Trezor Suite.
      </step>
      <step>
        Open <span class="font-weight-bold">"Settings &gt; Crypto"</span>.
      </step>
      <step>
        Hover above <span class="font-weight-bold">Bitcoin</span> and click the gear icon.
      </step>

      <step>
        Under <span class="font-weight-bold">Backends</span> click <span class="font-weight-bold">Trezor servers<span> and change it to
        <span class="font-weight-bold">Custom Electrum server</span>.
      </step>

      <step>
        In the next field <span class="font-weight-bold">"Server"</span>, enter
        <input-copy class="my-1" :value="`${urls.bitcoin.electrum.address}:${urls.bitcoin.electrum.port}:t`" auto-width></input-copy>
      </step>
      <step>
        Press <span class="font-weight-bold">Confirm</span> button.
      </step>
      <step>
        Congratulations! You've successfully connected Trezor Sutie to your Umbrel.
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
    InputCopy,
  }
};
</script>
