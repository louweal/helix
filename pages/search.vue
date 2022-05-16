<template>
  <div class="page">
    <Header fixed>
      <search-bar @q="setQuery" />
    </Header>

    <div class="container container--wide">
      <div class="grid" v-if="matchingContracts.length > 0">
        <div
          class="col-xs-24"
          v-for="(contract, index) in matchingContracts.slice().reverse()"
          :key="index"
        >
          <contract-card
            :data="contract"
            :pending="contract.state === 1 ? true : false"
          />
        </div>
      </div>

      <div v-if="matchingContracts.length === 0" class="page--placeholder">
        <div>
          <p class="bottom-xs-2">No active contracts found in your account</p>

          <template v-if="!$store.state.currentAccount.seller">
            <Button to="/login" class="button--secondary">
              Switch account
            </Button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      q: "",
    };
  },

  computed: {
    contracts() {
      return this.$store.state.contracts;
    },

    matchingContracts() {
      let myContracts = this.contracts.filter(
        (c) => c.owner === this.$store.state.currentAccount.accountId
      );
      if (this.q.length < 2) {
        return myContracts;
      } else {
        let results = myContracts.filter((c) =>
          c.name.toLowerCase().includes(this.q)
        );
        return results;
      }
    },
  },

  methods: {
    setQuery(val) {
      this.q = val;
    },
  },
};
</script>

<style lang="scss" scoped>
// silence
</style>
