<template>
  <div class="deposit">
    <span class="integral">ℏ {{ integral }}.</span
    ><span class="fractional">{{ fractional }}</span>

    <heading level="0" size="m" weight="400" fstyle="italic">deposit</heading>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Boolean],
      default: false,
    },
  },

  data() {
    return {
      integral: 9,
      fractional: 99,
    };
  },

  created() {
    let parts = this.value.split(".");
    this.integral = parts[0];
    this.fractional = parts[1];
  },
};
</script>


<style lang="scss" scoped>
.deposit {
  color: #000;
  font-weight: 700;

  .integral {
    font-size: 24px;
    line-height: 24px;
  }

  .fractional {
    display: inline-block;
    font-size: 13.5px;
    vertical-align: top;
  }
}
</style>