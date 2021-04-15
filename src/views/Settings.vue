<template>
  <div class="p-sm-2">
    <div class="my-3 pb-2">
      <div class="d-flex justify-content-between align-items-center">
        <h1>settings</h1>
      </div>
    </div>

    <b-row>
      <b-col col cols="12" md="6" xl="4">
        <card-widget
          header="Tor"
          :status="{ text: 'Running', variant: 'success', blink: false }"
          title="100%"
          sub-title="Traffic relayed through Tor"
          icon="icon-app-tor.svg"
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
                <span class="d-block">Lightning Network</span>
                <small class="d-block" style="opacity: 0.4">Run Lightning on Tor</small>
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
                  >Remotely access your Umbrel via Tor Browser on the following URL</small>
                </div>
                <toggle-switch
                  class="align-self-center"
                  disabled
                  tooltip="Sorry, Tor cannot be disabled for now"
                ></toggle-switch>
              </div>
              <input-copy class="w-100" size="sm" :value="onionAddress"></input-copy>
            </div>
            <div class="px-3 px-lg-4 py-2"></div>
          </div>
        </card-widget>
      </b-col>
      <b-col col cols="12" md="6" xl="4">
        <card-widget header="Account" :loading="isChangingPassword">
          <div class="pt-2">
            <div class="d-flex w-100 justify-content-between px-3 px-lg-4 mb-1">
              <div class="w-75">
                <span class="d-block">Backup</span>
                <small class="d-block">
                  <span style="opacity: 0.4">Automatically encrypt and backup your payment channels.</span>
                  &nbsp;
                  <a
                    href="https://github.com/getumbrel/umbrel/blob/master/scripts/backup/README.md"
                    target="blank"
                  >Learn more</a>
                </small>
              </div>
              <toggle-switch
                class="align-self-center"
                disabled
                tooltip="Sorry, backup cannot be disabled for now"
              ></toggle-switch>
            </div>
            <div class="px-3 px-lg-4 mb-4" v-if="backupStatus.status">
              <b-icon
                icon="x-circle-fill"
                variant="danger"
                class="mr-1"
                v-if="backupStatus.status === 'failed'"
              ></b-icon>
              <small style="opacity: 0.4">
                Last backup
                <span v-if="backupStatus.status === 'failed'">failed</span>
                at {{ getReadableTime(backupStatus.timestamp) }}
              </small>
            </div>
            <div class="mb-4" v-else></div>
          </div>
          <div class="pt-0">
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
                <small class="d-block" style="opacity: 0.4">Change the password of your Umbrel</small>
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
          <div class="px-3 px-lg-4 py-2"></div>
        </card-widget>
      </b-col>
      <b-col col cols="12" md="6" xl="4">
        <card-widget header="System" :loading="isCheckingForUpdate || isUpdating">
          <div class="pt-2">
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
                  <p>Don't forget to login to your dashboard after the restart is complete (required only once after a restart for your Umbrel to be online).</p>
                </div>
              </b-modal>
            </div>
          </div>
          <div class="pt-0">
            <div class="d-flex w-100 justify-content-between px-3 px-lg-4 mb-4">
              <div>
                <span class="d-block">Debug</span>
                <small class="d-block" style="opacity: 0.4">Run the debug script</small>
              </div>
              <b-button variant="outline-warning" size="sm" @click="debugPrompt">Debug</b-button>
              <b-modal
                ref="debug-modal"
                title="Results"
                no-close-on-backdrop
                no-close-on-esc
                cancel-title="Run again"
                @cancel="debugPrompt"
                @ok="clearDebugInterval"
              >
                <div v-if="this.loadingDebug">
                  <p>Processing...</p>
                </div>
                <div v-else>
                    <p>Please share the following links with a description of your problem in the <a href="https://t.me/getumbrel">Umbrel Telegram group</a> so we can help you.</p>
                    <input-copy class="mb-1" size="sm" auto-width :value="this.debugResult.linkDebug"></input-copy>
                </div>
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
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

import API from "@/helpers/api";

import CardWidget from "@/components/CardWidget";
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
      loadingDebug: false
    };
  },
  computed: {
    ...mapState({
      version: state => state.system.version,
      onionAddress: state => state.system.onionAddress,
      availableUpdate: state => state.system.availableUpdate,
      updateStatus: state => state.system.updateStatus,
      backupStatus: state => state.system.backupStatus,
      debugResult: state => state.system.debugResult
    }),
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
    this.$store.dispatch("system/getBackupStatus");
  },
  methods: {
    getReadableTime(timestamp) {
      return moment(timestamp).format("MMM D, h:mm:ss a");
    },
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
    async getDebugLoadingStatus() {
      await this.$store.dispatch("system/getDebugResult");

      if(this.debugResult.status != "success") {
        this.loadingDebug = true;
      } else {
        this.loadingDebug = false;
      }
    },
    clearDebugInterval() {
      window.clearInterval(this.loadingDebugInterval);
    },
    async debugPrompt() {
      let toastText = "";
      let toastOptions = {
        autoHideDelay: 3000,
        solid: true,
        toaster: "b-toaster-bottom-right"
      };

      try {
        await this.$store.dispatch("system/debug");
      } catch (e) {
        toastText = "Debug request failed";
        toastOptions.title =
          "Something went wrong and Umbrel was not able to run the debug script";
        toastOptions.variant = "danger";
      }

      this.$bvToast.toast(toastText, toastOptions);
      this.loadingDebug = true;
      this.$refs["debug-modal"].show();
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
        "Your lightning wallet will not be able to receive any payments while your Umbrel is offline. Also, don't forget to login to your dashboard after you restart (required only once after a restart for your Umbrel to be online).",
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
    },
    loadingDebug: {
      handler: function(isLoading) {
        window.clearInterval(this.loadingDebugInterval);

        if (isLoading) {
          this.loadingDebugInterval = window.setInterval(
            this.getDebugLoadingStatus,
            2000
          );
        }
      },
      immediate: true
    }
  },
  components: {
    CardWidget,
    ToggleSwitch,
    InputPassword,
    InputCopy,
    Seed
  }
};
</script>

<style lang="scss" scoped></style>
