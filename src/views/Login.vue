<template>
  <div>
    <div class="d-flex flex-column align-items-center justify-content-center min-vh-100 p-2">
      <img alt="Umbrel" src="@/assets/logo.svg" class="mb-2 logo" />
      <h1 class="text-center mb-2">welcome back</h1>
      <p class="text-muted w-75 text-center">Enter the password to login to your Umbrel</p>

      <div class="form-container mt-3 d-flex flex-column form-container w-100 align-items-center">
        <input-password
          v-model="state.password"
          ref="password"
          placeholder="Password"
          :inputClass="[state.isIncorrectPassword ? 'incorrect-password' : '', 'card-input w-100']"
          :disabled="state.isLoggingIn"
        />
        <div class="login-button-container">
          <transition name="fade">
            <small
              class="mt-2 text-danger error"
              v-show="state.isIncorrectPassword"
            >Incorrect password</small>
          </transition>
          <transition name="slide-up">
            <b-button
              variant="success"
              size="lg"
              class="px-4 login-button"
              :class="{'loading-fade-blink': state.isLoggingIn}"
              v-show="!!state.password && !state.isIncorrectPassword"
              @click="submitPassword"
              :disabled="state.isLoggingIn"
            >Log in</b-button>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputPassword from "@/components/InputPassword";

export default {
  data() {
    return {
      state: {
        password: "",
        isIncorrectPassword: false,
        isLoggingIn: false
      }
    };
  },
  watch: {
    "state.password": function() {
      //bring up log in button after user retries new password after failed attempt
      this.state.isIncorrectPassword = false;
    }
  },
  computed: {},
  methods: {
    submitPassword() {
      this.state.isLoggingIn = true;
      window.setTimeout(() => {
        if (this.state.password === "incorrect") {
          this.state.isIncorrectPassword = true;
          return (this.state.isLoggingIn = false);
        } else {
          return this.$router.push("/dashboard");
        }
      }, 2500);
    }
  },
  components: {
    InputPassword
  }
};
</script>

<style lang="scss">
.logo {
  height: 20vh;
  max-height: 200px;
  width: auto;
}
.form-container {
  max-width: 400px;
}
.login-button-container {
  position: relative;
  padding-top: 5rem;
  width: 100%;
  .error {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
  }
  .login-button {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }
}

.incorrect-password {
  animation: shake 1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.loading-fade-blink {
  animation: loadingFadeBlink 1s infinite linear;
}

@keyframes loadingFadeBlink {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.3;
  }
}

.login-button-container {
  .login-button {
    &.slide-up-enter-active,
    &.slide-up-leave-active {
      transition: transform 0.8s, opacity 0.8s ease;
    }
    &.slide-up-enter {
      transform: translate3d(-50%, 10px, 0);
      opacity: 0;
    }
    &.slide-up-enter-to {
      transform: translate3d(-50%, 0, 0);
      opacity: 1;
    }
    &.slide-up-leave {
      transform: translate3d(-50%, 0, 0);
      opacity: 1;
    }
    &.slide-up-leave-to {
      transform: translate3d(-50%, 10px, 0);
      opacity: 0;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: transform 0.8s, opacity 0.8s ease;
}
.fade-enter-active {
  transition-delay: 0.4s;
}
.fade-enter,
.fade-leave-to {
  transform: translate3d(0, -20px, 0);
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}
</style>
