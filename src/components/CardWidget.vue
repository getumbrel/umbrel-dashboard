<template>
  <b-card header-tag="header" footer-tag="footer" no-body class="mb-4 card-custom">
    <div class="card-custom-loading-bar" v-if="loading"></div>
    <!-- <template v-slot:header></template> -->
    <div>
      <div class="card-custom-header p-4">
        <div class="d-flex w-100 justify-content-between">
          <h6 class="mb-0 font-weight-normal text-muted">{{ header }}</h6>
          <small class="text-success" v-if="status">
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="4" cy="4" r="4" fill="#00CD98" />
            </svg>
            {{ status }}
          </small>
        </div>
      </div>
      <div class="card-custom-body">
        <div class="card-app-info px-4" v-if="title || numericTitle">
          <div class="d-flex w-100 justify-content-between mb-4">
            <div>
              <h3 class="mb-1">{{ title }}</h3>
              <h3 class="mb-1" v-if="numericTitle">
                <ICountUp
                  :endVal="numericTitle.value"
                  :options="{'prefix': numericTitle.prefix, 'suffix': numericTitle.suffix, 'startVal': numericTitle.value}"
                />
              </h3>
              <p class="text-muted mb-0" v-if="subTitle">{{ subTitle }}</p>
            </div>
            <img :alt="header" :src="require(`@/assets/${icon}`)" v-if="icon" />
          </div>
        </div>
        <slot></slot>
      </div>
    </div>
    <!-- <template v-slot:footer></template> -->
  </b-card>
</template>

<script>
import ICountUp from "vue-countup-v2";

export default {
  data() {
    return {};
  },
  props: {
    header: String,
    status: String,
    statusType: String,
    title: String,
    numericTitle: Object,
    subTitle: String,
    icon: String,
    loading: Boolean
  },
  computed: {},
  methods: {},
  components: {
    ICountUp
  }
};
</script>

<style lang="scss" scoped>
</style>