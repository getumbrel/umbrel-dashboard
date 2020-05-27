<template>
  <div class="p-sm-2">
    <div class="my-3 pb-2">
      <h1>settings</h1>
      <p class="text-muted">Your umbrel, your rules.</p>
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
              <toggle-switch class="align-self-center"></toggle-switch>
            </div>
            <div class="d-flex w-100 justify-content-between px-3 px-lg-4 mb-4">
              <div>
                <span class="d-block">Lightning Network</span>
                <small class="d-block" style="opacity: 0.4">Run Lightning on Tor</small>
              </div>
              <toggle-switch class="align-self-center"></toggle-switch>
            </div>
            <div class="d-flex w-100 justify-content-between px-3 px-lg-4 mb-4">
              <div>
                <span class="d-block">Remote Access</span>
                <small class="d-block" style="opacity: 0.4">Remotely access your Umbrel on Tor</small>
              </div>
              <toggle-switch class="align-self-center"></toggle-switch>
            </div>
            <div class="px-3 px-lg-4 py-2"></div>
          </div>
        </card-widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CardWidget from "@/components/CardWidget";
import ToggleSwitch from "@/components/ToggleSwitch";

export default {
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {},
  components: {
    CardWidget,
    ToggleSwitch
  }
};
</script>

<style lang="scss" scoped></style>
