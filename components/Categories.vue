<template>
  <div class="categories">
    <Stack force-dir>
      <Button :active="activeCat === 'all'" @click.native="setActiveCat('all')">
        All contracts
      </Button>
      <Button
        v-for="(cat, index) in categories"
        :key="index"
        :active="cat === activeCat"
        @click.native="setActiveCat(cat)"
      >
        {{ cat }}
      </Button>
    </Stack>
  </div>
</template>

<script>
// todo in store store: selectedCategory

export default {
  data() {
    return {
      activeCat: "all",
      categories: [
        "Furniture",
        "Books",
        "Electronic devices",
        "Utensils",
        "Clothing",
      ],
    };
  },

  mounted() {},

  methods: {
    setActiveCat(clickedCat) {
      this.activeCat = clickedCat;
    },
  },
};
</script>

<style lang="scss" scoped>
.categories {
  width: 100%;
  padding: 4px;
  overflow-x: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  background-color: #fff;
  border-radius: 6px;

  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
    background: transparent;
  }
}
</style>