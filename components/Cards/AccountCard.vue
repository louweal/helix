<template>
  <div class="account-card" @click="login ? signIn(data.ID) : false">
    <div
      class="account-card__inner"
      :class="active ? 'account-card__inner--active' : false"
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
            <icon v-if="login" icon="chevron-right" size="lg" />
          </div>
        </div>
      </div>
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
      selected: () => {},
    };
  },

  props: {
    data: {
      type: Object,
      default: () => {},
    },
    login: {
      type: Boolean,
      default: false,
    },
    list: {
      type: [Object, Array],
      default: () => {},
    },
    active: {
      type: Boolean,
      default: false,
    },
  },

  created() {
    this.name = this.data.name;
    this.accountId = this.data.accountId;
    this.avatar = this.data.avatar;
  },

  methods: {
    signIn(id) {
      this.$store.commit("setCurrentAccount", this.data);
      this.$store.commit("setCurrentCategory", -1);
      this.$store.commit("setAction", "");

      this.$router.push({
        path: "/",
      });
    },

    showDrawer(id) {
      let drawer = document.querySelector(id);
      drawer.style.display = "block";
    },

    hideDrawer(id) {
      let drawer = document.querySelector(id);
      drawer.style.display = "none";
    },

    selectAccount(item) {
      this.selected = item;

      this.name = item.name;
      this.avatar = item.avatar;
      this.hideDrawer("#accounts-drawer");
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
    padding: 9px;
    border: 1px solid get-color(line);

    &--active {
      background: rgb(255, 255, 255);
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 1) 48%,
        rgba(4, 108, 14, 1) 100%
      );
      border-width: 0;
    }
  }

  &__list {
    display: block;
    width: 100%;
  }
}
</style>
