<template>
  <main>
    <pre-loader />

    <!-- <template v-if="width >= 800">
      <div class="container container--wide">
        <notification>
          <p>Switch to a mobile device for better user experience.</p>
          <p>
            <a href="https://helixheroes.org">helixheroes.org</a>
          </p>
        </notification>
      </div>
    </template> -->

    <Nuxt />

    <notification v-if="$store.state.action === 'transferSuccess'">
      <p>Transfer successful</p>
      <p><nuxt-link to="/login">Switch to another account</nuxt-link></p>
    </notification>

    <notification v-if="$store.state.action === 'deleteSuccess'">
      <p>Deletion successful</p>
    </notification>

    <Footer v-if="$route.path !== '/login'" />
  </main>
</template>

<script>
export default {
  name: "Default",

  transition: "page",

  data() {
    return {
      width: document.documentElement.clientWidth,
    };
  },

  created() {
    this.$store.commit("SET_CONTRACTS", require("~/data/contracts.json"));
    this.$store.commit("SET_ACCOUNTS", require("~/data/accounts.json"));
    this.$store.commit("SET_CATEGORIES", require("~/data/categories.json"));
    this.$store.commit("SET_COUNTRIES", require("~/data/countries.json"));
    this.$store.commit("SET_IMAGES", require("~/data/images.json"));
    this.$store.commit("SET_LABELS", require("~/data/labels.json"));
    this.$store.commit("SET_MATERIALS", require("~/data/materials.json"));

    console.log(
      "todo for demo contracts: mint and associate [only once! -> manually from other script?? ]"
    );

    if (this.$store.state.currentAccount.ID === -1) {
      this.$router.push({ path: "/login" });
    }
  },

  methods: {
    getWidth() {
      this.width = document.documentElement.clientWidth;
    },
  },

  mounted() {
    this.getWidth();
    window.addEventListener("resize", this.getWidth);

    // let gaScript = document.createElement("script");
    // gaScript.setAttribute(
    //   "src",
    //   "https://www.googletagmanager.com/gtag/js?id=G-HNSQMHP9VF"
    // );
    // document.head.appendChild(gaScript);
    // window.dataLayer = window.dataLayer || [];

    // function gtag() {
    //   dataLayer.push(arguments);
    // }
    // gtag("js", new Date());
    // gtag("config", "G-HNSQMHP9VF");
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.getWidth);
  },
};
</script>

<style lang="scss" scoped>
main {
  position: relative;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter,
.page-leave-to {
  opacity: 0.5;
  // transform: translateY(40px);
}

// .rtl-enter-active,
// .rtl-leave-active {
//   transition: all 0.5s;
// }
// .rtl-enter {
//   transform: translateX(40px);
// }
// .rtl-leave-to {
//   // opacity: 0;
//   transform: translateX(0px);
// }
</style>
