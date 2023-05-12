<template>
  <div class="position-relative overflow-hidden rounded">
    <div
      class="ratio-background-image ratio"
      :class="[ratio, scale ? 'scale' : false]"
      :style="{
        backgroundImage: url ? `url(${require('@/images/' + url)}` : 'none',
        backgroundSize: `${size}`,
        backgroundPositionX: `${x}`,
        backgroundPositionY: `${y}`,
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    ratio: {
      type: String,
      default: "1x1",
    },
    size: {
      type: String,
      default: "100%",
    },
    x: {
      type: String,
      default: "center",
    },
    y: {
      type: String,
      default: "center",
    },
    url: {
      type: String,
      default: "logo.svg",
    },
    scale: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    bg() {
      return `url(${require("@/images/" + this.url)} !important`;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
}
.ratio-background-image {
  height: 100%;
  overflow: hidden;
  background-repeat: no-repeat;
  transition: background-size 0.6s cubic-bezier(0.2, 0, 0.1, 1);
  background-size: 125%;
  background-color: $light;
  transition: transform 0.3s cubic-bezier(0.2, 0, 0.1, 1);

  &.scale {
    &:hover {
      transform: scale(110%);
    }
  }
}
</style>
