<template>
  <div class="drawer" ref="drawer">
    <div class="drawer__bg" @click="toggleDrawer"></div>
    <div class="drawer__inner">
      <div class="container">
        <div class="drawer__header">
          <heading size="m" level="2" class="bottom-xs-0" color="black">
            <slot name="header" />
          </heading>
        </div>

        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // props: {
  //   heading: {
  //     type: String,
  //     default: "",
  //     required: true,
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.drawer {
  width: 100%;
  height: 100vh;
  z-index: 7;
  position: relative;
  @include fix;
  display: flex;
  visibility: hidden;

  &__bg {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 4, 0, 0.65);
    opacity: 0;
    visibility: hidden;
    transition: all 0.25s ease-in-out;
  }

  &__inner {
    position: absolute;
    z-index: 50;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    max-height: calc(100vh - 70px);
    padding: 6px 0;
    background-color: #fff;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.09);
    overflow: hidden;
    transform: translateY(-100%);
    transition: all 0.4s 0.15s ease-in-out;

    > * {
      // margin-bottom: 6px;
    }
  }

  &__header {
    width: 100%;
    background-color: get-color(light);
    text-align: center;
    border-radius: 6px;
    padding: 7px 0;
    margin-bottom: 5px;
  }

  &--active {
    visibility: visible;

    .drawer__bg {
      opacity: 1;
      visibility: visible;
    }

    .drawer__inner {
      visibility: visible;
      transform: translateY(0);
    }
  }
}
</style>

<script>
export default {
  methods: {
    toggleDrawer() {
      // console.log("toggel");
      let drawer = this.$refs["drawer"];
      drawer.classList.toggle("drawer--active");
    },
  },
};
</script>
