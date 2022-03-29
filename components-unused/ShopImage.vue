<template>
  <div
    class="shop-image img ratio-16x9"
    xxxtarget="_blank"
    rel="noreferrer nofollow"
  >
    <div
      class="shop-image__default img ratio-16x9"
      :style="{
        backgroundImage: `url(` + item.image + `)`,
      }"
    />
    <div
      v-if="item.hoverImage"
      class="shop-image__hovered img ratio-16x9"
      :style="{
        backgroundImage: `url(` + item.hoverImage + `)`,
      }"
    />
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: [Object, Boolean],
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.shop-image {
  position: relative;
  display: block;
  cursor: pointer;

  &__default,
  &__hovered {
    transition: opacity 0.35s 0.05s linear;
  }

  &:hover {
    div:nth(1):not(:last-of-type) {
      opacity: 0;
    }
    .shop-image__hovered {
      opacity: 1;
    }
  }

  &__hovered {
    position: absolute;
    top: 0;
    opacity: 0;
    z-index: 100;
  }
}
</style>
