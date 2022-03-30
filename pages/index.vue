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
  //   transition: "home",

  contracts: contracts, //.sort((a, b) => (a.ID > b.ID ? 1 : -1)),

  computed: {
    selectedContracts() {
      let selected = this.$store.state.currentCategory;
      console.log(selected);
      if (selected === "all") {
        return this.$options.contracts;
      } else {
        return this.$options.contracts.filter(
          (c) => c.category === this.$store.state.currentCategory
        );
      }
    },
  },
};
</script>
