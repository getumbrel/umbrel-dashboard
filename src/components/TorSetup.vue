<template>
  <card-widget title="Tor" icon="icon-app-tor.svg" subTitle="Setup Tor on your device">
    <div class="px-3 px-lg-4">
      <h6>Device</h6>
      <b-form-select v-model="selectedDevice" class="mb-3">
        <b-form-select-option :value="null || ''" disabled >Select your device</b-form-select-option>
        <b-form-select-option-group label="Computers">
          <b-form-select-option value="macOS">macOS</b-form-select-option>
          <b-form-select-option value="Linux">Linux</b-form-select-option>
          <b-form-select-option value="Windows">Windows</b-form-select-option>
        </b-form-select-option-group>
        <b-form-select-option-group label="Mobile devices">
          <b-form-select-option value="iOS">iOS</b-form-select-option>
          <b-form-select-option value="Android">Android</b-form-select-option>
        </b-form-select-option-group>
      </b-form-select>

      <div v-if="selectedDevice == 'macOS'">
        <div class="d-block mb-3">
          <strong>Step 1 - </strong> 
          Install <a href="https://brew.sh/" target="_blank">Homebrew</a> on your mac by running in Terminal app:
          <input-copy value='/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"' size="sm"></input-copy>
        </div>
        <div class="d-block mb-3">
          <strong>Step 2 - </strong>
          Then install Tor using brew:
          <input-copy value="brew install tor" size="sm"></input-copy>
        </div>
        <div class="d-block mb-3">
          <strong>Optional - </strong>
          You can check if Tor service is running with:
          <input-copy value="brew services list"></input-copy>
        </div>
      </div>

      <div v-else-if="selectedDevice == 'Linux'">
        <div class="d-block mb-3">
          <strong>Step 1 - </strong> 
          Install Tor using your package manager, e.g.:
          <input-copy value="sudo apt-get install tor" size="sm"></input-copy>
        </div>
        <div class="d-block mb-3">
          <strong>Optional - </strong>
          You can check if Tor service is running with:
          <input-copy value="systemctl status tor"></input-copy>
        </div>
      </div>

      <div v-else-if="selectedDevice == 'Windows'">
        <div class="d-block mb-3">
          <strong>Step 1 - </strong> 
          Install Chocolatey, available <a target="_blank" href="https://chocolatey.org/install">here</a>.
        </div>
        <div class="d-block mb-3">
          <strong>Step 2 - </strong>
          In the PowerShell, run:
          <input-copy value="choco install tor"></input-copy>
        </div>
        <div class="d-block mb-3">
          <strong>Step 3 - </strong>
          Install Tor as a service:
          <input-copy value="tor -service install"></input-copy>
        </div>
      </div>

      <div v-else-if="selectedDevice == 'iOS'">
        <p class="text-center mb-0">
          iOS doesn't currently support system-wide Tor integration.
          <br/><br/>
          At this time, only Fully Noded (Bitcoin) and Zap (Lightning) can natively use Tor on Apple mobile devices.
        </p>
      </div>

      <div v-else-if="selectedDevice == 'Android'">
        <div class="d-block mb-3">
          <strong>Step 1 - </strong> 
          Download <strong>Orbot</strong>, available on Play Store and F-Droid.
          <div class="w-100 d-flex justify-content-around">
            <a href="https://f-droid.org/packages/org.torproject.android" target="_blank">
              <img src="https://guardianproject.info/img/get-it-on-fdroid.png" alt="Get it on F-Droid" height="70">
            </a>
            <a href="https://play.google.com/store/apps/details?id=org.torproject.android" target="_blank">
              <img src="https://guardianproject.info/img/en-play-badge.png" alt="Get it on Google Play" height="70">
            </a>
          </div>
        </div>
        <div class="d-block mb-3">
          <strong>Step 2 - </strong>
          On Orbot's main screen, select the gear icon under "Tor-Enabled apps" and add your app. Click "STOP" and restart Orbot.
        </div>
        <div class="d-block mb-3">
          <strong>Step 3 - </strong>
          Turn on the "VPN Mode" option.
        </div>
        <div class="d-block mb-3">
          <strong>Step 4 - </strong>
          Start Tor by clicking on the big onion.
        </div>
      </div>
    </div>
  </card-widget>
</template>

<script>
import CardWidget from "@/components/CardWidget";
import InputCopy from "@/components/Utility/InputCopy.vue";

export default {
  props: {
    selectedDevice: String
  },
  data() {
    return {
    };
  },
  computed: {},
  methods: {},
  components: {
    CardWidget,
    InputCopy
  }
};
</script>

<style lang="scss" scoped></style>
