<template>
  <div class="py-3 px-3 px-sm-4 channel">
    <b-row align-v="center">
      <b-col col cols="12" xl="3">
        <!-- on large screens -->
        <div class="d-none d-xl-block">
          <status
            :variant="getStatus(channel.type)['variant']"
            size="sm"
          >{{ getStatus(channel.type)['text'] }}</status>
          <div>
            <span
              class="text-muted"
              style="margin-left: 2px;"
            >{{ channel.initiator ? `Opened by you` : `Opened by peer` }}</span>
          </div>
        </div>

        <!-- on small screens -->
        <div class="d-xl-none d-flex justify-content-between align-items-center mb-1">
          <status
            :variant="getStatus(channel.type)['variant']"
            size="sm"
          >{{ getStatus(channel.type)['text'] }}</status>
          <div>
            <small
              class="text-muted"
              style="margin-left: 2px;"
            >{{ channel.initiator ? `Opened by you` : `Opened by peer` }}</small>
          </div>
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
          <bar
            :local="Number(channel.localBalance)"
            :remote="Number(channel.remoteBalance)"
            class="my-1"
          ></bar>
          <div class="channel-balances d-flex justify-content-between">
            <small class="text-muted">Max Send</small>
            <small class="text-muted">Max Receive</small>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Status from "@/components/Status";
import Bar from "@/components/Channels/Bar";

export default {
  computed: {},
  data() {
    return {};
  },
  methods: {
    getStatus() {
      if (this.channel.type === "OPEN") {
        return {
          text: "Online",
          variant: "success"
        };
      }
      if (this.channel.type === "PENDING_OPEN_CHANNEL") {
        return {
          text: "Opening",
          variant: "warning"
        };
      }
      if (
        this.channel.type === "WAITING_CLOSING_CHANNEL" ||
        this.channel.type === "PENDING_CLOSING_CHANNEL"
      ) {
        return {
          text: "Closing",
          variant: "warning"
        };
      }
      if (this.channel.type === "FORCE_CLOSING_CHANNEL") {
        return {
          text: "Force Closing",
          variant: "danger"
        };
      }
    }
  },
  props: {
    channel: Object
  },
  components: {
    Status,
    Bar
  }
};
</script>

<style lang="scss" scoped>
.channel {
  transition: background-color 0.2s ease;
  &:hover {
    cursor: pointer;
    background-color: #f4f5f7;
  }
}
</style>
