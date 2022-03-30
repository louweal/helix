<template>
  <nuxt-link class="contract-card" :to="'/contracts/' + data.ID">
    <div class="contract-card__visual bottom-xs-1">
      <div
        class="img ratio-1x1"
        :style="{
          backgroundImage:
            `url(` + require(`~/assets/images/products/${data.visual}`) + `)`,
        }"
      ></div>
    </div>

    <heading size="l" level="2" weight="400" class="bottom-xs-0">
      {{ data.name }}
    </heading>
    <heading size="s" level="0" weight="400" fstyle="italic">
      {{ data.seller }}
    </heading>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.contract-card {
  display: block;
  background-color: #fff;
  border-radius: 6px;
  width: 100%;
  // padding-bottom: 7px;
  padding: 12px 4px 12px 4px;

  &__visual {
    // width: 100%;
    position: relative;
    margin: 0 12px;
    // border: 1px solid red;
    background-color: #fff;
  }
}
</style>
