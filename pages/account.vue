<template>
  <div class="page page--white">
    <div class="container">
      <Section>
        <account-card
          v-if="currentAccount.ID !== -1"
          class="bottom-xs-1"
          :data="currentAccount"
        />
      </Section>

      <hr />
      <nav-item to="/settings">Settings</nav-item>
      <nav-item to="/about">About</nav-item>
      <nav-item to="/contact">Contact</nav-item>

      <nav-item to="/login">Sign out</nav-item>

      <div class="bottom-xs-3"></div>

      <!-- <div class="align-xs-center bottom-xs-5">
        <img
          src="@/assets/images/logo-small.svg"
          alt="logo helix"
          width="39.1"
          height="14.32"
        />
      </div> -->
      <div class="align-xs-center bottom-xs-3">
        <img
          src="@/assets/images/logo.svg"
          alt="logo"
          width="106.66"
          height="49.84"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import accounts from "~/data/accounts.json";

export default {
  // accounts,

  computed: {
    currentAccount() {
      return this.$store.state.currentAccount;
    },
  },
};
</script>

<style lang="scss" scoped>
// silence
</style>
