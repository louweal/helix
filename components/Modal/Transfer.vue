<template>
  <div v-if="$store.state.modals.show === 'transfer'">
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
            :value="1"
            :max="c.product.amount"
            class="form-control"
            id="amountInput"
            xxxstyle="width: 70px"
          />
        </div>
      </div>
    </div>
    <p>You receive xxx ℏ and the new owner receives xxx ℏ.</p>

    <div class="btn btn-secondary" xxxclick="">
      {{ $t("Transfer ownership") }} <i class="bi bi-arrow-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    c() {
      return this.$store.state.modals.data;
    },
  },
};
</script>

<style></style>
