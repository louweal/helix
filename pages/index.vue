<template>
  <div class="page">
    <Header fixed />
    <div class="container container--wide">
      <div class="grid" v-if="selectedContracts.length > 0">
        <div
          class="col-xs-12"
          v-for="(contract, index) in selectedContracts"
          :key="index"
        >
          <contract-card :data="contract" />
        </div>
      </div>
    </div>
    <div v-if="selectedContracts.length === 0" class="page--placeholder">
      <div>
        <p class="bottom-xs-2">No active contracts found in your account</p>

        <template v-if="!$store.state.currentAccount.seller">
          <Button to="/login" class="button--secondary">
            Switch account
          </Button>
        </template>

        <Button
          v-if="$store.state.currentAccount.seller"
          to="/new"
          class="button--primary"
          >Add contract</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    contracts() {
      return this.$store.state.contracts;
    },
    me() {
      return +this.$store.state.currentAccount.ID;
    },
    selectedContracts() {
      let myContracts = this.contracts.filter((c) => +c.owner === this.me);
      let selected = this.$store.state.currentCategory;
      if (selected === -1) {
        return myContracts;
      } else {
        return myContracts.filter(
          (c) => +c.category === this.$store.state.currentCategory
        );
      }
    },
  },
};
</script>
