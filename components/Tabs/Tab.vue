<template>
  <section v-if="isActive" class="tab-item">
    <slot />
  </section>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
  },
  computed: {
    isActive() {
      return this.$parent.activeTab === this.label;
    },
  },
};
</script>

<style lang="scss" scoped>
.tab-item {
  animation: fade-in 0.5s ease-in;
}
</style>