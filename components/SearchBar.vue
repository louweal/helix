<template>
  <div class="search-bar">
    <input
      class="field field--search"
      id="searchbar"
      autocomplete="off"
      required
      type="text"
      placeholder="find your items"
      @input="(e) => (q = e.target.value)"
      v-on:keyup="onSubmit"
    />
    <icon icon="search" size="lg" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      q: "",
    };
  },

  methods: {
    onSubmit(e) {
      this.$emit("q", this.q.toLowerCase());
    },
  },
};
</script>

<style lang="scss" scoped>
.search-bar {
  width: 100%;
  padding: 4px;
  background-color: #fff;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.09);
  border-radius: 6px;
  position: relative;

  ::v-deep .icon {
    z-index: 30;
    position: absolute;
    left: 8px;
    top: 12px;
  }
}
</style>
