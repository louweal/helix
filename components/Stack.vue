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
      default: 1,
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
  align-items: center;

  > *,
  > ::v-deep * {
    margin-left: var(--gap);
    flex-grow: 0;
    flex-shrink: 0;
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
