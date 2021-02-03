<template>
  <connection-details name="Electrum (Desktop)">
    <step-list>
      <step>
        Make sure Tor is up and running on your system.
        <b-link v-b-modal.tor-modal>Click here</b-link> for instructions.
      </step>
      <step>
        Open Electrum and click on the colored dot at the bottom right to open server setttings.
      </step>
      <step>
        Disable <span class="font-weight-bold">"Select server automatically"</span>.
      </step>
      <step>
        In the <span class="font-weight-bold">"Server"</span>, enter
        <input-copy :value="urls.bitcoin.electrum.address" auto-width></input-copy>
        <input-copy :value="urls.bitcoin.electrum.port" auto-width></input-copy>
      </step>
      <step>
        Go to the <span class="font-weight-bold">"Proxy"</span> tab.
      </step>
      <step>
        Check <span class="font-weight-bold">"Use Tor proxy at port 9050"</span>
        or manually enter this:
        <input-copy value="127.0.0.1" auto-width></input-copy>
        <input-copy value="9050" auto-width></input-copy>
      </step>
      <step>
        Close the server settings.
      </step>
      <step>
        If the dot turns blue, congratulations! You've successfully connected Electrum to your Umbrel.
      </step>
    </step-list>

    <b-modal id="tor-modal" centered hide-footer>
      <tor-setup></tor-setup>
    </b-modal>
  </connection-details>
</template>

<script>
import ConnectionDetails from "@/components/ConnectWallet/ConnectionDetails";
import StepList from "@/components/ConnectWallet/StepList";
import Step from "@/components/ConnectWallet/Step";
import TorSetup from "@/components/ConnectWallet/TorSetup.vue";
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
    TorSetup
  }
};
</script>
