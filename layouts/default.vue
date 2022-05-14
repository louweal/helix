<template>
  <main>
    <pre-loader />
    <spinner v-if="$store.state.waiting" />

    <Nuxt />

    <notification v-if="$store.state.action === 'transferSuccess'">
      <p>Transfer successful</p>
      <p><nuxt-link to="/login">Switch to another account</nuxt-link></p>
    </notification>

    <notification v-if="$store.state.action === 'deleteSuccess'">
      <p>Deletion successful</p>
    </notification>

    <notification v-if="$store.state.action === 'collectSuccess'">
      <p>Collect successful.</p>
      <a
        target="_blank"
        :href="`https://testnet.dragonglass.me/hedera/accounts/${$store.state.currentAccount.accountId}`"
      >
        Inspect on DragonGlass
      </a>
    </notification>

    <notification v-if="$store.state.action === 'donateSuccess'">
      <p>Donation successful.</p>
      <a
        target="_blank"
        :href="`https://testnet.dragonglass.me/hedera/accounts/${$store.state.currentAccount.accountId}`"
      >
        Inspect your account on DragonGlass
      </a>
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
    this.$store.commit("SET_ACCOUNTS", require("~/data/accounts.json"));
    this.$store.commit("SET_CATEGORIES", require("~/data/categories.json"));
    this.$store.commit("SET_COUNTRIES", require("~/data/countries.json"));
    this.$store.commit("SET_IMAGES", require("~/data/images.json"));
    this.$store.commit("SET_LABELS", require("~/data/labels.json"));
    this.$store.commit("SET_MATERIALS", require("~/data/materials.json"));

    if (!this.$store.state.currentAccount.ID) {
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
}
</style>
