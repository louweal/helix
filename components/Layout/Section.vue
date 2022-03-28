<template>
  <section>
    <slot />
  </section>
</template>

<style lang="scss" scoped>
section {
  position: relative;
  padding: 4px 0; //1.2

  &.section {
    &--light {
      background-color: get-color(light);
    }
  }
}
</style>
