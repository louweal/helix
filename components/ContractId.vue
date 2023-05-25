<template>
  <a :href="`https://${dgSubdomain}.dragonglass.me/hedera/contracts/${id}`" target="_blank">
    {{ id }}
    <i class="bi bi-box-arrow-up-right"></i>
  </a>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: "0.0.000000",
    },
  },
  computed: {
    dgSubdomain() {
      return this.$network === "testnet" ? "testnet" : "app";
    },
  },
};
</script>

<style></style>
