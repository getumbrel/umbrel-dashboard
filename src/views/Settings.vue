<template>
  <div class="p-sm-2">
    <div class="my-3 pb-2">
      <div class="d-flex justify-content-between align-items-center">
        <h1>settings</h1>
      </div>
    </div>

    <div class="settings-card-columns">
        <storage-widget id="storage" class="card-app-list"></storage-widget>

        <ram-widget id="ram" class="card-app-list"></ram-widget>

        <temperature-widget id="temperature" class="card-app-list" v-if="isUmbrelOS"></temperature-widget>

        <card-widget
          header="Tor"
          :status="{ text: 'Running', variant: 'success', blink: false }"
          title="100%"
          sub-title="Traffic relayed through Tor"
          icon="icon-app-tor.svg"
          class="card-app-list"
        >
          <div class="pt-2">
            <div class="d-flex w-100 justify-content-between px-3 px-lg-4 mb-4">
              <div>
                <span class="d-block">Bitcoin</span>
                <small class="d-block" style="opacity: 0.4">Run Bitcoin Core on Tor</small>
              </div>
              <toggle-switch
                class="align-self-center"
                disabled
                tooltip="Sorry, Tor cannot be disabled for now"
              ></toggle-switch>
            </div>
            <div class="d-flex w-100 justify-content-between px-3 px-lg-4 mb-4">
              <div>
                <span class="d-block">Lightning</span>
                <small class="d-block" style="opacity: 0.4">Run Lightning Network on Tor</small>
              </div>
              <toggle-switch
                class="align-self-center"
                disabled
                tooltip="Sorry, Tor cannot be disabled for now"
              ></toggle-switch>
            </div>
            <div class="px-3 px-lg-4 mb-4">
              <div class="d-flex justify-content-between w-100 mb-3">
                <div class="w-75">
                  <span class="d-block">Remote access</span>
                  <small
                    class="d-block"
                    style="opacity: 0.4"
                  >Remotely access your Umbrel from anywhere using a Tor browser on this URL</small>
                </div>
                <toggle-switch
                  class="align-self-center"
                  disabled
                  tooltip="Sorry, Tor cannot be disabled for now"
                ></toggle-switch>
              </div>
              <input-copy class="w-100" size="sm" :value="onionAddress"></input-copy>
            </div>
            <div class="px-3 px-lg-4 py-1"></div>
          </div>
        </card-widget>
      
        <card-widget
          header="Account"
          class="card-app-list"
          :loading="isChangingPassword"
        >
          <div class="pt-2">
            <div class="d-flex w-100 justify-content-between px-3 px-lg-4 mb-4">
              <div>
                <span class="d-block">Secret words</span>
                <small class="d-block" style="opacity: 0.4">Note down your 24 secret words</small>
              </div>

              <b-button variant="outline-primary" size="sm" v-b-modal.seed-modal>View</b-button>

              <b-modal id="seed-modal" centered hide-footer>
                <template v-slot:modal-header="{ close }">
                  <div class="px-2 px-sm-3 pt-2 d-flex justify-content-between w-100">
                    <h3>secret words</h3>
                    <!-- Emulate built in modal header close button action -->
                    <a href="#" class="align-self-center" v-on:click.stop.prevent="close">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M13.6003 4.44197C13.3562 4.19789 12.9605 4.19789 12.7164 4.44197L9.02116 8.1372L5.32596 4.442C5.08188 4.19792 4.68615 4.19792 4.44207 4.442C4.198 4.68607 4.198 5.0818 4.44207 5.32588L8.13728 9.02109L4.44185 12.7165C4.19777 12.9606 4.19777 13.3563 4.44185 13.6004C4.68592 13.8445 5.08165 13.8445 5.32573 13.6004L9.02116 9.90497L12.7166 13.6004C12.9607 13.8445 13.3564 13.8445 13.6005 13.6004C13.8446 13.3563 13.8446 12.9606 13.6005 12.7165L9.90505 9.02109L13.6003 5.32585C13.8444 5.08178 13.8444 4.68605 13.6003 4.44197Z"
                          fill="#6c757d"
                        />
                      </svg>
                    </a>
                  </div>
                </template>
                <seed></seed>
              </b-modal>
            </div>
          </div>
          <div class="pt-0">
            <div class="d-flex w-100 justify-content-between px-3 px-lg-4 mb-4">
              <div>
                <span class="d-block">Password</span>
                <small class="d-block" style="opacity: 0.4">Change your Umbrel's password</small>
              </div>

              <b-button
                variant="outline-primary"
                size="sm"
                v-b-modal.change-password-modal
                :disabled="isChangingPassword"
              >Change</b-button>

              <b-modal id="change-password-modal" centered hide-footer>
                <template v-slot:modal-header="{ close }">
                  <div class="px-2 px-sm-3 pt-2 d-flex justify-content-between w-100">
                    <h3>change password</h3>
                    <!-- Emulate built in modal header close button action -->
                    <a href="#" class="align-self-center" v-on:click.stop.prevent="close">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M13.6003 4.44197C13.3562 4.19789 12.9605 4.19789 12.7164 4.44197L9.02116 8.1372L5.32596 4.442C5.08188 4.19792 4.68615 4.19792 4.44207 4.442C4.198 4.68607 4.198 5.0818 4.44207 5.32588L8.13728 9.02109L4.44185 12.7165C4.19777 12.9606 4.19777 13.3563 4.44185 13.6004C4.68592 13.8445 5.08165 13.8445 5.32573 13.6004L9.02116 9.90497L12.7166 13.6004C12.9607 13.8445 13.3564 13.8445 13.6005 13.6004C13.8446 13.3563 13.8446 12.9606 13.6005 12.7165L9.90505 9.02109L13.6003 5.32585C13.8444 5.08178 13.8444 4.68605 13.6003 4.44197Z"
                          fill="#6c757d"
                        />
                      </svg>
                    </a>
                  </div>
                </template>
                <div class="px-4 pb-2">
                  <label class="sr-onlsy" for="input-withdrawal-amount">Current password</label>
                  <input-password
                    v-model="currentPassword"
                    ref="password"
                    inputGroupClass="neu-input-group"
                    :inputClass="[ isIncorrectPassword ? 'incorrect-password' : '', 'form-control form-control-lg neu-input w-100']"
                    :disabled="isChangingPassword"
                  />
                  <div class="py-2"></div>
                  <label class="sr-onlsy" for="input-withdrawal-amount">New password</label>
                  <input-password
                    v-model="newPassword"
                    ref="password"
                    inputGroupClass="neu-input-group"
                    inputClass="form-control form-control-lg neu-input w-100"
                    :disabled="isChangingPassword"
                  />
                  <div class="py-2"></div>
                  <label class="sr-onlsy" for="input-withdrawal-amount">Confirm new password</label>
                  <input-password
                    v-model="confirmNewPassword"
                    ref="password"
                    inputGroupClass="neu-input-group"
                    inputClass="form-control form-control-lg neu-input w-100"
                    :disabled="isChangingPassword"
                  />
                  <div class="py-2"></div>
                  <b-alert variant="warning" show>
                    <small>
                      ⚠ Remember, there is no "Forgot Password" button. If you lose
                      your password, you will have to recover your Umbrel using your 24
                      secret words and channel backup.
                    </small>
                  </b-alert>
                  <b-button
                    class="w-100"
                    variant="success"
                    size="lg"
                    :disabled="isChangingPassword || !isAllowedToChangePassword"
                    @click="changePassword"
                  >{{ isChangingPassword ? 'Changing password...' : 'Change password'}}</b-button>
                </div>
              </b-modal>
            </div>
          </div>
          <div class="px-3 px-lg-4 py-1"></div>
        </card-widget>

        <card-widget
          header="System"
          class="card-app-list"
          :loading="isCheckingForUpdate || isUpdating"
        >
          <div class="d-block pt-2"></div>
          
          <!-- Uptime monitoring is only available on Umbrel OS -->
          <div class="pt-0" v-if="isUmbrelOS">
            <div class="d-flex w-100 justify-content-between px-3 px-lg-4 mb-4">
              <div>
                <span class="d-block">Uptime</span>
                <small class="d-block" style="opacity: 0.4">Time since last restart</small>
              </div>
              <div class="text-right">
                <span class="d-block">{{ getUptime }}</span>
              </div>
            </div>
          </div>
          <div class="pt-0">
            <div class="d-flex w-100 justify-content-between px-3 px-lg-4 mb-4">
              <div>
                <span class="d-block">Shutdown</span>
                <small class="d-block" style="opacity: 0.4">Power off your Umbrel</small>
              </div>
              <b-button variant="outline-danger" size="sm" @click="shutdownPrompt">Shutdown</b-button>
            </div>
          </div>
          <div class="pt-0">
            <div class="d-flex w-100 justify-content-between px-3 px-lg-4 mb-4">
              <div>
                <span class="d-block">Restart</span>
                <small class="d-block" style="opacity: 0.4">Restart your Umbrel</small>
              </div>

              <b-button variant="outline-danger" size="sm" @click="rebootPrompt">Restart</b-button>
              <b-modal
                ref="reboot-modal"
                title="Are you sure?"
                no-close-on-backdrop
                no-close-on-esc
                @ok="reboot($event)"
              >
                <div>
                  <p>Your Lightning wallet will not be able to receive any payments while your Umbrel is restarting.</p>
                </div>
              </b-modal>
            </div>
          </div>
          <div class="pt-0">
            <div class="d-flex w-100 justify-content-between px-3 px-lg-4 mb-4">
              <div>
                <span class="d-block">Troubleshoot</span>
                <small class="d-block" style="opacity: 0.4">View logs for troubleshooting</small>
              </div>
              <b-button variant="outline-primary" size="sm" @click="openDebugModal">Start</b-button>
              <b-modal
                ref="debug-modal"
                size="xl"
                scrollable
                header-bg-variant="dark"
                header-text-variant="light"
                footer-bg-variant="dark"
                footer-text-variant="light"
                body-bg-variant="dark"
                body-text-variant="light"
                @close="closeDebugModal"
              >
              <template v-slot:modal-header="{ close }">
                <div
                  class="px-2 pt-2 d-flex justify-content-between w-100"
                >
                  <h4 v-if="loadingDebug">Generating logs...</h4> 
                  <h4 v-else>{{ showDmesg ? 'DMESG logs' : 'Umbrel logs' }}</h4>
                  <!-- Emulate built in modal header close button action -->
                  <a
                    href="#"
                    class="align-self-center"
                    v-on:click.stop.prevent="close"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.6003 4.44197C13.3562 4.19789 12.9605 4.19789 12.7164 4.44197L9.02116 8.1372L5.32596 4.442C5.08188 4.19792 4.68615 4.19792 4.44207 4.442C4.198 4.68607 4.198 5.0818 4.44207 5.32588L8.13728 9.02109L4.44185 12.7165C4.19777 12.9606 4.19777 13.3563 4.44185 13.6004C4.68592 13.8445 5.08165 13.8445 5.32573 13.6004L9.02116 9.90497L12.7166 13.6004C12.9607 13.8445 13.3564 13.8445 13.6005 13.6004C13.8446 13.3563 13.8446 12.9606 13.6005 12.7165L9.90505 9.02109L13.6003 5.32585C13.8444 5.08178 13.8444 4.68605 13.6003 4.44197Z"
                        fill="#ffffff"
                      />
                    </svg>
                  </a>
                </div>
              </template>
                <div v-if="debugFailed" class="d-flex justify-content-center">
                  Error: Failed to fetch debug data.
                </div>
                <div v-else-if="loadingDebug" class="d-flex justify-content-center">
                  <b-spinner></b-spinner>
                </div>
                <pre class="px-2 text-light">{{debugContents}}</pre>

                <template #modal-footer="{}">
                  <div v-if="loadingDebug"></div>
                  <div class="d-flex w-100 justify-content-between px-2" v-else>
                    <b-button size="sm" variant="outline-success" @click="showDmesg=!showDmesg">
                      <b-icon icon="arrow-left-right" class="mr-1"></b-icon> View {{ (!showDmesg) ? "DMESG logs" : "Umbrel logs" }}
                    </b-button>
                    <b-button size="sm" variant="outline-success" @click="downloadTextFile(debugContents, debugFilename)">
                      <b-icon icon="download" class="mr-2"></b-icon>Download {{ showDmesg ? "DMESG logs" : "Umbrel logs" }}
                    </b-button>
                  </div>
                </template>
              </b-modal>
            </div>
          </div>
          <div class="px-3 px-lg-4 pb-4">
            <div class="w-100 d-flex justify-content-between mb-1">
              <span class="align-self-end">Umbrel Version</span>
              <span class="font-weight-normal mb-0">{{ version }}</span>
            </div>
            <div v-show="!isCheckingForUpdate">
              <span v-show="!availableUpdate.version">
                <b-icon icon="check-circle-fill" variant="success"></b-icon>
                <small class="ml-1" style="opacity: 0.4">Your Umbrel is on the latest version</small>
              </span>
              <div v-show="availableUpdate.version">
                <span class="d-block">
                  <b-icon icon="bell-fill" variant="success"></b-icon>
                  <small
                    class="text-muted ml-1"
                  >Umbrel v{{availableUpdate.version}} is now available to install</small>
                </span>
                <b-button
                  class="mt-2"
                  variant="primary"
                  size="sm"
                  @click.prevent="confirmUpdate"
                  :disabled="isUpdating"
                >Install now</b-button>
              </div>
            </div>
          </div>
          <b-button
            class="w-100"
            variant="success"
            style="border-radius: 0; border-bottom-left-radius: 1rem; border-bottom-right-radius: 1rem; padding-top: 1rem; padding-bottom: 1rem;"
            :disabled="isCheckingForUpdate || isUpdating"
            @click="checkForUpdate"
          >
            <b-icon icon="arrow-repeat" class="mr-2" :animation="isCheckingForUpdate ? 'spin' : ''"></b-icon>
            {{ isCheckingForUpdate ? "Checking for update" : "Check for update"}}
          </b-button>
        </card-widget>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";

import API from "@/helpers/api";
import delay from "@/helpers/delay";

import CardWidget from "@/components/CardWidget";
import StorageWidget from "@/components/Widgets/StorageWidget";
import RamWidget from "@/components/Widgets/RamWidget";
import TemperatureWidget from "@/components/Widgets/TemperatureWidget";
import ToggleSwitch from "@/components/ToggleSwitch";
import Seed from "@/components/Seed";
import InputPassword from "@/components/Utility/InputPassword";
import InputCopy from "@/components/Utility/InputCopy";

export default {
  data() {
    return {
      currentPassword: "",
      isIncorrectPassword: false,
      newPassword: "",
      confirmNewPassword: "",
      isChangingPassword: false,
      isCheckingForUpdate: false,
      isUpdating: false,
      loadingDebug: false,
      debugFailed: false,
      showDmesg: false
    };
  },
  computed: {
    ...mapState({
      version: state => state.system.version,
      onionAddress: state => state.system.onionAddress,
      availableUpdate: state => state.system.availableUpdate,
      updateStatus: state => state.system.updateStatus,
      debugResult: state => state.system.debugResult,
      isUmbrelOS: state => state.system.isUmbrelOS,
      uptime: state => state.system.uptime
    }),
    getUptime() {
      return moment.duration(this.uptime, "seconds").humanize();
    },
    debugContents() {
      return this.showDmesg ? this.debugResult.dmesg : this.debugResult.debug;
    },
    debugFilename() {
      const type = this.showDmesg ? 'dmesg' : 'debug';
      return `umbrel-${Date.now()}-${type}.log`;
    },
    isAllowedToChangePassword() {
      if (!this.currentPassword) {
        return false;
      }
      if (this.newPassword.length < 12) {
        return false;
      }
      if (this.newPassword !== this.confirmNewPassword) {
        return false;
      }
      if (this.currentPassword === this.newPassword) {
        return false;
      }
      return true;
    }
  },
  created() {
    this.$store.dispatch("system/getOnionAddress");
    this.$store.dispatch("system/getVersion");
    this.$store.dispatch("system/getUptime");
  },
  methods: {
    async changePassword() {
      // disable on testnet
      if (window.location.hostname === "testnet.getumbrel.com") {
        return this.$bvToast.toast('y u try to do dis on testnet :"(', {
          title: "Error",
          autoHideDelay: 3000,
          variant: "danger",
          solid: true,
          toaster: "b-toaster-bottom-right"
        });
      }

      const payload = {
        password: this.currentPassword,
        newPassword: this.newPassword
      };

      this.isChangingPassword = true;

      try {
        await API.post(
          `${process.env.VUE_APP_MANAGER_API_URL}/v1/account/change-password`,
          payload,
          false
        );
      } catch (error) {
        if (error.response && error.response.data) {
          this.$bvToast.toast(error.response.data, {
            title: "Error",
            autoHideDelay: 3000,
            variant: "danger",
            solid: true,
            toaster: "b-toaster-bottom-right"
          });
          if (error.response.data === "Incorrect password") {
            this.isIncorrectPassword = true;
          }
        }
        this.isChangingPassword = false;
        return;
      }

      this.$bvToast.toast(
        `You've successfully changed your Umbrel's password`,
        {
          title: "Password Changed",
          autoHideDelay: 3000,
          variant: "success",
          solid: true,
          toaster: "b-toaster-bottom-right"
        }
      );

      this.isChangingPassword = false;

      // Remove passwords from view
      this.currentPassword = "";
      this.newPassword = "";
      this.confirmNewPassword = "";
    },
    confirmUpdate() {
      this.$store.dispatch("system/confirmUpdate");
    },
    async checkForUpdate() {
      this.isCheckingForUpdate = true;
      await this.$store.dispatch("system/getAvailableUpdate");
      this.isCheckingForUpdate = false;
    },
    async openDebugModal() {
      this.showDmesg = false;
      this.debugFailed = false;
      this.loadingDebug = true;
      this.$refs["debug-modal"].show();
      try {
        await this.$store.dispatch("system/debug");
        while(this.loadingDebug) {
          await delay(1000);
          await this.$store.dispatch("system/getDebugResult");
          if (this.debugResult.status == "success") {
            this.loadingDebug = false;
          }
        }
      } catch (e) {
          this.debugFailed = true;
      }
    },
    closeDebugModal() {
      this.loadingDebug = false;
      this.$refs["debug-modal"].hide();
    },
    downloadTextFile(contents, fileName) {
      const blob = new Blob([contents], {
        type: 'text/plain;charset=utf-8;'
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    },
    async shutdownPrompt() {
      // disable on testnet
      if (window.location.hostname === "testnet.getumbrel.com") {
        return this.$bvToast.toast('y u try to do dis on testnet :"(', {
          title: "Error",
          autoHideDelay: 3000,
          variant: "danger",
          solid: true,
          toaster: "b-toaster-bottom-right"
        });
      }

      // Get user consent first
      const approved = await this.$bvModal.msgBoxConfirm(
        "Your Lightning wallet will not be able to receive any payments while your Umbrel is offline.",
        { title: "Are you sure?" }
      );
      if (!approved) {
        return;
      }

      // Shutdown request
      let toastText = "";
      let toastOptions = {
        autoHideDelay: 3000,
        solid: true,
        toaster: "b-toaster-bottom-right"
      };
      try {
        await this.$store.dispatch("system/shutdown");
      } catch (e) {
        toastText = "Shutdown failed";
        toastOptions.title =
          "Something went wrong and Umbrel was not able to shutdown";
        toastOptions.variant = "danger";
      }
      this.$bvToast.toast(toastText, toastOptions);
    },
    rebootPrompt() {
      // disable on testnet
      if (window.location.hostname === "testnet.getumbrel.com") {
        return this.$bvToast.toast('y u try to do dis on testnet :"(', {
          title: "Error",
          autoHideDelay: 3000,
          variant: "danger",
          solid: true,
          toaster: "b-toaster-bottom-right"
        });
      }
      // Reset any cached hasRebooted value from previous reboot
      this.$store.commit("system/setHasRebooted", false);
      this.$refs["reboot-modal"].show();
    },
    async reboot(event) {
      if (!this.hasRebooted) {
        event.preventDefault();
        try {
          await this.$store.dispatch("system/reboot");
        } catch (e) {
          this.$bvToast.toast("Reboot failed", {
            title: "Something went wrong and Umbrel was not able to reboot",
            autoHideDelay: 3000,
            variant: "danger",
            solid: true,
            toaster: "b-toaster-bottom-right"
          });
        }
      }
    }
  },
  beforeDestroy() {
    if (this.pollUpdateStatus) {
      window.clearInterval(this.pollUpdateStatus);
    }
  },
  watch: {
    currentPassword: function() {
      this.isIncorrectPassword = false;
    }
  },
  components: {
    CardWidget,
    StorageWidget,
    RamWidget,
    TemperatureWidget,
    ToggleSwitch,
    InputPassword,
    InputCopy,
    Seed
  }
};
</script>

<style lang="scss" scoped></style>
