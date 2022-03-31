<template>
  <div class="back-button" :class="bg ? 'back-button--bg' : false">
    <div class="grid no-bottom-margin-cols align-xs-middle">
      <div class="col-xs-4">
        <nuxt-link :to="to"><icon icon="arrow-left" size="lg" /></nuxt-link>
      </div>
      <div class="col-xs-16 align-xs-center">
        <heading size="4xl" level="1" class="bottom-xs-0" color="black">
          <slot />
        </heading>
      </div>
      <div class="col-xs-4">
        <!-- empty-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Boolean],
      default: "/",
    },
    bg: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.back-button {
  position: fixed;
  top: 0;
  padding: 12px;
  z-index: 2;
  width: min(calc(100%), 414px);
  left: max(calc(((100% - 414px) / 2)), 0);

  &--bg {
    background-color: #fff;
    // height: 50px;
    // border: 3px solid red;
  }
}
</style>
