<template>
  <card-widget header="Weekly Forwarding">
    <div class="px-3 px-lg-4">
      <b-row>
        <b-col col cols="6" xl="3">
          <stat
            title="Total Forwards"
            :value="forwards.length"
            showNumericChange
          ></stat>
        </b-col>
        <b-col col cols="6" xl="3">
          <stat
            title="Total Inbound"
            :value="totalInbound | unit"
            :suffix="unit | formatUnit"
          >
          </stat>
        </b-col>
        <b-col col cols="6" xl="3">
          <stat
            title="Total Outbound"
            :value="totalOutbound | unit"
            :suffix="unit | formatUnit"
          >
          </stat>
        </b-col>
        <b-col col cols="6" xl="3">
          <stat
            title="Total Fees"
            :value="totalFees | unit"
            :suffix="unit | formatUnit"
          >
          </stat>
        </b-col>
      </b-row>
    </div>
  </card-widget>
</template>

<script>
import { mapState } from "vuex";

import CardWidget from "@/components/CardWidget";
import Stat from "@/components/Utility/Stat";

export default {
  props: {},
  computed: {
    ...mapState({
      forwards: state => state.lightning.forwards,
      unit: state => state.system.unit
    }),
    totalInbound() {
      return this.forwards.reduce((count, current) => {
        return count + parseInt(current.amtIn);
      }, 0);
    },
    totalOutbound() {
      return this.forwards.reduce((count, current) => {
        return count + parseInt(current.amtOut);
      }, 0);
    },
    totalFees() {
      return this.forwards.reduce((count, current) => {
        return count + parseInt(current.fee);
      }, 0);
    }
  },
  methods: {},
  watch: {},
  async created() {
    await this.$store.dispatch("lightning/getForwards");
  },
  components: {
    CardWidget,
    Stat
  },
};
</script>
