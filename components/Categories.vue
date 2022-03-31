<template>
  <div class="categories">
    <Stack>
      <Button
        :active="$store.state.currentCategory === 'all'"
        @click.native="setActiveCat('all')"
      >
        All contracts
      </Button>
      <Button
        v-for="(cat, index) in categories"
        :key="index"
        :active="cat === $store.state.currentCategory"
        @click.native="setActiveCat(cat)"
      >
        {{ cat.charAt(0).toUpperCase() + cat.slice(1) }}
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
        "furniture",
        "books",
        "electronic devices",
        "utensils",
        "clothing",
        "vehicles",
      ],
    };
  },

  created() {
    this.activeCat = this.$store.state.currentCategory;
  },

  mounted() {},

  methods: {
    setActiveCat(clickedCat) {
      this.activeCat = clickedCat;

      // commit to store
      this.$store.commit("setCurrentCategory", clickedCat);
    },
  },
};
</script>

<style lang="scss" scoped>
.categories {
  // width: 80%;
  padding: 4px;
  overflow-x: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.09);

  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
    background: transparent;
  }
}
</style>
