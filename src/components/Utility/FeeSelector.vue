<template>
  <div class="vue-slider-container">
    <vue-slider
      v-model="chosenFee"
      absorb
      marks
      :data="data"
      :dotSize="[22, 22]"
      :tooltip-formatter="tooltipFormatter"
      contained
      :tooltip="
        fee.fast.total <= 0 ||
        fee.fast.total === '--' ||
        fee.fast.total === 'N/A' ||
        disabled
          ? 'none'
          : 'always'
      "
      :disabled="
        fee.fast.total <= 0 ||
          fee.fast.total === '--' ||
          fee.fast.total === 'N/A' ||
          disabled
      "
      @change="change"
    >
      <template v-slot:label="{ active, value }">
        <div :class="['vue-slider-mark-label', 'text-center', { active }]">
          <!-- <span class="text-capitalize">{{ value }}</span> -->
          <span class="text-muted">~ {{ timeToConfirm(value) }}</span>
        </div>
      </template>
    </vue-slider>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

export default {
  props: {
    fee: Object,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chosenFee: "normal",
      data: ["cheapest", "slow", "normal", "fast"],
      tooltipFormatter: value =>
        `${Number(this.fee[value]["total"]).toLocaleString()} Sats`
    };
  },
  computed: {},
  methods: {
    change(value) {
      this.$emit("change", value);
    },
    timeToConfirm(fee) {
      if (fee === "fast") {
        return "10 min";
      }
      if (fee === "normal") {
        return "60 min";
      }
      if (fee === "slow") {
        return "4 hrs";
      }
      if (fee === "cheapest") {
        return "24 hrs";
      }
    }
  },
  components: {
    VueSlider
  }
};
</script>

<style lang="scss">
/* Set the theme color of the component */
$themeColor: #edeef1;

$bgColor: #edeef1;
$railBorderRadius: 15px !default;

$dotShadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
$dotShadowFocus: 0px 4px 10px rgba(0, 0, 0, 0.4);
$dotBgColor: #fff !default;
$dotBgColorDisable: #ccc !default;
$dotBorderRadius: 50% !default;

$tooltipBgColor: #fff !default;
$tooltipColor: #141821 !default;
$tooltipBorderRadius: 5px !default;
$tooltipPadding: 2px 5px !default;
$tooltipMinWidth: 20px !default;
$tooltipArrow: 10px !default;
$tooltipFontSize: 0.8rem !default;

$stepBorderRadius: 50% !default;
$stepBgColor: rgba(0, 0, 0, 0.1) !default;

$labelFontSize: 0.8rem;

/* import theme style */
@import "~vue-slider-component/lib/theme/default.scss";

.vue-slider-container {
  padding-top: 2rem;
  padding-bottom: 3rem;
}

.vue-slider-ltr .vue-slider-mark-label,
.vue-slider-rtl .vue-slider-mark-label {
  margin-top: 1rem;
}

.vue-slider-dot {
  //   transition: left 0.5s cubic-bezier(0.77, 0, 0.175, 1) !important;
}

.vue-slider-dot-handle {
  transition: box-shadow 0.2s, background-color 0.2s ease;
}
.vue-slider-dot-tooltip {
  transition: opacity 0.2s ease;
}

.vue-slider-rail {
  cursor: pointer;
  background: linear-gradient(to right, #f6b900, #00cd98);
}
.vue-slider-process {
  background-color: transparent;
}
.vue-slider-disabled {
  .vue-slider-rail {
    cursor: not-allowed;
    background: #ccc;
  }
}
.vue-slider-dot-handle-disabled {
  box-shadow: none;
}
.vue-slider-mark-label {
  //   text-transform: capitalize;
}
.vue-slider-ltr {
  .vue-slider-mark:first-child {
    .vue-slider-mark-label,
    .vue-slider-mark-label {
      left: 0;
      transform: translateX(0);
      text-align: left !important;
    }
  }
  .vue-slider-mark:last-child {
    .vue-slider-mark-label,
    .vue-slider-mark-label {
      left: 100%;
      transform: translateX(-100%);
      text-align: right !important;
    }
  }
}

.vue-slider-dot-tooltip-inner {
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.18);
}
</style>
