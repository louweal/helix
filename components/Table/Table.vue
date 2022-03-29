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

  // &--with-header {
  //   ::v-deep .tr {
  //     &:first-child {
  //       font-weight: 700;
  //       font-family: $heading-font;
  //     }

  //     &:nth-child(even):not(:first-child) {
  //       background-color: get-color(light);
  //     }
  //   }
  // }

  &--without-header {
    ::v-deep .tr {
      // .td:first-child {
      //   font-weight: 700;
      // }

      &:nth-child(even) {
        background-color: get-color(light);
      }
    }
  }
}
</style>