import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store";

import TransitionWrapperLayout from "../layouts/TransitionWrapperLayout.vue";
import SimpleLayout from "../layouts/SimpleLayout.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";

import Start from "../views/Start.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Bitcoin from "../views/Bitcoin.vue";
import Lightning from "../views/Lightning.vue";
import Settings from "../views/Settings.vue";
import ConnectWallet from "../views/ConnectWallet.vue";
import Logout from "../views/Logout.vue";

// Wallet components for wallet connector
import BitBoxApp from "../components/ConnectWallet/Wallets/BitBoxApp.vue";
import BitcoinCoreP2P from "../components/ConnectWallet/Wallets/BitcoinCoreP2P.vue";
import BitcoinCoreRPC from "../components/ConnectWallet/Wallets/BitcoinCoreRPC.vue";
import BlockstreamGreen from "../components/ConnectWallet/Wallets/BlockstreamGreen.vue";
import BlueWalletAndroid from "../components/ConnectWallet/Wallets/BlueWalletAndroid.vue";
import ElectrumAndroid from "../components/ConnectWallet/Wallets/ElectrumAndroid.vue";
import ElectrumDesktop from "../components/ConnectWallet/Wallets/ElectrumDesktop.vue";
import ElectrumServer from "../components/ConnectWallet/Wallets/ElectrumServer.vue";
import FullyNoded from "../components/ConnectWallet/Wallets/FullyNoded.vue";
import Phoenix from "../components/ConnectWallet/Wallets/Phoenix.vue";
import Sparrow from "../components/ConnectWallet/Wallets/Sparrow.vue";
import SpecterDesktop from "../components/ConnectWallet/Wallets/SpecterDesktop.vue";
import Wasabi from "../components/ConnectWallet/Wallets/Wasabi.vue";

import ZapAndroid from "../components/ConnectWallet/Wallets/ZapAndroid.vue";
import ZapDesktop from "../components/ConnectWallet/Wallets/ZapDesktop.vue";
import ZapiOS from "../components/ConnectWallet/Wallets/ZapiOS.vue";
import ZeusAndroid from "../components/ConnectWallet/Wallets/ZeusAndroid.vue";
import ZeusiOS from "../components/ConnectWallet/Wallets/ZeusiOS.vue";

import LNDConnectGRPCLocal from "../components/ConnectWallet/Wallets/LNDConnectGRPCLocal.vue";
import LNDConnectGRPCTor from "../components/ConnectWallet/Wallets/LNDConnectGRPCTor.vue";
import LNDConnectRESTLocal from "../components/ConnectWallet/Wallets/LNDConnectRESTLocal.vue";
import LNDConnectRESTTor from "../components/ConnectWallet/Wallets/LNDConnectRESTTor.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: TransitionWrapperLayout,
    children: [
      {
        path: "",
        component: SimpleLayout,
        children: [
          {
            path: "",
            name: "login",
            component: Login,
            meta: { requiresAuth: false }
          }
        ]
      },
      {
        path: "/start",
        component: SimpleLayout,
        meta: { requiresAuth: false },
        children: [
          {
            path: "",
            name: "start",
            component: Start
          }
        ]
      },
      {
        path: "/dashboard",
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
          {
            path: "",
            name: "dashboard",
            component: Dashboard
          }
        ]
      },
      {
        path: "/bitcoin",
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
          {
            path: "",
            name: "bitcoin",
            component: Bitcoin
          }
        ]
      },
      {
        path: "/lightning",
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
          {
            path: "",
            name: "lightning",
            component: Lightning
          }
        ]
      },
      {
        path: "/settings",
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
          {
            path: "",
            name: "settings",
            component: Settings
          }
        ]
      },
      {
        path: "/connect",
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
          {
            path: "",
            name: "connect",
            component: ConnectWallet,
            children: [
              {
                path: "bitboxapp",
                component: BitBoxApp,
                meta: {
                  wallet: "bitboxapp"
                }
              },
              {
                path: "blockstream-green",
                component: BlockstreamGreen,
                meta: {
                  wallet: "blockstream-green"
                }
              },
              {
                path: "bluewallet-android",
                component: BlueWalletAndroid,
                meta: {
                  wallet: "bluewallet-android"
                }
              },
              {
                path: "electrum-android",
                component: ElectrumAndroid,
                meta: {
                  wallet: "electrum-android"
                }
              },
              {
                path: "electrum-desktop",
                component: ElectrumDesktop,
                meta: {
                  wallet: "electrum-desktop"
                }
              },
              {
                path: "fully-noded",
                component: FullyNoded,
                meta: {
                  wallet: "fully-noded"
                }
              },
              {
                path: "phoenix",
                component: Phoenix,
                meta: {
                  wallet: "phoenix"
                }
              },
              {
                path: "sparrow",
                component: Sparrow,
                meta: {
                  wallet: "sparrow"
                }
              },
              {
                path: "specter-desktop",
                component: SpecterDesktop,
                meta: {
                  wallet: "specter-desktop"
                }
              },
              {
                path: "wasabi",
                component: Wasabi,
                meta: {
                  wallet: "wasabi"
                }
              },
              {
                path: "bitcoin-core-p2p",
                component: BitcoinCoreP2P,
                meta: {
                  wallet: "bitcoin-core-p2p"
                }
              },
              {
                path: "bitcoin-core-rpc",
                component: BitcoinCoreRPC,
                meta: {
                  wallet: "bitcoin-core-rpc"
                }
              },
              {
                path: "electrum-server",
                component: ElectrumServer,
                meta: {
                  wallet: "electrum-server"
                }
              },
              {
                path: "zap-android",
                component: ZapAndroid,
                meta: {
                  wallet: "zap-android"
                }
              },
              {
                path: "zap-desktop",
                component: ZapDesktop,
                meta: {
                  wallet: "zap-desktop"
                }
              },
              {
                path: "zap-ios",
                component: ZapiOS,
                meta: {
                  wallet: "zap-ios"
                }
              },
              {
                path: "zeus-android",
                component: ZeusAndroid,
                meta: {
                  wallet: "zeus-android"
                }
              },
              {
                path: "zeus-ios",
                component: ZeusiOS,
                meta: {
                  wallet: "zeus-ios"
                }
              },
              {
                path: "lndconnect-grpc-local",
                component: LNDConnectGRPCLocal,
                meta: {
                  wallet: "lndconnect-grpc-local"
                }
              },
              {
                path: "lndconnect-grpc-tor",
                component: LNDConnectGRPCTor,
                meta: {
                  wallet: "lndconnect-grpc-tor"
                }
              },
              {
                path: "lndconnect-rest-local",
                component: LNDConnectRESTLocal,
                meta: {
                  wallet: "lndconnect-rest-local"
                }
              },
              {
                path: "lndconnect-rest-tor",
                component: LNDConnectRESTTor,
                meta: {
                  wallet: "lndconnect-rest-tor"
                }
              },
            ]
          }
        ]
      },
      {
        path: "/logout",
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
          {
            path: "",
            name: "logout",
            component: Logout
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: () => {
    return { x: 0, y: 0 };
  } //scroll to top on page changes
});

//Fake for now
const isLoggedIn = () => !!store.state.user.jwt;

//Authentication Check
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        path: "/",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // always call next()!
  }
});

//Close Mobile Menu after route change
router.afterEach(() => {
  if (store.getters.isMobileMenuOpen) {
    store.commit("toggleMobileMenu");
  }
});

export default router;
