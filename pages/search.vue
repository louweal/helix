<template>
  <div class="page">
    <Header fixed>
      <search-bar @q="setQuery" />
    </Header>

    <div class="container container--wide">
      <div class="grid" v-if="matchingContracts.length > 0">
        <div
          class="col-xs-12"
          v-for="(contract, index) in matchingContracts"
          :key="index"
        >
          <contract-card :data="contract" />
        </div>
      </div>

      <div v-if="matchingContracts.length === 0" class="page--placeholder">
        No contracts found
      </div>
    </div>
  </div>
</template>

<script>
// import contracts from "./../data/contracts.json";
// import { mapGetters } from "vuex";

export default {
  // contracts,

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
      // console.log(this.q);
      let myContracts = this.contracts.filter(
        (c) => c.owner === this.$store.state.currentAccount.ID
      );
      let sortedContracts = myContracts.sort((a, b) =>
        a.state > b.state ? 1 : -1
      );
      if (this.q.length < 2) {
        return sortedContracts;
      } else {
        let results = sortedContracts.filter((c) =>
          c.name.toLowerCase().includes(this.q)
        );
        return results;
      }
    },
  },

  methods: {
    setQuery(val) {
      this.q = val;
      // console.log(val);
    },
  },
};
</script>

<style lang="scss" scoped>
// silence
</style>
