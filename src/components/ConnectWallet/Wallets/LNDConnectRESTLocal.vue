<template>
  <card-widget header="Here's how to connect any other wallet that supports LND REST on local network to your Umbrel">
    <div class="px-3 px-lg-4 pb-3 d-lg-flex align-items-center justify-content-center">
      <qr-code
          :value="urls.lnd.restLocal"
          :size="260"
          level="M"
          class="qr-image mx-auto mb-3 mb-lg-0"
          showLogo
      ></qr-code>
      <div class="w-100 align-self-center ml-lg-3">
        <label class="mb-1 d-block"><small>LNDConnect URL</small></label>
          <input-copy
            size="sm"
            :value="urls.lnd.restLocal"
          ></input-copy>
      </div>
    </div>
  </card-widget>
</template>

<script>
import CardWidget from "@/components/CardWidget";
import InputCopy from "@/components/Utility/InputCopy";
import QrCode from "@/components/Utility/QrCode.vue";

export default {
  props: {
    urls: Object,
  },
  components: {
    CardWidget,
    InputCopy,
    QrCode,
  },
};
</script>
