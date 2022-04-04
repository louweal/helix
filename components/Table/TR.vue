<template>
  <div class="tr" :class="sub ? 'tr--sub' : false">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    sub: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.tr {
  width: 100%;
  display: flex;
  padding: 12px 12px;

  &--sub {
    opacity: 0.8;
    padding: 12px 22px;
  }
}
</style>