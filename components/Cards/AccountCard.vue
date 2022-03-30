<template>
  <div class="account-card">
    <div
      class="account-card__inner"
      @click="dropdown ? toggleList() : signIn()"
    >
      <div class="grid collapse no-bottom-margin-cols align-xs-middle">
        <div class="col-xs-3">
          <div
            class="img img--round img--light ratio-1x1"
            :style="{
              backgroundImage:
                `url(` + require(`~/assets/images/${data.avatar}`) + `)`,
            }"
          ></div>
        </div>
        <div class="col-xs-16 offset-xs-1">
          <heading size="l" level="2" class="bottom-xs-0">
            {{ data.name }}</heading
          >
          <heading size="m" level="0" weight="400">
            {{ data.accountId }}</heading
          >
        </div>
        <div class="col-xs-4">
          <div class="align-xs-end">
            <icon
              :icon="dropdown ? 'chevron-down' : 'chevron-right'"
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="dropdown" class="account-card__list">
      <account-card v-for="(item, i) in list" :key="i" :data="item" />
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountCard",

  props: {
    data: {
      type: Object,
      default: () => {},
    },
    dropdown: {
      type: Boolean,
      default: false,
    },
    list: {
      type: [Object, Array],
      default: () => {},
    },
  },

  methods: {
    toggle() {
      dropdown ? toggleList() : signIn();
    },

    signIn() {
      console.log("todo update store");

      this.$router.push({
        path: "/",
      });
    },

    toggleList() {
      console.log("togglel list");
    },
  },
};
</script>

<style lang="scss" scoped>
.account-card {
  display: block;
  width: 100%;
  &__inner {
    display: block;
    background-color: #fff;
    border-radius: 6px;
    width: 100%;
    // padding-bottom: 7px;
    padding: 9px;
    border: 1px solid get-color(line);
    // display: flex;
  }

  &__list {
    display: block;
    width: 100%;
  }
}
</style>
