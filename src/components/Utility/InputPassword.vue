<template>
  <b-input-group :class="[getGroupClassesByStyle, displayInvalidAttempt ? 'incorrect-password' : '']">
    <b-form-input
      :class="getInputClassesByStyle"
      :placeholder="placeholder"
      :type="showPassword ? 'text' : 'password'"
      :value="value"
      @input="updateInputValue"
      :disabled="disabled"
    />
    <b-input-group-append>
      <b-button :class="getInputClassesByStyle" @click="togglePassword" :disabled="disabled">
        <b-icon :icon="showPassword ? 'eye-slash-fill' : 'eye-fill'"></b-icon>
      </b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
const CardStyle = "CardStyle";
const FormStyle = "FormStyle";
export default {
  props: {
    value: String,
    displayInvalidAttempt: {
      type: Boolean,
      default: false
    },
    displayStyle: {
      type: String,
      default: CardStyle
    },
    placeholder: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showPassword() {
      return this.state.showPassword;
    },
    getGroupClassesByStyle() {
      return this.displayStyle === FormStyle
        ? "form-input-group"
        : "card-input-group";
    },
    getInputClassesByStyle() {
      return this.displayStyle === FormStyle
        ? "form-control-lg form-input-group-input btn-lg"
        : "card-input-group-input";
    },
  },
  data() {
    return {
      state: {
        showPassword: false
      }
    };
  },
  methods: {
    togglePassword() {
      return (this.state.showPassword = !this.state.showPassword);
    },
    updateInputValue: function(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.incorrect-password {
  animation: shake 1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
