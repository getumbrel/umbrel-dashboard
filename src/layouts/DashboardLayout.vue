<template>
  <div>
    <b-navbar type="light" variant="default" class="nav-horizontal">
      <div>
        <b-navbar-brand to="/dashboard">
          <img src="@/assets/logo.svg" alt="Umbrel" height="50" />
        </b-navbar-brand>
      </div>

      <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -->

      <!-- Search Bar -->
      <!-- <b-navbar-nav>
        <div class="px-lg-4 px-xl-5 mx-xl-4"></div>
        <b-nav-form class="input-search-form">
          <b-form-input
            size="sm"
            class="input-search"
            placeholder="Search for transactions, addresses, etc."
          ></b-form-input>
          <div class="input-search-icon"></div>
        </b-nav-form>
      </b-navbar-nav>-->

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- Chain badge -->
        <b-badge
          variant="success"
          v-if="chain !== 'main'"
          class="align-self-center mr-2 text-capitalize"
          pill
        >{{ chain === "test" ? "testnet" : chain }}</b-badge>

        <div
          class="nav-hamburger-icon d-lg-none d-xl-none ml-1"
          :class="{ active: isMobileMenuOpen }"
          @click="toggleMobileMenu"
        >
          <div></div>
        </div>
        <b-nav-item-dropdown class="d-none d-lg-block d-xl-block" right no-caret>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>{{ name.split(' ')[0] }}</template>
          <b-dropdown-item @click="logout">Log out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>

    <!-- Mobile menu -->
    <transition name="mobile-vertical-menu">
      <div class="mobile-vertical-menu d-lg-none d-xl-none" v-if="isMobileMenuOpen">
        <authenticated-vertical-navbar :isMobileMenu="true" />
      </div>
    </transition>

    <transition name="mobile-vertical-menu-fader">
      <div
        class="mobile-vertical-menu-fader d-lg-none d-xl-none"
        v-if="isMobileMenuOpen"
        @click="toggleMobileMenu"
      ></div>
    </transition>

    <b-row class="mx-0">
      <b-col col lg="3" xl="2" class="d-none d-lg-block d-xl-block pl-0 pr-0 pr-xl-2">
        <authenticated-vertical-navbar />
      </b-col>

      <b-col col lg="9" xl="10">
        <div class="pr-xl-2">
          <transition name="change-page" mode="out-in">
            <!-- Content -->
            <router-view></router-view>
          </transition>
        </div>

        <!-- Footer -->
        <footer class="d-flex justify-content-end text-muted pr-sm-2 pr-xl-3">
          <p>
            <small>
              <a href="https://getumbrel.com" target="_blank">getumbrel.com</a>
            </small>
          </p>
        </footer>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AuthenticatedVerticalNavbar from "@/components/AuthenticatedVerticalNavbar";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      name: state => state.user.name,
      chain: state => state.bitcoin.chain
    }),
    isMobileMenuOpen() {
      return this.$store.getters.isMobileMenuOpen;
    }
  },
  methods: {
    logout() {
      //close mobile menu
      if (this.isMobileMenuOpen) {
        this.toggleMobileMenu();
      }
      this.$store.dispatch("user/logout");
    },
    fetchData() {
      this.$store.dispatch("system/fetchUnit");
      this.$store.dispatch("bitcoin/getSync");
      this.$store.dispatch("bitcoin/getBalance");
      this.$store.dispatch("bitcoin/getTransactions");
      this.$store.dispatch("lightning/getTransactions");
      this.$store.dispatch("lightning/getChannels");
      this.$store.dispatch("bitcoin/getPrice");
    },
    toggleMobileMenu() {
      this.$store.commit("toggleMobileMenu");
    }
  },
  created() {
    //load this data once:
    this.$store.dispatch("user/getInfo");

    //refresh this data every 20s:
    this.fetchData();
    this.interval = window.setInterval(this.fetchData, 20000);
  },
  beforeDestroy() {
    window.clearInterval(this.interval);
  },
  watch: {},
  components: {
    AuthenticatedVerticalNavbar
  }
};
</script>

<style lang="scss" scoped>
.nav-horizontal {
  background: #fff;
  position: sticky;
  z-index: 9;
}

.nav-horizontal {
  top: 0;
}

.input-search-form {
  form {
    position: relative;
  }
  .input-search {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    width: calc(100vw - 200px);
    max-width: 600px;
    font-size: 1rem;
    margin-left: 1rem;
  }
  .input-search-icon {
    content: url("~@/assets/icon-search.svg");
    position: absolute;
    top: calc(50% - 0.625rem);
    left: -0.25rem;
    height: 1.25rem;
    width: auto;
  }
}

::-webkit-input-placeholder {
  /* Edge */
  color: #c3c6d1;
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #c3c6d1;
}

::placeholder {
  color: #c3c6d1;
}

.nav-hamburger-icon {
  width: 24px;
  cursor: pointer;
  &:before,
  &:after,
  div {
    background-color: #c3c6d1;
    border-radius: 3px;
    content: "";
    display: block;
    height: 4px;
    width: 100%;
    margin: 5px 0;
    transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  div {
    width: 20px;
    margin-left: 4px;
  }
  &.active {
    &:before {
      transform: translateY(9px) rotate(135deg);
    }
    &:after {
      transform: translateY(-9px) rotate(-135deg);
    }
    div {
      transform: scale(0);
    }
  }
}

.mobile-vertical-menu {
  position: fixed;
  z-index: 9;
  top: 84px;
  right: 0;
  width: 80vw;
  max-width: 280px;
  height: calc(var(--vh100, 100vh) - 84px);
  background: #fff;
  box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5);
  transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
}

.mobile-vertical-menu-enter {
  // opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.mobile-vertical-menu-enter-to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
.mobile-vertical-menu-leave {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
.mobile-vertical-menu-leave-to {
  // opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.mobile-vertical-menu-fader {
  position: fixed;
  height: var(--vh100, 100vh);
  width: 100vw;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 1);
  z-index: 8;
  opacity: 0.1;
  transition: opacity 0.6s ease-in-out;
}

.mobile-vertical-menu-fader-enter {
  opacity: 0;
}
.mobile-vertical-menu-fader-enter-to {
  opacity: 0.1;
}
.mobile-vertical-menu-fader-leave {
  opacity: 0.1;
}
.mobile-vertical-menu-fader-leave-to {
  opacity: 0;
}

// Page changing transitions
.change-page-enter-active,
.change-page-leave-active {
  transition: transform 0.4s, opacity 0.4s ease;
}
.change-page-enter {
  transform: translate3d(-40px, 0, 0);
  opacity: 0;
}
.change-page-enter-to {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}
.change-page-leave {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}
.change-page-leave-to {
  transform: translate3d(40px, 0, 0);
  opacity: 0;
}
</style>
