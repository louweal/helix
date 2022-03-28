<template>
  <component
    :is="level === '0' ? 'span' : `h${level}`"
    class="heading"
    :class="[fontWeight, fontSize]"
  >
    <slot> ({{ size }}) I'm a H{{ level }} </slot>
  </component>
</template>

<script>
export default {
  // name: "Heading",

  props: {
    level: {
      type: String,
      default: "2",
      validator: (value) => {
        return ["0", "1", "2", "3", "4", "5", "6"].indexOf(value) !== -1;
      },
    },
    size: {
      // as defined in vars.scss: 6xl, 5xl, ...
      type: String,
      default: "xl",
    },
    color: {
      // white
      type: String,
      default: "",
    },
    weight: {
      // bold
      type: [String, Boolean],
      default: false,
    },
  },

  computed: {
    fontSize() {
      return `fs-${this.size}`;
    },
    fontWeight() {
      return this.weight ? `heading--${this.weight}` : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.heading {
  font-weight: 700;

  span {
    font-weight: 700 !important;
  }

  &--400 {
    font-weight: 400;
  }

  &--500 {
    font-weight: 500;
  }

  &--white {
    color: #fff;
    font-weight: normal;
  }
}
</style>
