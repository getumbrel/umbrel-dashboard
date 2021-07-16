<template>
  <div>
    <div class="px-3 px-lg-4 mb-4" v-for="(app, index) in apps" :key="app.id">
      <div class="d-flex justify-content-between w-100 mb-3"> 
        <div>
          <img class="onion-app-icon" :alt="`${app.name}`" :src="`https://getumbrel.github.io/umbrel-apps-gallery/${app.id}/icon.svg`">
        </div>
        <div class="onion-app-desc">
          <span class="d-block">{{app.name}}</span>
          <small class="d-block" style="opacity: 0.4">{{app.tagline}}</small>
        </div>
        <toggle-switch
          class="align-self-center"
          disabled
          tooltip="Sorry, Tor access cannot be disabled for now"
        ></toggle-switch>
      </div>
      <input-copy class="w-100" size="sm" :value="app.hiddenService"></input-copy>
      <hr v-if="index != apps.length-1" class="w-75 onion-app-seperator" />
    </div>
  </div>
</template>

<script>
import ToggleSwitch from "@/components/ToggleSwitch";
import InputCopy from "@/components/Utility/InputCopy";

export default {
  components: { ToggleSwitch, InputCopy },
  props: {
    apps: Array
  }
};
</script>

<style scoped lang="scss">
.onion-app-icon {
  width: 50px; 
  margin-top: 0.3em; 
  height: 50px; 
  border-radius:15px;
}

.onion-app-desc {
  width: 60% !important;
}

.onion-app-seperator {
  margin-top: 2em; 
  margin-bottom: 2em;
}
</style>