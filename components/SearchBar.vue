<template>
  <!-- <div class="container container--wide"> -->
  <div class="search-bar">
    <form>
      <input
        type="text"
        placeholder="find your items"
        v-model="q"
        v-on:keyup="onSubmit"
      />
      <!-- <input type="submit" value="search" /> -->
      <icon icon="search" size="lg" />
    </form>
  </div>
  <!-- </div> -->
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
      // console.log("submit!");
      // console.log(this.q);
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
  border-radius: 6px;
  position: relative;

  input[type="text"] {
    height: 40px;
    box-sizing: border-box;
    border: none;
    width: 100%;
    padding: 6px 4px 4px 40px !important;
    outline: none;
    font-size: 17px;

    &::placeholder {
      font-style: italic;
    }
  }

  ::v-deep .icon {
    z-index: 30;
    position: absolute;
    left: 8px;
    top: 12px;
  }
}
</style>
