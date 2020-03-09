<template>
  <card-widget
    header="Lightning Wallet"
    status="Running"
    status-type="success"
    title="162,500"
    sub-title="Sats"
    icon="icon-app-lightning.svg"
    :loading="state.loading"
    :style="{minHeight: state.minHeight}"
  >
    <!-- Back Button -->
    <div class="px-4 pt-2 pb-3" v-if="state.mode != 'balance'">
      <a href="#" class="card-link text-muted" v-on:click.stop.prevent="reset">
        <svg
          width="7"
          height="13"
          viewBox="0 0 7 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.74372 11.4153C7.08543 11.7779 7.08543 12.3659 6.74372 12.7285C6.40201 13.0911 5.84799 13.0911 5.50628 12.7285L0.256283 7.15709C-0.0749738 6.80555 -0.0865638 6.23951 0.229991 5.87303L5.04249 0.301606C5.36903 -0.0764332 5.92253 -0.101971 6.27876 0.244565C6.63499 0.591101 6.65905 1.17848 6.33251 1.55652L2.08612 6.47256L6.74372 11.4153Z"
            fill="#C3C6D1"
          />
        </svg>
        Back
      </a>
    </div>

    <!-- transition -->

    <transition name="lightning-mode-change" mode="out-in">
      <!-- Default Balance/tx screen -->
      <div v-if="state.mode === 'balance'" key="mode-balance" class="mode-balance">
        <b-list-group>
          <b-list-group-item href="#" class="flex-column align-items-start px-4">
            <div class="d-flex w-100 justify-content-between">
              <h6 class="mb-0 font-weight-normal">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5944 6.04611C13.6001 5.73904 13.3493 5.48755 13.0369 5.48712C12.7351 5.4867 12.4836 5.7375 12.4836 6.03895L12.4758 11.6999L4.94598 3.83615C4.72819 3.61848 4.16402 3.62477 3.94599 3.8422C3.72796 4.05963 3.73466 4.62433 3.95209 4.84236L11.6871 12.4864L6.03143 12.4733C5.72435 12.4782 5.47251 12.7293 5.47244 13.0308C5.47201 13.3431 5.72317 13.595 6.0299 13.5898L13.031 13.5994C13.3381 13.6051 13.5896 13.3543 13.5844 13.0476L13.5944 6.04611Z"
                    fill="#00CD98"
                  />
                </svg>
                <span style="margin-left: 6px;">Tips from Reddit</span>
              </h6>
              <span class="font-weight-bold">+125,000</span>
            </div>
            <small class="text-muted mt-0" style="margin-left: 24px;">6 mins ago</small>
          </b-list-group-item>
          <b-list-group-item href="#" class="flex-column align-items-start px-4">
            <div class="d-flex w-100 justify-content-between">
              <h6 class="mb-0 font-weight-normal">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.06802 4.71946C6.76099 4.71224 6.50825 4.96178 6.50627 5.27413C6.50435 5.57592 6.7539 5.82865 7.05534 5.83022L12.7162 5.86616L4.81508 13.3568C4.59632 13.5735 4.59981 14.1376 4.81615 14.3568C5.03249 14.5759 5.59723 14.572 5.81634 14.3556L13.4988 6.6587L13.4576 12.3143C13.4609 12.6214 13.7108 12.8745 14.0122 12.876C14.3246 12.878 14.5777 12.6281 14.574 12.3214L14.6184 5.32036C14.6257 5.01333 14.3761 4.76059 14.0694 4.76427L7.06802 4.71946Z"
                    fill="#5351FB"
                  />
                </svg>

                <span style="margin-left: 6px;">Blockstream Satellite</span>
              </h6>
              <span class="font-weight-bold">-37</span>
            </div>
            <small class="text-muted mt-0" style="margin-left: 24px;">2 hrs ago</small>
          </b-list-group-item>
          <b-list-group-item href="#" class="flex-column align-items-start px-4">
            <div class="d-flex w-100 justify-content-between">
              <h6 class="mb-0 font-weight-normal">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.06802 4.71946C6.76099 4.71224 6.50825 4.96178 6.50627 5.27413C6.50435 5.57592 6.7539 5.82865 7.05534 5.83022L12.7162 5.86616L4.81508 13.3568C4.59632 13.5735 4.59981 14.1376 4.81615 14.3568C5.03249 14.5759 5.59723 14.572 5.81634 14.3556L13.4988 6.6587L13.4576 12.3143C13.4609 12.6214 13.7108 12.8745 14.0122 12.876C14.3246 12.878 14.5777 12.6281 14.574 12.3214L14.6184 5.32036C14.6257 5.01333 14.3761 4.76059 14.0694 4.76427L7.06802 4.71946Z"
                    fill="#5351FB"
                  />
                </svg>

                <span style="margin-left: 6px;">Michael Shwebz</span>
              </h6>
              <span class="font-weight-bold">-1,302,532</span>
            </div>
            <small class="text-muted mt-0" style="margin-left: 24px;">1 day ago</small>
          </b-list-group-item>
        </b-list-group>
      </div>

      <!-- Paste Invoice Screen -->
      <div class="px-4 mode-send" v-if="state.mode === 'send'" key="mode-send">
        <label class="sr-onlsy" for="input-sats">Paste Invoice</label>
        <b-input
          id="input-sats"
          class="mb-3 neu-input"
          type="text"
          size="lg"
          min="1"
          v-model="state.send.invoiceText"
          autofocus
          @input="pasteInvoice"
          :disabled="state.send.isSending"
        ></b-input>
        <p>
          <span v-show="state.send.isValidInvoice && state.send.description">
            Paying
            <b>{{ state.send.amount }}</b> sats for
            <b>{{ state.send.description }}</b>
          </span>
        </p>
      </div>

      <!-- Successfully paid invoice -->

      <div class="px-4 mode-sent" v-if="state.mode === 'sent'" key="mode-sent">
        <div class="checkmark mb-4">
          <svg
            width="54"
            height="43"
            viewBox="0 0 54 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="checkmark-icon"
          >
            <path
              d="M47.657 1.26266C48.9446 -0.245227 51.2166 -0.428585 52.7315 0.853121C54.2464 2.13483 54.4306 4.39624 53.1429 5.90413L22.543 41.7374C21.2351 43.2689 18.9176 43.4303 17.4083 42.0948L1.20832 27.7615C-0.27769 26.4468 -0.411537 24.1818 0.909365 22.7027C2.23027 21.2236 4.50572 21.0903 5.99173 22.4051L19.4408 34.3045L47.657 1.26266Z"
              fill="white"
            />
          </svg>
        </div>
        <p class="text-center mb-4">
          Paid
          <b>{{state.send.amount}} sats</b> for
          <b>{{state.send.description}}</b>
        </p>
      </div>

      <!-- Create Invoice -->
      <div class="px-4 mode-receive" v-if="state.mode === 'receive'" key="mode-receive">
        <label class="sr-onlsy" for="input-sats">Sats</label>
        <b-input
          id="input-sats"
          class="mb-3 neu-input"
          type="number"
          size="lg"
          min="1"
          autofocus
          v-model.number="state.receive.amount"
          :disabled="state.receive.isGeneratingInvoice"
        ></b-input>

        <!-- <small class="text-right">{{ state.receive.amount }}</small> -->

        <label class="sr-onlsy" for="input-description">
          Description
          <small class="text-muted">(optional)</small>
        </label>
        <b-input
          id="input-description"
          class="mb-4 neu-input"
          size="lg"
          v-model="state.receive.description"
          :disabled="state.receive.isGeneratingInvoice"
        ></b-input>
      </div>

      <!-- Copy Invoice -->
      <div class="px-4 mode-invoice" v-if="this.state.mode === 'invoice'" key="mode-invoice">
        <p class="text-center text-muted mb-0">
          Please pay
          <b>{{state.receive.amount}} {{ state.receive.amount > 1 ? 'sats' : 'sat'}}</b>
          {{ state.receive.description ? "for" : null }}
          <b>{{ state.receive.description }}</b>
        </p>
        <img class="w-100 m-auto d-block" src="@/assets/fake-qr.png" style="max-width: 200px;" />
        <b-input-group class="mb-4 mt-2" size="sm">
          <b-form-input
            id="generated-invoice"
            type="text"
            readonly
            v-model="state.receive.invoiceText"
          ></b-form-input>

          <b-input-group-append>
            <b-button variant="primary" @click="copyInvoice">Copy Invoice</b-button>
          </b-input-group-append>
        </b-input-group>
      </div>

      <!-- <div class="px-4 py-2">
              <a href="#" class="card-link">View all transactions</a>
      </div>-->

      <!-- <div class="px-4 pt-2 pb-3" v-if="this.state.mode === 'balance'">
        <a href="#" class="card-link">Manage</a>
      </div>-->
    </transition>

    <!-- Buttons -->
    <div class>
      <b-button-group class="w-100" v-if="this.state.mode === 'balance'">
        <b-button
          class="w-50"
          variant="primary"
          style="border-radius: 0; border-bottom-left-radius: 1rem; padding-top: 1rem; padding-bottom: 1rem;"
          @click="changeMode('send')"
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="mr-1"
          >
            <path
              d="M7.06802 4.71946C6.76099 4.71224 6.50825 4.96178 6.50627 5.27413C6.50435 5.57592 6.7539 5.82865 7.05534 5.83022L12.7162 5.86616L4.81508 13.3568C4.59632 13.5735 4.59981 14.1376 4.81615 14.3568C5.03249 14.5759 5.59723 14.572 5.81634 14.3556L13.4988 6.6587L13.4576 12.3143C13.4609 12.6214 13.7108 12.8745 14.0122 12.876C14.3246 12.878 14.5777 12.6281 14.574 12.3214L14.6184 5.32036C14.6257 5.01333 14.3761 4.76059 14.0694 4.76427L7.06802 4.71946Z"
              fill="#FFFFFF"
            />
          </svg>Send
        </b-button>
        <b-button
          class="w-50"
          variant="success"
          style="border-radius: 0; border-bottom-right-radius: 1rem; padding-top: 1rem; padding-bottom: 1rem;"
          @click="changeMode('receive')"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="mr-1"
          >
            <path
              d="M13.5944 6.04611C13.6001 5.73904 13.3493 5.48755 13.0369 5.48712C12.7351 5.4867 12.4836 5.7375 12.4836 6.03895L12.4758 11.6999L4.94598 3.83615C4.72819 3.61848 4.16402 3.62477 3.94599 3.8422C3.72796 4.05963 3.73466 4.62433 3.95209 4.84236L11.6871 12.4864L6.03143 12.4733C5.72435 12.4782 5.47251 12.7293 5.47244 13.0308C5.47201 13.3431 5.72317 13.595 6.0299 13.5898L13.031 13.5994C13.3381 13.6051 13.5896 13.3543 13.5844 13.0476L13.5944 6.04611Z"
              fill="#FFFFFF"
            />
          </svg>Receive
        </b-button>
      </b-button-group>

      <b-button
        class="w-100"
        variant="primary"
        style="border-radius: 0; border-bottom-left-radius: 1rem; border-bottom-right-radius: 1rem; padding-top: 1rem; padding-bottom: 1rem;"
        @click="sendSats"
        v-if="state.mode === 'send'"
        :disabled="!state.send.invoiceText || !state.send.isValidInvoice || state.send.isSending"
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="mr-1"
        >
          <path
            d="M7.06802 4.71946C6.76099 4.71224 6.50825 4.96178 6.50627 5.27413C6.50435 5.57592 6.7539 5.82865 7.05534 5.83022L12.7162 5.86616L4.81508 13.3568C4.59632 13.5735 4.59981 14.1376 4.81615 14.3568C5.03249 14.5759 5.59723 14.572 5.81634 14.3556L13.4988 6.6587L13.4576 12.3143C13.4609 12.6214 13.7108 12.8745 14.0122 12.876C14.3246 12.878 14.5777 12.6281 14.574 12.3214L14.6184 5.32036C14.6257 5.01333 14.3761 4.76059 14.0694 4.76427L7.06802 4.71946Z"
            fill="#FFFFFF"
          />
        </svg>
        {{ this.state.send.isSending ? 'Sending...' : 'Send'}}
      </b-button>

      <b-button
        class="w-100"
        variant="success"
        style="border-radius: 0; border-bottom-left-radius: 1rem; border-bottom-right-radius: 1rem; padding-top: 1rem; padding-bottom: 1rem;"
        @click="createInvoice"
        v-if="state.mode === 'receive'"
        :disabled="!state.receive.amount || state.receive.amount < 1 || state.receive.isGeneratingInvoice"
      >{{state.receive.isGeneratingInvoice ? 'Creating Invoice...' : 'Create Invoice' }}</b-button>
    </div>
  </card-widget>
</template>

<script>
import CardWidget from "@/components/CardWidget";

export default {
  data() {
    return {
      state: {
        mode: "balance", //balance, receive (create invoice), invoice, send, sent
        receive: {
          amount: null,
          description: "",
          invoiceText: "lnbc9990238tdshjshdgshdsud8i82eyshdgyts7diuhsbdnmsdsd",
          invoiceQR: "",
          isGeneratingInvoice: false
        },
        send: {
          invoiceText: "",
          description: "",
          amount: null,
          isValidInvoice: false,
          isSending: false
        },
        loading: false,
        minHeight: "auto"
      }
    };
  },
  mounted() {
    //set card height so it's consistent between all modes
    // this.state.minHeight = `${this.$el.clientHeight}px`;
  },
  props: {},
  computed: {},
  methods: {
    changeMode(mode) {
      return (this.state.mode = mode); //balance, receive (create invoice), invoice, send, sent
    },
    reset() {
      //back button
      this.state.receive = {
        amount: null,
        description: "",
        invoiceText: "lnbc9990238tdshjshdgshdsud8i82eyshdgyts7diuhsbdnmsdsd",
        invoiceQR: "",
        isGeneratingInvoice: false
      };
      this.state.send = {
        invoiceText: "",
        description: "",
        amount: null,
        isValidInvoice: false,
        isSending: false
      };
      this.state.loading = false;
      return (this.state.mode = "balance");
    },
    sendSats() {
      if (!this.state.send.isValidInvoice) return;

      this.state.loading = true;
      this.state.send.isSending = true;

      window.setTimeout(() => {
        this.state.loading = false;
        this.state.send.isSending = false;
        this.state.mode = "sent";
      }, 500);
    },
    createInvoice() {
      this.state.loading = true;
      this.state.receive.isGeneratingInvoice = true;

      window.setTimeout(() => {
        this.state.loading = false;
        this.state.receive.isGeneratingInvoice = false;
        this.state.mode = "invoice";
      }, 3000);
    },
    copyInvoice() {
      /* Get the text field */
      var copyText = document.getElementById("generated-invoice");

      /* Select the text field */
      copyText.select();
      copyText.setSelectionRange(0, 99999); /*For mobile devices*/

      /* Copy the text inside the text field */
      document.execCommand("copy");
    },
    pasteInvoice() {
      //on empty field
      if (!this.state.send.invoiceText) {
        this.state.loading = false;
        this.state.send.description = "";
        this.state.send.isValidInvoice = false;
        this.state.send.amount = null;
        this.state.send.description = "";
        return;
      }
      this.state.loading = true;
      this.state.send.description = "";
      this.state.send.isValidInvoice = false;

      //replicate API delay
      window.setTimeout(() => {
        this.state.loading = false;
        this.state.send.isValidInvoice = true;
        this.state.send.amount = 1000;
        this.state.send.description = "subscription fee";
      }, 100);
    }
  },
  watch: {
    //fetch invoice details
    // "state.send.invoiceText": invoiceText => {
    //   this.state.loading = true;
    //   window.setTimeout(() => {
    //     this.state.loading = false;
    //     console.log(invoiceText);
    //   }, 3000);
    // }
  },
  components: {
    CardWidget
  }
};
</script>

<style lang="scss" scoped>
.neu-input {
  background: linear-gradient(346.78deg, #f7fcfc 0%, #fafcfa 100%);
  border: 1px solid rgba(0, 0, 0, 0.02);
  box-shadow: inset 0px 5px 10px rgba(0, 0, 0, 0.08);
  color: rgba(0, 0, 0, 0.8);
}
.checkmark {
  display: block;
  position: relative;
  width: 150px;
  height: 150px;
  margin-left: auto;
  margin-right: auto;
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate3d(-50%, -50%, 0) scale(1); //animated
    transition: transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    background: #00cd98;
    box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5);
    border-radius: 50%;
    z-index: 0;
  }
  .checkmark-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0) scale(1); //animated
    transition: transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition-delay: 0.3s;
  }
}

.mode-balance,
.mode-send,
.mode-receive,
.mode-sent,
.mode-invoice {
  transition: transform 0.3s, opacity 0.3s linear;
  // transform: translate3d(100%, 0, 0);
}

.lightning-mode-change-enter-active,
// .lightning-mode-change-leave-active {

// }

.lightning-mode-change-enter {
  transform: translate3d(-20px, 0, 0);
  opacity: 0;
  .checkmark {
    &:before {
      transform: translate3d(-50%, -50%, 0) scale(0);
    }
    .checkmark-icon {
      transform: translate3d(-50%, -50%, 0) scale(0);
    }
  }
}

.lightning-mode-change-enter-to {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  .checkmark {
    &:before {
      transform: translate3d(-50%, -50%, 0) scale(1);
    }
    .checkmark-icon {
      transform: translate3d(-50%, -50%, 0) scale(1);
    }
  }
}

.lightning-mode-change-leave {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}

.lightning-mode-change-leave-to {
  transform: translate3d(20px, 0, 0);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>