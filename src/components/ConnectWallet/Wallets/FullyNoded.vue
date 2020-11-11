<template>
  <div>
    <connect-wallet-card
      name="Fully Noded"
      icon="icon-wallet-fullynoded.svg"
      subTitle="Instructions to setup Fully Noded on iOS"
    >
      <div class="w-100 align-self-center">
        <instruction-line 
          text='Open the Fully Noded app.'
        >
        </instruction-line>

        <instruction-line 
          text='If you open the app for the first time, you should land directly on the "Bitcoin Core Node" view. Otherwise, go to the "Settings" tab, choose "Node Manager" and click on the +.'
        >
        </instruction-line>

        <div class="d-flex">
          <instruction-line 
            text='Scan the QR Code:'
          >
          </instruction-line>

          <img 
            :src="require(`@/assets/qr-code-icon.svg`)" 
            v-b-modal.qr-code-modal
          />
        </div>
        
        <instruction-line 
          text='Or manually enter the following values:'
        >
        </instruction-line>

        <instruction-line 
          field="RPC username"
          :value="urls.bitcoin.rpc.rpcuser"
        >
        </instruction-line>

        <instruction-line 
          field="RPC password"
          :value="urls.bitcoin.rpc.rpcpassword"
        >
        </instruction-line>

        <instruction-line 
          field="Address"
          :value="`${urls.bitcoin.rpc.address}:${urls.bitcoin.rpc.port}`"
        >
        </instruction-line>

        <instruction-line 
          text='Click "Save".'
        >
        </instruction-line>

        <instruction-line 
          text="Congratulations! You've successfully connected Wasabi to your Umbrel."
          last
        >
        </instruction-line>
      </div>
    </connect-wallet-card>

    <b-modal id="qr-code-modal" size="lg" centered hide-footer>
      <template v-slot:modal-header="{ close }">
        <div
          class="px-2 px-sm-3 pt-2 d-flex justify-content-between w-100"
        >
          <h3 class="text-lowercase">fully noded</h3>
          <!-- Emulate built in modal header close button action -->
          <a
            href="#"
            class="align-self-center"
            v-on:click.stop.prevent="close"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.6003 4.44197C13.3562 4.19789 12.9605 4.19789 12.7164 4.44197L9.02116 8.1372L5.32596 4.442C5.08188 4.19792 4.68615 4.19792 4.44207 4.442C4.198 4.68607 4.198 5.0818 4.44207 5.32588L8.13728 9.02109L4.44185 12.7165C4.19777 12.9606 4.19777 13.3563 4.44185 13.6004C4.68592 13.8445 5.08165 13.8445 5.32573 13.6004L9.02116 9.90497L12.7166 13.6004C12.9607 13.8445 13.3564 13.8445 13.6005 13.6004C13.8446 13.3563 13.8446 12.9606 13.6005 12.7165L9.90505 9.02109L13.6003 5.32585C13.8444 5.08178 13.8444 4.68605 13.6003 4.44197Z"
                fill="#6c757d"
              />
            </svg>
          </a>
        </div>
      </template>
      <div class="">
        <div class="d-flex flex-column-reverse justify-content-center align-items-center">
          <div class="m-2">
            <p>
              Scan this QR Code to connect.
            </p>
          </div>
          <!-- Pubkey QR Code -->
          <qr-code
            :value="urls.bitcoin.rpc.connectionString"
            :size="300"
            class="qr-image"
            showLogo
            logo="icon-wallet-fullynoded.svg"
          ></qr-code>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import ConnectWalletCard from "@/components/ConnectWallet/ConnectWalletCard.vue";
import InstructionLine from "@/components/ConnectWallet/InstructionLine.vue";
import QrCode from "@/components/Utility/QrCode.vue";

export default {
  props: {
    urls: Object
  },
  data() {
    return {};
  },
  created() {
    this.$emit("selectdevice", 'iOS');
  },
  computed: {},
  methods: {},
  components: {
    ConnectWalletCard,
    InstructionLine,
    QrCode
  }
};
</script>

<style lang="scss" scoped></style>
