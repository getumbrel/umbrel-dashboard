<template>
  <div>
    <div class="mb-4">
      <div class="flex justify-between">
        <h4
          class="text-primary font-weight-bold"
          v-b-tooltip.hover.right
          :title="channel.localBalance | satsToUSD"
        >
          {{ channel.localBalance | unit | localize }} {{ unit | formatUnit }}
        </h4>
        <h4
          class="text-success font-weight-bold text-right"
          v-b-tooltip.hover.left
          :title="channel.remoteBalance | satsToUSD"
        >
          {{ channel.remoteBalance | unit | localize }} {{ unit | formatUnit }}
        </h4>
      </div>
      <bar
        :local="Number(channel.localBalance)"
        :remote="Number(channel.remoteBalance)"
        size="lg"
        class="my-1"
      ></bar>
      <div class="flex justify-between">
        <b class="text-gray-500">Max Send</b>
        <b class="text-gray-500 text-right">Max Receive</b>
      </div>
    </div>

    <transition name="mode-change" mode="out-in">
      <div v-if="!isReviewingChannelClose">
        <div class="flex justify-between items-center mt-1 mb-3">
          <span class="text-gray-500">Status</span>
          <span class="text-capitalize font-weight-bold">{{
            channel.status
          }}</span>
        </div>

        <div class="flex justify-between items-center mb-3">
          <span class="text-gray-500">Channel Type</span>
          <span class="text-capitalize font-weight-bold"
            >{{ channel.private ? "Private" : "Public" }} Channel</span
          >
        </div>

        <div class="flex justify-between items-center mb-3">
          <span class="text-gray-500">Remote Peer Alias</span>
          <div class="w-75 text-right">
            <span class="font-weight-bold" style="overflow-wrap: break-word">{{
              channel.remoteAlias
            }}</span>
          </div>
        </div>

        <div
          class="flex justify-between items-center mb-3"
          v-if="channel.status !== 'Closing'"
        >
          <span class="text-gray-500">Opened By</span>
          <span class="text-capitalize font-weight-bold">{{
            channel.initiator ? "Your node" : "Remote peer"
          }}</span>
        </div>

        <div class="flex justify-between items-center mb-3">
          <span class="text-gray-500">Local Balance</span>
          <span
            v-b-tooltip.hover.left
            :title="channel.localBalance | satsToUSD"
            class="text-capitalize font-weight-bold"
          >
            {{ channel.localBalance | unit | localize }}
            {{ unit | formatUnit }}
          </span>
        </div>

        <div class="flex justify-between items-center mb-3">
          <span class="text-gray-500">Remote Balance</span>
          <span
            v-b-tooltip.hover.left
            :title="channel.remoteBalance | satsToUSD"
            class="text-capitalize font-weight-bold"
          >
            {{ channel.remoteBalance | unit | localize }}
            {{ unit | formatUnit }}
          </span>
        </div>

        <div class="flex justify-between items-center mb-3">
          <span class="text-gray-500">Channel Capacity</span>
          <span
            v-b-tooltip.hover.left
            :title="channel.capacity | satsToUSD"
            class="text-capitalize font-weight-bold"
          >
            {{ channel.capacity | unit | localize }}
            {{ unit | formatUnit }}
          </span>
        </div>

        <div
          class="flex justify-between items-center mb-3"
          v-if="channel.status === 'Online'"
        >
          <span class="text-gray-500">Withdrawal Timelock</span>
          <span class="text-capitalize font-weight-bold"
            >{{ parseInt(channel.csvDelay).toLocaleString() }} Blocks</span
          >
        </div>

        <div
          class="flex justify-between items-center mb-3"
          v-if="channel.status === 'Online'"
        >
          <span class="text-gray-500">Commit Fee</span>
          <span class="text-capitalize font-weight-bold">
            {{ channel.commitFee | unit | localize }}
            {{ unit | formatUnit }}
          </span>
        </div>

        <div class="flex justify-between items-center mb-3">
          <span class="text-gray-500">Remote Pub Key</span>
          <div class="w-75 text-right">
            <small class="font-weight-bold" style="overflow-wrap: break-word">{{
              channel.remotePubkey
            }}</small>
          </div>
        </div>

        <div class="flex justify-content-end" v-if="canCloseChannel">
          <b-button class="mt-2" variant="danger" @click="reviewChannelClose"
            >Close Channel</b-button
          >
        </div>
      </div>

      <div v-else>
        <h3 class="text-3xl font-black mb-3">
          Are you sure you want to close this channel?
        </h3>
        <p>
          Your local channel balance of
          <b>{{ parseInt(channel.localBalance).toLocaleString() }} Sats</b>
          (excluding transaction fee) will be returned to your Bitcoin wallet.
        </p>
        <b-alert variant="warning" show>
          It may take upto 24 hours to close this channel if the remote peer is
          not online. During this time, the peer can dispute the record sent to
          the blockchain and seize the channel funds if this claim is
          fraudulent.
        </b-alert>

        <div class="flex justify-content-end">
          <b-button
            class="mt-2"
            variant="danger"
            @click="confirmChannelClose"
            :disabled="isClosing"
            >{{ isClosing ? "Closing Channel..." : "Confirm Close" }}</b-button
          >
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Bar from "@/components/Channels/Bar";
import API from "@/helpers/api";

export default {
  props: {
    channel: Object,
  },
  data() {
    return {
      isReviewingChannelClose: false,
      isClosing: false,
    };
  },
  computed: {
    unit() {
      return this.$store.state.system.unit;
    },
    canCloseChannel() {
      if (
        this.channel.status === "Opening" ||
        this.channel.status === "Closing"
      ) {
        return false;
      }
      return true;
    },
  },
  methods: {
    reviewChannelClose() {
      this.isReviewingChannelClose = true;
    },
    async confirmChannelClose() {
      this.isClosing = true;

      try {
        const payload = {
          channelPoint: this.channel.channelPoint,
          force: !this.channel.active, // Avoids force closing if channel is active
        };
        await API.delete(
          `${process.env.VUE_APP_MIDDLEWARE_API_URL}/v1/lnd/channel/close`,
          payload
        );
        this.$emit("channelclose");
        setTimeout(() => {
          this.$bvToast.toast(`Channel closed`, {
            title: "Lightning Network",
            autoHideDelay: 3000,
            variant: "success",
            solid: true,
            toaster: "b-toaster-bottom-right",
          });
        }, 200);
      } catch (err) {
        this.$bvToast.toast(
          err.response && err.response.data ? err.response.data : err,
          {
            title: "Error",
            autoHideDelay: 3000,
            variant: "danger",
            solid: true,
            toaster: "b-toaster-bottom-right",
          }
        );
      }
      this.isClosing = false;
    },
  },
  components: {
    Bar,
  },
};
</script>

<style lang="scss" scoped>
.mode-change-enter-active,
.mode-change-leave-active {
  transition: transform 0.3s, opacity 0.3s linear;
}

.mode-change-enter {
  transform: translate3d(20px, 0, 0);
  opacity: 0;
}

.mode-change-enter-to {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}

.mode-change-leave {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}

.mode-change-leave-to {
  transform: translate3d(-20px, 0, 0);
  opacity: 0;
}
</style>
