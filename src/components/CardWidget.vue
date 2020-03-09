<template>
  <b-card header-tag="header" footer-tag="footer" no-body class="mb-4 card-custom">
    <div class="card-custom-loading-bar" v-if="loading"></div>
    <!-- <template v-slot:header></template> -->
    <div>
      <div class="card-custom-header p-4">
        <div class="d-flex w-100 justify-content-between">
          <h6 class="mb-0 font-weight-normal text-muted">{{ header }}</h6>
          <small class="text-success">
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
        <div class="card-app-info px-4">
          <div class="d-flex w-100 justify-content-between mb-4">
            <div>
              <h3 class="mb-1">{{ title }}</h3>
              <p class="text-muted mb-0">{{ subTitle }}</p>
            </div>
            <img :alt="header" :src="require(`@/assets/${icon}`)" />
          </div>
        </div>
        <slot></slot>
      </div>
    </div>
    <!-- <template v-slot:footer></template> -->
  </b-card>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    header: String,
    status: String,
    statusType: String,
    title: String,
    subTitle: String,
    icon: String,
    loading: Boolean,
    minHeight: String
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>