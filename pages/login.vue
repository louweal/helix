<template>
  <div class="page page--white">
    <div class="container">
      &nbsp;
      <div class="bottom-xs-3" />
      <div class="align-xs-center bottom-xs-2">
        <img
          src="@/assets/images/logo.svg"
          alt="logo"
          width="106.66"
          height="49.84"
        />
      </div>
      <div class="grid align-xs-center bottom-xs-3">
        <div class="col-xs-16">
          <p>Choose one of the demo accounts below to sign in</p>
        </div>
      </div>

      <Stack dir="vertical">
        <account-card
          v-for="i in 3"
          :key="i"
          :data="$options.accounts[i - 1]"
          login
        />
      </Stack>
    </div>
  </div>
</template>

<script>
import accounts from "./../data/accounts.json";

export default {
  // transition: "rtl",

  accounts: accounts,
};
</script>

<style lang="scss" scoped>
// silence
</style>
