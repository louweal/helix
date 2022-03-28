<template>
  <div
    class="stack"
    :style="`--gap: ${gap}rem`"
    :class="[dir ? `stack--${dir}` : false, forceDir ? `stack--forced` : false]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    dir: {
      type: String,
      default: "", // vertical ||
    },
    gap: {
      type: Number,
      default: 0.25,
    },
    forceDir: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.stack {
  display: flex;
  flex-wrap: nowrap;
  margin-left: calc(-1 * var(--gap));

  &:not(.stack--forced) {
    @include until(s) {
      // makes horizontal stacks always vertical on mobile!
      flex-direction: column;
      margin-left: 0;
      margin-top: calc(-0.5 * var(--gap));

      > *,
      > ::v-deep * {
        margin-top: calc(0.5 * var(--gap)) !important;
        margin-left: 0;
      }
      // end copy of stack--vertical
    }
  }

  > *,
  > ::v-deep * {
    // margin-bottom: 0.5rem;
    margin-left: var(--gap);
  }
}

.stack--vertical {
  flex-direction: column;
  margin-left: 0;
  margin-top: calc(-1 * var(--gap));

  > *,
  > ::v-deep * {
    margin-top: calc(1 * var(--gap)) !important;
    margin-left: 0;
  }
}
</style>
