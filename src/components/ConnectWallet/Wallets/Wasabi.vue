<template>
  <connection-details name="Wasabi">
    <step-list>
      <step>
        Make sure Tor is up and running on your system.
        <b-link v-b-modal.tor-modal>Click here</b-link> for instructions.
      </step>
      <step>
        Open Wasabi, open the <span class="font-weight-bold">"Tools"</span> menu 
        and click <span class="font-weight-bold">"Settings"</span>.
      </step>
      <step>
        In the <span class="font-weight-bold">"Bitcoin P2P Endpoint"</span>, enter
        <input-copy :value="`${urls.bitcoin.p2p.address}:${urls.bitcoin.p2p.port}`" auto-width></input-copy>
      </step>
      <step>
        In the <span class="font-weight-bold">"Tor SOCKS5 Endpoint"</span>, enter
        <input-copy value="127.0.0.1:9050" auto-width></input-copy>
      </step>
      <step>
        Restart the app.
      </step>
      <step>
        Wait a little while. The footer should display "Tor is running - Backend is connected".
      </step>
      <step>
        Congratulations! You have successfully connected Wasabi to your Umbrel.
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
