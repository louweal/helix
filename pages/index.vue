<template>
  <div class="page">
    <Header fixed />
    <div class="container container--wide">
      <div class="grid">
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
  </div>
</template>

<script>
import contracts from "./../data/contracts.json";

export default {
  contracts: contracts,
  computed: {
    selectedContracts() {
      let sortedContracts = this.$options.contracts.sort((a, b) =>
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
