import API from "@/helpers/api";
import { toPrecision } from "@/helpers/units";

// Initial state
const state = () => ({
  operational: false,
  calibrating: false,
  version: "",
  ipAddress: "",
  onionAddress: "",
  electrumAddress: "",
  rpc: {
    rpcuser: "",
    rpcpassword: "",
    address: "",
    connectionString: ""
  },
  currentBlock: 0,
  chain: "",
  blockHeight: 0,
  blocks: [],
  percent: -1, //for loading state
  depositAddress: "",
  stats: {
    peers: -1,
    mempool: -1,
    hashrate: -1,
    blockchainSize: -1
  },
  peers: {
    total: 0,
    inbound: 0,
    outbound: 0
  },
  balance: {
    total: -1, //loading
    confirmed: -1,
    pending: -1,
    pendingIn: -1,
    pendingOut: -1
  },
  transactions: [
    { type: "loading" },
    { type: "loading" },
    { type: "loading" },
    { type: "loading" }
  ],
  pending: [],
  price: 0,
  conversionCurrency: "USD",
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

  electrumAddress(state, address) {
    state.electrumAddress = address;
  },

  syncStatus(state, sync) {
    state.percent = Number(toPrecision(parseFloat(sync.percent) * 100, 2));
    state.currentBlock = sync.currentBlock;
    state.blockHeight = sync.headerCount;
    state.chain = sync.chain;

    if (sync.status === "calibrating") {
      state.calibrating = true;
    } else {
      state.calibrating = false;
    }
  },

  setBlocks(state, blocks) {
    const mergedBlocks = [...blocks, ...state.blocks];
    // remove duplicate blocks
    const uniqueBlocks = mergedBlocks.filter((v, i, a) => a.findIndex(t => (t.height === v.height)) === i);
    state.blocks = uniqueBlocks;
  },

  setVersion(state, version) {
    state.version = version.version;
  },

  setStats(state, stats) {
    state.stats.peers = stats.peers;
    state.stats.mempool = stats.mempool;
    state.stats.blockchainSize = stats.blockchainSize;
    state.stats.hashrate = stats.hashrate;
  },

  setRpcInfo(state, rpcInfo) {
    state.rpc.rpcuser = rpcInfo.rpcuser;
    state.rpc.rpcpassword = rpcInfo.rpcpassword;
    state.rpc.address = rpcInfo.address;
    state.rpc.connectionString = rpcInfo.connectionString;
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
    // state.transactions = [];
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
    // console.log(transactions);

    state.transactions = transactions;
  },

  depositAddress(state, address) {
    state.depositAddress = address;
  },

  fees(state, fees) {
    for (const [speed, estimate] of Object.entries(fees)) {
      // If the API returned an error message
      if (estimate.code) {
        state.fees[speed].total = 0;
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
  },

  conversionCurrency(state, conversionCurrency) {
    state.conversionCurrency = conversionCurrency;
  }
};

// Functions to get data from the API
const actions = {
  async getStatus({ commit }) {
    const status = await API.get(
      `${process.env.VUE_APP_MIDDLEWARE_API_URL}/v1/bitcoind/info/status`
    );

    if (status) {
      commit("isOperational", status.operational);

      // if (status.operational) {
      //   dispatch("getSync");
      // }
    }
  },

  async getAddresses({ commit, state }) {
    // We can only make this request when bitcoind is operational
    if (state.operational) {
      const addresses = await API.get(
        `${process.env.VUE_APP_MIDDLEWARE_API_URL}/v1/bitcoind/info/addresses`
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

  async getHiddenServiceUrl({ commit }) {
    const address = await API.get(
      `${process.env.VUE_APP_MANAGER_API_URL}/v1/system/bitcoin-p2p-hidden-service`
    );
    if (address) {
      commit("onionAddress", address);
    } else {
      commit("onionAddress", "Couldn't get P2P address")
    }
  },

  async getElectrumUrl({ commit }) {
    const address = await API.get(
      `${process.env.VUE_APP_MANAGER_API_URL}/v1/system/electrum-hidden-service`
    );
    if (address) {
      commit("electrumAddress", address);
    } else {
      commit("electrumAddress", "Couldn't get Electrum address")
    }
  },

  async getRpcInfo({ commit }) {
    const rpcInfo = await API.get(
      `${process.env.VUE_APP_MANAGER_API_URL}/v1/system/bitcoin-rpc-connection-details`
    );

    if (rpcInfo) {
      commit("setRpcInfo", rpcInfo);
    }
  },

  async getSync({ commit, state }) {
    if (state.operational) {
      const sync = await API.get(
        `${process.env.VUE_APP_MIDDLEWARE_API_URL}/v1/bitcoind/info/sync`
      );

      if (sync) {
        commit("syncStatus", sync);
      }
    }
  },

  async getBlocks({ commit, state, dispatch }) {
    if (state.operational) {
      await dispatch("getSync");

      // Cache block height array of latest 3 blocks for loading view
      const currentBlock = state.currentBlock;

      // Don't fetch blocks if no new block has been found
      if (state.blocks.length && currentBlock === state.blocks[0]["height"]) {
        return;
      }

      // Don't fetch blocks if < 3 blocks primarily because we don't have a UI
      // ready for a blockchain with < 3 blocks
      if (currentBlock < 3) {
        return;
      }

      //TODO: Fetch only new blocks
      const latestThreeBlocks = await API.get(
        `${process.env.VUE_APP_MIDDLEWARE_API_URL
        }/v1/bitcoind/info/blocks?from=${currentBlock - 2}&to=${currentBlock}`
      );

      if (!latestThreeBlocks.blocks) {
        return;
      }

      // Update blocks
      commit("setBlocks", latestThreeBlocks.blocks);
    }
  },

  async getVersion({ commit, state }) {
    if (state.operational) {
      const version = await API.get(
        `${process.env.VUE_APP_MIDDLEWARE_API_URL}/v1/bitcoind/info/version`
      );

      if (version) {
        commit("setVersion", version);
      }
    }
  },

  async getPeers({ commit, state }) {
    if (state.operational) {
      const peers = await API.get(
        `${process.env.VUE_APP_MIDDLEWARE_API_URL}/v1/bitcoind/info/connections`
      );

      if (peers) {
        commit("peers", peers);
      }
    }
  },

  async getStats({ commit, state }) {
    if (state.operational) {
      const stats = await API.get(
        `${process.env.VUE_APP_MIDDLEWARE_API_URL}/v1/bitcoind/info/stats`
      );

      if (stats) {
        const peers = stats.connections;
        const mempool = stats.mempool;
        const hashrate = stats.networkhashps;
        const blockchainSize = stats.size;

        commit("setStats", {
          peers,
          mempool,
          hashrate,
          blockchainSize
        });
      }
    }
  },

  async getBalance({ commit, state }) {
    if (state.operational) {
      const balance = await API.get(
        `${process.env.VUE_APP_MIDDLEWARE_API_URL}/v1/lnd/wallet/btc`
      );

      if (balance) {
        commit("balance", balance);
      }
    }
  },

  async getTransactions({ commit, state }) {
    if (state.operational) {
      const transactions = await API.get(
        `${process.env.VUE_APP_MIDDLEWARE_API_URL}/v1/lnd/transaction`
      );
      commit("transactions", transactions);
    }
  },

  async getPrice({ commit, state }) {
    const price = await API.get(
     `${process.env.VUE_APP_MANAGER_API_URL}/v1/external/price?currency=${state.conversionCurrency}`,
    );

    if (price) {
      commit("price", price[state.conversionCurrency]);
    }
  },

  async getConversionCurrency({ commit }) {
    if (window.localStorage && window.localStorage.getItem("conversionCurrency")) {
      commit(
        "conversionCurrency",
        window.localStorage.getItem("conversionCurrency")
      );
    }
  },

  setConversionCurrency({ commit }, currency) {
    const availableCurrencies = ["USD", "EUR", "GBP"];
    if (availableCurrencies.includes(currency)) {
      window.localStorage.setItem("conversionCurrency", currency);
      commit("conversionCurrency", currency);
    }
  },

  async getDepositAddress({ commit, state }) {
    if (state.operational) {
      const { address } = await API.get(
        `${process.env.VUE_APP_MIDDLEWARE_API_URL}/v1/lnd/address`
      );

      if (address) {
        commit("depositAddress", address);
      }
    }
  },

  async getFees({ commit, state }, { address, confTarget, amt, sweep }) {
    if (state.operational) {
      const fees = await API.get(
        `${process.env.VUE_APP_MIDDLEWARE_API_URL}/v1/lnd/transaction/estimateFee?address=${address}&confTarget=${confTarget}&amt=${amt}&sweep=${sweep}`
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

    //return default "loading" transactions until txs aren't fetched
    if (
      state.transactions &&
      state.transactions.length &&
      state.transactions[0]["type"] === "loading"
    ) {
      return state.transactions;
    }

    if (state.transactions) {
      state.transactions.forEach(tx => {
        const amount = Number(tx.amount);

        let type = "incoming";
        if (amount < 0) {
          type = "outgoing";
        } else if (amount === 0) {
          //skip self incoming txs of change
          return;
        }

        // if (tx.numConfirmations === 0) {

        // }
        // type = "pending";

        let description = "Unknown";

        if (tx.type === "CHANNEL_OPEN" || tx.type === "PENDING_OPEN") {
          description = "Lightning Wallet";
        } else if (tx.type === "CHANNEL_CLOSE" || tx.type === "PENDING_CLOSE") {
          description = "Lightning Wallet";
        } else if (tx.type === "ON_CHAIN_TRANSACTION_SENT") {
          description = "Withdrawal";
        } else if (tx.type === "ON_CHAIN_TRANSACTION_RECEIVED") {
          description = "Deposit";
        }

        txs.push({
          type,
          amount: amount < 0 ? amount * -1 : amount, //for formatting +/- in view
          timestamp: new Date(Number(tx.timeStamp) * 1000),
          description,
          hash: tx.txHash,
          confirmations: tx.numConfirmations
        });
      });

      // Sort txs by date
      txs.sort(function (tx1, tx2) {
        return tx2.timestamp - tx1.timestamp;
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
