<template>
  <div class="notification" @click="hide" ref="notification">
    <div class="grid align-xs-middle">
      <div class="col-xs-11">
        <slot />
      </div>
      <div class="col-xs-1">
        <icon icon="chevron-down" size="lg" />
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
      note.style.transform = "translateY(400px)";
    },
  },
};
</script>


<style lang="scss" scoped>
.notification {
  background-color: #fff; // get-color(dark);
  width: min(calc(100% - 2 * 4px), 414px);
  left: calc((100% - 414px) / 2);
  margin: 0 auto;
  border-radius: 7px;
  position: fixed;

  bottom: 0;
  padding: 12px;
  z-index: 3;

  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.09);
  // text-align: center;
  transform: translateY(-66px);
  transition: transform 2s ease-out;
  // display: flex;
  // align-items: center;

  &--warning {
    border: 1px solid orange;
  }
}
</style>