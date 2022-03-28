<template>
  <main class="main">
    <Header fixed />
    <Section class="section--light">
      <div class="container container--wide">
        <div class="grid">
          <div class="col-xs-6">
            <contract-card
              v-for="(contract, index) in $options.contracts"
              :key="index"
              :data="contract"
            />
          </div>
        </div>
        <lorem :max="300" />
      </div>
    </Section>
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
