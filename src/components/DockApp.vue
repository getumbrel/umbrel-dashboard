<template>
  <div class="dock-app-container cursor-pointer d-flex justify-content-center align-items-center"
    :class="{'bounce': bounceIcon, 'dock-app-container-left': position === 'left'}"
    @click="onClick"
    >
    <div class="dock-app" :class="{'dock-app-active': active}">
      <span class="dock-app-name d-flex justify-content-center align-items-center">{{ name }}</span>
      <div class="dock-app-icon-container">
        <slot name="icon" v-if="this.$slots.icon"></slot>
        <img v-else class="dock-app-icon" :src="require(`@/assets/dock/${id}.png`)" alt="" draggable="false">
        <transition name="grow-transition">
            <span v-if="notifications" class="dock-app-notification text-white text-center" :class="{'dock-app-notification-xl' : notifications > 9}">
              {{ notifications }}
            </span>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import delay from "@/helpers/delay";

export default {
  data() {
    return {
      bounceIcon: false
    };
  },
  props: {
    id: String,
    name: String,
    position: String, 
    notifications: {
      type: Number,
      default: 0
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
      this.bounceIcon = true;
      delay(700).then(() => {
        this.bounceIcon = false;
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.dock-app-container {
  position: relative;
  width: 60px;
  height: 60px;
  transition: margin 0.3s, transform 0.3s ease;
  margin: 0 6px;

  .dock-app {
    &:after {
      content: "";
      position: absolute;
      width: 5px;
      height: 5px;
      bottom: -8px;
      left: 50%;
      transform: translate3d(-2.5px, 0, 0);
      border-radius: 2.5px;
      background-color: rgba(255, 255, 255, 0.5);
      opacity: 0;
      transition: opacity 0.1s ease;
    }
    &.dock-app-active:after {
      opacity: 1;
    }
  }

  .dock-app-name {
    position: absolute;
    top: -70px;
    left: 50%;
    white-space: nowrap;
    background: rgba(0, 0, 0, 0.7);
    color: rgba(255, 255, 255, 1);
    padding: 4px 15px;
    border-radius: 6px;
    font-size: 0.9rem;
    visibility: hidden;
    transform: translate3d(-50%, 0, 0);
    &:after {
      content: "";
      position: absolute;
      bottom: -10px;
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid rgba(0, 0, 0, 0.7);
    }
  }

  .dock-app-icon-container {
    transition: transform 0.2s ease;
    .dock-app-icon {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
      // box-shadow: 0 0 6px rgb(0 0 0 / 10%);
    }
    .dock-app-notification {
      position: absolute;
      top: -7px;
      right: -6px;
      height: 26px;
      width: 26px;
      background: #FF4E4E;
      border-radius: 13px;
      box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.1);
      font-size: 15px;
      line-height: 25px;
      margin: 0;
      transition: transform 0.4s, opacity 0.4s ease;
      &.dock-app-notification-xl {
        width: 34px;
      }
    }
  }

  &:active {
    .dock-app-icon {
      filter: brightness(0.5)   
    }
  }

  &.bounce {
    animation: bounce-vertical 0.6s ease;
  }

  &.dock-app-container-left {
    margin: 6px 0;
    .dock-app {
      &:after {
        left: -8px;
        top: 50%;
        transform: translate3d(0, -2.5px, 0);
      }
    }
    .dock-app-name {
      top: 50%;
      left: 100px;
      transform: translate3d(0, -50%, 0);
      &:after {
        display: none;
      }
    }
    &.bounce {
      animation: bounce-horizontal 0.6s ease;
    }
  }
}

@keyframes bounce-vertical {
  0%, 100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, -60%, 0);
  }
  90% {
    transform: translate3d(0, 5px, 0);
  }
}

@keyframes bounce-horizontal {
  0%, 100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(60%, 0, 0);
  }
  90% {
    transform: translate3d(-5px, 0, 0);
  }
}

// enable icon hover animation and 
// name visibility on desktops only

@media (hover: hover) and (pointer: fine) {
  .dock-app-container {
    &:hover {
      .dock-app-name  {
        visibility: visible;
      }
    }
    .dock-app-icon-container:hover {
      transform: scale3d(1.2, 1.2, 1.2) translate3d(0, -10px, 0);
    }
    &.dock-app-container-left {
      &:hover {
        margin: 15px 0;
      }
      .dock-app-icon-container:hover {
        transform: scale3d(1.3, 1.3, 1.3) translate3d(10px, 0, 0);
      }
    }
  }
}
</style>