<template>
  <div class="account-card">
    <div class="account-card__inner" @click="login ? signIn(data.ID) : false">
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
  },

  created() {
    //todo
    this.name = this.data.name;
    this.accountId = this.data.accountId;
    this.avatar = this.data.avatar;
  },

  methods: {
    signIn(id) {
      // console.log("todo update store");

      this.$store.commit("setCurrentAccount", this.data);
      this.$store.commit("setCurrentCategory", -1);

      this.$router.push({
        path: "/",
      });
    },

    showDrawer(id) {
      let drawer = document.querySelector(id);
      console.log(id);
      drawer.style.display = "block";
      // drawer.classList.toggle("drawer--active");
    },

    hideDrawer(id) {
      let drawer = document.querySelector(id);
      console.log(id);
      drawer.style.display = "none";
    },

    selectAccount(item) {
      console.log(item);

      this.selected = item;

      this.name = item.name;
      this.avatar = item.avatar;
      this.hideDrawer("#accounts-drawer");
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
