<template>
  <div class="ratio ratio-1x1" data-aos="fade">
    <component
      :is="product.visual ? 'img' : 'div'"
      :src="product.visual || false"
      :alt="product.visual ? product.name : false"
      class="visual rounded"
    />
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style lang="scss" scoped>
div.visual {
  background-color: $light;
}
</style>
