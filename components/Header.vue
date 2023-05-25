<template>
  <nav
    class="header fixed-top p-2"
    id="header"
    ref="header"
    :class="$route.path == '/' ? 'header--transparent' : 'header--white'"
    :key="$store.state.accountId"
  >
    <div class="d-flex justify-content-between align-items-center">
      <nuxt-link to="/" event="" @click.native="scrollToTop()" class="header-logo me-4" aria-label="to homepage">
        <div class="logo"></div>
      </nuxt-link>

      <ul class="d-none d-lg-block list-inline mb-0">
        <li class="list-inline-item px-lg-2" v-for="(l, i) in $options.menu" :key="i">
          <nuxt-link :to="{ path: l.url, hash: l.hash }" class="nav-link">
            {{ l.title }}
          </nuxt-link>
        </li>
      </ul>

      <nuxt-link to="/app">App</nuxt-link>

      <div class="ms-auto d-none d-lg-flex align-items-center gap-2 gap-md-4">
        <!-- <nuxt-link to="docs"
          >Documentation <i class="bi bi-box-arrow-up-right"></i
        ></nuxt-link> -->
        <div class="btn btn-primary" @click="disconnect()" v-if="$store.state.accountId">
          Disconnect <span class="d-none d-md-inline"> wallet</span>
        </div>

        <div class="btn btn-primary" @click="findPairings()" v-else>
          Connect <span class="d-none d-md-inline"> wallet</span>
        </div>
      </div>
      <div class="d-lg-none" @click="$store.commit('pushmenu/toggle')">
        <i class="bi lh-1" style="font-size: 38px" :class="$store.state.pushmenu.open ? 'bi-x-lg' : 'bi-list'"></i>
      </div>
    </div>
  </nav>
</template>

<script>
import menu from "@/data/menu.json";

export default {
  menu,
  data() {
    return {
      prevPosY: 0,
    };
  },

  mounted() {
    window.addEventListener("scroll", this.aosHeader);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.aosHeader);
  },

  computed: {},

  methods: {
    findPairings() {
      let pairingData = this.$hashconnect.hcData.pairingData;

      if (pairingData[0]) {
        let accountId = pairingData[0].accountIds[0];
        this.$store.commit("setAccountId", accountId);
        console.log("accountid set");
      } else {
        this.$store.commit("modals/show", { name: "connect" });
      }
    },
    scrollToTop() {
      if (this.$route.path === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
        this.$router.push("/");
      }
    },
    aosHeader() {
      let header = this.$refs["header"];
      let headerHeight = header.offsetHeight;

      // make header transparent only on top of hero on homepage
      if (this.$route.path === "/" && window.scrollY <= window.innerHeight - headerHeight) {
        header.classList.add("header--transparent");
        header.classList.remove("header--white");
      } else {
        header.classList.add("header--white");
        header.classList.remove("header--transparent");
      }
    },

    disconnect() {
      if (this.$hashconnect) {
        let pairingData = this.$hashconnect.hcData.pairingData;
        if (pairingData) {
          console.log(pairingData);
          let topic = pairingData[0].topic;
          if (topic) {
            this.$hashconnect.disconnect(topic);
            this.$store.commit("disconnect");
            this.$store.commit("data/SET_DEMO_CONTRACTS", undefined); // resets contracts to dummy data
            // this.$store.commit("data/SET_DEMO_CONTRACTS", undefined); // resets contracts to dummy data
          } else {
            console.log("No topic found");
          }
        } else {
          console.log("No pairing data found.");
        }
      } else {
        console.log("No hashconnect found");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  .logo {
    background-image: url("@/images/logo.svg");
    width: 119px;
    height: 43px;
    background-size: cover;
    background-repeat: no-repeat;
    transition: filter 0.1s 0.1s ease-out; //cubic-bezier(0.2, 0, 0.1, 1);
  }

  .bi {
  }

  &--white {
    background-color: #fff;
    box-shadow: 0 0.125rem 0.25rem rgba(#000, 0.075);
    border-bottom: 1px solid rgba(#000, 0.175);
  }

  &--transparent {
    a,
    .bi {
      color: #fff;
    }
    .btn {
      background-color: #fff;
      color: $dark;
    }

    .logo {
      filter: brightness(0) invert(1);
      // background-image: url("@/images/logo-white.svg");
    }
  }
}
</style>
