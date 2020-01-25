<template>
  <div>
    <div class="d-flex flex-column align-items-center justify-content-center min-vh-100 p-2">
      <img src="@/assets/logo.svg" class="mb-2 logo" />

      <h1 class="text-center mb-2">{{ steps[onboardingStep]["heading"] }}</h1>
      <p class="text-muted w-75 text-center">{{ steps[onboardingStep]["text"] }}</p>

      <div class="form-container mt-3 d-flex flex-column form-container w-100 align-items-center">
        <b-form-input
          v-model="name"
          ref="name"
          placeholder="Enter your name"
          v-if="onboardingStep === 1"
          class="card-input w-100"
          autofocus
        ></b-form-input>

        <input-password
          v-model="password"
          ref="password"
          v-if="onboardingStep === 2"
          placeholder="Enter your password"
          inputClass="card-input w-100"
        />

        <input-password
          v-model="confirmPassword"
          ref="confirmPassword"
          placeholder="Re-enter your password"
          v-if="onboardingStep === 3"
          inputClass="card-input w-100"
        />

        <b-list-group class="card card-list w-100" v-if="onboardingStep === 4">
          <b-list-group-item
            class="d-flex"
            button
            v-for="(network) in wifiNetworks"
            v-bind:key="network.name"
            @click="selectWifi(network)"
          >
            <img :src="wifiIcons[network.strength]" class="mr-3" />
            {{ network.name }}
          </b-list-group-item>
        </b-list-group>

        <input-password
          v-model="wifiPassword"
          ref="wifiPassword"
          :placeholder="'Enter WiFi password for ' + selectedWifi"
          v-if="onboardingStep === 5"
          inputClass="card-input w-100"
        />

        <b-button
          variant="success"
          size="lg"
          @click="nextStep"
          v-if="onboardingStep !== 4 && onboardingStep !== 6"
          :disabled="!isStepValid"
          class="mt-3 px-4"
        >{{ onboardingStep === 0 ? 'Start' : 'Next' }}</b-button>

        <b-button
          variant="success"
          size="lg"
          @click="finish"
          v-if="onboardingStep === 6"
          class="mt-3 px-4"
        >Continue to Dashboard</b-button>

        <b-button
          variant="link"
          size="sm"
          @click="prevStep"
          v-if="onboardingStep > 1 && onboardingStep !== 6"
          class="mt-2"
        >Back</b-button>
      </div>
    </div>

    <b-progress :value="progress" height="1rem" class="onboarding-progress"></b-progress>

    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import Vue from "vue";
import VueConfetti from "vue-confetti";

import InputPassword from "@/components/InputPassword";

Vue.use(VueConfetti);

const onboardingSteps = [
  {
    heading: "welcome to umbrel",
    text: "Your journey to become a first-class Bitcoin citizen starts now"
  },
  {
    heading: "let's start with your name",
    text:
      "Your name stays on your Umbrel Node and is never shared with a 3rd party."
  },
  {
    heading: "set your password",
    text:
      "You'll need this password to securely access your Umbrel Node from anywhere."
  },
  {
    heading: "confirm your password",
    text:
      "You'll need this password to securely access your Umbrel Node from anywhere."
  },
  {
    heading: "connect umbrel to wifi",
    text: ""
  },
  {
    heading: "enter wifi password",
    text: ""
  },
  {
    heading: "that's it!",
    text:
      "Congratulations! Your Umbrel Node is now running and synchronizing the Bitcoin blockchain."
  }
];

const wifiIcons = [
  require("@/assets/icon-wifi-1.svg"),
  require("@/assets/icon-wifi-2.svg"),
  require("@/assets/icon-wifi-3.svg")
];

export default {
  data() {
    return {
      name: "",
      password: "",
      confirmPassword: "",
      wifiPassword: "",
      errorMessage: "",
      selectedWifi: "",
      steps: onboardingSteps,
      wifiNetworks: [
        {
          name: "Interwebs@2.4Ghz",
          strength: 1
        },
        {
          name: "Interwebs@5Ghz",
          strength: 0
        },
        {
          name: "My Personal WiFi",
          strength: 2
        },
        {
          name: "Random Access Network",
          strength: 1
        },
        {
          name: "Interwebs 2020",
          strength: 2
        },
        {
          name: "Sneaky Neighbour 4309",
          strength: 0
        },
        {
          name: "Zoya Home NEW",
          strength: 1
        }
      ],
      wifiIcons
    };
  },
  computed: {
    onboardingStep() {
      return this.$store.getters.onboardingStep;
    },
    isStepValid() {
      const { onboardingStep } = this.$store.getters;

      if (onboardingStep === 1) {
        if (!/^[A-Za-z ]+$/.test(this.name)) {
          return false;
        }
        if (this.name.length < 3) {
          return false;
        }
      }

      if (onboardingStep === 2) {
        if (this.password.length < 6) {
          return false;
        }
      }

      if (onboardingStep === 3) {
        if (this.confirmPassword !== this.password) {
          return false;
        }
      }

      if (onboardingStep === 4) {
        if (this.selectedWifi === "") {
          return false;
        }
      }

      if (onboardingStep === 5) {
        return !!this.wifiPassword;
      }

      return true;
    },
    progress() {
      const { onboardingStep } = this.$store.getters;
      const totalSteps = onboardingSteps.length;

      return onboardingStep === 0
        ? 0
        : Math.round((onboardingStep * 100) / (totalSteps - 1));
    }
  },
  methods: {
    nextStep() {
      if (this.$store.getters.onboardingStep === 5) {
        this.$confetti.start({
          particles: [
            {
              type: "rect"
            }
          ]
        });
        window.setTimeout(() => {
          this.$confetti.stop();
        }, 2500);
      }
      return this.$store.dispatch("nextStep");
    },
    prevStep() {
      return this.$store.dispatch("prevStep");
    },
    finish() {
      return alert("You've reached the end of onboarding.");
    },
    selectWifi({ name }) {
      this.selectedWifi = name;
      this.$store.dispatch("selectWifi", name);
      return this.$store.dispatch("nextStep");
    }
  },
  components: {
    InputPassword
  }
};
</script>

<style lang="scss" scoped>
.logo {
  height: 20vh;
  max-height: 200px;
  width: auto;
}
.form-container {
  max-width: 500px;
}
.onboarding-progress {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  border-radius: 0;
  background: transparent;
}
</style>
