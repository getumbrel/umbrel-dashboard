<template>
  <b-card no-body class="w-100 mb-4 card-custom">
    <div class="card-custom-body py-4">
      <div class="card-app-info px-3 px-lg-4" v-if="name">
        <div class="d-flex w-100 justify-content-between mb-2">
          <div>
            <div>
              <h3 v-if="name" class="mb-1">{{ name }}</h3>
              <h3 class="mb-1" v-else>
                <slot name="title"></slot>
              </h3>
              <p class="text-muted mb-0" v-if="subTitle">{{ subTitle }}</p>
            </div>
          </div>
          <img :src="require(`@/assets/${icon}`)" v-if="icon" />
        </div>
      </div>
      <div class="w-100 align-self-center ml-lg-3">
        <slot></slot>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    name: String,
    subTitle: String,
    icon: String,
    loading: Boolean
  },
  computed: {},
  methods: {},
  components: {

  }
};
</script>

<style lang="scss" scoped></style>
