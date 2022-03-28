<template>
  <div class="stock-indicator">
    <div
      class="stock-indicator__bar"
      :class="{ 'stock-indicator__bar--active': bars >= 1 }"
    />
    <div
      class="stock-indicator__bar"
      :class="{ 'stock-indicator__bar--active': bars >= 2 }"
    />
    <div
      class="stock-indicator__bar"
      :class="{ 'stock-indicator__bar--active': bars >= 3 }"
    />
    <div
      class="stock-indicator__bar"
      :class="{ 'stock-indicator__bar--active': bars >= 4 }"
    />
    {{ current }}<span style="opacity: 0.5">/{{ max }}</span>
  </div>
</template>

<script>
export default {
  name: "StockIndicator",

  props: {
    current: {
      type: Number,
      default: 0,
      required: true,
    },
    max: {
      type: Number,
      default: 0,
      required: true,
    },
  },

  computed: {
    bars() {
      let percentage = (100 * this.current) / this.max;

      switch (true) {
        case percentage == 0:
          return 0;
        case percentage <= 25:
          return 1;
        case percentage <= 50:
          return 2;
        case percentage <= 75:
          return 3;
        case percentage <= 100:
          return 4;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.stock-indicator {
  display: flex;
  height: 100%;
  align-items: center;
  line-height: 16px;

  &__bar {
    width: 3px;
    height: 16px;
    opacity: 0.2;
    background-color: get-color(primary);

    &--active {
      opacity: 1;
    }

    &:not(:last-of-type) {
      margin-right: 3px;
    }

    &:last-of-type {
      margin-right: 15px;
    }
  }
}
</style>
