<template>
  <div class="p-sm-2">
    <div class="my-3 pb-2">
      <div class="d-flex justify-content-between align-items-center">
        <h1>connect wallet</h1>
      </div>
    </div>

    <b-row class="mb-2" align-v="center">
      <b-col col cols="8" class="d-flex align-items-center">
        <b-form-select class="mr-2" v-model="selectedLayer">
          <b-form-select-option :value="null" disabled>Select a layer</b-form-select-option>
          <b-form-select-option value="bitcoin">Bitcoin</b-form-select-option>
          <b-form-select-option value="lightning">Lightning</b-form-select-option>
        </b-form-select>
        <b-form-select v-model="selectedComponent" :options="wallets[selectedLayer]" text-field="name" value-field="component">
          <template #first>
            <b-form-select-option :value="null" disabled>Select a wallet</b-form-select-option>
          </template>
        </b-form-select>
      </b-col>
    </b-row>

    <b-row>
      <b-col col cols="8">
          <component 
            v-if="selectedComponent" 
            :is="selectedComponent" 
            :urls="urls"
            v-on:selectdevice="changeSelectedDevice"
          ></component>
          <connect-wallet-card v-else>
            <p class="w-100 mb-0 text-center">Please select a wallet above.</p>
          </connect-wallet-card>
      </b-col>
      <b-col col cols="4">
        <tor-setup :selectedDevice="selectedDevice"></tor-setup>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

import TorSetup from "@/components/TorSetup.vue";
import ConnectWalletCard from "@/components/ConnectWallet/ConnectWalletCard.vue";

import wallets from "@/components/ConnectWallet/wallets.js"

export default {
  data() {
    return {
      selectedLayer: null,
      selectedDevice: null,
      selectedComponent: null,
      wallets
    }
  },
  computed: {
    ...mapState({
      urls: state => {
        return {
          bitcoin: {
            p2p: state.bitcoin.p2p,
            electrum: state.bitcoin.electrum,
            rpc: state.bitcoin.rpc
          },
          lnd: state.lightning.lndConnectUrls
        }
      }
    })
  },
  methods: {
    fetchConnectionDetails() {
      return Promise.all([
        this.$store.dispatch("lightning/getLndConnectUrls"),
        this.$store.dispatch("bitcoin/getP2PInfo"),
        this.$store.dispatch("bitcoin/getElectrumInfo"),
        this.$store.dispatch("bitcoin/getRpcInfo")
      ]);
    },
    changeSelectedDevice(device) {
      if(device === 'Desktop') {
        this.selectedDevice = null;
      } else {
        this.selectedDevice = device;
      }
    }
  },
  created() {
    this.fetchConnectionDetails();
  },
  components: {
    TorSetup,
    ConnectWalletCard
  }
};
</script>

<style lang="scss" scoped></style>
