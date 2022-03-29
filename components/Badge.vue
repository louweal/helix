<template>
  <div
    class="badge"
    :class="[
      color ? `badge--${color}` : false,
      level ? `badge--label-${level.toLowerCase()}` : false,
    ]"
  >
    <slot>{{ level }}</slot>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: [String, Boolean],
      default: false,
    },
    level: {
      type: [String, Boolean],
      default: false,
    },
    // variant: {
    //   type: [String, Boolean],
    //   default: false,
    // },
  },
};
</script>


<style lang="scss" scoped>
.badge {
  border-radius: 4px;
  padding: 1px;
  height: 15px;
  display: inline-block;
  text-align: center;
  padding: 1px 9px;
  color: #fff;
  font-size: 11px;
  font-weight: 500;
  min-width: 50px;
  background-color: get-color(dark);

  //   &--wide {
  //     padding: 1px 20px;
  //   }

  &--primary {
    background-color: get-color(primary);
  }

  &--label-b {
    background-color: get-color(label-b);
  }
}
</style>