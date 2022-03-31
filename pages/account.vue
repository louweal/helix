<template>
  <div class="page page--white">
    <div class="container">
      <Section>
        <account-card class="bottom-xs-1" :data="$options.accounts[0]" />
      </Section>

      <!-- <hr /> -->
      <nav-item to="">Settings</nav-item>
      <nav-item to="">Contact</nav-item>

      <nav-item to="/login">Sign out</nav-item>

      <div class="bottom-xs-3"></div>

      <div class="align-xs-center bottom-xs-5">
        <img
          src="@/assets/images/logo-small.svg"
          alt="logo helix"
          width="39.1"
          height="14.32"
        />
      </div>
    </div>
  </div>
</template>

<script>
import accounts from "~/data/accounts.json";

export default {
  accounts,
};
</script>

<style lang="scss" scoped>
// silence
</style>
