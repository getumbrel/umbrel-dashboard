<template>
  <div>
    <connect-wallet-card
      name="Electrum"
      icon="icon-wallet-electrum.svg"
      subTitle="Instructions to setup Electrum"
    >
      <div class="w-100 align-self-center pl-lg-3">
        <div class="d-flex mb-3 align-items-center">
          <p class="mb-0 mr-2">Device:</p>
          <b-button class="mr-2" :variant="selectedDevice === 'Desktop' ? 'primary' : ''" @click="changeSelectedDevice('Desktop')">Desktop</b-button>
          <b-button class="mr-2" :variant="selectedDevice === 'Android' ? 'primary' : ''"  @click="changeSelectedDevice('Android')">Android</b-button>
        </div>
        
        <div v-if="selectedDevice === 'Desktop'">
          <instruction-line 
            text="Make sure Tor is installed and running on your system."
          >
          </instruction-line>

          <instruction-line 
            text='Open Electrum and click on the colored dot at the bottom right to open server setttings.'
          >
          </instruction-line>

          <instruction-line 
            text='Uncheck "Select server automatically". You may also want to add "oneserver: true" to "~/.electrum/config" file.'
          >
          </instruction-line>

          <instruction-line 
            field="Server"
            :value="urls.bitcoin.electrum.address"
          >
          </instruction-line>

          <instruction-line 
            field="Port"
            :value="urls.bitcoin.electrum.port"
          >
          </instruction-line>

          <instruction-line 
            text='Go to the "Proxy tab" and check "Use Tor proxy at port 9050" or manually enter the details below:'
          >
          </instruction-line>

          <instruction-line 
            field="Proxy"
            value="127.0.0.1"
          >
          </instruction-line>

          <instruction-line 
            field="Port"
            value="9050"
          >
          </instruction-line>

          <instruction-line 
            text='Close the server settings.'
          >
          </instruction-line>

          <instruction-line 
            text="If the dot turns blue, congratulations! You've successfully connected Electrum to your Umbrel."
            last
          >
          </instruction-line>
        </div>

        <div v-if="selectedDevice === 'Android'">
          <instruction-line 
            text="Follow the instructions at the right to setup Tor with Orbot."
          >
          </instruction-line>

          <instruction-line 
            text='Open Electrum and click on the settings icon and choose "Network"'
          >
          </instruction-line>

          <instruction-line 
            text='Set "Auto-connect" to OFF and "One-server mode" to ON.'
          >
          </instruction-line>

          <instruction-line 
            text='Set the "Proxy" settings with the details below, and select "socks5" mode:'
          >
          </instruction-line>

          <instruction-line 
            field="Proxy"
            value="localhost"
          >
          </instruction-line>

          <instruction-line 
            field="Port"
            value="9050"
          >
          </instruction-line>

          <instruction-line 
            text='Set the "Server" settings with the details below:'
          >
          </instruction-line>

          <instruction-line 
            field="Server"
            :value="urls.bitcoin.electrum.address"
          >
          </instruction-line>

          <instruction-line 
            field="Port"
            :value="urls.bitcoin.electrum.port"
          >
          </instruction-line>

          <instruction-line 
            text="If everything went correctly, you've successfully connected Electrum to your Umbrel. Congratulations!"
            last
          >
          </instruction-line>
        </div>
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
    return {
      selectedDevice: "Desktop"
    };
  },
  computed: {},
  methods: {
    changeSelectedDevice(device) {
      this.selectedDevice = device;
      this.$emit('selectdevice', device);
    }
  },
  components: {
    ConnectWalletCard,
    InstructionLine
  }
};
</script>

<style lang="scss" scoped></style>
