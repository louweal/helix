<template>
  <nuxt-link class="nav-item" :to="to">
    <heading level="0" size="l" weight="400" class="bottom-xs-0">
      <slot />
    </heading>
    <icon icon="chevron-right" xxxsize="lg" />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Boolean],
      default: false,
    },
  },
};
</script>


<style lang="scss" scoped>
.nav-item {
  width: 100%;
  border-bottom: 1px solid get-color(line);
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: get-color(base-text);

  .icon {
    min-width: 37px;
  }
}
</style>