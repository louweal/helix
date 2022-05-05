<template>
  <div class="deposit" v-if="val">
    <span class="integral"><span v-if="label">ℏ </span>{{ integral }}.</span
    ><span class="fractional">{{ fractional }}</span>

    <heading level="0" size="m" weight="400" fstyle="italic" v-if="label">
      {{ label }}
    </heading>
  </div>
</template>

<script>
export default {
  props: {
    val: {
      type: [String, Boolean],
      default: false,
    },
    label: {
      type: [String, Boolean],
      default: false,
    },
  },

  computed: {
    deposit() {
      return this.val / 100000000;
    },

    integral() {
      return this.deposit.split(".")[0];
    },

    fractional() {
      let frac = this.deposit.split(".")[1];
      if (frac == undefined) {
        return "00";
      }
      if (frac.length === 0) {
        return "00";
      }
      if (frac.length === 1) {
        return frac + "0";
      }
      return frac;
    },
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
    margin-left: -5px;
  }
}
</style>
