import API from "@/helpers/api";
// import Events from '~/helpers/events';
// import { sleep } from '@/helpers/utils';

// Helper function to sort lightning transactions by date
// function sortTransactions(a, b) {
//     if (a.creationDate > b.creationDate) {
//         return -1;
//     }

//     if (a.creationDate < b.creationDate) {
//         return 1;
//     }

//     return 0;
// }

// Initial state
const state = () => ({
  operational: false,
  unlocked: false,
  currentBlock: 0,
  blockHeight: 0,
  balance: {
    total: 0,
    confirmed: 0,
    pending: 0
  },
  channels: [],
  connectionCode: "unknown",
  maxSend: 0,
  maxReceive: 0,
  transactions: [],
  confirmedTransactions: [],
  pendingTransactions: [],
  pendingChannelEdit: {},
  pubkey: ""
});

// Functions to update the state directly
const mutations = {
  isOperational(state, operational) {
    state.operational = operational;
  },

  isUnlocked(state, unlocked) {
    state.unlocked = unlocked;
  },

  setConnectionCode(state, code) {
    state.connectionCode = code;
  },

  setChannels(state, channels) {
    state.channels = channels;
  },

  setChannelFocus(state, channel) {
    state.pendingChannelEdit = channel;
  },

  setBalance(state, balance) {
    if (balance.confirmed !== undefined) {
      state.balance.confirmed = parseInt(balance.confirmed);
    }

    if (balance.pending !== undefined) {
      state.balance.pending = parseInt(balance.pending);
    }

    state.balance.total = state.balance.confirmed;
  },

  setMaxReceive(state, maxReceive) {
    state.maxReceive = maxReceive;
  },

  setMaxSend(state, maxSend) {
    state.maxSend = maxSend;
  },

  setTransactions(state, transactions) {
    state.transactions = transactions;
  },

  setConfirmedTransactions(state, confirmedTransactions) {
    state.confirmedTransactions = confirmedTransactions;
  },

  setPendingTransactions(state, pendingTransactions) {
    state.pendingTransactions = pendingTransactions;
  },

  setPubKey(state, pubkey) {
    state.pubkey = pubkey;
  }
};

// Functions to get data from the API
const actions = {
  async getStatus({ commit }) {
    const status = await API.get(
      `${process.env.VUE_APP_API_URL}api/v1/lnd/info/status`
    );
    commit("isOperational", status.operational);
    commit("isUnlocked", status.unlocked);

    // launch unlock modal after 30 sec
    // if (!status.unlocked) {
    //   await sleep(30000);
    //   const { unlocked } = await API.get(`${process.env.VUE_APP_API_URL}api/v1/lnd/info/status`);
    //   commit('isUnlocked', unlocked);
    //   if (!unlocked) {
    //     Events.$emit('unlock-modal-open');
    //   }
    // }
  },

  async getLndPageData({ commit }) {
    const lightning = await API.get(
      `${process.env.VUE_APP_API_URL}api/v1/pages/lnd`
    );

    if (lightning) {
      const lightningInfo = lightning.lightningInfo;

      commit("setPubKey", lightningInfo.identityPubkey);
    }
  },

  async getConnectionCode({ commit }) {
    const uris = await API.get(
      `${process.env.VUE_APP_API_URL}api/v1/lnd/info/uris`
    );

    if (uris && uris.length > 0) {
      commit("setConnectionCode", uris[0]);
    } else {
      commit("setConnectionCode", "Could not determine lnd connection code");
    }
  },

  // Deprecated, this endpoint returns balance data minus estimated channel closing fees
  // These estimates have caused many customers to be confused by the numbers displayed in the dashboard (leaky sats)
  // Instead we can calculate our total balance by getting the sum of each channel's localBalance
  async getBalance({ commit, state }) {
    if (state.operational && state.unlocked) {
      const balance = await API.get(
        `${process.env.VUE_APP_API_URL}api/v1/lnd/wallet/lightning`
      );

      if (balance) {
        commit("setBalance", { confirmed: balance.balance });
      }
    }
  },

  async getChannels({ commit, state }) {
    if (state.operational && state.unlocked) {
      const rawChannels = await API.get(
        `${process.env.VUE_APP_API_URL}api/v1/lnd/channel`
      );
      const channels = [];
      let confirmedBalance = 0;
      let pendingBalance = 0;
      let maxReceive = 0;
      let maxSend = 0;

      if (rawChannels) {
        // Loop through channels to determine pending balance, max payment amount, and sort channels by type
        rawChannels.forEach(channel => {
          const localBalance = parseInt(channel.localBalance) || 0;
          const remoteBalance = parseInt(channel.remoteBalance) || 0;

          if (channel.type === "OPEN") {
            if (channel.active) {
              channel.status = "online";
            } else {
              channel.status = "offline";
            }

            if (remoteBalance > maxReceive) {
              maxReceive = remoteBalance;
            }

            if (localBalance > maxSend) {
              maxSend = localBalance;
            }

            confirmedBalance += localBalance;
          } else if (channel.type === "PENDING_OPEN_CHANNEL") {
            pendingBalance += localBalance;
            channel.status = "opening";
          } else if (
            [
              "WAITING_CLOSING_CHANNEL",
              "FORCE_CLOSING_CHANNEL",
              "PENDING_CLOSING_CHANNEL"
            ].indexOf(channel.type) > -1
          ) {
            pendingBalance += localBalance;
            channel.status = "closing";

            // Lnd doesn't provide initiator or autopilot data via rpc. So, we just display a generic closing message.
            channel.name = "Closing Channel";
            channel.purpose = "A channel that is in the process of closing";
          } else {
            channel.status = "unknown";
          }

          if (channel.name === "" && !channel.initiator) {
            channel.name = "Inbound Channel";
            channel.purpose = "A channel that another node has opened to you";
          }

          // Set placeholder values if autopilot
          if (channel.managed === false && channel.initiator) {
            channel.name = "Autopilot";
            channel.purpose = "Managed by autopilot";
          }

          channels.push(channel);
        });

        commit("setChannels", channels);
        commit("setBalance", {
          confirmed: confirmedBalance,
          pending: pendingBalance
        });
        commit("setMaxReceive", maxReceive);
        commit("setMaxSend", maxSend);
      }
    }
  },

  async getTransactions({ commit, state }) {
    if (state.operational && state.unlocked) {
      // Get invoices and payments
      const invoices = await API.get(
        `${process.env.VUE_APP_API_URL}api/v1/lnd/lightning/invoices`
      );
      const payments = await API.get(
        `${process.env.VUE_APP_API_URL}api/v1/lnd/lightning/payments`
      );
      let transactions = [];

      if (invoices) {
        const incomingTransactions = invoices.map(tx => {
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
            description: tx.memo || "Direct payment from a node",
            expiresOn: new Date(
              (Number(tx.creationDate) + Number(tx.expiry)) * 1000
            )
          };
        });
        transactions = [...transactions, ...incomingTransactions];
      }

      if (payments) {
        const outgoingTransactions = payments.slice(0, 3).map(tx => {
          return {
            type: "outgoing",
            amount: Number(tx.value),
            timestamp: new Date(Number(tx.creationDate) * 1000),
            description: tx.paymentRequest //temporarily store payment request in the description as we'll replace it by memo
          };
        });
        transactions = [...transactions, ...outgoingTransactions];
      }

      //Sort by recent to oldest
      transactions.sort(function(tx1, tx2) {
        return tx2.timestamp - tx1.timestamp;
      });

      // Fetch descriptions of all outgoing payments
      for (let tx of transactions) {
        if (tx.type !== "outgoing") continue;

        if (!tx.description) {
          //example - in case of a keysend tx
          tx.description = "Direct payment to a node";
          continue;
        } else {
          try {
            const invoiceDetails = await API.get(
              `${process.env.VUE_APP_API_URL}api/v1/lnd/lightning/invoice?paymentRequest=${tx.description}`
            );
            tx.description = invoiceDetails.description;
          } catch (error) {
            console.log(error);
            tx.description = "";
          }
        }
      }

      commit("setTransactions", transactions);
    }
  },

  selectChannel({ commit }, channel) {
    commit("setChannelFocus", channel);
  }
};

const getters = {
  status(state) {
    const data = {
      class: "loading",
      text: "Loading..."
    };

    if (state.operational) {
      if (state.unlocked) {
        data.class = "active";
        data.text = "Active";
      } else {
        data.class = "inactive";
        data.text = "Locked";
      }
    }

    return data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
