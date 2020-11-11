import Electrum from "@/components/ConnectWallet/Wallets/Electrum.vue";
import FullyNoded from "@/components/ConnectWallet/Wallets/FullyNoded.vue";
import Sparrow from "@/components/ConnectWallet/Wallets/Sparrow.vue";
import SpecterDesktop from "@/components/ConnectWallet/Wallets/SpecterDesktop.vue";
import Wasabi from "@/components/ConnectWallet/Wallets/Wasabi.vue";

export default {
  bitcoin: [
    {
      name: "Electrum",
      component: Electrum
    },
    {
      name: "Fully Noded",
      component: FullyNoded
    },
    {
      name: "Sparrow",
      component: Sparrow
    },
    {
      name: "Specter Desktop",
      component: SpecterDesktop
    },
    {
      name: "Wasabi",
      component: Wasabi
    }
  ],
  lightning: [

  ]
};