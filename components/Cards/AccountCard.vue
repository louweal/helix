<template>
  <div class="account-card">
    <div
      class="account-card__inner"
      @click="dropdown ? toggleList() : login ? signIn() : selectAccount()"
    >
      <div class="grid collapse no-bottom-margin-cols align-xs-middle">
        <div class="col-xs-3">
          <div
            class="img img--round img--light ratio-1x1"
            :style="{
              backgroundImage:
                `url(` + require(`~/assets/images/${avatar}`) + `)`,
            }"
          ></div>
        </div>
        <div class="col-xs-16 offset-xs-1">
          <heading size="l" level="2" class="bottom-xs-0"> {{ name }}</heading>
          <heading size="m" level="0" weight="400"> {{ accountId }}</heading>
        </div>
        <div class="col-xs-4">
          <div class="align-xs-end">
            <icon
              v-if="dropdown || login"
              :icon="dropdown ? 'chevron-down' : 'chevron-right'"
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="dropdown && listActive" class="account-card__list">
      <account-card
        v-for="(item, i) in list"
        :key="i"
        :data="item"
        @click="selectAccount"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountCard",

  data() {
    return {
      listActive: false,
      avatar: "",
      name: "",
      accountId: "",
    };
  },

  props: {
    data: {
      type: Object,
      default: () => {},
    },
    dropdown: {
      type: Boolean,
      default: false,
    },
    login: {
      type: Boolean,
      default: false,
    },
    list: {
      type: [Object, Array],
      default: () => {},
    },
  },

  created() {
    this.name = this.data.name;
    this.accountId = this.data.accountId;
    this.avatar = this.data.avatar;
  },

  methods: {
    toggle() {
      dropdown ? toggleList() : signIn();
    },

    signIn() {
      // console.log("todo update store");

      this.$router.push({
        path: "/",
      });
    },

    toggleList() {
      // console.log("togglel list");
      this.listActive = !this.listActive;
    },

    selectAccount() {
      // console.log("selected!");
      this.name = "hello";
      // this.listActive = !this.listActive;
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
