<template>
  <div class="py-3 px-3 px-sm-4 channel">
    <b-row align-v="center">
      <b-col col cols="12" xl="3">
        <!-- on large screens -->
        <div class="d-none d-xl-block">
          <status :variant="statusVariant" size="sm">{{ channel.status }}</status>
          <div v-if="channel.status !== 'Closing'">
            <span
              class
              style="margin-left: 2px;"
            >{{ channel.initiator ? `Opened by you` : `Opened by peer` }}</span>
          </div>
        </div>

        <!-- on small screens -->
        <div class="d-xl-none d-flex justify-content-between align-items-center mb-1">
          <status :variant="statusVariant" size="sm">{{ channel.status }}</status>
          <div v-if="channel.status !== 'Closing'">
            <small
              class
              style="margin-left: 2px;"
            >{{ channel.initiator ? `Opened by you` : `Opened by peer` }}</small>
          </div>
        </div>
      </b-col>
      <b-col col cols="12" xl="9">
        <div class>
          <div class="d-flex justify-content-between">
            <span
              class="text-primary font-weight-bold"
            >{{ Number(channel.localBalance).toLocaleString() }} Sats</span>
            <span
              class="text-success text-right font-weight-bold"
            >{{ Number(channel.remoteBalance).toLocaleString() }} Sats</span>
          </div>
          <bar
            :local="Number(channel.localBalance)"
            :remote="Number(channel.remoteBalance)"
            class="my-1"
          ></bar>
          <div class="d-flex justify-content-between">
            <small class="text-muted font-weight-bold">Max Send</small>
            <small class="text-muted font-weight-bold text-right">Max Receive</small>
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
  computed: {
    statusVariant() {
      if (this.channel.status === "Online") {
        return "success";
      }
      if (this.channel.status === "Offline") {
        return "default";
      }
      if (this.channel.status === "Opening") {
        return "warning";
      }
      if (this.channel.status === "Closing") {
        return "danger";
      }
      if (this.channel.status === "Unkown") {
        return "danger";
      }
      return "default";
    }
  },
  data() {
    return {};
  },
  methods: {
    getStatusVariant() {
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
  transition: box-shadow 0.3s, background 0.3s ease;
  &:hover {
    cursor: pointer;
    background: linear-gradient(346.78deg, #f7fcfc 0%, #fafcfa 100%);
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.08);
    // box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    // transform: translateY(-5px);
  }
}
</style>
