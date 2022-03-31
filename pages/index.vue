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
      No contracts found
    </div>
  </div>
</template>

<script>
import contracts from "./../data/contracts.json";

export default {
  contracts: contracts,

  created() {
    if (this.$store.state.currentAccount === -1) {
      this.$router.push({ path: "/login" });
    }
  },

  computed: {
    selectedContracts() {
      let myContracts = this.$options.contracts.filter(
        (c) => c.owner === this.$store.state.currentAccount
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
