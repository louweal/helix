<template>
  <component
    :is="to ? 'nuxt-link' : 'div'"
    :to="to"
    class="button"
    :class="[
      `button--${state}`,
      size ? `button--${size}` : '',
      active ? 'button--active' : false,
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
    // hash: {
    //   type: String,
    //   default: "",
    // },
    active: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    // isNone() {
    //   return this.href === "" && this.hash === "";
    // },
    // isInternal({ $store }) {
    //   return (
    //     this.href.startsWith("/") ||
    //     this.href.startsWith($store.state.hostname) ||
    //     this.href.startsWith(process.env.SITEMAP_HOSTNAME)
    //   );
    // },
    // internalLink() {
    //   if (this.href.startsWith("/")) {
    //     return this.href;
    //   }
    //   return (
    //     "/" + this.href.replace(/^[a-zA-Z]{3,5}:\/{2}[a-zA-Z0-9_.:-]+\//, "")
    //   );
    // },
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

  &--dark {
    background: get-color(dark);
    color: #fff;
  }

  // &:hover {
  //   background-color: get-color(primary);
  //   color: #fff;

  //   i {
  //     color: #fff;
  //   }
  // }

  &--fullwidth {
    width: 100%;
  }

  // &--small {
  //   min-width: 0px;
  //   @include from(l) {
  //     padding: 0.66rem 1.4rem;
  //   }
  // }

  // &--large {
  //   border-radius: 32px;
  //   @include from(l) {
  //     padding: 1rem 2.4rem;

  //     i {
  //       font-size: 2rem;
  //     }
  //   }
  // }

  // &--white-on-hover:hover {
  //   background-color: #fff;
  //   color: get-color(primary);

  //   i {
  //     color: get-color(primary);
  //   }
  // }

  // &--secondary {
  //   background-color: transparent;
  //   box-shadow: inset 0px 0px 0px 2px get-color("primary");
  //   color: get-color(base-text);

  //   &--white {
  //     background-color: transparent;
  //     box-shadow: inset 0px 0px 0px 2px #fff;
  //     color: #fff;

  //     &:hover {
  //       background-color: #fff;
  //       color: get-color(primary);
  //     }
  //   }
  // }

  // &--white {
  //   background-color: #fff;
  //   color: get-color(base-text);

  //   i {
  //     color: get-color(base-text);
  //   }

  //   &:hover {
  //     background-color: transparent;
  //     box-shadow: inset 0px 0px 0px 2px #fff;
  //     color: #fff;
  //   }
  // }
}
</style>
