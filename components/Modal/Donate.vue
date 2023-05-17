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
          <option
            :value="c.address"
            v-for="c in $options.charities"
            :key="c.address"
          >
            {{ c.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="btn btn-secondary" xxxclick="">
      {{ $t("Donate xxx ℏ") }} <i class="bi bi-arrow-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  charities: [
    {
      name: "The Plastic Soup Foundation",
      address: "xxxxxxx",
    },
  ],
  computed: {
    c() {
      return this.$store.state.modals.data;
    },
  },
};
</script>

<style></style>
