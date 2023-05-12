<template>
  <div class="roadmap">
    <nuxt-link
      :to="{ hash: `#v${item.id}` }"
      class="roadmap--item cp"
      :class="item.current ? 'roadmap--item--active' : false"
      v-for="(item, i) in $options.items"
      :key="i"
    >
      {{ item.version }}

      {{ item.current ? "(current)" : "" }}

      <!-- <span xxxv-if="isActive(item.id)">{{ item.year }}</span> -->
    </nuxt-link>
  </div>
</template>

<script>
export default {
  items: [
    {
      id: "01",
      version: "v0.1",
    },
    {
      id: "02",
      version: "v0.2",
    },
    {
      id: "03",
      version: "v0.3",
      current: true,
    },
    {
      id: "04",
      version: "v0.4",
    },
  ],

  methods: {
    // isActive(id) {
    //   return this.$store.state.roadmap.active === id;
    // },
  },
};
</script>

<style lang="scss" scoped>
.roadmap {
  &--item {
    display: block;
    position: relative;
    padding-left: 30px;
    padding-top: 5px;
    padding-bottom: 5px;
    transition: all 0.3s 0.1s ease-in;

    &:hover:not(&--active)::after {
      background-color: $secondary;
    }

    &:after {
      content: "";
      position: absolute;
      left: 0;
      top: 13px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: $light;
      transition: background-color 0.3s 0.1s ease-in;
    }

    &:first-child::before {
      @extend .line;
      top: 40%;
      bottom: 0;
    }

    &:not(:last-child):not(:first-child)::before {
      @extend .line;
      top: 0;
      bottom: 0;
    }

    &:last-child::before {
      @extend .line;
      top: 0;
      bottom: 40%;
    }

    &--active {
      font-weight: bold;
      //   background-color: yellow;

      &::after {
        background-color: #000;
      }
    }
  }
}

.line {
  content: "";

  position: absolute;
  left: 6px;
  width: 2px;
  background-color: $light;
}
</style>
