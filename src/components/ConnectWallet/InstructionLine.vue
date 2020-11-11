<template>
  <b-list-group-item class="d-flex justify-content-start align-items-center pb-1 pt-0" style="background: none">
    <div class="blockchain-block-icon">
      <div class="blockchain-block-icon-cube">
        <span class="edge top">
          <span class="inside"></span>
        </span>
        <span class="edge left">
          <span class="inside"></span>
        </span>
        <span class="edge front">
          <span class="inside"></span>
        </span>
      </div>

      <div v-if="!last" class="blockchain-block-icon-chainlink"></div>
      <div class="blockchain-block-icon-bg"></div>
    </div>
    <div>
      <div v-if="field && value" class="d-flex justify-content-start align-items-center flex-wrap">
        <div class="pr-2 text-center text-lg-left text-nw">
          In the "<strong>{{ field }}</strong
          >" field, enter
        </div>
        <input-copy :value="value" size="sm" :style="{ width: `${70+String(value).length*8}px`} /* Magical magic numbers */"></input-copy>
      </div>
      <div v-if="text" class="text-center text-lg-left">
        {{ text }}
      </div>
    </div>
  </b-list-group-item>
</template>

<script>
import InputCopy from "@/components/Utility/InputCopy";

export default {
  props: {
    text: String,
    field: String,
    value: String,
    last: Boolean
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {
    InputCopy
  }
};
</script>

<style lang="scss" scoped>
.text-nw {
  white-space: nowrap;
}

.blockchain-block {
  padding: 0 0 2rem 0;
}
.blockchain-block-icon {
  margin-right: 1rem;
  position: relative;
  height: 2rem;
  width: 2rem;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  .blockchain-block-icon-chainlink {
    position: absolute;
    height: 3rem;
    width: 2px;
    background: #eeeeff;
    top: 50%;
    left: calc(50% - 1px);
  }

  .blockchain-block-icon-bg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: #eeeeff;
    z-index: 0;
    border-radius: 100%;
  }
}

.blockchain-block-icon-cube {
  $cube-size: 10px;

  transform-style: preserve-3d;
  position: absolute;
  width: $cube-size;
  height: $cube-size;
  top: 50%;
  left: 50%;
  z-index: 1;
  margin-left: -($cube-size * 0.5);
  margin-top: -($cube-size * 0.5);

  transform: rotateX(-40deg) rotateY(45deg) rotateZ(0deg);

  .edge {
    width: $cube-size;
    height: $cube-size;
    line-height: $cube-size;
    text-align: center;
    box-shadow: inset 0px 0px 0px 1px #eeeeff;
    background: #eeeeff;
    display: block;
    position: absolute;
    .inside {
      position: absolute;
      top: $cube-size * 0.1;
      left: $cube-size * 0.1;
      width: $cube-size * 0.8;
      height: $cube-size * 0.8;
      background: #5351fb;
      border-radius: $cube-size * 0.2;
    }
    &.top {
      transform: rotate3d(1, 0, 0, 90deg);
      margin-top: -($cube-size * 0.5);
    }
    &.left {
      transform: rotate3d(0, 1, 0, -90deg);
      margin-left: -($cube-size * 0.5);
    }
    &.front {
      transform: translateZ($cube-size * 0.5);
    }
  }
}
</style>
