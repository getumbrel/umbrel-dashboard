<template>
  <div>
    <div class="d-flex flex-column align-items-center justify-content-center min-vh100 p-2">
      <img alt="Umbrel" src="@/assets/logo.svg" class="mb-2 logo" />
      <h1 class="text-center mb-2">{{ steps[currentStep]["heading"] }}</h1>
      <p class="text-muted w-75 text-center">{{ steps[currentStep]["text"] }}</p>

      <div class="form-container mt-3 d-flex flex-column form-container w-100 align-items-center">
        <b-form-input
          v-model="name"
          ref="name"
          placeholder="Your name"
          v-show="currentStep === 1"
          class="card-input w-100"
          autofocus
        ></b-form-input>

        <input-password
          v-model="password"
          ref="password"
          v-show="currentStep === 2"
          placeholder="Your password"
          inputClass="card-input w-100"
        />

        <input-password
          v-model="confirmPassword"
          ref="confirmPassword"
          placeholder="Re-enter your password"
          v-show="currentStep === 3"
          inputClass="card-input w-100"
        />

        <div v-show="currentStep === 5">
          <seed :words="seed" @finish="finishedSeed"></seed>
        </div>

        <!-- <p class="text-danger text-left align-self-start mt-1">
          <small>{{ errorMessage }}</small>
        </p>-->

        <b-button
          variant="success"
          size="lg"
          @click="nextStep"
          v-show="currentStep !== 6"
          :disabled="!isStepValid"
          class="mt-3 px-4"
        >{{ currentStep === 0 ? "Start" : "Next" }}</b-button>

        <b-button
          variant="success"
          size="lg"
          @click="finish"
          v-show="currentStep === 6"
          class="mt-3 px-4"
        >Continue to Dashboard</b-button>

        <b-button
          variant="link"
          size="sm"
          @click="prevStep"
          v-show="currentStep > 1 && currentStep !== 6"
          class="mt-2"
        >Back</b-button>
      </div>

      <b-progress :value="progress" height="1rem" class="onboarding-progress"></b-progress>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueConfetti from "vue-confetti";

import InputPassword from "@/components/InputPassword";
import Seed from "@/components/Utility/Seed";

Vue.use(VueConfetti);

export default {
  data() {
    return {
      name: "",
      password: "",
      confirmPassword: "",
      currentStep: 5,
      steps: [
        {
          heading: "welcome to umbrel",
          text: "First things first — let's make your Umbrel yours."
        },
        {
          heading: "what is your name?",
          text:
            "Your name stays on your Umbrel and is never shared with a 3rd party."
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
          heading: "note down your secret words",
          text:
            "On the next screen you will be shown 24 words. It's recommended that you write them down on a piece of paper and store it a safe place."
        },
        {
          heading: "note down your secret words",
          text:
            'Remember, there is no "forget password" button. You will need these 24 words to recover your Umbrel node.'
        },
        {
          heading: "that's it!",
          text:
            "Congratulations! Your Umbrel is now running and synchronizing the Bitcoin blockchain."
        }
      ],
      seed: [
        "above",
        "still",
        "edit",
        "label",
        "close",
        "element",
        "kitten",
        "vote",
        "pact",
        "year",
        "evil",
        "boil",
        "various",
        "width",
        "expose",
        "floor",
        "glide",
        "sustain",
        "perfect",
        "remember",
        "wet",
        "govern",
        "actress",
        "sister"
      ],
      notedSeed: false
    };
  },
  computed: {
    isStepValid() {
      if (this.currentStep === 1) {
        // if (!/^[A-Za-z ]+$/.test(this.name)) {
        //   return false;
        // }
        // if (this.name.length < 3) {
        //   return false;
        // }
        return this.name.length;
      }

      if (this.currentStep === 2) {
        // if (this.password.length < 6) {
        //   return false;
        // }
        return this.password.length;
      }

      if (this.currentStep === 3) {
        if (this.confirmPassword !== this.password) {
          return false;
        }
      }

      if (this.currentStep === 5) {
        return this.notedSeed;
      }

      return true;
    },
    progress() {
      return this.currentStep === 0
        ? 0
        : Math.round((this.currentStep * 100) / (this.steps.length - 1));
    }
  },
  methods: {
    nextStep() {
      //Register user and initialize wallet at the end
      if (this.currentStep === 5) {
        console.log("Registering user", this.name, this.password, this.seed[0]);
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
      this.currentStep = this.currentStep + 1;
    },
    prevStep() {
      this.currentStep = this.currentStep - 1;
    },
    finish() {
      return this.$router.push("/dashboard");
    },
    finishedSeed() {
      console.log("finis");
      this.notedSeed = true;
    }
  },
  components: {
    InputPassword,
    Seed
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
