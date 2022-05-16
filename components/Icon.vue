<template>
  <div class="icon" :class="size ? `icon--${size}` : ''">
    <i :class="`icon-${icon.toLowerCase()}`" />
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

  &--lg {
    font-size: 2rem;
  }
}
</style>
