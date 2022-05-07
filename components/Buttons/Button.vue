<template>
  <component
    :is="to ? 'nuxt-link' : 'div'"
    :to="disabled ? false : to"
    class="button"
    :class="[
      `button--${state}`,
      size ? `button--${size}` : '',
      active ? 'button--active' : false,
      disabled ? 'button--disabled' : false,
    ]"
  >
    <slot>i'm a button</slot>
  </component>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "submit",
    },
    state: {
      type: String,
      default: "default",
    },
    size: {
      type: String,
      default: "",
    },
    to: {
      type: [String, Boolean],
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
$btn-spacing: 0.75rem 2.3rem;
$btn-radius: 7px;

.button {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  // min-width: 170px;
  border-radius: $btn-radius;
  color: #000;
  font-size: 16px;
  font-family: $base-font;
  line-height: 1.5;
  text-decoration: none;
  white-space: nowrap;
  text-align: center !important;
  font-weight: 500;

  transition: background-color 0.25s ease-in;
  cursor: pointer;
  padding: 8px 10px;

  i {
    margin-right: 0.5rem;
    color: #fff;
  }

  &--active,
  &--primary {
    background: get-color(primary);
    color: #fff; //get-color(base-text);
  }

  &--secondary {
    background: get-color(secondary);
    color: #fff; //get-color(base-text);
  }

  &--light {
    background: get-color(light);
    color: get-color(base-text);

    i {
      color: get-color(base-text);
    }
  }

  &--dark {
    background: get-color(dark);
    color: #fff;
  }

  &--disabled {
    background-color: get-color(line);
    color: #fff; //get-color(light);
  }

  &--fullwidth {
    width: 100%;
  }
}
</style>
