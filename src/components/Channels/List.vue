<template>
  <div class="channel-list-container">
    <div class="channel-list">
      <div
        class="d-flex align-items-center justify-content-center flex-column"
        style="height: 100%;"
        v-if="channels.length === 0"
      >
        <p class="text-muted w-75 text-center">
          🎉 We're opening payment channels to our first few users for free! Simply tweet your
          <a
            href="#"
            @click.prevent="$emit('showConnectionUri')"
          >connection uri</a> with a screenshot of your Umbrel's dashboard and tag us
          <a
            href="https://twitter.com/getumbrel"
            target="_blank"
          >@getumbrel</a>.
        </p>
        <a
          class="btn tweet-btn btn-sm px-2 py-1"
          href="https://twitter.com/intent/tweet"
          target="_blank"
        >
          <svg
            width="23"
            height="20"
            viewBox="0 0 23 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="mr-1"
          >
            <path
              d="M23 2.36772C22.1538 2.76969 21.2443 3.0404 20.2898 3.16243C21.2645 2.53794 22.0129 1.5484 22.3646 0.36916C21.4532 0.9475 20.4432 1.36792 19.3679 1.59454C18.5083 0.61321 17.2807 0 15.9237 0C12.8771 0 10.6385 3.04143 11.3265 6.19873C7.406 5.98852 3.92917 3.97867 1.60137 0.92391C0.365125 3.19319 0.96025 6.16181 3.06092 7.66509C2.2885 7.63843 1.56017 7.41181 0.924792 7.03343C0.873042 9.3724 2.43992 11.5607 4.70925 12.0478C4.04513 12.2406 3.31775 12.2857 2.57792 12.1339C3.17783 14.1397 4.92008 15.5989 6.98625 15.6399C5.0025 17.3041 2.50317 18.0476 0 17.7317C2.08821 19.1643 4.56933 20 7.2335 20C15.9946 20 20.9444 12.0826 20.6454 4.98154C21.5673 4.26887 22.3675 3.37982 23 2.36772Z"
              fill="#FFFFFF"
            />
          </svg>Tweet
        </a>
      </div>

      <div
        class="d-flex align-items-center justify-content-center"
        style="height: 100%;"
        v-else-if="channels[0]['type'] === 'loading'"
      >
        <b-spinner class="mb-4" variant="dark"></b-spinner>
      </div>

      <transition-group name="list" appear v-else>
        <div
          v-for="channel in channels"
          :key="channel.channelPoint"
          @click="$emit('selectchannel', channel)"
        >
          <channel :channel="channel"></channel>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Channel from "@/components/Channels/Channel";

export default {
  props: {},
  computed: {
    ...mapState({
      channels: state => state.lightning.channels
    })
  },
  data() {
    return {
      state: {}
    };
  },
  methods: {},
  components: {
    Channel
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
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
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
  height: 23rem; //to do: change to max-height
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; //momentum scroll on iOS
}

.tweet-btn {
  background-color: rgb(29, 161, 242);
  color: #fff;
  &:hover {
    background: #0c7abf;
    color: #fff;
  }
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
