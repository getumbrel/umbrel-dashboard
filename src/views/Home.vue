<template>
  <div>
    <div class="d-flex flex-column align-items-center justify-content-center min-vh-100 p-2">
      <img alt="Umbrel" src="@/assets/logo.svg" class="mb-2 logo" />

      <h1
        :class="[isDarkMode ? 'text-white' : '', 'text-center mb-2']"
      >{{ steps[onboardingStep]["heading"] }}</h1>
      <p class="text-muted w-75 text-center">{{ steps[onboardingStep]["text"] }}</p>

      <div class="form-container mt-3 d-flex flex-column form-container w-100 align-items-center">
        <b-form-input
          v-model="name"
          ref="name"
          placeholder="Enter your name"
          v-show="onboardingStep === 1"
          :class="[isDarkMode ? 'dark-mode' : '', 'card-input w-100']"
          autofocus
        ></b-form-input>

        <ThemeSwitch v-show="onboardingStep === 2" class="mb-2" />

        <b-list-group
          :class="[isDarkMode ? 'dark-mode' : '', 'card card-list w-100']"
          v-show="onboardingStep === 3"
        >
          <b-list-group-item
            :class="[isDarkMode ? 'dark-mode' : '', 'd-flex']"
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
          v-show="onboardingStep === 4"
          :inputClass="[isDarkMode ? 'dark-mode' : '', 'card-input w-100']"
        />

        <input-password
          v-model="password"
          ref="password"
          v-show="onboardingStep === 5"
          placeholder="Enter your password"
          :inputClass="[isDarkMode ? 'dark-mode' : '', 'card-input w-100']"
        />

        <input-password
          v-model="confirmPassword"
          ref="confirmPassword"
          placeholder="Re-enter your password"
          v-show="onboardingStep === 6"
          :inputClass="[isDarkMode ? 'dark-mode' : '', 'card-input w-100']"
        />

        <!-- <p class="text-danger text-left align-self-start mt-1">
          <small>{{ errorMessage }}</small>
        </p>-->

        <b-button
          variant="success"
          size="lg"
          @click="nextStep"
          v-show="onboardingStep !== 3 && onboardingStep !== 7"
          :disabled="!isStepValid"
          class="mt-3 px-4"
        >{{ onboardingStep === 0 ? 'Start' : 'Next' }}</b-button>

        <b-button
          variant="success"
          size="lg"
          @click="finish"
          v-show="onboardingStep === 7"
          class="mt-3 px-4"
        >Continue to Dashboard</b-button>

        <b-button
          variant="link"
          size="sm"
          @click="prevStep"
          v-show="onboardingStep > 1 && onboardingStep !== 7"
          class="mt-2"
        >Back</b-button>
      </div>
    </div>

    <b-progress :value="progress" height="1rem" class="onboarding-progress"></b-progress>
  </div>
</template>

<script>
import Vue from "vue";
import VueConfetti from "vue-confetti";

import InputPassword from "@/components/InputPassword";
import ThemeSwitch from "@/components/ThemeSwitch";

Vue.use(VueConfetti);

const onboardingSteps = [
  {
    heading: "welcome to umbrel",
    text: "First things first — let's make your Umbrel yours."
  },
  {
    heading: "what is your name?",
    text: "Your name stays on your Umbrel and is never shared with a 3rd party."
  },
  {
    heading: "lights on or lights off?",
    text: "Dark or light — your Umbrel, your theme."
  },
  {
    heading: "choose your wifi",
    text: "Your Umbreel belongs to your network."
  },
  {
    heading: "enter wifi password",
    text: ""
  },
  {
    heading: "set your password",
    text:
      "You'll need this password to securely access your Umbrel from anywhere."
  },
  {
    heading: "confirm your password",
    text:
      "You'll need this password to securely access your Umbrel from anywhere."
  },
  {
    heading: "that's it!",
    text:
      "Congratulations! Your Umbrel is now running and synchronizing the Bitcoin blockchain."
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
        // if (!/^[A-Za-z ]+$/.test(this.name)) {
        //   return false;
        // }
        // if (this.name.length < 3) {
        //   return false;
        // }
        return this.name.length;
      }

      if (onboardingStep === 3) {
        if (this.selectedWifi === "") {
          return false;
        }
      }

      if (onboardingStep === 4) {
        return !!this.wifiPassword;
      }

      if (onboardingStep === 5) {
        // if (this.password.length < 6) {
        //   return false;
        // }
        return this.password.length;
      }

      if (onboardingStep === 6) {
        if (this.confirmPassword !== this.password) {
          return false;
        }
      }

      return true;
    },
    progress() {
      const { onboardingStep } = this.$store.getters;
      const totalSteps = onboardingSteps.length;

      return onboardingStep === 0
        ? 0
        : Math.round((onboardingStep * 100) / (totalSteps - 1));
    },
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    }
  },
  methods: {
    nextStep() {
      if (this.$store.getters.onboardingStep === 6) {
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
    },
    toggleDarkMode() {
      this.$store.commit("toggleDarkMode");
    }
  },
  components: {
    InputPassword,
    ThemeSwitch
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
