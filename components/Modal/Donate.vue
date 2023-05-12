<template>
  <div v-if="$store.state.modals.show === 'donate'">
    <!-- <p>
      Do you wish to donate the deposit for
      <span class="text-secondary">{{ c.product.name }}</span> to an
      environmental charity? The charity will receive
      <span class="text-secondary"
        >ħ {{ parseFloat(c.contract.deposit).toFixed(2) }}</span
      >.
    </p> -->

    <div v-if="c.product.amount > 1">
      <p>
        You have multiple items. <br />
        Do you want to donate the deposit for all items?
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
      placeholder="Charity (Hedera wallet address)"
      xxxinput="(e) => (username = e.target.value)"
    />

    <div class="btn btn-secondary" xxxclick="">
      {{ $t("Donate") }} <i class="bi bi-arrow-right"></i>
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
