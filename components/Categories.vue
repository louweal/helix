<template>
  <div class="categories" :style="{ maxWidth }">
    <Stack>
      <Button
        :active="+$store.state.currentCategory === -1"
        @click.native="setActiveCat(-1)"
      >
        All contracts
      </Button>
      <Button
        v-for="(cat, index) in $options.categories"
        :key="index"
        :active="cat.ID === $store.state.currentCategory"
        @click.native="setActiveCat(cat.ID)"
      >
        {{ cat.name }}
      </Button>
    </Stack>
  </div>
</template>

<script>
import categories from "~/data/categories.json";

export default {
  categories, //: categories.map((c) => c.name),

  data() {
    return {
      activeCat: -1,
    };
  },

  computed: {
    maxWidth() {
      return this.$store.state.currentAccount.seller
        ? "calc(100% - 54px)"
        : "100%";
    },
  },

  created() {
    this.activeCat == this.$store.state.currentCategory;
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
