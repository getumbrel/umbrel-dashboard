import API from "@/helpers/api";
import { toPrecision } from "@/helpers/units";

// Initial state
const state = () => ({
  operational: false,
  calibrating: false,
  version: "",
  ipAddress: "",
  onionAddress: "",
  currentBlock: 0,
  blockHeight: 0,
  percent: 0,
  depositAddress: "",
  peers: {
    total: 0,
    inbound: 0,
    outbound: 0
  },
  balance: {
    total: 0,
    confirmed: 0,
    pending: 0,
    pendingIn: 0,
    pendingOut: 0
  },
  transactions: [],
  pending: [],
  price: 0,
  fees: {
    fast: {
      total: "--",
      perByte: "--",
      error: {
        code: "",
        text: ""
      }
    },
    normal: {
      total: "--",
      perByte: "--",
      error: {
        code: "",
        text: ""
      }
    },
    slow: {
      total: "--",
      perByte: "--",
      error: {
        code: "",
        text: ""
      }
    },
    cheapest: {
      total: "--",
      perByte: "--",
      error: {
        code: "",
        text: ""
      }
    }
  }
});

// Functions to update the state directly
const mutations = {
  isOperational(state, operational) {
    state.operational = operational;
  },

  ipAddress(state, address) {
    state.ipAddress = address;
  },

  onionAddress(state, address) {
    state.onionAddress = address;
  },

  syncStatus(state, sync) {
    state.percent = toPrecision(parseFloat(sync.percent) * 100, 2);
    state.currentBlock = sync.currentBlock;
    state.blockHeight = sync.headerCount;

    if (sync.status === "calibrating") {
      state.calibrating = true;
    } else {
      state.calibrating = false;
    }
  },

  setVersion(state, version) {
    state.version = version.version;
  },

  peers(state, peers) {
    state.peers.total = peers.total || 0;
    state.peers.inbound = peers.inbound || 0;
    state.peers.outbound = peers.outbound || 0;
  },

  balance(state, balance) {
    state.balance.total = parseInt(balance.totalBalance);
    state.balance.confirmed = parseInt(balance.confirmedBalance);
    state.balance.pending = parseInt(balance.unconfirmedBalance);
  },

  transactions(state, transactions) {
    // Clear previously loaded data
    state.transactions = [];
    // state.pending = [];

    // Loop through transactions and sort them by type
    // transactions.forEach((transaction) => {
    //     // Only display Bitcoin transactions
    //     if (transaction.type === 'ON_CHAIN_TRANSACTION_SENT' || transaction.type === 'ON_CHAIN_TRANSACTION_RECEIVED') {
    //         if (transaction.numConfirmations > 0) {
    //             state.transactions.push(transaction);
    //         } else {
    //             state.pending.push(transaction);
    //         }
    //     }
    // });

    state.transactions = transactions;
  },

  depositAddress(state, address) {
    state.depositAddress = address;
  },

  fees(state, fees) {
    for (const [speed, estimate] of Object.entries(fees)) {
      // If the API returned an error message
      if (estimate.code) {
        state.fees[speed].total = "N/A";
        state.fees[speed].perByte = "N/A";
        state.fees[speed].error = {
          code: estimate.code,
          text: estimate.text
        };
      } else {
        state.fees[speed].total = estimate.feeSat;
        state.fees[speed].perByte = estimate.feerateSatPerByte;
        state.fees[speed].sweepAmount = estimate.sweepAmount;
        state.fees[speed].error = false;
      }
    }
  },

  price(state, usd) {
    state.price = usd;
  }
};

// Functions to get data from the API
const actions = {
  async getStatus({ commit, dispatch }) {
    const status = await API.get(
      `${process.env.VUE_APP_API_URL}api/v1/bitcoind/info/status`
    );

    if (status) {
      commit("isOperational", status.operational);

      if (status.operational) {
        dispatch("getSync");
      }
    }
  },

  async getAddresses({ commit, state }) {
    // We can only make this request when bitcoind is operational
    if (state.operational) {
      const addresses = await API.get(
        `${process.env.VUE_APP_API_URL}api/v1/bitcoind/info/addresses`
      );

      // Default onion address to not found.
      commit("onionAddress", "Could not determine bitcoin onion address");

      if (addresses) {
        addresses.forEach(address => {
          if (address.includes(".onion")) {
            commit("onionAddress", address);
          } else {
            commit("ipAddress", address);
          }
        });
      }
    }
  },

  async getSync({ commit, state }) {
    if (state.operational) {
      const sync = await API.get(
        `${process.env.VUE_APP_API_URL}api/v1/bitcoind/info/sync`
      );

      if (sync) {
        commit("syncStatus", sync);
      }
    }
  },

  async getVersion({ commit, state }) {
    if (state.operational) {
      const version = await API.get(
        `${process.env.VUE_APP_API_URL}api/v1/bitcoind/info/version`
      );

      if (version) {
        commit("setVersion", version);
      }
    }
  },

  async getPeers({ commit, state }) {
    if (state.operational) {
      const peers = await API.get(
        `${process.env.VUE_APP_API_URL}api/v1/bitcoind/info/connections`
      );

      if (peers) {
        commit("peers", peers);
      }
    }
  },

  async getBalance({ commit, state }) {
    if (state.operational) {
      const balance = await API.get(
        `${process.env.VUE_APP_API_URL}api/v1/lnd/wallet/btc`
      );

      if (balance) {
        commit("balance", balance);
      }
    }
  },

  async getTransactions({ commit, state }) {
    if (state.operational) {
      const transactions = await API.get(
        `${process.env.VUE_APP_API_URL}api/v1/lnd/transaction`
      );
      commit("transactions", transactions);
    }
  },

  async getPrice({ commit }) {
    // Todo: Cache this value on the node instead of making a 3rd party request
    const price = await API.get(
      "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD"
    );

    if (price) {
      commit("price", price.USD);
    }
  },

  async getDepositAddress({ commit, state }) {
    if (state.operational) {
      const { address } = await API.get(
        `${process.env.VUE_APP_API_URL}api/v1/lnd/address`
      );

      if (address) {
        commit("depositAddress", address);
      }
    }
  },

  async getFees({ commit, state }, { address, confTarget, amt, sweep }) {
    if (state.operational) {
      const fees = await API.get(
        `${process.env.VUE_APP_API_URL}api/v1/lnd/transaction/estimateFee`,
        {
          params: { address, confTarget, amt, sweep }
        }
      );

      if (fees) {
        commit("fees", fees);
      }
    }
  }
};

const getters = {
  status(state) {
    const data = {
      class: "loading",
      text: "Loading..."
    };

    if (state.operational) {
      data.class = "active";
      data.text = "Operational";
    }

    return data;
  },
  transactions(state) {
    const txs = [];

    if (state.transactions) {
      state.transactions.forEach(tx => {
        const amount = Number(tx.amount);

        let type = "incoming";
        if (amount < 0) {
          type = "outgoing";
        }

        let description = "Unknown";

        if (tx.type === "CHANNEL_OPEN" || tx.type === "PENDING_OPEN") {
          description = "Lightning Wallet";
        } else if (tx.type === "CHANNEL_CLOSE" || tx.type === "PENDING_CLOSE") {
          description = "Lightning Wallet";
        } else if (tx.type === "ON_CHAIN_TRANSACTION_SENT") {
          description = "Withdrawal";
        } else if (tx.type === "ON_CHAIN_TRANSACTION_RECEIVED") {
          description = "Deposit";
        } else if (tx.type === "UNKNOWN" && Number(tx.amount) === 0) { //skip self incoming txs of change
          return;
        }

        txs.push({
          type,
          amount: amount < 0 ? amount * -1 : amount, //for formatting +/- in view
          timestamp: new Date(Number(tx.timeStamp) * 1000),
          description
        });
      });
    }

    return txs;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
