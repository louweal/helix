<template>
  <div
    class="td"
    :class="[center ? 'td--center' : false, align ? `td--${align}` : false]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    center: {
      type: Boolean,
      default: false,
    },
    align: {
      type: [String, Boolean],
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.td {
  display: flex;
  flex-basis: 1;
  width: 33%;
  line-height: 1;

  &--center {
    justify-content: center;
  }

  &--right {
    text-align: right;
    justify-content: flex-end;
  }

  &:nth-child(1):not(:last-child) {
    width: 80%;
  }

  &:nth-child(1):last-child {
    width: 100%;
  }
}
</style>