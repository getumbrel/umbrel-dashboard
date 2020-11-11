<template>
  <div>
    <connect-wallet-card
      name="Sparrow"
      icon="icon-wallet-sparrow.svg"
      subTitle="Instructions to setup Sparrow"
    >
      <div class="w-100 align-self-center ml-lg-3">
        <instruction-line 
          text='From the Welcome screen, click "Configure Server" to add the details of your Umbrel&#39;s Electrum server.'
        >
        </instruction-line>

        <instruction-line 
          field="URL"
          :value="urls.bitcoin.p2p.address"
        >
        </instruction-line>

        <instruction-line 
          field="Port"
          :value="urls.bitcoin.p2p.port"
        >
        </instruction-line>

        <instruction-line 
          text='Uncheck "Use SSL" and "Use Proxy".'
        >
        </instruction-line>

        <instruction-line 
          text='Click "Test Connection" and wait to verify if Sparrow is able to connect to your Umbrel.'
        >
        </instruction-line>

        <instruction-line 
          text='After verifying, close the server settings.'
        >
        </instruction-line>

        <instruction-line 
          text='At any moment, you can turn on or off the connection using the switch in the bottom right of the window.'
        >
        </instruction-line>

        <instruction-line 
          text="Congratulations! You've successfully connected Sparrow to your Umbrel."
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
