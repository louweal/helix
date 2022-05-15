<template>
  <main>
    <pre-loader />
    <spinner v-if="$store.state.waiting" />

    <div class="demo-box" v-if="$route.path !== '/login' && 1 === 1">
      <!-- {{ accounts }} -->

      <heading size="6xl" level="0" color="white">
        Account switcher<br />
        for demonstration only
      </heading>

      <br /><br />

      <Stack dir="vertical">
        <account-card
          v-for="(account, index) in accounts.filter((a) => !a.charity)"
          :key="index"
          :data="account"
          :active="$store.state.currentAccount.ID === account.ID"
          login
        />
      </Stack>
    </div>

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

  computed: {
    accounts() {
      return this.$store.state.accounts;
    },
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

.demo-box {
  position: fixed;
  top: 30px;
  left: 30px;
  // border: 1px solid green;
  max-width: 275px;
  min-width: 275px;
  z-index: 22;
  padding: 1rem;
  background-color: #333;
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
