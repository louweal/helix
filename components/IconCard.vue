<template>
  <div class="icon-card text-center my-3" data-aos="fade-up-scale">
    <span class="rounded-circle bg-light p-2">
      <i class="bi" :class="`bi-${icon}`"></i>
    </span>

    <h3 class="fs-5 mt-3 base-font" data-aos="fade-up-scale">{{ title }}</h3>
    <div data-aos="fade-up-scale" data-aos-delay="600">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "1-circle",
    },
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-card {
}
</style>
