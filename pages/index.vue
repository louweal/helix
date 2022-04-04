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
      <!-- <lorem :max="300" /> -->
    </div>
    <div v-if="selectedContracts.length === 0" class="page--placeholder">
      <div>
        <p class="bottom-xs-2">No contracts found</p>

        <Button
          v-if="$store.state.currentAccount.seller"
          to="/add-contract"
          class="button--primary"
          >Add contract</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
// import contracts from "./../data/contracts.json";

export default {
  // contracts: contracts,

  computed: {
    contracts() {
      return this.$store.state.contracts;
    },
    selectedContracts() {
      let myContracts = this.contracts.filter(
        (c) => c.owner === this.$store.state.currentAccount.ID
      );
      let sortedContracts = myContracts.sort((a, b) =>
        a.state > b.state ? 1 : -1
      );
      let selected = this.$store.state.currentCategory;
      // console.log(selected);
      if (selected === "all") {
        return sortedContracts;
      } else {
        return sortedContracts.filter(
          (c) => c.category === this.$store.state.currentCategory
        );
      }
    },
  },
};
</script>
