<template>
  <div class="channel-list-container">
    <div class="channel-list">
      <transition-group name="list" appear>
        <div v-for="(channel, index) in channels" :key="index" class="py-3 px-4 channel">
          <b-row align-v="center">
            <b-col col cols="12" xl="3">
              <!-- on large screens -->
              <div class="d-none d-xl-block">
                <!-- <div>
              <svg
                width="8"
                height="8"
                class="mr-1"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="4" cy="4" r="4" fill="#00CD98" :class="`fill-${variant}`" />
              </svg>
              <small class>Channel {{index + 1}}</small>
                </div>-->
                <status variant="success" size="sm">Online</status>
                <span
                  class="text-muted d-block"
                >{{ channel.initiator ? `Opened by you` : `Opened by peer` }}</span>
              </div>

              <!-- on small screens -->
              <div class="d-xl-none d-flex justify-content-between align-items-center mb-1">
                <!-- <div>
              <svg
                width="8"
                height="8"
                class="mr-1"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="4" cy="4" r="4" fill="#00CD98" :class="`fill-${variant}`" />
              </svg>
              <small class="text-muted">Channel {{index + 1}}</small>
                </div>-->
                <status variant="success" size="sm">Online</status>
                <small
                  class="text-muted d-block"
                >{{ channel.initiator ? `Opened by you` : `Opened by peer` }}</small>
              </div>
            </b-col>
            <b-col col cols="12" xl="9">
              <div class="channel">
                <div class="channel-balances d-flex justify-content-between">
                  <span
                    class="text-primary font-weight-"
                  >{{ Number(channel.localBalance).toLocaleString() }} Sats</span>
                  <span
                    class="text-success font-weight-"
                  >{{ Number(channel.remoteBalance).toLocaleString() }} Sats</span>
                </div>
                <div
                  class="channel-bar my-1"
                  :style="{background: getChannelBarGradient(Number(channel.localBalance), Number(channel.remoteBalance))}"
                ></div>
                <div class="channel-balances d-flex justify-content-between">
                  <small class="text-muted">Max Send</small>
                  <small class="text-muted">Max Receive</small>
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import Status from "@/components/Status";
export default {
  props: {},
  computed: {
    channels() {
      return this.$store.state.lightning.channels;
    }
  },
  data() {
    return {
      state: {}
    };
  },
  methods: {
    getChannelBarGradient(leftValue, rightValue) {
      const leftPercent = Math.round(
        (leftValue * 100) / (leftValue + rightValue)
      );
      if (leftPercent === 100) {
        return `#5351FB`;
      }
      if (leftPercent === 0) {
        return `#00CD98`;
      }
      return `linear-gradient(90deg, #5351FB 0%, #5351FB ${leftPercent -
        7}%, #00CD98 ${leftPercent + 7}%, #00CD98 100%)`;
    }
  },
  components: {
    Status
  }
};
</script>

<style lang="scss" scoped>
.channel-list-container {
  overflow: hidden;
  position: relative;

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
.channel-list {
  height: 20rem; //to do: change to max-height
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; //momentum scroll on iOS
}
.channel {
  transition: background-color 0.2s ease;
  &:hover {
    cursor: pointer;
    background-color: #f4f5f7;
  }
}
.channel-bar {
  height: 5px;
  border-radius: 5px;
  background: red;
}

//list transitions

.list-enter-active,
.list-leave-active {
  transition: transform 0.8s, opacity 0.8s ease;
}
.list-enter {
  transform: translate3d(0, 10px, 0);
  opacity: 0;
}
.list-enter-to {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}
.list-leave {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}
.list-leave-to {
  transform: translate3d(0, 10px, 0);
  opacity: 0;
}
</style>
