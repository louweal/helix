<template>
  <Table>
    <TR>
      <TD> Materials </TD>
      <TD> <badge :level="materialsAverageLabel" /> </TD>
      <TD align="right"> ℏ {{ materialsFeeSum }} </TD>
    </TR>
    <TR v-for="(row, index) in materialData" :key="'j' + index" :sub="true">
      <TD> {{ row.name }} </TD>
      <TD>
        <badge :level="labels.find((l) => l.ID === row.label).name" />
      </TD>
      <TD align="right">
        ℏ {{ labels.find((l) => l.ID === row.label).fee }}
      </TD>
    </TR>
    <TR>
      <TD> Product shipment </TD>
      <TD> <badge :level="distanceLabel" /> </TD>
      <TD align="right">
        ℏ
        {{ shipmentFee }}
      </TD>
    </TR>
  </Table>
</template>

<script>
export default {
  props: {
    materials: {
      type: Array,
      default: () => [],
    },
    country: {
      type: Number,
      default: -1,
    },
  },

  data() {
    return {
      materialData: false,
      countryData: false,
    };
  },

  created() {
    // map ids to their data objects
    this.materialData = this.materials.map((m) =>
      this.allMaterials.find((n) => n.ID === m)
    );

    this.countryData = this.countries.find((c) => c.ID === this.country);
  },

  computed: {
    countries() {
      return this.$store.state.countries;
    },

    allMaterials() {
      return this.$store.state.materials;
    },

    labels() {
      return this.$store.state.labels;
    },

    shipmentFee() {
      return this.labels.find((l) => l.name == this.distanceLabel).fee;
    },

    materialsAverageLabel() {
      let sum = this.materialData
        .map((m) => m.label)
        .reduce((a, b) => a + b, 0);
      // console.log(this.materials.length);
      let avg = parseInt(sum / this.materials.length);
      return this.labels.find((l) => l.ID === avg).name;
      // return "A";
    },

    materialsFeeSum() {
      return +this.materialData
        .map((m) => +this.labels.find((l) => l.ID === m.label).fee)
        .reduce((a, b) => a + b, 0);
    },

    totalFee() {
      let sum = this.shipmentFee + this.materialsFeeSum;
      return parseFloat(sum).toFixed(2).toString();
    },

    distanceLabel() {
      let pid = this.country;
      return pid ? this.currentCountry.distances[pid] : "?";
    },

    currentCountry() {
      return this.countries.find(
        (c) => c.name == this.$store.state.currentAccount.country
      );
    },
  },
};
</script>

<style lang="scss" scoped>
</style>