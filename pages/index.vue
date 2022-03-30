<template>
  <main class="main">
    <Header fixed />
    <div class="container container--wide">
      <div class="grid">
        <div
          class="col-xs-12"
          v-for="(contract, index) in $options.contracts"
          :key="index"
        >
          <contract-card :data="contract" />
        </div>
      </div>
      <!-- <lorem :max="300" /> -->
    </div>
  </main>
</template>

<script>
import contracts from "./../data/contracts.json";

export default {
  //   transition: "home",

  contracts: contracts, //.sort((a, b) => (a.ID > b.ID ? 1 : -1)),

  computed: {},
};
</script>
