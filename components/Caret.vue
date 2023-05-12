<template>
  <i class="bi" :class="[`bi-caret-${caretDirection}-fill`, showCaret(group, field) ? `opacity-100` : `opacity-0`]"></i>
</template>

<script>
export default {
  props: {
    group: {
      type: String,
      default: "contract",
    },
    field: {
      type: String,
      default: "startdate",
    },
    direction: {
      type: String,
      default: "down",
    },
  },

  computed: {
    sortGroup() {
      return this.$store.state.data.sortBy.group;
    },
    sortField() {
      return this.$store.state.data.sortBy.field;
    },
    caretDirection() {
      return this.$store.state.data.sortBy.direction === 1 ? "down" : "up";
    },
  },

  methods: {
    showCaret(group, field) {
      return this.sortGroup === group && this.sortField === field;
    },
  },
};
</script>

<style lang="scss" scoped>
.bi {
  transition: opacity 0.3s 0.1s cubic-bezier(0.2, 0, 0.1, 1);
}
</style>
