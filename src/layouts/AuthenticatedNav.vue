<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="default" class="nav-horizontal">
      <div style="width: 280px;">
        <b-navbar-brand href="#">
          <img src="@/assets/logo.svg" alt="Umbrel" height="50" />
        </b-navbar-brand>
      </div>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-form>
            <svg
              width="23"
              height="24"
              viewBox="0 0 23 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.709 9.99571C18.709 14.9774 14.7313 18.9914 9.85449 18.9914C4.97766 18.9914 1 14.9774 1 9.99571C1 5.01405 4.97766 1 9.85449 1C14.7313 1 18.709 5.01405 18.709 9.99571Z"
                stroke="#C3C6D1"
                stroke-width="2"
              />
              <rect
                width="2.06535"
                height="9.12065"
                rx="1.03267"
                transform="matrix(0.702406 -0.711777 0.701711 0.712461 14.7881 17.4702)"
                fill="#C3C6D1"
              />
            </svg>

            <b-form-input
              size="sm"
              class="input-search ml-1"
              placeholder="Search for transactions, addresses, etc."
            ></b-form-input>
          </b-nav-form>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>User</template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-row class="mx-0">
      <b-col col sm="2" class="pl-0">
        <div class="nav-vertical d-flex flex-column justify-content-between">
          <div>
            <div class="balance-container w-100 px-3 py-4 mb-3">
              <p class="text-muted">
                Balance
                <span style="cursor: pointer;" @click="toggleBalance">
                  <b-icon :icon="showBalance ? 'eye-slash-fill' : 'eye-fill'"></b-icon>
                </span>
              </p>
              <h3>
                {{ showBalance ? `162,500` : `******` }}
                <small style="font-size: 1rem;">Sats</small>
              </h3>
            </div>
            <b-nav vertical class="px-1">
              <b-nav-item class="my-1" active>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-2"
                >
                  <rect x="12" y="4" width="3" height="13" rx="1.5" fill="#5351FB" />
                  <rect x="7" y="9" width="3" height="8" rx="1.5" fill="#5351FB" />
                  <path
                    d="M5 19H20C20.5523 19 21 19.4477 21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3C4.55228 3 5 3.44772 5 4V19Z"
                    fill="#5351FB"
                  />
                  <rect x="17" y="11" width="3" height="6" rx="1.5" fill="#5351FB" />
                </svg>
                Home
              </b-nav-item>
              <b-nav-item class="my-1" disabled>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-2"
                >
                  <path
                    d="M16.7901 12.6924C17.654 12.1339 18.3215 11.2341 18.5774 10.1255C19.0368 8.13571 18.0121 6.17606 16.2631 5.47999L16.6682 3.72553L14.5245 3.23063L14.1327 4.92791L11.9891 4.43302L12.3809 2.73574L10.2373 2.24085L9.84545 3.93812L8.77368 3.69068L8.25121 5.95374L9.32302 6.20119L7.23316 15.2534L6.16135 15.0059L5.63888 17.269L6.71069 17.5165L6.18822 19.7795L8.33184 20.2744L8.85431 18.0114L10.9979 18.5062L10.4755 20.7693L12.6191 21.2642L13.1548 18.944C15.0319 19.0851 16.8119 17.7729 17.2713 15.7831C17.5272 14.6745 17.3217 13.5731 16.7901 12.6924V12.6924ZM16.4338 9.63058C16.2177 10.5665 15.3208 11.1614 14.4342 10.9567L10.6829 10.0906L11.4666 6.69608L15.2179 7.56214C16.1045 7.76681 16.6499 8.69463 16.4338 9.63058ZM13.1281 16.6143L9.37675 15.7482L10.1604 12.3537L13.9118 13.2197C14.7983 13.4244 15.3437 14.3522 15.1276 15.2882C14.9115 16.2241 14.0146 16.819 13.1281 16.6143V16.6143Z"
                    fill="#C3C6D1"
                  />
                </svg>
                Bitcoin
              </b-nav-item>
              <b-nav-item class="my-1" disabled>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-2"
                >
                  <path
                    d="M17.9477 9.7013C17.9126 9.63688 17.8617 9.58329 17.8002 9.54601C17.7387 9.50873 17.6688 9.48908 17.5977 9.48908H12.3271L13.2107 2.46492C13.2202 2.37092 13.199 2.27633 13.1505 2.19638C13.1021 2.11643 13.0291 2.05579 12.9435 2.0242C12.8579 1.99261 12.7645 1.99193 12.6785 2.02226C12.5924 2.05258 12.5187 2.11215 12.4691 2.19138L6.0596 13.8743C6.02212 13.9377 6.00157 14.0104 6.00009 14.0848C5.9986 14.1593 6.01622 14.2328 6.05114 14.2977C6.08606 14.3627 6.13701 14.4169 6.19873 14.4545C6.26045 14.4922 6.33072 14.5121 6.40228 14.5121H11.5941L10.8938 21.5468C10.8869 21.6405 10.9104 21.7339 10.9604 21.8121C11.0104 21.8904 11.0841 21.9489 11.1698 21.9785C11.2555 22.0082 11.3483 22.0071 11.4334 21.9755C11.5184 21.944 11.5909 21.8837 11.6392 21.8044L17.9429 10.1227C17.9794 10.0592 17.9991 9.98672 18 9.91269C18.0008 9.83866 17.9828 9.76572 17.9477 9.7013Z"
                    fill="#C3C6D1"
                  />
                </svg>
                Lightning
              </b-nav-item>
            </b-nav>
          </div>
          <div>
            <b-nav vertical class="px-1">
              <b-nav-item class="my-1" disabled>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-2"
                >
                  <path
                    d="M19.3845 9.97438H18.6201C18.49 9.54789 18.3187 9.14032 18.1115 8.75306L18.6543 8.21071C19.2839 7.5802 19.2848 6.55735 18.6543 5.92638L18.0736 5.34572C17.7708 5.04293 17.3591 4.87261 16.9308 4.87261C16.5015 4.87261 16.0916 5.04293 15.7874 5.34572L15.2446 5.88807C14.8578 5.68221 14.4503 5.51096 14.0238 5.37941V4.61551C14.0238 3.72282 13.3009 3 12.4083 3H11.5876C10.6949 3 9.97207 3.72282 9.97207 4.61551V5.37941C9.54604 5.50958 9.13801 5.68082 8.75121 5.88807L8.20932 5.34572C7.57835 4.71475 6.55504 4.71475 5.92407 5.34572L5.34526 5.92592C4.71429 6.55643 4.71429 7.57974 5.34526 8.21025L5.88715 8.7526C5.68128 9.14032 5.50958 9.54789 5.37849 9.97392H4.61551C3.72282 9.97392 3 10.6967 3 11.5894V12.4101C3 13.3019 3.72282 14.0256 4.61551 14.0256H5.37895C5.50958 14.4512 5.68082 14.8597 5.88761 15.2465L5.34526 15.7893C4.71475 16.4193 4.71475 17.4426 5.3448 18.0736L5.92546 18.6543C6.22825 18.9562 6.63951 19.1265 7.06785 19.1265H7.06831C7.49712 19.1265 7.90745 18.9562 8.21071 18.6543L8.75352 18.1115C9.13986 18.3178 9.54835 18.489 9.97392 18.6201V19.3845C9.97392 20.2763 10.6967 21 11.5894 21H12.4101C13.3028 21 14.0256 20.2763 14.0256 19.3845V18.6201C14.4521 18.4895 14.8597 18.3183 15.2465 18.1115L15.7898 18.6543C16.0921 18.9571 16.5038 19.1265 16.9326 19.1265C17.3619 19.1265 17.7713 18.9562 18.0759 18.6543L18.6557 18.0736C19.2862 17.4426 19.2857 16.4203 18.6557 15.7893L18.1129 15.2474C18.3192 14.8597 18.4904 14.4512 18.6215 14.0261H19.3859C20.2786 14.0261 21.0014 13.3023 21.0014 12.4106V11.5904C21 10.6981 20.2767 9.97438 19.3845 9.97438ZM12.0002 15.6924C9.96469 15.6924 8.30764 14.0362 8.30764 11.9998C8.30764 9.96377 9.96469 8.30718 12.0002 8.30718C14.0367 8.30718 15.6928 9.96377 15.6928 11.9998C15.6928 14.0362 14.0367 15.6924 12.0002 15.6924Z"
                    fill="#C3C6D1"
                  />
                </svg>
                Settings
              </b-nav-item>
            </b-nav>
          </div>
        </div>
      </b-col>
      <b-col col sm="10">
        <slot></slot>
        <footer class="d-flex justify-content-end text-muted">
          <p>
            <small>
              &copy; 2020
              <a href="https://getumbrel.com" target="_blank">getumbrel.com</a>
            </small>
          </p>
        </footer>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// import Vue from "vue";

export default {
  data() {
    return {
      state: {
        showBalance: true
      }
    };
  },
  computed: {
    showBalance() {
      return this.state.showBalance;
    },
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    }
  },
  methods: {
    toggleBalance() {
      return (this.state.showBalance = !this.state.showBalance);
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.nav-horizontal,
.nav-vertical {
  background: #fff;
  position: sticky;
  z-index: 9;
}

.nav-vertical {
  // width: 280px;
  height: calc(100vh - 84px);
  top: 84px;
}

.nav-horizontal {
  top: 0;
}

.balance-container {
  border-top: solid 1px #eeeff3;
  border-bottom: solid 1px #eeeff3;
}

.input-search {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  width: 60vw;
  max-width: 600px;
  font-size: 1em;
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
</style>
