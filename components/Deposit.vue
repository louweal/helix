<template>
  <div class="deposit" v-if="val">
    <span class="integral">
      <span v-if="label">
        <span v-if="unit">{{ unit }}</span>
        ℏ
      </span>
      {{ integral }}</span
    ><span v-if="fractional">.</span>
    <span class="fractional">{{ fractional }}</span>

    <heading level="0" size="m" weight="400" fstyle="italic" v-if="label">
      &nbsp;{{ label }}
    </heading>
  </div>
</template>

<script>
export default {
  props: {
    val: {
      type: [Number, Boolean],
      default: false,
    },
    label: {
      type: [String, Boolean],
      default: false,
    },
    unit: {
      type: [String, Boolean],
      default: false,
    },
  },

  computed: {
    deposit() {
      if (this.unit === "m") {
        return (parseInt(this.val) / 1e5).toString(); // convert deposit from tinybar to millibar
      } else {
        return (parseInt(this.val) / 1e8).toString(); // convert deposit from tinybar to hbar
      }
    },

    integral() {
      return this.deposit.split(".")[0];
    },

    fractional() {
      let frac = this.deposit.split(".")[1];
      if (frac == undefined) {
        return "00";
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
