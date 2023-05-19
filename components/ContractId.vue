<template>
  <a
    :href="`https://${dgSubdomain}.dragonglass.me/hedera/contracts/${contractId(
      id
    )}`"
    target="_blank"
  >
    {{ contractId(id) }}
    <i class="bi bi-box-arrow-up-right"></i>
  </a>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: -1,
    },
  },
  computed: {
    dgSubdomain() {
      return process.env.HEDERA_NETWORK || "testnet";
    },
  },

  methods: {
    contractId(id) {
      return "0.0." + id;
    },
  },
};
</script>

<style></style>
