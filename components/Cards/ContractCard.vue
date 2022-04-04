<template>
  <nuxt-link class="contract-card" :to="'/contracts/' + data.ID">
    <div class="contract-card__body">
      <div class="contract-card__visual bottom-xs-1">
        <div
          class="img ratio-1x1"
          :style="{
            backgroundImage:
              `url(` + require(`~/assets/images/products/${data.visual}`) + `)`,
          }"
        ></div>

        <div class="contract-card__state" v-if="data.state !== 0">
          <badge :color="data.state === 1 ? 'primary' : false">
            {{ data.state === 1 ? "transferred" : "deleted" }}
          </badge>
        </div>
      </div>

      <heading size="l" level="2" weight="400" class="bottom-xs-0">
        {{ data.name }}
      </heading>
      <heading size="s" level="0" weight="400" fstyle="italic">
        {{ data.seller }}
      </heading>
    </div>
    <div class="contract-card__footer align-xs-end">
      <deposit :val="data.deposit" />
    </div>
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 6px;
  width: 100%;
  // padding-bottom: 7px;
  padding: 4px;
  height: 100%;

  &__visual {
    position: relative;
    background-color: #fff;
    padding: 24px;
  }

  &__state {
    position: absolute;
    left: 0px;
    bottom: 0px;
  }
}
</style>
