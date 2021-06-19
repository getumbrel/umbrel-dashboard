<template>
  <div @click="close">
    <div class="modal-backdrop" style="opacity:0.5"></div>
    <div class="modal inmodal" style="display:flex; justify-content: center; align-items: center">
      <div
          class="modal-dialog"
      >
        <div ref="modalcontent" class="modal-content" style="display:flex; align-items: center;">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit("close-modal");
    }
  }
};
</script>
