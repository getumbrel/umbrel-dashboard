<template>
  <div class="p-1 sm:p-3">
    <div class="my-6 pb-3">
      <div class="flex justify-between items-center">
        <h1 class="dark:text-gray-100">settings</h1>
      </div>
    </div>

    <div class="columns-1 sm:columns-2 2xl:columns-3 gap-8">
      <storage-widget
        id="storage"
        class="shadow-sm inline-block w-full break-inside-avoid-column"
      ></storage-widget>

      <ram-widget
        id="ram"
        class="shadow-sm inline-block w-full break-inside-avoid-column"
      ></ram-widget>

      <temperature-widget
        id="temperature"
        class="shadow-sm inline-block w-full break-inside-avoid-column"
        v-if="isUmbrelOS"
      ></temperature-widget>

      <card-widget
        header="Tor"
        :status="{ text: 'Running', variant: 'success', blink: false }"
        title="100%"
        sub-title="Traffic relayed through Tor"
        icon="icon-app-tor.svg"
        class="shadow-sm inline-block w-full break-inside-avoid-column"
      >
        <div class="pt-3">
          <div class="flex w-full justify-between px-6 lg:px-9 mb-9">
            <div>
              <span class="block dark:text-white">Bitcoin</span>
              <small class="block opacity-40 dark:text-white"
                >Run Bitcoin Core on Tor</small
              >
            </div>
            <toggle-switch
              class="self-center"
              disabled
              tooltip="Sorry, Tor cannot be disabled for now"
            ></toggle-switch>
          </div>
          <div class="flex w-full justify-between px-6 lg:px-9 mb-9">
            <div>
              <span class="block dark:text-white">Lightning</span>
              <small class="block opacity-40 dark:text-white"
                >Run Lightning Network on Tor</small
              >
            </div>
            <toggle-switch
              class="self-center"
              disabled
              tooltip="Sorry, Tor cannot be disabled for now"
            ></toggle-switch>
          </div>
          <div class="px-6 lg:px-9 mb-9">
            <div class="flex justify-between w-full mb-6">
              <div class="w-75">
                <span class="block dark:text-white">Remote access</span>
                <small class="block opacity-40 dark:text-white"
                  >Remotely access your Umbrel from anywhere using a Tor browser
                  on this URL</small
                >
              </div>
              <toggle-switch
                class="self-center"
                disabled
                tooltip="Sorry, Tor cannot be disabled for now"
              ></toggle-switch>
            </div>
            <input-copy
              class="w-full"
              size="sm"
              :value="onionAddress"
            ></input-copy>
          </div>
          <div class="px-6 lg:px-9 py-1"></div>
        </div>
      </card-widget>

      <card-widget
        header="Account"
        class="shadow-sm inline-block w-full break-inside-avoid-column"
        :loading="isChangingPassword || isFetchingOtpUri"
      >
        <div class="pt-3">
          <div class="flex w-full justify-between px-6 lg:px-9 mb-9">
            <div>
              <span class="block dark:text-white">Two-factor auth (2FA)</span>
              <small class="block opacity-40 dark:text-white"
                >An extra layer of security to login</small
              >
            </div>
            <toggle-switch
              class="self-center"
              @turnOn="toggleOtpAuthSwitch"
              @turnOff="toggleOtpAuthSwitch"
              :on="otpEnabled"
              :loading="isFetchingOtpUri"
            ></toggle-switch>

            <b-modal
              id="enable-otp-auth-modal"
              centered
              hide-footer
              ref="enable-otp-auth-modal"
            >
              <template v-slot:modal-header="{ close }">
                <div class="px-2 sm:px-4 pt-3 flex justify-between w-full">
                  <h3>Enable 2FA</h3>

                  <!-- Emulate built in modal header close button action -->
                  <a
                    href="#"
                    class="self-center"
                    v-on:click.stop.prevent="close"
                  >
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
              <div class="px-1 sm:px-6 pb-3 text-center">
                <div class="mb-9">
                  <p>
                    Scan this QR code using an authenticator app like Google
                    Authenticator or Authy
                  </p>
                  <qr-code
                    class="mb-6 mx-auto"
                    :value="otpUri"
                    :size="200"
                    level="Q"
                    showLogo
                  ></qr-code>
                  <p>Or paste the following code in the app</p>
                  <input-copy
                    class="w-full mx-auto"
                    size="sm"
                    :value="otpSecretKey"
                  ></input-copy>
                </div>

                <label>
                  Enter the code displayed in your authenticator app to enable
                  2FA
                </label>
                <input-otp-token
                  autofocus
                  :success="isCorrectOtp"
                  :error="isIncorrectOtp"
                  :disabled="isTogglingOtpAuth"
                  @otpToken="enableOtpAuth"
                />
              </div>
            </b-modal>

            <b-modal
              id="disable-otp-auth-modal"
              centered
              hide-footer
              ref="disable-otp-auth-modal"
            >
              <template v-slot:modal-header="{ close }">
                <div class="px-2 sm:px-4 pt-3 flex justify-between w-full">
                  <h3>Disable 2FA</h3>

                  <!-- Emulate built in modal header close button action -->
                  <a
                    href="#"
                    class="self-center"
                    v-on:click.stop.prevent="close"
                  >
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
              <div class="px-1 sm:px-6 pb-3">
                <label>
                  Enter the code displayed in your authenticator app to disable
                  2FA
                </label>
                <input-otp-token
                  autofocus
                  :success="isCorrectOtp"
                  :error="isIncorrectOtp"
                  :disabled="isTogglingOtpAuth"
                  @otpToken="disableOtpAuth"
                />
              </div>
            </b-modal>
          </div>
        </div>
        <div class="pt-0">
          <div class="flex w-full justify-between px-6 lg:px-9 mb-9">
            <div>
              <span class="block dark:text-white">Password</span>
              <small class="block opacity-40 dark:text-white"
                >Change your Umbrel's password</small
              >
            </div>

            <b-button
              variant="outline-primary"
              size="sm"
              v-b-modal.change-password-modal
              :disabled="isChangingPassword"
              >Change</b-button
            >

            <b-modal
              id="change-password-modal"
              ref="change-password-modal"
              centered
              hide-footer
            >
              <template v-slot:modal-header="{ close }">
                <div class="px-2 sm:px-4 pt-3 flex justify-between w-full">
                  <h3>change password</h3>
                  <!-- Emulate built in modal header close button action -->
                  <a
                    href="#"
                    class="self-center"
                    v-on:click.stop.prevent="close"
                  >
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
              <div class="px-4 pb-3">
                <label class="sr-onlsy" for="input-withdrawal-amount"
                  >Current password</label
                >
                <input-password
                  v-model="currentPassword"
                  ref="password"
                  inputGroupClass="neu-input-group"
                  :inputClass="[
                    isIncorrectPassword ? 'incorrect-password' : '',
                    'form-control form-control-lg neu-input w-full',
                  ]"
                  :disabled="isChangingPassword"
                />
                <div class="py-2"></div>
                <label class="sr-onlsy" for="input-withdrawal-amount"
                  >New password</label
                >
                <input-password
                  v-model="newPassword"
                  ref="password"
                  inputGroupClass="neu-input-group"
                  inputClass="form-control form-control-lg neu-input w-full"
                  :disabled="isChangingPassword"
                />
                <div class="py-2"></div>
                <label class="sr-onlsy" for="input-withdrawal-amount"
                  >Confirm new password</label
                >
                <input-password
                  v-model="confirmNewPassword"
                  ref="password"
                  inputGroupClass="neu-input-group"
                  inputClass="form-control form-control-lg neu-input w-full"
                  :disabled="isChangingPassword"
                />
                <div v-if="otpEnabled" class="py-2">
                  <label>
                    Enter your two-factor authentication (2FA) code
                  </label>
                  <input-otp-token
                    :success="isCorrectOtp"
                    :error="isIncorrectOtp"
                    :disabled="isTogglingOtpAuth"
                    @otpToken="setOtpToken"
                  />
                </div>
                <div class="py-2"></div>
                <b-alert variant="warning" show>
                  <small>
                    ⚠ Remember, there is no "Forgot Password" button. If you
                    lose your password, you will have to recover your Umbrel
                    using your 24 secret words and channel backup.
                  </small>
                </b-alert>
                <b-button
                  class="w-full"
                  variant="success"
                  size="lg"
                  :disabled="isChangingPassword || !isAllowedToChangePassword"
                  @click="changePassword"
                  >{{
                    isChangingPassword
                      ? "Changing password..."
                      : "Change password"
                  }}</b-button
                >
              </div>
            </b-modal>
          </div>
        </div>
        <div class="pt-0">
          <div class="flex w-full justify-between px-6 lg:px-9 mb-9">
            <div>
              <span class="block dark:text-white">Secret words</span>
              <small class="block opacity-40 dark:text-white"
                >Note down your 24 secret words</small
              >
            </div>

            <b-button variant="outline-primary" size="sm" v-b-modal.seed-modal
              >View</b-button
            >

            <b-modal id="seed-modal" centered hide-footer>
              <template v-slot:modal-header="{ close }">
                <div class="px-2 sm:px-4 pt-3 flex justify-between w-full">
                  <h3>secret words</h3>
                  <!-- Emulate built in modal header close button action -->
                  <a
                    href="#"
                    class="self-center"
                    v-on:click.stop.prevent="close"
                  >
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
        <div class="px-6 lg:px-9 py-1"></div>
      </card-widget>

      <card-widget
        header="System"
        class="shadow-sm inline-block w-full"
        :loading="isCheckingForUpdate || isUpdating"
      >
        <div class="block pt-3"></div>

        <!-- Uptime monitoring is only available on Umbrel OS -->
        <div class="pt-0" v-if="isUmbrelOS">
          <div class="flex w-full justify-between px-6 lg:px-9 mb-9">
            <div>
              <span class="block dark:text-white">Uptime</span>
              <small class="block opacity-40 dark:text-white"
                >Time since last restart</small
              >
            </div>
            <div class="text-right">
              <span class="block dark:text-white">{{ getUptime }}</span>
            </div>
          </div>
        </div>
        <div class="pt-0">
          <div class="flex w-full justify-between px-6 lg:px-9 mb-9">
            <div>
              <span class="block dark:text-white">Shutdown</span>
              <small class="block opacity-40 dark:text-white"
                >Power off your Umbrel</small
              >
            </div>
            <b-button variant="outline-danger" size="sm" @click="shutdownPrompt"
              >Shutdown</b-button
            >
          </div>
        </div>
        <div class="pt-0">
          <div class="flex w-full justify-between px-6 lg:px-9 mb-9">
            <div>
              <span class="block dark:text-white">Restart</span>
              <small class="block opacity-40 dark:text-white"
                >Restart your Umbrel</small
              >
            </div>

            <b-button variant="outline-danger" size="sm" @click="rebootPrompt"
              >Restart</b-button
            >
            <b-modal
              ref="reboot-modal"
              title="Are you sure?"
              no-close-on-backdrop
              no-close-on-esc
              @ok="reboot($event)"
            >
              <div>
                <p>
                  Your Lightning wallet will not be able to receive any payments
                  while your Umbrel is restarting.
                </p>
              </div>
            </b-modal>
          </div>
        </div>
        <div class="pt-0">
          <div class="flex w-full justify-between px-6 lg:px-9 mb-9">
            <div>
              <span class="block dark:text-white">Troubleshoot</span>
              <small class="block opacity-40 dark:text-white"
                >View logs for troubleshooting</small
              >
            </div>
            <b-button
              variant="outline-primary"
              size="sm"
              @click="openDebugModal"
              >Start</b-button
            >
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
                <div class="px-2 pt-3 flex justify-between w-full">
                  <h4 v-if="loadingDebug" class="dark:text-gray-200">
                    Generating logs...
                  </h4>
                  <h4 v-else>{{ showDmesg ? "DMESG logs" : "Umbrel logs" }}</h4>
                  <!-- Emulate built in modal header close button action -->
                  <a
                    href="#"
                    class="self-center"
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
              <div v-if="debugFailed" class="flex justify-center">
                Error: Failed to fetch debug data.
              </div>
              <div v-else-if="loadingDebug" class="flex justify-center">
                <b-spinner></b-spinner>
              </div>
              <pre class="px-2 text-light">{{ debugContents }}</pre>

              <template #modal-footer="{}">
                <div v-if="loadingDebug"></div>
                <div class="flex w-full justify-between px-2" v-else>
                  <b-button
                    size="sm"
                    variant="outline-success"
                    @click="showDmesg = !showDmesg"
                  >
                    <b-icon icon="arrow-left-right" class="mr-1"></b-icon> View
                    {{ !showDmesg ? "DMESG logs" : "Umbrel logs" }}
                  </b-button>
                  <b-button
                    size="sm"
                    variant="outline-success"
                    @click="downloadTextFile(debugContents, debugFilename)"
                  >
                    <b-icon icon="download" class="mr-2"></b-icon>Download
                    {{ showDmesg ? "DMESG logs" : "Umbrel logs" }}
                  </b-button>
                </div>
              </template>
            </b-modal>
          </div>
        </div>
        <div class="px-6 lg:px-9 pb-4">
          <div class="w-full flex justify-between mb-1">
            <span class="self-end dark:text-white">Umbrel Version</span>
            <span class="font-weight-normal mb-0">{{ version }}</span>
          </div>
          <div v-show="!isCheckingForUpdate">
            <span v-show="!availableUpdate.version">
              <b-icon
                icon="check-circle-fill fill-green-500"
                variant="success"
              ></b-icon>
              <small class="ml-1 opacity-40 dark:text-white"
                >Your Umbrel is on the latest version</small
              >
            </span>
            <div v-show="availableUpdate.version">
              <span class="block dark:text-white">
                <b-icon icon="bell-fill" variant="success"></b-icon>
                <small class="text-gray-500 ml-1"
                  >Umbrel v{{ availableUpdate.version }} is now available to
                  install</small
                >
              </span>
              <b-button
                class="mt-2"
                variant="primary"
                size="sm"
                @click.prevent="confirmUpdate"
                :disabled="isUpdating"
                >Install now</b-button
              >
            </div>
          </div>
        </div>
        <button
          class="w-full rounded-b-2xl py-4 flex items-center justify-center text-white bg-bootstrap-success"
          variant="success"
          :disabled="isCheckingForUpdate || isUpdating"
          @click="checkForUpdate"
        >
          <b-icon
            icon="arrow-repeat"
            class="mr-2"
            :animation="isCheckingForUpdate ? 'spin' : ''"
          ></b-icon>
          {{ isCheckingForUpdate ? "Checking for update" : "Check for update" }}
        </button>
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
import QrCode from "@/components/Utility/QrCode";
import InputPassword from "@/components/Utility/InputPassword";
import InputCopy from "@/components/Utility/InputCopy";
import InputOtpToken from "@/components/Utility/InputOtpToken";

export default {
  data() {
    return {
      currentPassword: "",
      isIncorrectPassword: false,
      newPassword: "",
      confirmNewPassword: "",
      otpToken: "", // set by OTP input field in change password modal
      isChangingPassword: false,
      isCheckingForUpdate: false,
      isUpdating: false,
      loadingDebug: false,
      debugFailed: false,
      showDmesg: false,
      otpUri: "",
      isCorrectOtp: false,
      isIncorrectOtp: false,
      isFetchingOtpUri: false,
      isTogglingOtpAuth: false,
    };
  },
  computed: {
    ...mapState({
      version: (state) => state.system.version,
      onionAddress: (state) => state.system.onionAddress,
      availableUpdate: (state) => state.system.availableUpdate,
      updateStatus: (state) => state.system.updateStatus,
      debugResult: (state) => state.system.debugResult,
      isUmbrelOS: (state) => state.system.isUmbrelOS,
      uptime: (state) => state.system.uptime,
      otpEnabled: (state) => state.user.otpEnabled,
    }),
    otpSecretKey() {
      if (!this.otpUri) {
        return "";
      }
      const parsedUri = new URL(this.otpUri);
      const secret = parsedUri.searchParams.get("secret");
      return secret;
    },
    getUptime() {
      return moment.duration(this.uptime, "seconds").humanize();
    },
    debugContents() {
      return this.showDmesg ? this.debugResult.dmesg : this.debugResult.debug;
    },
    debugFilename() {
      const type = this.showDmesg ? "dmesg" : "debug";
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
    },
  },
  created() {
    this.$store.dispatch("system/getOnionAddress");
    this.$store.dispatch("system/getVersion");
    this.$store.dispatch("system/getUptime");
  },
  methods: {
    setOtpToken(otpToken) {
      this.otpToken = otpToken;
    },
    async toggleOtpAuthSwitch() {
      // show disable OTP modal
      if (this.otpEnabled) {
        return this.$bvModal.show("disable-otp-auth-modal");
      }

      // show enable OTP modal
      try {
        this.isFetchingOtpUri = true;
        const otpUri = await API.get(
          `${process.env.VUE_APP_MANAGER_API_URL}/v1/account/otpUri`
        );
        this.otpUri = otpUri;
        this.isFetchingOtpUri = false;
        this.$bvModal.show("enable-otp-auth-modal");
      } catch (error) {
        if (error.response && error.response.data) {
          this.$bvToast.toast(error.response.data, {
            title: "Error",
            autoHideDelay: 3000,
            variant: "danger",
            solid: true,
            toaster: "b-toaster-bottom-right",
          });
        }
      }
    },
    async enableOtpAuth(otpToken) {
      this.isTogglingOtpAuth = true;
      try {
        await this.$store.dispatch("user/enableOtpAuth", {
          otpToken,
          otpUri: this.otpUri,
        });
        this.isCorrectOtp = true;

        // add delay before closing modal
        // to complete ripple animation
        await delay(1000);

        this.$bvToast.toast(
          "You've successfully enabled two-factor authentication",
          {
            title: "2FA Enabled",
            autoHideDelay: 3000,
            variant: "success",
            solid: true,
            toaster: "b-toaster-bottom-right",
          }
        );
        this.$bvModal.hide("enable-otp-auth-modal");
      } catch (error) {
        if (error.response && error.response.data) {
          let errorText = error.response.data;
          if (error.response.data === "Invalid OTP Token") {
            this.isIncorrectOtp = true;
            errorText = "Incorrect code. Please try again.";
          }
          this.$bvToast.toast(errorText, {
            title: "Error",
            autoHideDelay: 3000,
            variant: "danger",
            solid: true,
            toaster: "b-toaster-bottom-right",
          });
        }
      }
      this.isTogglingOtpAuth = false;

      // reset state variables for ripple animation
      await delay(1000);
      this.isIncorrectOtp = false;
      this.isCorrectOtp = false;
    },
    async disableOtpAuth(otpToken) {
      this.isTogglingOtpAuth = true;
      try {
        await this.$store.dispatch("user/disableOtpAuth", { otpToken });
        this.isCorrectOtp = true;

        // add delay before closing modal
        // to complete ripple animation
        await delay(1000);
        this.$bvToast.toast(
          "You've successfully disabled two-factor authentication",
          {
            title: "2FA Disabled",
            autoHideDelay: 3000,
            variant: "success",
            solid: true,
            toaster: "b-toaster-bottom-right",
          }
        );
        this.$bvModal.hide("disable-otp-auth-modal");
      } catch (error) {
        if (error.response && error.response.data) {
          let errorText = error.response.data;
          if (error.response.data === "Invalid OTP Token") {
            this.isIncorrectOtp = true;
            errorText = "Incorrect code. Please try again.";
          }
          this.$bvToast.toast(errorText, {
            title: "Error",
            autoHideDelay: 3000,
            variant: "danger",
            solid: true,
            toaster: "b-toaster-bottom-right",
          });
        }
      }
      this.isTogglingOtpAuth = false;

      // reset state variables for ripple animation
      await delay(1000);
      this.isIncorrectOtp = false;
      this.isCorrectOtp = false;
    },
    async changePassword() {
      // disable on testnet
      if (window.location.hostname === "testnet.getumbrel.com") {
        return this.$bvToast.toast('y u try to do dis on testnet :"(', {
          title: "Error",
          autoHideDelay: 3000,
          variant: "danger",
          solid: true,
          toaster: "b-toaster-bottom-right",
        });
      }

      const payload = {
        password: this.currentPassword,
        newPassword: this.newPassword,
        otpToken: this.otpToken,
      };

      this.isChangingPassword = true;

      try {
        await API.post(
          `${process.env.VUE_APP_MANAGER_API_URL}/v1/account/change-password`,
          payload,
          false
        );
        if (this.otpEnabled) {
          this.isCorrectOtp = true;
          // delay for ripple animation to complete
          await delay(1000);
          this.isCorrectOtp = false;
        }
      } catch (error) {
        if (error.response && error.response.data) {
          let errorText = error.response.data;

          if (error.response.data === "Incorrect password") {
            this.isIncorrectPassword = true;
          }
          if (error.response.data === "Invalid OTP Token") {
            errorText = "Incorrect 2FA code";
            this.isIncorrectOtp = true;

            // delay for ripple animation to complete
            await delay(1000);
            this.isIncorrectOtp = false;
          }

          this.$bvToast.toast(errorText, {
            title: "Error",
            autoHideDelay: 3000,
            variant: "danger",
            solid: true,
            toaster: "b-toaster-bottom-right",
          });
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
          toaster: "b-toaster-bottom-right",
        }
      );

      this.isChangingPassword = false;

      // Remove passwords from view
      this.currentPassword = "";
      this.newPassword = "";
      this.confirmNewPassword = "";

      this.$bvModal.hide("change-password-modal");
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
        while (this.loadingDebug) {
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
        type: "text/plain;charset=utf-8;",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
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
          toaster: "b-toaster-bottom-right",
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
        toaster: "b-toaster-bottom-right",
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
          toaster: "b-toaster-bottom-right",
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
            toaster: "b-toaster-bottom-right",
          });
        }
      }
    },
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
  },
  components: {
    CardWidget,
    StorageWidget,
    RamWidget,
    TemperatureWidget,
    ToggleSwitch,
    QrCode,
    InputPassword,
    InputCopy,
    InputOtpToken,
    Seed,
  },
};
</script>

<style lang="scss" scoped></style>
