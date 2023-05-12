<template>
  <div v-if="$store.state.modals.show === 'transfer'">
    <!-- <p>
      Did you sell your
      <span class="text-secondary">{{ c.product.name }}</span> to someone else?
      Transfer the ownership of contract
      <span class="text-secondary">0.0.{{ c.contract.id }}</span
      >. The new owner will receive up to
      <span class="text-secondary"
        >ħ {{ parseFloat(0.6 * c.contract.deposit).toFixed(2) }}</span
      >.
    </p> -->

    <div v-if="c.product.amount > 1">
      <p>
        You have multiple items. <br />
        Transfer deposit for all items?
      </p>

      <select class="form-select mb-2">
        <option
          :value="a"
          v-for="a in c.product.amount"
          :key="a"
          :selected="a === 1"
        >
          {{
            a === c.product.amount ? "Yes" : "No, only for " + a + " item(s)"
          }}
        </option>
      </select>
    </div>

    <input
      event=""
      class="form-control mb-2"
      type="text"
      placeholder="New owner (Hedera wallet address)"
      xxxinput="(e) => (username = e.target.value)"
    />

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
