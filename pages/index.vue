<template>
  <div class="page">
    <Header fixed />
    <div class="container container--wide">
      <div v-if="$store.state.fetching">
        Fetching your contracts from Hedera network ...
      </div>
      <!-- {{ selectedContracts }} -->
      <div class="grid" v-if="selectedContracts.length > 0">
        <div
          class="col-xs-12"
          v-for="(contract, index) in selectedContracts"
          :key="index"
        >
          <contract-card :data="contract" />
        </div>
      </div>
      <notification>
        <p>
          {{ $store.state.currentAccount.name }}'s account on
          <a
            target="_blank"
            :href="`https://testnet.dragonglass.me/hedera/accounts/${$store.state.currentAccount.accountId}`"
          >
            Dragonglass
          </a>
        </p>
      </notification>

      <notification v-if="$store.state.currentContractId !== -1">
        <p>
          The smart contract with ID {{ $store.state.currentContractId }} was
          successfully created!
        </p>
      </notification>
    </div>
    <div
      v-if="selectedContracts.length === 0 && !$store.state.fetching"
      class="page--placeholder"
    >
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
  data() {
    return {
      selectedContracts: [],
    };
  },

  async mounted() {
    this.$store.commit("toggleFetchState");
    let data = await this.$store.dispatch("getSmartContracts");
    this.selectedContracts = data;
    this.$store.commit("toggleFetchState");
  },

  computed: {
    contracts() {
      return this.$store.state.contracts;
    },
    me() {
      return +this.$store.state.currentAccount.ID;
    },
    // selectedContracts() {

    //   let myContracts = this.contracts.filter((c) => +c.owner === this.me);
    //   let selected = this.$store.state.currentCategory;
    //   if (selected === -1) {
    //     return myContracts;
    //   } else {
    //     return myContracts.filter(
    //       (c) => +c.category === this.$store.state.currentCategory
    //     );
    //   }
    // },
  },
};
</script>
