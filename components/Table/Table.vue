<template>
  <div
    class="table"
    :class="hasHeader ? 'table--with-header' : 'table--without-header'"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    hasHeader: {
      // has a header row
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.table {
  margin-bottom: 1.3rem;

  &--without-header {
    ::v-deep .tr {
      &:nth-child(even) {
        background-color: get-color(light);
      }
    }
  }
}
</style>
