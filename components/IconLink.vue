<template>
  <!-- <div> -->
  <NuxtLink
    v-if="url[0] === '#'"
    :to="url"
    class="iconlink"
    :class="modifier ? `iconlink--${modifier}` : ''"
  >
    <!-- anchor -->
    <div class="iconlink__icon">
      <i :class="`icon-${icon}`"></i>
    </div>
    <div class="iconlink__label" v-text="title" />
  </NuxtLink>
  <a
    v-else
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="iconlink"
    :class="modifier ? `iconlink--${modifier}` : ''"
  >
    <div class="iconlink__icon">
      <i :class="`icon-${icon}`"></i>
    </div>
    <div class="iconlink__label" v-text="title" />
  </a>
  <!-- </div> -->
</template>

<style lang="scss" scoped>
.iconlink {
  display: flex;
  width: 100%;
  height: 38px;
  align-items: center;
  margin: 0.7rem 0;
  column-gap: 20px;
  transition: all 0.3s ease-in;
  color: rgba(#fff, 0.75);
  // font-family: $base-font;

  &--inline {
    width: 38px;

    .iconlink__label {
      display: none;
    }
  }

  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 38px;
    height: 38px;
    border: 1px solid rgba(#fff, 0.5);
    transition: all 0.3s ease-in;

    i {
      color: rgba(#fff, 0.5);
      transition: color 0.3s ease-in;
    }
  }

  &:hover {
    color: #fff;

    .iconlink__icon {
      border-color: #fff;

      i {
        color: #fff;
      }
    }
  }
}
</style>

<script>
export default {
  name: "IconLink",

  props: {
    title: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    modifier: {
      type: String,
      default: "",
    },
  },
};
</script>
