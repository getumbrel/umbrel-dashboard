<template>
  <b-input-group size="sm">
    <b-form-input ref="copy-input-field" type="text" readonly v-model="value"></b-form-input>

    <b-input-group-append>
      <b-button
        :variant="state.isCopied ? 'success' : 'primary'"
        @click="copyText"
      >{{ state.isCopied ? 'Copied' : 'Copy' }}</b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
export default {
  props: {
    size: String,
    value: String
  },
  data() {
    return {
      state: {
        isCopied: false
      }
    };
  },
  methods: {
    copyText() {
      //copy generated invoice's text to clipboard

      const copyText = this.$refs["copy-input-field"];
      copyText.select();
      copyText.setSelectionRange(0, 99999); /*For mobile devices*/
      document.execCommand("copy");

      return (this.state.isCopied = true);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>