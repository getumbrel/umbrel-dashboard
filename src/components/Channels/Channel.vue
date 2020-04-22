<template>
  <div class="py-3 px-3 px-sm-4 channel">
    <b-row align-v="center">
      <b-col col cols="12" xl="3">
        <!-- on large screens -->
        <div class="d-none d-xl-block">
          <status variant="success" size="sm">Online</status>
          <div>
            <!-- Outbound icon -->
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              v-if="channel.initiator"
            >
              <path
                d="M7.06802 4.71946C6.76099 4.71224 6.50825 4.96178 6.50627 5.27413C6.50435 5.57592 6.7539 5.82865 7.05534 5.83022L12.7162 5.86616L4.81508 13.3568C4.59632 13.5735 4.59981 14.1376 4.81615 14.3568C5.03249 14.5759 5.59723 14.572 5.81634 14.3556L13.4988 6.6587L13.4576 12.3143C13.4609 12.6214 13.7108 12.8745 14.0122 12.876C14.3246 12.878 14.5777 12.6281 14.574 12.3214L14.6184 5.32036C14.6257 5.01333 14.3761 4.76059 14.0694 4.76427L7.06802 4.71946Z"
                fill="#6c757d"
              />
            </svg>

            <!-- inbound icon -->
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              v-else
            >
              <path
                d="M13.5944 6.04611C13.6001 5.73904 13.3493 5.48755 13.0369 5.48712C12.7351 5.4867 12.4836 5.7375 12.4836 6.03895L12.4758 11.6999L4.94598 3.83615C4.72819 3.61848 4.16402 3.62477 3.94599 3.8422C3.72796 4.05963 3.73466 4.62433 3.95209 4.84236L11.6871 12.4864L6.03143 12.4733C5.72435 12.4782 5.47251 12.7293 5.47244 13.0308C5.47201 13.3431 5.72317 13.595 6.0299 13.5898L13.031 13.5994C13.3381 13.6051 13.5896 13.3543 13.5844 13.0476L13.5944 6.04611Z"
                fill="#6c757d"
              />
            </svg>
            <span
              class="text-muted"
              style="margin-left: 2px;"
            >{{ channel.initiator ? `Opened by you` : `Opened by peer` }}</span>
          </div>
        </div>

        <!-- on small screens -->
        <div class="d-xl-none d-flex justify-content-between align-items-center mb-1">
          <status variant="success" size="sm">Online</status>
          <div>
            <!-- Outbound icon -->
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              v-if="channel.initiator"
            >
              <path
                d="M7.06802 4.71946C6.76099 4.71224 6.50825 4.96178 6.50627 5.27413C6.50435 5.57592 6.7539 5.82865 7.05534 5.83022L12.7162 5.86616L4.81508 13.3568C4.59632 13.5735 4.59981 14.1376 4.81615 14.3568C5.03249 14.5759 5.59723 14.572 5.81634 14.3556L13.4988 6.6587L13.4576 12.3143C13.4609 12.6214 13.7108 12.8745 14.0122 12.876C14.3246 12.878 14.5777 12.6281 14.574 12.3214L14.6184 5.32036C14.6257 5.01333 14.3761 4.76059 14.0694 4.76427L7.06802 4.71946Z"
                fill="#6c757d"
              />
            </svg>

            <!-- inbound icon -->
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              v-else
            >
              <path
                d="M13.5944 6.04611C13.6001 5.73904 13.3493 5.48755 13.0369 5.48712C12.7351 5.4867 12.4836 5.7375 12.4836 6.03895L12.4758 11.6999L4.94598 3.83615C4.72819 3.61848 4.16402 3.62477 3.94599 3.8422C3.72796 4.05963 3.73466 4.62433 3.95209 4.84236L11.6871 12.4864L6.03143 12.4733C5.72435 12.4782 5.47251 12.7293 5.47244 13.0308C5.47201 13.3431 5.72317 13.595 6.0299 13.5898L13.031 13.5994C13.3381 13.6051 13.5896 13.3543 13.5844 13.0476L13.5944 6.04611Z"
                fill="#6c757d"
              />
            </svg>

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
  methods: {},
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
