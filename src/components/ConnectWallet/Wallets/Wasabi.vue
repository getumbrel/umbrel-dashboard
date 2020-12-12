<template>
  <card-widget header="Here's how to connect Wasabi to your Umbrel">
      <div class="px-3 px-lg-4 pb-3">
        <ol class="connect-wallet-steps">
          <li class="connect-wallet-step">
            Make sure Tor is up and running on your system.
            <b-link v-b-modal.tor-modal>Click here</b-link> for instructions.
          </li>
          <li class="connect-wallet-step">
            Open Wasabi, open the <span class="font-weight-bold">"Tools"</span> menu 
            and click <span class="font-weight-bold">"Settings"</span>.
            
          </li>
          <li class="connect-wallet-step">
            In the <span class="font-weight-bold">"Bitcoin P2P Endpoint"</span>, enter
            <input-copy
              :value="`${urls.bitcoin.p2p.address}:${urls.bitcoin.p2p.port}`"
              size="sm"
              auto-width
            ></input-copy>
          </li>
          <li class="connect-wallet-step">
            In the <span class="font-weight-bold">"Tor SOCKS5 Endpoint"</span>, enter
            <input-copy
              value="127.0.0.1:9050"
              size="sm"
              auto-width
            ></input-copy>
          </li>
          <li class="connect-wallet-step">
            Restart the app.
          </li>
          <li class="connect-wallet-step">
            Wait a little while. The footer should display "Tor is running - 
            Backend is connected".
          </li>
          <li class="connect-wallet-step">
            Congratulations! You have successfully connected Wasabi to
            your Umbrel.
          </li>
        </ol>
      </div>
      <b-modal id="tor-modal" centered hide-footer>
        <tor-setup></tor-setup>
      </b-modal>
    </card-widget>
</template>

<script>
import CardWidget from "@/components/CardWidget";
import TorSetup from "@/components/ConnectWallet/TorSetup.vue";
import InputCopy from "@/components/Utility/InputCopy";

export default {
  props: {
    urls: Object,
  },
  components: {
    CardWidget,
    InputCopy,
    TorSetup,
  },
};
</script>
