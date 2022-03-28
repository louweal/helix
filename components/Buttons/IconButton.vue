<template>
  <div v-if="isNone" class="icon-button" :class="[buttonSize, buttonState]">
    <div class="icon-button__label">
      <slot><i :class="`icon-${icon.toLowerCase()}`" /></slot>
    </div>
  </div>
  <nuxt-link
    v-else-if="isInternal"
    :to="makeRouteObject"
    class="icon-button"
    :class="[buttonSize, buttonState]"
  >
    <div class="icon-button__label">
      <slot><i :class="`icon-${icon.toLowerCase()}`" /></slot>
    </div>
  </nuxt-link>
  <a
    v-else
    :href="href"
    target="_blank"
    rel="noreferrer noopener"
    class="icon-button"
    :class="[buttonSize, buttonState]"
  >
    <div class="icon-button__label">
      <slot><i :class="`icon-${icon.toLowerCase()}`" /></slot>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    type: {},
    hash: {
      type: String,
      default: "",
    },
  },

  computed: {
    buttonSize() {
      return this.size ? `icon-button--${this.size}` : false;
    },
    buttonState() {
      return this.state ? `icon-button--${this.state}` : false;
    },
    makeRouteObject() {
      if (this.hash !== "") {
        return { path: this.localePath(this.href), hash: this.hash };
      }
      return { path: this.localePath(this.internalUrl) };
    },
    internalUrl() {
      return this.href.replace(/^[a-zA-Z]{3,5}:\/{2}[a-zA-Z0-9_.:-]+\//, "");
    },

    isNone() {
      // item has no link
      return this.href === "" && this.hash === "";
    },

    isInternal({ $store }) {
      return (
        this.href.startsWith("/") ||
        this.href.startsWith($store.state.hostname) ||
        this.href.startsWith(process.env.SITEMAP_HOSTNAME)
      );
    },
  },
};
</script>

<style lang="scss">
.icon-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  width: 64px;
  border-radius: 50%;
  box-shadow: inset 0px 0px 0px 2px get-color(light);
  transition: all 0.25s ease-in;

  &__label {
    font-family: $heading-font !important;
    // line-height: 1;

    font-size: 0.8rem;
    @include from(l) {
      font-size: 0.9rem;
    }
  }

  &--small {
    height: 44px;
    width: 44px;
  }

  &--primary,
  &--active {
    background-color: get-color(primary);
    color: #fff;
    box-shadow: none;

    &:hover {
      box-shadow: none !important;
    }
  }

  &--disabled {
    opacity: 0.6;
  }

  &--white {
    box-shadow: inset 0px 0px 0px 2px #fff;

    i {
      color: #fff;
    }
    &:hover {
      box-shadow: inset 0px 0px 0px 2px get-color(meta) !important;
    }
  }

  &:hover {
    box-shadow: inset 0px 0px 0px 2px get-color(primary);
    // cursor: pointer;
  }
}
</style>
