<template>
  <visual :product="product" />
</template>

<script>
export default {
  computed: {
    product() {
      return this.$store.state.modals.data
        ? this.$store.state.modals.data.product
        : { visual: false, name: "" };
    },
  },
};
</script>

<style></style>
