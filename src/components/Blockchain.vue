<template>
  <div>
    <div class="blockchain-container">
      <div v-if="blocks.length">
        <!-- transitions for blocks -->
        <transition-group name="blockchain" mode="out-in" tag="ul">
          <li
            href="#"
            class="flex-column align-items-start px-3 px-lg-4 blockchain-block"
            v-for="block in blocks"
            :key="block.height"
          >
            <div class="d-flex w-100 justify-content-between">
              <div class="d-flex">
                <div class="blockchain-block-icon">
                  <!-- <svg
                    width="28"
                    height="30"
                    viewBox="0 0 28 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.3472 8.84298C24.6806 8.07317 24.6806 6.14865 23.3472 5.37886L15.0304 0.577324C14.4116 0.220073 13.6493 0.220077 13.0305 0.577333L4.71387 5.37887C3.38053 6.14866 3.38052 8.07316 4.71384 8.84297L13.0304 13.6447C13.6493 14.0019 14.4117 14.0019 15.0305 13.6447L23.3472 8.84298Z"
                      fill="#5351FB"
                    />
                    <path
                      d="M14.9243 26.5359C14.9243 28.0755 16.591 29.0378 17.9243 28.268L26.2443 23.4644C26.8631 23.1072 27.2443 22.4469 27.2443 21.7324V12.1218C27.2443 10.5822 25.5777 9.61992 24.2444 10.3897L15.9243 15.1931C15.3055 15.5504 14.9243 16.2106 14.9243 16.9252V26.5359Z"
                      fill="#5351FB"
                    />
                    <path
                      d="M3.8164 10.3897C2.48306 9.61995 0.816406 10.5822 0.816406 12.1218V21.7324C0.816406 22.4469 1.1976 23.1072 1.81639 23.4644L10.1362 28.268C11.4695 29.0378 13.1362 28.0755 13.1362 26.5359V16.9252C13.1362 16.2106 12.755 15.5504 12.1362 15.1931L3.8164 10.3897Z"
                      fill="#5351FB"
                    />
                  </svg>-->
                  <div class="cube spin">
                    <div class="edge top">
                      <div class="inside"></div>
                    </div>
                    <div class="edge right">
                      <div class="inside"></div>
                    </div>
                    <div class="edge bottom">
                      <div class="inside"></div>
                    </div>
                    <div class="edge left">
                      <div class="inside"></div>
                    </div>
                    <div class="edge front">
                      <div class="inside"></div>
                    </div>
                    <div class="edge back">
                      <div class="inside"></div>
                    </div>
                  </div>

                  <div class="blockchain-block-icon-chainlink"></div>
                  <div class="blockchain-block-icon-bg"></div>
                </div>
                <div class="align-self-center">
                  <h6 class="mb-1 font-weight-normal">Block {{ block.height.toLocaleString() }}</h6>
                  <small
                    class="text-muted"
                    v-if="block.txs"
                  >{{ block.txs.toLocaleString() }} transactions</small>
                  <!-- <small class="text-muted" v-if="block.txs"> -->
                  <!-- <status variant="muted" blink>Validating</status> -->
                  <!-- <status variant="success">Valid</status> -->
                  <!-- <span>&bull; {{ Math.round(block.size / 1000) }} KB</span> -->
                  <!-- </small> -->
                </div>
              </div>
              <status variant="success" v-if="false">Valid</status>
              <small
                class="text-muted align-self-center text-right blockchain-block-timestamp"
                v-if="block.timestamp"
                :title="blockReadableTime(block.timestamp)"
              >{{ blockTime(block.timestamp) }}</small>
            </div>
          </li>
        </transition-group>
      </div>
      <div v-else>
        <ul>
          <li
            href="#"
            class="flex-column align-items-start px-3 px-lg-4 blockchain-block"
            v-for="(fake, index) in [1, 2, 3]"
            :key="index"
          >
            <div class="d-flex w-100 justify-content-between">
              <div class="d-flex">
                <div class="blockchain-block-icon blockchain-block-icon-loading">
                  <svg
                    width="28"
                    height="30"
                    viewBox="0 0 28 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.3472 8.84298C24.6806 8.07317 24.6806 6.14865 23.3472 5.37886L15.0304 0.577324C14.4116 0.220073 13.6493 0.220077 13.0305 0.577333L4.71387 5.37887C3.38053 6.14866 3.38052 8.07316 4.71384 8.84297L13.0304 13.6447C13.6493 14.0019 14.4117 14.0019 15.0305 13.6447L23.3472 8.84298Z"
                      fill="#D3D5DC"
                    />
                    <path
                      d="M14.9243 26.5359C14.9243 28.0755 16.591 29.0378 17.9243 28.268L26.2443 23.4644C26.8631 23.1072 27.2443 22.4469 27.2443 21.7324V12.1218C27.2443 10.5822 25.5777 9.61992 24.2444 10.3897L15.9243 15.1931C15.3055 15.5504 14.9243 16.2106 14.9243 16.9252V26.5359Z"
                      fill="#D3D5DC"
                    />
                    <path
                      d="M3.8164 10.3897C2.48306 9.61995 0.816406 10.5822 0.816406 12.1218V21.7324C0.816406 22.4469 1.1976 23.1072 1.81639 23.4644L10.1362 28.268C11.4695 29.0378 13.1362 28.0755 13.1362 26.5359V16.9252C13.1362 16.2106 12.755 15.5504 12.1362 15.1931L3.8164 10.3897Z"
                      fill="#D3D5DC"
                    />
                  </svg>

                  <div class="blockchain-block-icon-chainlink"></div>
                  <div class="blockchain-block-icon-bg"></div>
                </div>
                <div class="align-self-center">
                  <span class="d-block loading-placeholder mb-1" style="width: 140px;"></span>
                  <span
                    class="d-block loading-placeholder loading-placeholder-sm"
                    style="width: 80px"
                  ></span>
                </div>
              </div>
              <span
                class="loading-placeholder loading-placeholder-sm align-self-center text-right"
                style="width: 40px"
              ></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";

import Status from "@/components/Utility/Status";

export default {
  data() {
    return {
      polling: null,
      pollInProgress: false
    };
  },
  computed: {
    ...mapState({
      syncPercent: state => state.bitcoin.percent,
      blocks: state => state.bitcoin.blocks
    })
  },
  methods: {
    async fetchBlocks() {
      //prevent multiple polls if previous poll already in progress
      if (this.pollInProgress) {
        return;
      }
      this.pollInProgress = true;
      await this.$store.dispatch("bitcoin/getBlocks");
      this.pollInProgress = false;
    },
    poller(syncPercent) {
      window.clearInterval(this.polling);
      //if syncing or first load, fetch blocks every second
      if (Number(syncPercent) !== 100 || this.blocks.length === 0) {
        this.polling = window.setInterval(this.fetchBlocks, 1000);
      } else {
        //else, slow down and fetch blocks every minute
        this.polling = window.setInterval(this.fetchBlocks, 1000);
      }
    },
    blockTime(timestamp) {
      const minedAt = timestamp * 1000;
      //sometimes the block can have a timestamp with a few seconds in the future compared to browser's time
      if (moment(minedAt).isBefore(moment())) {
        return moment(minedAt).fromNow();
      } else {
        return "now";
      }
    },
    blockReadableTime(timestamp) {
      return moment(timestamp * 1000).format("MMMM D, h:mm:ss a");
    }
  },
  created() {
    //immediately fetch blocks on first load
    this.fetchBlocks();

    //then start polling
    this.poller(this.syncPercent);
  },
  watch: {
    syncPercent(newPercent) {
      // reset polling time depending upon sync %
      this.poller(newPercent);
    }
  },
  beforeDestroy() {
    window.clearInterval(this.polling);
  },
  props: {
    numBlocks: {
      type: Number,
      default: 3
    }
  },

  components: {
    Status
  }
};
</script>

<style lang="scss" scoped>
.blockchain-container {
  position: relative;
  ul {
    list-style: none;
    padding: 1rem 0;
    margin: 0;
    // max-height: 18rem;
    height: 19rem;
    overflow: hidden;
    // overflow-y: scroll;
    // -webkit-overflow-scrolling: touch; //momentum scroll on iOS
  }
  //bottom fade
  &:before {
    //nice faded white so the discarded blocks don't abruptly cut off
    content: "";
    position: absolute;
    height: 2rem;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 2;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1)
    );
  }

  //top fade
  &:after {
    //nice faded white so the discarded blocks don't abruptly cut off
    content: "";
    position: absolute;
    height: 2rem;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    background-image: linear-gradient(
      to top,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1)
    );
  }
}
.blockchain-block {
  padding: 0 0 2rem 0;
}
.blockchain-block-icon {
  margin-right: 1rem;
  position: relative;
  height: 4rem;
  width: 4rem;

  svg {
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .blockchain-block-icon-chainlink {
    position: absolute;
    height: 4rem;
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
  &.blockchain-block-icon-loading {
    .blockchain-block-icon-bg {
      background: #ffffff;
      box-shadow: inset 0px 4px 14px rgba(0, 0, 0, 0.14);
    }
    .blockchain-block-icon-chainlink {
      background: #ededf0;
    }
  }
}

.blockchain-block {
  transition: all 0.6s ease-in-out;
}
.blockchain-block-icon {
  svg {
    transition: all 0.6s cubic-bezier(0.77, 0, 0.175, 1);
    transition-delay: 0.1s;
  }
  .blockchain-block-icon-bg {
    transition: all 0.6s cubic-bezier(0.77, 0, 0.175, 1);
  }
}
.blockchain-enter {
  opacity: 0;
  transform: translateY(2rem);
  .blockchain-block-icon {
    svg {
      transform: translate(-50%, -50%) scale(0);
    }
    .blockchain-block-icon-bg {
      transform: scale(0);
      background: #5351fb;
    }
  }
}
.blockchain-enter-to {
  opacity: 1;

  .blockchain-block-icon {
    svg {
      transform: translate(-50%, -50%) scale(1);
    }
    .blockchain-block-icon-bg {
      transform: scale(1);
      background: #eeeeff;
    }
  }
}
.blockchain-leave {
  opacity: 1;
}
.blockchain-leave-to {
  opacity: 0;
  transform: translateY(2rem);
}

.blockchain-leave-active {
  // position: absolute;
}

* {
  margin: 0px;
  padding: 0px;
}

html,
body {
  width: 100%;
  height: 100%;
}

.cube {
  $cube-size: 22px;

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

  &.spin {
    animation: spin 5s forwards ease;
  }

  .edge {
    width: $cube-size;
    height: $cube-size;
    line-height: $cube-size;
    text-align: center;
    box-shadow: inset 0px 0px 0px 1px #eeeeff;
    // box-shadow: inset 0px 0px 0px 1px #fff;
    background: #eeeeff;
    // background: #fff;
    display: block;
    position: absolute;
    .inside {
      position: absolute;
      top: $cube-size * 0.1;
      left: $cube-size * 0.1;
      width: $cube-size * 0.8;
      height: $cube-size * 0.8;
      background: #5351fb;
      // background: #d3d5dc;
      border-radius: $cube-size * 0.2;
    }
    &.top {
      transform: rotate3d(1, 0, 0, 90deg);
      margin-top: -($cube-size * 0.5);
    }
    &.right {
      transform: rotate3d(0, 1, 0, 90deg);
      margin-left: $cube-size * 0.5;
    }
    &.bottom {
      transform: rotate3d(1, 0, 0, -90deg);
      margin-top: $cube-size * 0.5;
    }
    &.left {
      transform: rotate3d(0, 1, 0, -90deg);
      margin-left: -($cube-size * 0.5);
    }
    &.front {
      transform: translateZ($cube-size * 0.5);
    }
    &.back {
      transform: translateZ(-($cube-size * 0.5)) rotate3d(1, 0, 0, 180deg);
    }
  }
}

@keyframes spin {
  0% {
    transform: rotateX(-40deg) rotateY(45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(-40deg) rotateY(945deg) rotateZ(540deg);
  }
}

.blockchain-block-timestamp {
  position: relative;
  &:after {
    position: absolute;
    top: 0;
    right: 0;
    content: "Validating...";
    color: #b1b5b9;
    background: #fff;
    width: 100%;
    height: 100%;
    transform: translateY(0);
    animation: slide-up 0.4s forwards ease;
    animation-delay: 3s;
  }
  &:before {
    position: absolute;
    top: 0;
    right: 0;
    content: "● Validated";
    color: #00cd98;
    background: #fff;
    width: 100%;
    height: 100%;
    transform: translateY(0);
    animation: slide-up 0.4s forwards ease;
    animation-delay: 4.6s;
  }
}

@keyframes slide-up {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-10px) rotateX(30deg);
    opacity: 0;
  }
}
</style>
