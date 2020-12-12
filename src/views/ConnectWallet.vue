<template>
  <div class="p-sm-2">
    <div class="my-3">
      <div>
        <h1>connect wallet</h1>
        <p>Connect your Bitcoin or Lightning wallet to your Umbrel</p>
      </div>
    </div>

    <b-row>
      <b-col cols="12" md="4" xl="3">
        <b-form-select
          :value="wallet"
          :options="options"
          @change="selectWallet"
          class="mb-4"
        ></b-form-select>
      </b-col>
    </b-row>

    <router-view :urls="urls"></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      options: [
        { value: null, text: "Select your wallet", disabled: true },
        {
          label: "Bitcoin",
          options: [
            { value: "bitboxapp", text: "BitBoxApp" },
            { value: "blockstream-green", text: "Blockstream Green (Android)" },
            { value: "bluewallet-android", text: "BlueWallet (Android)" },
            { value: "electrum-android", text: "Electrum (Android)" },
            { value: "electrum-desktop", text: "Electrum (Desktop)" },
            { value: "fully-noded", text: "Fully Noded" },
            { value: "phoenix", text: "Phoenix" },
            { value: "sparrow", text: "Sparrow" },
            { value: "specter-desktop", text: "Specter Desktop" },
            { value: "wasabi", text: "Wasabi" },
          ],
        },
        {
          label: "Bitcoin (Custom)",
          options: [
            { value: "bitcoin-core-p2p", text: "Bitcoin Core P2P" },
            { value: "bitcoin-core-rpc", text: "Bitcoin Core RPC" },
            { value: "electrum-server", text: "Electrum Server" },
          ],
        },
        {
          label: "Lightning",
          options: [
            { value: "zap-android", text: "Zap (Android)" },
            { value: "zap-desktop", text: "Zap (Desktop)" },
            { value: "zap-ios", text: "Zap (iOS)" },
            { value: "zeus-android", text: "Zeus (Android)" },
            { value: "zeus-ios", text: "Zeus (iOS)" },
          ],
        },
        {
          label: "Lightning (Custom)",
          options: [
            { value: "lndconnect-grpc-local", text: "lndconnect gRPC (Local)" },
            { value: "lndconnect-grpc-tor", text: "lndconnect gRPC (Tor)" },
            { value: "lndconnect-rest-local", text: "lndconnect REST (Local)" },
            { value: "lndconnect-rest-tor", text: "lndconnect REST (Tor)" },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapState({
      urls: (state) => {
        return {
          bitcoin: {
            p2p: state.bitcoin.p2p,
            electrum: state.bitcoin.electrum,
            rpc: state.bitcoin.rpc,
          },
          lnd: state.lightning.lndConnectUrls,
        };
      },
    }),
    wallet() {
      return this.$route.meta.wallet || null;
    },
  },
  methods: {
    fetchConnectionDetails() {
      return Promise.all([
        this.$store.dispatch("lightning/getLndConnectUrls"),
        this.$store.dispatch("bitcoin/getP2PInfo"),
        this.$store.dispatch("bitcoin/getElectrumInfo"),
        this.$store.dispatch("bitcoin/getRpcInfo"),
      ]);
    },
    selectWallet(wallet) {
      this.$router.push(`/connect/${wallet}`);
    },
  },
  created() {
    this.fetchConnectionDetails();
  },
  components: {},
};
</script>

<style lang="scss" scoped></style>
