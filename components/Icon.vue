<template>
  <div class="icon" :class="size ? `icon--${size}` : ''">
    <i :class="`icon-${icon.toLowerCase()}`">
      <span class="path1"></span>
      <span class="path2"></span>
      <span class="path3"></span>
    </i>
  </div>
</template>

<script>
export default {
  name: "Icon",

  props: {
    icon: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #000; //get-color(base-text);
  line-height: 1;
  flex-shrink: 0;
  max-width: initial;

  // span {
  //   position: absolute;
  // }

  &--lg {
    font-size: 2rem;
  }
}
</style>
