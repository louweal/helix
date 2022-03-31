<template>
  <div class="add-button" v-if="$store.state.currentAccount.seller">
    <div class="add-button__inner">
      <nuxt-link to="/add-contract"> + </nuxt-link>
    </div>
  </div>
</template>

<script>
// import accounts from "~/data/accounts.json";

export default {
  // accounts,

  props: {
    to: {
      type: [String, Boolean],
      default: "/",
    },
  },
};
</script>

<style lang="scss" scoped>
.add-button {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
  background-color: #fff;
  border-radius: 7px;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 6px solid #fff;

  &__inner {
    background-color: get-color(primary);
    width: 40px;
    height: 40px;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;

    ::v-deep a {
      font-size: 33px;
      color: #fff;
      font-weight: 400;
    }
  }
}
</style>
