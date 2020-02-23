<template>
  <div>
    <!-- <b-button class="ml-4 mb-4" @click="addBlocks">+</b-button> -->
    <ul class="blockchain-container">
      <li
        href="#"
        class="flex-column align-items-start px-4 blockchain-block"
        v-for="block in blocks"
        :key="block.number"
      >
        <div class="d-flex w-100 justify-content-between">
          <div class="d-flex">
            <div class="blockchain-block-icon">
              <svg
                width="28"
                height="30"
                viewBox="0 0 28 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.3472 8.84298C24.6806 8.07317 24.6806 6.14865 23.3472 5.37886L15.0304 0.577324C14.4116 0.220073 13.6493 0.220077 13.0305 0.577333L4.71387 5.37887C3.38053 6.14866 3.38052 8.07316 4.71384 8.84297L13.0304 13.6447C13.6493 14.0019 14.4117 14.0019 15.0305 13.6447L23.3472 8.84298Z"
                  fill="#5351FB"
                />
                <path
                  d="M14.9243 26.5359C14.9243 28.0755 16.591 29.0378 17.9243 28.268L26.2443 23.4644C26.8631 23.1072 27.2443 22.4469 27.2443 21.7324V12.1218C27.2443 10.5822 25.5777 9.61992 24.2444 10.3897L15.9243 15.1931C15.3055 15.5504 14.9243 16.2106 14.9243 16.9252V26.5359Z"
                  fill="#5351FB"
                />
                <path
                  d="M3.8164 10.3897C2.48306 9.61995 0.816406 10.5822 0.816406 12.1218V21.7324C0.816406 22.4469 1.1976 23.1072 1.81639 23.4644L10.1362 28.268C11.4695 29.0378 13.1362 28.0755 13.1362 26.5359V16.9252C13.1362 16.2106 12.755 15.5504 12.1362 15.1931L3.8164 10.3897Z"
                  fill="#5351FB"
                />
              </svg>

              <div class="blockchain-block-icon-chainlink"></div>
              <div class="blockchain-block-icon-bg"></div>
            </div>
            <div class="align-self-center">
              <h6 class="mb-1 font-weight-normal">Block {{ block.number }}</h6>
              <small class="text-muted">{{ block.txs }} transactions</small>
            </div>
          </div>
          <small class="text-muted align-self-center">{{ block.time }}</small>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blocks: [
        {
          number: 683500,
          txs: 1802,
          time: "a few secs ago"
        },
        {
          number: 683499,
          txs: 1934,
          time: "10 mins ago"
        },
        {
          number: 683498,
          txs: 1783,
          time: "17 mins ago"
        }
      ]
    };
  },
  computed: {},
  methods: {
    addBlocks() {
      const tip = this.blocks[0];
      const newBlock = { number: tip.number + 1, txs: tip.txs + 7 };
      this.blocks = [newBlock, ...this.blocks].slice(0, 3);
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.blockchain-container {
  list-style: none;
  padding: 0;
  margin: 0;
}
.blockchain-block {
  padding: 0 0 2rem 0;
}
.blockchain-block-icon {
  margin-right: 1rem;
  position: relative;
  height: 4rem;
  width: 4rem;

  svg {
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .blockchain-block-icon-chainlink {
    position: absolute;
    height: 4rem;
    width: 2px;
    background: #eeeeff;
    top: 50%;
    left: calc(50% - 1px);
  }

  .blockchain-block-icon-bg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: #eeeeff;
    z-index: 0;
    border-radius: 100%;
  }
}
</style>