<template>
  <connection-details name="Trezor Suite" requires="electrum">
    <step-list>
      <step>
        Make sure Tor is up and running on your system.
        <b-link v-b-modal.tor-modal>Click here</b-link> for instructions.
      </step>
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
        Under <span class="font-weight-bold">Backends</span> click <span class="font-weight-bold">Trezor servers</span> and select
        <span class="font-weight-bold">Custom Electrum server</span> from the dropdown menu.
      </step>

      <step>
        In the next field enter:
        <input-copy class="my-1" :value="`${urls.bitcoin.electrum.address}:${urls.bitcoin.electrum.port}:t`" auto-width></input-copy>
      </step>
      <step>
        Press the <span class="font-weight-bold">Confirm</span> button.
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
    InputCopy,
  }
};
</script>
