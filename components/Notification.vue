<template>
  <div class="notification" ref="notification">
    <div class="container">
      <div class="notification__inner">
        <div class="grid align-xs-middle">
          <div class="col-xs-22">
            <slot />
          </div>
          <div class="col-xs-2" @click="hide">
            <icon icon="chevron-down" size="lg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: [String, Boolean],
      default: false,
    },
  },

  methods: {
    hide() {
      let note = this.$refs["notification"];
      note.style.transform = "translateY(100px)";
    },
  },
};
</script>

<style lang="scss" scoped>
.notification {
  width: 100%;
  left: 0;
  margin: 0 auto;
  position: fixed;
  bottom: 0;
  z-index: 3;
  transform: translateY(-66px);
  transition: transform 0.9s 0.1s ease-out;

  &__inner {
    background-color: #fff;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.09);
    border-radius: 7px;
    padding: 12px;
    border: 1px solid rgba(get-color(primary), 0.75);
  }
}
</style>
