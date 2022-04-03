<template>
  <div class="page page--white">
    <div class="container">
      <Section>
        <account-card
          v-if="currentAccount.ID !== -1"
          class="bottom-xs-4"
          :data="currentAccount"
        />
      </Section>
      <Section>
        <!-- <hr /> -->
        <nav-item to="/about">About</nav-item>

        <nav-item to="/settings">Settings</nav-item>
        <!-- <nav-item to="/contact">Contact</nav-item> -->
        <!-- <nav-item to="/login">Sign out</nav-item> -->
      </Section>
      <Section>
        <div class="align-xs-center">
          <Button to="/login" class="button--primary"> Switch account </Button>
        </div>
      </Section>
    </div>
  </div>
</template>

<script>
export default {
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
