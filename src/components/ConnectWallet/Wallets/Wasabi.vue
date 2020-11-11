<template>
  <div>
    <connect-wallet-card
      name="Wasabi Wallet"
      icon="icon-wallet-wasabi.svg"
      subTitle="Instructions to setup Wasabi Wallet"
    >
      <div class="w-100 align-self-center ml-lg-3">
        <instruction-line 
          text="Make sure Tor is installed and running on your system."
        >
        </instruction-line>

        <instruction-line 
          text='Open "Tools" menu and choose "Settings".'
        >
        </instruction-line>

        <instruction-line 
          field="Bitcoin P2P Endpoint"
          :value="`${urls.bitcoin.p2p.address}:${urls.bitcoin.p2p.port}`"
        >
        </instruction-line>

        <instruction-line 
          field="Tor SOCKS5 Endpoint"
          value="127.0.0.1:9050"
        >
        </instruction-line>

        <instruction-line 
          text='Restart the app.'
        >
        </instruction-line>

        <instruction-line 
          text='Wait a little while. The footer should display "Tor is running - Backend is connected".'
        >
        </instruction-line>

        <instruction-line 
          text="Congratulations! You've successfully connected Wasabi to your Umbrel."
          last
        >
        </instruction-line>
      </div>
    </connect-wallet-card>
  </div>
</template>

<script>
import ConnectWalletCard from "@/components/ConnectWallet/ConnectWalletCard.vue";
import InstructionLine from "@/components/ConnectWallet/InstructionLine.vue";

export default {
  props: {
    urls: Object
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {
    ConnectWalletCard,
    InstructionLine
  }
};
</script>

<style lang="scss" scoped></style>
