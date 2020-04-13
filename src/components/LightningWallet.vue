<template>
  <card-widget
    header="Lightning Wallet"
    :status="{text: 'Running', variant: 'success', blink: false}"
    title
    :numericTitle="{
      value: walletBalance,
      suffix: '',
      prefix: ''
    }"
    :sub-title="walletUnit"
    icon="icon-app-lightning.svg"
    :loading="state.loading"
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

    <!-- transition switching between different modes -->
    <transition name="lightning-mode-change" mode="out-in">
      <!-- Default Balance/tx screen -->
      <div v-if="state.mode === 'balance'" key="mode-balance" class="mode-balance">
        <!-- List of last 3 transactions -->
        <b-list-group class="pb-2">
          <!-- Transaction -->
          <b-list-group-item
            v-for="tx in state.txs"
            :key="tx.description"
            class="tx flex-column align-items-start px-4"
          >
            <div class="d-flex w-100 justify-content-between">
              <div>
                <h6 class="mb-0 font-weight-normal">
                  <!-- Incoming tx icon -->
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    v-if="tx.type === 'incoming'"
                  >
                    <path
                      d="M13.5944 6.04611C13.6001 5.73904 13.3493 5.48755 13.0369 5.48712C12.7351 5.4867 12.4836 5.7375 12.4836 6.03895L12.4758 11.6999L4.94598 3.83615C4.72819 3.61848 4.16402 3.62477 3.94599 3.8422C3.72796 4.05963 3.73466 4.62433 3.95209 4.84236L11.6871 12.4864L6.03143 12.4733C5.72435 12.4782 5.47251 12.7293 5.47244 13.0308C5.47201 13.3431 5.72317 13.595 6.0299 13.5898L13.031 13.5994C13.3381 13.6051 13.5896 13.3543 13.5844 13.0476L13.5944 6.04611Z"
                      fill="#00CD98"
                    />
                  </svg>

                  <!-- Outgoing tx icon -->
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    v-else-if="tx.type === 'outgoing'"
                  >
                    <path
                      d="M7.06802 4.71946C6.76099 4.71224 6.50825 4.96178 6.50627 5.27413C6.50435 5.57592 6.7539 5.82865 7.05534 5.83022L12.7162 5.86616L4.81508 13.3568C4.59632 13.5735 4.59981 14.1376 4.81615 14.3568C5.03249 14.5759 5.59723 14.572 5.81634 14.3556L13.4988 6.6587L13.4576 12.3143C13.4609 12.6214 13.7108 12.8745 14.0122 12.876C14.3246 12.878 14.5777 12.6281 14.574 12.3214L14.6184 5.32036C14.6257 5.01333 14.3761 4.76059 14.0694 4.76427L7.06802 4.71946Z"
                      fill="#5351FB"
                    />
                  </svg>

                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    v-else-if="tx.type === 'expired'"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.6003 4.44197C13.3562 4.19789 12.9605 4.19789 12.7164 4.44197L9.02116 8.1372L5.32596 4.442C5.08188 4.19792 4.68615 4.19792 4.44207 4.442C4.198 4.68607 4.198 5.0818 4.44207 5.32588L8.13728 9.02109L4.44185 12.7165C4.19777 12.9606 4.19777 13.3563 4.44185 13.6004C4.68592 13.8445 5.08165 13.8445 5.32573 13.6004L9.02116 9.90497L12.7166 13.6004C12.9607 13.8445 13.3564 13.8445 13.6005 13.6004C13.8446 13.3563 13.8446 12.9606 13.6005 12.7165L9.90505 9.02109L13.6003 5.32585C13.8444 5.08178 13.8444 4.68605 13.6003 4.44197Z"
                      fill="#F46E6E"
                    />
                  </svg>

                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    v-else-if="tx.type === 'pending'"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5 10C5.55228 10 6 9.55228 6 9C6 8.44772 5.55228 8 5 8C4.44772 8 4 8.44772 4 9C4 9.55228 4.44772 10 5 10Z"
                      fill="#C3C6D1"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9 10C9.55228 10 10 9.55228 10 9C10 8.44772 9.55228 8 9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10Z"
                      fill="#C3C6D1"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13 10C13.5523 10 14 9.55228 14 9C14 8.44772 13.5523 8 13 8C12.4477 8 12 8.44772 12 9C12 9.55228 12.4477 10 13 10Z"
                      fill="#C3C6D1"
                    />
                  </svg>

                  <!-- Invoice description -->
                  <span style="margin-left: 6px;">{{ tx.description }}</span>
                </h6>

                <!-- Timestamp of tx -->
                <small
                  class="text-muted mt-0 tx-timestamp"
                  style="margin-left: 24px;"
                  :title="getReadableTime(tx.timestamp)"
                  v-if="tx.type === 'outgoing' || tx.type === 'incoming'"
                >{{getTimeFromNow(tx.timestamp)}}</small>

                <small
                  class="text-muted mt-0 tx-timestamp"
                  style="margin-left: 24px;"
                  :title="`Invoice expires on ${getReadableTime(tx.expiresOn)}`"
                  v-else-if="tx.type === 'pending'"
                >Unpaid invoice</small>

                <small
                  class="text-muted mt-0 tx-timestamp"
                  style="margin-left: 24px;"
                  :title="getReadableTime(tx.expiresOn)"
                  v-else-if="tx.type === 'expired'"
                >Invoice expired {{getTimeFromNow(tx.expiresOn)}}</small>
              </div>

              <div class="text-right">
                <span class="font-weight-bold d-block">
                  <!-- Positive or negative prefix with amount -->
                  <span v-if="tx.type === 'incoming'">+</span>
                  <span v-else-if="tx.type === 'outgoing'">-</span>
                  {{ Number(tx.amount).toLocaleString() }}
                </span>
                <small class="text-muted">Sats</small>
              </div>
            </div>
          </b-list-group-item>
        </b-list-group>

        <!-- Link to Lightning Network Page -->
        <div class="px-4 pb-3" v-if="!isLightningPage">
          <router-link to="/lightning" class="card-link">Manage</router-link>
        </div>
      </div>

      <!-- SCREEN/MODE: Paste Invoice Screen -->
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
          @input="fetchInvoiceDetails"
          :disabled="state.send.isSending"
        ></b-input>

        <!-- Invoice amount + description -->
        <p>
          <span v-show="state.send.isValidInvoice && state.send.description">
            Paying
            <b>{{ state.send.amount }}</b> sats for
            <b>{{ state.send.description }}</b>
          </span>
        </p>
      </div>

      <!-- SCREEN/MODE: Successfully paid invoice -->
      <div class="px-4 mode-sent" v-if="state.mode === 'sent'" key="mode-sent">
        <!-- Big green checkmark -->
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

        <!-- Invoice amount + description -->
        <p class="text-center mb-4">
          Paid
          <b>{{state.send.amount}} sats</b> for
          <b>{{state.send.description}}</b>
        </p>
      </div>

      <!-- SCREEN/MODE: Create Invoice (Receive) -->
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

      <!-- SCREEN/MODE: Show Generated Invoice -->
      <div class="px-4 mode-invoice" v-if="this.state.mode === 'invoice'" key="mode-invoice">
        <p class="text-center text-muted mb-2">
          <!-- If still generating invoice, show blinking loading text -->
          <span class="blink" v-if="state.receive.isGeneratingInvoice">Generating Invoice</span>

          <!-- Invoice amount + description -->
          <span v-else>
            Please pay
            <b>{{state.receive.amount}} {{ state.receive.amount > 1 ? 'sats' : 'sat'}}</b>
            {{ state.receive.description ? "for" : null }}
            <b>{{ state.receive.description }}</b>
          </span>
        </p>

        <!-- QR Code -->
        <div class="generated-qr mb-3">
          <!-- Popup umbrel logo in the middle of QR code after the QR is generated -->
          <transition name="qr-logo-popup">
            <img
              v-show="!state.receive.isGeneratingInvoice && state.receive.invoiceText"
              src="@/assets/umbrel-qr-icon.svg"
              class="qr-logo"
            />
          </transition>

          <!-- QR Code element -->
          <qrcode-vue
            :value="state.receive.invoiceQR"
            :size="200"
            level="H"
            renderAs="svg"
            class="d-flex justify-content-center qr-image"
          ></qrcode-vue>
        </div>

        <!-- Copy Invoice Input Field -->
        <b-input-group class="mb-4 mt-2" size="sm">
          <b-form-input
            id="generated-invoice"
            type="text"
            readonly
            v-model="state.receive.invoiceText"
          ></b-form-input>

          <b-input-group-append>
            <b-button
              :variant="state.receive.isInvoiceCopied ? 'success' : 'primary'"
              @click="copyInvoice"
              :disabled="!state.receive.invoiceText"
            >{{ state.receive.isInvoiceCopied ? 'Copied' : 'Copy Invoice' }}</b-button>
          </b-input-group-append>
        </b-input-group>
      </div>
    </transition>

    <!-- Error message -->
    <small class="text-danger mb-2 d-block px-4" v-if="state.error">{{ state.error }}</small>

    <!-- Buttons for all screens/modes -->
    <div class>
      <!-- Buttons: Balance (default mode) -->
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

      <!-- Button: Send (paste invoice send) -->
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

      <!-- Button: Create Invoice (receive mode) -->
      <b-button
        class="w-100"
        variant="success"
        style="border-radius: 0; border-bottom-left-radius: 1rem; border-bottom-right-radius: 1rem; padding-top: 1rem; padding-bottom: 1rem;"
        @click="createInvoice"
        v-if="state.mode === 'receive'"
        :disabled="!state.receive.amount || state.receive.amount < 1"
      >Create Invoice</b-button>
    </div>
  </card-widget>
</template>

<script>
import axios from "axios";
import QrcodeVue from "qrcode.vue";
import moment from "moment";
import CardWidget from "@/components/CardWidget";

export default {
  data() {
    return {
      state: {
        //balance: 162500, //net user's balance in sats
        mode: "balance", //balance (default mode), receive (create invoice), invoice, send, sent
        txs: [
          //array of last 3 txs
          {
            type: "incoming", //incoming, outgoing, pending, expired
            amount: 125000, //amount transacted
            timestamp: new Date(new Date().setSeconds(0)), //time of tx
            description: "Tips from Reddit", //tx's invoice description
            expiry: new Date(new Date().setSeconds(0))
          },
          {
            type: "outgoing",
            amount: 37,
            timestamp: new Date(new Date().setMinutes(0)),
            description: "Blockstream Satellite"
          },
          {
            type: "incoming",
            amount: 1302532,
            timestamp: new Date(new Date().setHours(0)),
            description: "Michael Shwebz"
          }
        ],
        receive: {
          amount: null, //invoice amount
          description: "", //invoice description
          invoiceText: "", //Bolt 11 invoice
          invoiceQR: "1", //used for "generating" animation, is ultimately equal to invoiceText after animation
          isGeneratingInvoice: false, //used for transitions, animations, etc
          isInvoiceCopied: false //to toggle between copy/copied state of "copy button"
        },
        send: {
          invoiceText: "", //Bolt 11 as entered by the user
          description: "", //invoice description
          amount: null, //invoice amount
          isValidInvoice: false, //check if invoice entered by user is a valid Bolt 11 invoice
          isSending: false //used for transition while tx is being broadcasted
        },
        loading: false, //overall state of the wallet, used to toggle progress bar on top of the card,
        error: "" //used to show any error occured, eg. invalid amount, enter more than 0 sats, invoice expired, etc
      }
    };
  },
  props: {},
  computed: {
    walletBalance() {
      return (
        this.$store.state.wallet.balance.onChain +
        this.$store.state.wallet.balance.offChain
      );
    },
    walletUnit() {
      return this.$store.getters.getWalletUnit;
    },
    isLightningPage() {
      return this.$router.currentRoute.path === "/lightning";
    }
  },
  methods: {
    getTimeFromNow(timestamp) {
      return moment(timestamp).fromNow(); //used in the list of txs, eg "a few seconds ago"
    },
    getReadableTime(timestamp) {
      return moment(timestamp).format("MMMM D, h:mm:ss a"); //used in the list of txs, eg "March 08, 2020 3:03:12 pm"
    },
    changeMode(mode) {
      //change between different modes/screens of the wallet from - balance (default), receive (create invoice), invoice, send, sent
      return (this.state.mode = mode);
    },
    reset() {
      //reset to default mode, clear any inputs/generated invoice, pasted invoice, etc - used by "Back" button

      //refresh txs
      this.fetchRecentTxs();

      //reset state
      this.state.receive = {
        amount: null,
        description: "",
        invoiceText: "",
        invoiceQR: "1",
        isGeneratingInvoice: false,
        isInvoiceCopied: false
      };
      this.state.send = {
        invoiceText: "",
        description: "",
        amount: null,
        isValidInvoice: false,
        isSending: false
      };
      this.state.loading = false;
      this.state.error = "";
      this.state.mode = "balance";
    },
    sendSats() {
      //broadcast tx
      if (!this.state.send.isValidInvoice) return; //check if the invoice user pasted is valid

      this.state.loading = true;
      this.state.send.isSending = true;
      this.state.error = "";

      axios({
        method: "post",
        url: "v1/lnd/lightning/payInvoice",
        data: {
          amt: 0, //because payment request already has amount info
          paymentRequest: this.state.send.invoiceText
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.paymentError) {
            return (this.state.error = res.data.paymentError);
          }
          this.state.mode = "sent";
        })
        .catch(error => {
          this.state.error = error.response.data;
        })
        .finally(() => {
          this.state.loading = false;
          this.state.send.isSending = false;
        });

      //slight delay in updating the balance so the checkmark's animation completes first
      // window.setTimeout(() => {
      //   this.$store.commit("updateWalletBalance", this.walletBalance - 1000);
      // }, 4000);
    },
    createInvoice() {
      //generate invoice to receive payment
      this.state.loading = true;
      this.state.receive.isGeneratingInvoice = true;
      this.state.mode = "invoice";

      //start animated QR invoice until real invoice is fetched from the node
      const QRAnimation = window.setInterval(() => {
        this.state.receive.invoiceQR = `${this.state.receive.invoiceQR}2345`;
      }, 200);

      axios({
        method: "post",
        url: "v1/lnd/lightning/addInvoice",
        data: {
          amt: this.state.receive.amount,
          memo: this.state.receive.description
        }
      })
        .then(res => {
          this.state.receive.invoiceQR = this.state.receive.invoiceText =
            res.data.paymentRequest;
        })
        .catch(error => {
          console.log(error);
          alert(error);
        })
        .finally(() => {
          this.state.loading = false;
          this.state.receive.isGeneratingInvoice = false;
          window.clearInterval(QRAnimation);
        });

      // window.setTimeout(() => {
      //   this.state.loading = false;
      //   this.state.receive.isGeneratingInvoice = false;
      //   this.state.receive.invoiceQR = this.state.receive.invoiceText =
      //     "lightning:lnbc10u1p0xvxt5pp52f3dd2ya8ejas4jkfq8l6k9vz6cpzv00wyanskkn0pvpyqjx5gusdqj23jhxarfdenjqvfjxvcqzpgxqyz5vqldzazcemje3f8llz90smx4rr7q7vlw4h988fvgs7tupehdtz038putaw8kysw34rq2apn5s5suc0xfltfwpsuu97nyuenpuzp4xl6zsqzmslgk";
      //   window.clearInterval(QRAnimation);
      // }, 3000);
    },
    copyInvoice() {
      //copy generated invoice's text to clipboard

      const copyText = document.getElementById("generated-invoice");
      copyText.select();
      copyText.setSelectionRange(0, 99999); /*For mobile devices*/
      document.execCommand("copy");

      return (this.state.receive.isInvoiceCopied = true);
    },
    fetchInvoiceDetails() {
      //fetch invoice details as pasted by user in the "Send" mode/screen
      //if empty field, reset last fetched invoice
      if (!this.state.send.invoiceText) {
        this.state.loading = false;
        this.state.send.description = "";
        this.state.send.isValidInvoice = false;
        this.state.send.amount = null;
        this.state.send.description = "";
        this.state.error = "";
        return;
      }

      this.state.loading = true;
      this.state.send.description = "";
      this.state.send.isValidInvoice = false;

      axios
        .get(
          `v1/lnd/lightning/invoice?paymentRequest=${this.state.send.invoiceText}`
        )
        .then(res => {
          //check if invoice is expired
          const now = Math.floor(new Date().getTime());
          const invoiceExpiresOn =
            (Number(res.data.timestamp) + Number(res.data.expiry)) * 1000;

          if (now > invoiceExpiresOn) {
            this.state.send.isValidInvoice = false;
            this.state.error = `Invoice expired ${moment(
              invoiceExpiresOn
            ).fromNow()}`;
            return;
          }

          this.state.send.amount = Number(res.data.numSatoshis);
          this.state.send.description = res.data.description;
          this.state.send.isValidInvoice = true;
          this.state.error = "";
        })
        .catch(error => {
          this.state.send.isValidInvoice = false;
          this.state.error = "Invalid invoice";
          console.log(error);
        })
        .finally(() => {
          this.state.loading = false;
        });
    },
    async fetchRecentTxs() {
      //Get List of transactions
      let transactions = [];
      // Get incoming txs
      await axios
        .get(`v1/lnd/lightning/invoices`)
        .then(res => {
          const latestInvoices = res.data.slice(0, 3).map(tx => {
            let type = "incoming";

            if (tx.state === "CANCELED") {
              type = "expired";
            } else if (tx.state === "OPEN") {
              type = "pending";
            }

            return {
              type,
              amount: Number(tx.value),
              timestamp: new Date(Number(tx.creationDate) * 1000),
              description: tx.memo,
              expiresOn: new Date(
                (Number(tx.creationDate) + Number(tx.expiry)) * 1000
              )
            };
          });

          transactions = [...transactions, ...latestInvoices];
        })
        .catch(error => {
          console.log(error);
          alert(error.response.data);
        })
        .finally(() => {
          // this.state.loading = false;
        });

      // Get outgoing txs
      await axios
        .get(`v1/lnd/lightning/payments`)
        .then(res => {
          const latestPayments = res.data.slice(0, 3).map(tx => {
            return {
              type: "outgoing",
              amount: Number(tx.value),
              timestamp: new Date(Number(tx.creationDate) * 1000),
              description: tx.paymentRequest //temporarily store payment request in the description as we'll replace it by memo
            };
          });

          transactions = [...transactions, ...latestPayments];
        })
        .catch(error => {
          console.log(error.response);
          alert(error.response.data);
        })
        .finally(() => {
          // this.state.loading = false;
        });

      //Sort by recent to oldest
      transactions.sort(function(tx1, tx2) {
        return tx2.timestamp - tx1.timestamp;
      });

      //trim to top 3
      transactions = transactions.slice(0, 3);

      // Fetch descriptions of all outgoing payments
      for (let tx of transactions) {
        if (tx.type !== "outgoing") continue;

        const invoiceDetails = await axios.get(
          `v1/lnd/lightning/invoice?paymentRequest=${tx.description}`
        );
        tx.description = invoiceDetails.data.description;
      }

      this.state.txs = transactions;
    }
  },
  watch: {},
  created() {
    this.fetchRecentTxs();
  },
  components: {
    CardWidget,
    QrcodeVue
  }
};
</script>

<style lang="scss" scoped>
// all text input fields
.neu-input {
  background: linear-gradient(346.78deg, #f7fcfc 0%, #fafcfa 100%);
  border: 1px solid rgba(0, 0, 0, 0.02);
  box-shadow: inset 0px 5px 10px rgba(0, 0, 0, 0.08);
  color: rgba(0, 0, 0, 0.8);
}

// big circle checkmark on successful send
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

// Transitions between mode/screen changes

.lightning-mode-change-enter-active,
.lightning-mode-change-leave-active {
  transition: transform 0.3s, opacity 0.3s linear;
}

//reverse delay in check mark when leaving (first tick contracts, then the circle)
.lightning-mode-change-leave-active {
  .checkmark {
    &:before {
      transition-delay: 0.2s;
    }
    .checkmark-icon {
      transition-delay: 0s;
    }
  }
}

.lightning-mode-change-enter {
  transform: translate3d(20px, 0, 0);
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
  .checkmark {
    &:before {
      transform: translate3d(-50%, -50%, 0) scale(1);
    }
    .checkmark-icon {
      transform: translate3d(-50%, -50%, 0) scale(1);
    }
  }
}

.lightning-mode-change-leave-to {
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

// For "Generating Invoice" loading text
.blink {
  animation: blink 1.5s infinite ease;
}

@keyframes blink {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.6;
  }
}

// Transition for umbrel logo popping up on generated invoice
.qr-logo-popup-enter-active,
.qr-logo-popup-leave-active {
  &.qr-logo {
    transition: transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
}

.qr-logo-popup-enter {
  &.qr-logo {
    transform: translate3d(-50%, -50%, 0) scale(0);
    opacity: 0;
  }
}

.qr-logo-popup-enter-to,
.qr-logo-popup-leave,
.qr-logo-popup-leave-to {
  &.qr-logo {
    transform: translate3d(-50%, -50%, 0) scale(1);
    opacity: 1;
  }
}

.generated-qr {
  position: relative;
}
.qr-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0) scale(1);
}
</style>