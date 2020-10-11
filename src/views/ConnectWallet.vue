<template>
  <div class="p-sm-2">
    <div class="my-3 pb-2">
      <div class="d-flex justify-content-between align-items-center">
        <h1>connect wallet</h1>
      </div>
    </div>

    <b-row class="row-eq-height">
      <b-col col cols="12" md="6" xl="4">
        <card-widget header="Wallet">

        </card-widget>
      </b-col>
      <b-col col cols="12" md="6" xl="8">
        <card-widget header="Wallet">

        </card-widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

import CardWidget from "@/components/CardWidget";

export default {
  data() {
    return {
    
    };
  },
  computed: {
    ...mapState({
      onionAddress: state => state.system.onionAddress
    })
  },
  created() {
    
  },
  methods: {
    getReadableTime(timestamp) {
      return moment(timestamp).format("MMM D, h:mm:ss a");
    }
  },
  beforeDestroy() {
  
  },
  watch: {
    
  },
  components: {
    CardWidget
  }
};
</script>

<style lang="scss" scoped></style>
