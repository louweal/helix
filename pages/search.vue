<template>
  <div class="page">
    <div class="container container--wide">
      <p>barrr</p>

      <div class="grid">
        <div
          class="col-xs-12"
          v-for="(contract, index) in $options.contracts"
          :key="index"
        >
          <contract-card :data="contract" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import contracts from "./../data/contracts.json";

export default {
  contracts,
};
</script>

<style lang="scss" scoped>
// silence
</style>
