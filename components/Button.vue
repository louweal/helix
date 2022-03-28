<template>
  <div class="button-container">
    <NuxtLink
      v-if="url[0] === '/'"
      :to="url"
      class="button"
      :class="`button--${modifier}`"
    >
      {{ title }}
    </NuxtLink>
    <a
      v-else
      class="button"
      :href="url"
      :class="{ 'button--secondary': modifier === 'secondary' }"
    >
      {{ title }}
    </a>
  </div>
</template>

<style lang="scss" xxxscoped>
.button-container {
  display: inline-block;
}

.button {
  background-color: get-color("primary");
  color: #fff;
  display: inline-block;
  transition: all 0.3s ease-in;
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: 500;
  border-style: solid;
  outline: none;
  border-width: 0px;
  padding: 9px 22px 6px 22px;

  @include from(l) {
    padding: 9px 25px 7px 25px;
  }

  &:hover {
    filter: brightness(1.2);
    background: get-color(accent);
    color: #fff;
    cursor: pointer;
  }

  &--secondary {
    background-color: transparent;
    box-shadow: inset 0 0 0 1px #fff;
    color: #fff;

    &:hover {
      background-color: #fff;
      color: get-color(accent);
    }
  }
}
</style>

<script>
export default {
  name: "Button",

  props: {
    title: {
      type: String,
      default: "",
      required: true,
    },
    url: {
      type: String,
      default: "#",
      required: true,
    },
    modifier: {
      type: String,
      default: "",
    },
  },
};
</script>
