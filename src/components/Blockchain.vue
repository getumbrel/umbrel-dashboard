<template>
  <div>
    <div class="blockchain-container">
      <!-- transitions for blocks + set max height of blocks container as avg block height = 6rem -->
      <transition-group
        name="blockchain"
        mode="out-in"
        tag="ul"
        :style="{ maxHeight: `${numBlocks * 6}rem` }"
      >
        <li
          href="#"
          class="flex-column align-items-start px-4 blockchain-block"
          v-for="block in blocks"
          :key="block.number"
        >
          <div class="d-flex w-100 justify-content-between">
            <div class="d-flex">
              <div class="blockchain-block-icon">
                <svg
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
                </svg>

                <div class="blockchain-block-icon-chainlink"></div>
                <div class="blockchain-block-icon-bg"></div>
              </div>
              <div class="align-self-center">
                <h6 class="mb-1 font-weight-normal">
                  Block {{ block.number.toLocaleString() }}
                </h6>
                <small class="text-muted"
                  >{{ block.txs.toLocaleString() }} transactions</small
                >
              </div>
            </div>
            <small class="text-muted align-self-center">{{
              block.timestamp
            }}</small>
          </div>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      polling: null,
      pollInProgress: false
    };
  },
  computed: {
    ...mapState({
      syncPercent: state => state.bitcoin.percent
    }),
    blocks() {
      const currentBlock = this.$store.state.bitcoin.currentBlock;
      if (currentBlock) {
        return [
          {
            number: currentBlock, //block number
            txs: 1802, //num of txs in block
            timestamp: "few secs ago" //block's mining timestamp
          },
          {
            number: currentBlock - 1,
            txs: 1934,
            timestamp: "12 mins ago"
          },
          {
            number: currentBlock - 2,
            txs: 1783,
            timestamp: "19 mins ago"
          },
          {
            number: currentBlock - 3,
            txs: 1723,
            timestamp: "27 mins ago"
          },
          {
            number: currentBlock - 4,
            txs: 1982,
            timestamp: "34 mins ago"
          }
        ];
      } else {
        return [];
      }
    }
  },
  methods: {
    async fetchBlocks() {
      //prevent multiple polls if previous poll already in progress
      if (this.pollInProgress) {
        return;
      }
      this.pollInProgress = true;
      await this.$store.dispatch("bitcoin/getSync");
      this.pollInProgress = false;
    },
    poller(syncPercent) {
      window.clearInterval(this.polling);
      //if syncing, fetch blocks every second
      if (Number(syncPercent) !== 100) {
        console.log("Synching... fetching blocks every SECOND");
        this.polling = window.setInterval(this.fetchBlocks, 1000);
      } else {
        //else, slow down and fetch blocks every minute
        console.log("100% Synched... fetching blocks every MINUTE");
        this.polling = window.setInterval(this.fetchBlocks, 60 * 1000);
      }
    }
  },
  created() {
    //immediately fetch blocks on first load
    this.fetchBlocks();

    //then start polling
    this.poller(this.syncPercent);
  },
  watcher: {
    syncPercent: newPercent => {
      // reset polling depending upon sync %
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

  components: {}
};
</script>

<style lang="scss" scoped>
.blockchain-container {
  position: relative;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    // max-height: 18rem;
  }
  overflow: hidden;
  &:after {
    //nice faded white so the discarded blocks don't abruptly cut off
    content: "";
    position: absolute;
    height: 2rem;
    width: 100%;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(
      to bottom,
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
</style>
