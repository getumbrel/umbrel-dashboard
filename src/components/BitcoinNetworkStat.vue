<template>
  <div>
    <span>{{ title }}</span>
    <div class="pt-2 pb-4">
      <div class="mb-1">
        <h3 class="font-weight-normal d-inline">
          <!-- if number is like 100K, 120K, 2M, etc (i.e. with suffix) -->
          <span>
            <CountUp :endVal="value" :options="{'suffix': numberSuffix ? numberSuffix : ''}" />
          </span>
        </h3>
        <span class="text-muted d-inline" style="margin-left: 0.5rem;">{{ suffix }}</span>
      </div>
      <div v-if="change">
        <svg
          width="12"
          height="13"
          viewBox="0 0 12 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="change-arrow"
          :class="{
            rising: change.value > 0,
            declining: change.value < 0,
            neutral: change.value === 0
          }"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.11092 1.90381C1.11092 2.45609 1.55863 2.90381 2.11092 2.90381H8.18198L0.696702 10.3891C0.306178 10.7796 0.306178 11.4128 0.696702 11.8033C1.08723 12.1938 1.72039 12.1938 2.11092 11.8033L9.69588 4.21833L9.95069 10.079C9.97468 10.6307 10.4414 11.0586 10.9932 11.0346C11.545 11.0106 11.9728 10.5439 11.9488 9.9921L11.5953 1.86037C11.572 1.32549 11.1316 0.903809 10.5962 0.903809H2.11092C1.55863 0.903809 1.11092 1.35152 1.11092 1.90381Z"
            fill="#00CD98"
          />
        </svg>
        <span
          class="change-text ml-1"
          :class="{
            'text-success': change.value > 0,
            'text-danger': change.value < 0,
            'text-muted': change.value === 0
          }"
        >
          {{ change.value >= 0 ? "+" : "" }}{{ change.value
          }}{{ change.suffix }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import CountUp from "@/components/Utility/CountUp";
export default {
  props: {
    title: String,
    value: Number,
    suffix: String,
    numberSuffix: {
      type: String,
      default: ""
    },
    change: {
      value: Number,
      suffix: String
    }
  },
  computed: {},
  data() {
    return {};
  },
  methods: {},
  components: {
    CountUp
  }
};
</script>

<style lang="scss" scoped>
.change-arrow {
  transition: transform 0.4s ease-in-out;
  path {
    transition: fill 0.4s ease-in-out;
  }
  &.neutral {
    transform: rotate(-45deg);
    path {
      fill: var(--gray);
    }
  }
  &.rising {
    path {
      fill: var(--success, #00cd98);
    }
  }
  &.declining {
    transform: rotate(90deg);
    path {
      fill: var(--danger, #f46e6e);
    }
  }
}

.change-text {
  transition: color 0.4s ease;
}
</style>
