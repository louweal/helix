<template>
  <div class="categories" :style="{ maxWidth }" v-if="myCategories.length > 0">
    <Stack>
      <Button
        :active="+$store.state.currentCategory === -1"
        @click.native="setActiveCat(-1)"
      >
        All contracts
      </Button>

      <Button
        v-for="(cat, index) in myCategories"
        :key="index"
        :active="cat.ID === $store.state.currentCategory"
        @click.native="setActiveCat(cat.ID)"
      >
        {{ cat.name }}
      </Button>
    </Stack>
    <div class="overflow-margin-right"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeCat: -1,
    };
  },

  computed: {
    contracts() {
      return this.$store.state.contracts;
    },
    categories() {
      return this.$store.state.categories;
    },

    myCategories() {
      return this.categories.filter((cat) => this.numContracts(cat.ID) > 0);
    },

    me() {
      return this.$store.state.currentAccount.accountId;
    },

    maxWidth() {
      return this.$store.state.currentAccount.seller
        ? "calc(100% - 54px)"
        : "100%";
    },
  },

  created() {
    this.activeCat == this.$store.state.currentCategory;
  },

  methods: {
    numContracts(cat) {
      let myContracts = this.contracts.filter((c) => c.owner === this.me);
      return myContracts.filter((c) => +c.category === +cat).length;
    },
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
  display: flex;

  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
    background: transparent;
  }
}

.overflow-margin-right {
  height: 100%;
  width: 4px;
}
</style>
