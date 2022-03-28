<template>
  <div
    class="color-button"
    :class="[
      size ? `color-button--${size}` : false,
      state ? `color-button--${state}` : false,
    ]"
    :style="`--fill-color: ${color}`"
  >
    <span class="fill"></span>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "#191919",
    },
    size: {
      type: [String, Boolean],
      default: false,
    },
    state: {
      type: [String, Boolean],
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.color-button {
  position: relative;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  border: 1px solid transparent;
  transition: border-color 0.2s linear;

  .fill {
    display: block;
    width: 32px;
    height: 32px;
    margin: 5px;
    border-radius: 50%;
    background-color: var(--fill-color);
  }

  &--active,
  &:hover {
    border-color: #000;
    cursor: pointer;
  }

  &--small {
    width: 22px;
    height: 22px;

    .fill {
      margin: 3px;
      width: 14px;
      height: 14px;
    }
  }
}
</style>