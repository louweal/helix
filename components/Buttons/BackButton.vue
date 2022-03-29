<template>
  <div class="back-button">
    <nuxt-link :to="to"><icon icon="arrow-left" size="lg" /></nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Boolean],
      default: "/",
    },
  },
};
</script>

<style lang="scss" scoped>
.back-button {
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 4000;
  width: min(calc(100% - 2 * 4px), 414px);
  left: max(calc(((100% - 414px) / 2) + 12px), 12px);
}
</style>