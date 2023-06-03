<template>
  <div v-if="$store.state.modals.show === 'donate'">
    <div v-if="c.product.amount > 1">
      <div class="mb-2 row row-cols-lg-auto gy-1 gx-2 align-items-center">
        <div class="col-12">
          <span> Number of items:</span>
        </div>

        <div class="col-12">
          <input
            type="number"
            min="1"
            step="1"
            :value="c.product.amount"
            :max="c.product.amount"
            class="form-control"
            id="amountInput"
            xxxstyle="width: 70px"
          />
        </div>
      </div>
    </div>
    <div class="mb-2 row row-cols-lg-auto gy-1 gx-2 align-items-center">
      <div class="col-12">
        <span>Select charity:</span>
      </div>

      <div class="col-12">
        <select name="" id="" class="form-select">
          <option :value="ch.address" v-for="ch in $options.charities" :key="ch.address">
            {{ ch.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="btn btn-secondary" @click="donate">Donate {{ c.contract.deposit }} ℏ <i class="bi bi-arrow-right"></i></div>
  </div>
</template>

<script>
export default {
  charities: [
    {
      name: "The Plastic Soup Foundation",
      address: "0000000000000000000000000000000000350f4d",
    },
  ],
  computed: {
    c() {
      return this.$store.state.modals.data;
    },
  },

  methods: {
    donate() {
      this.$store.dispatch("data/donateDeposit", {
        accountId: this.$store.state.accountId,
        contractId: this.c.contract.id,
      });

      this.$store.commit("modals/hide");
    },
  },
};
</script>

<style></style>
