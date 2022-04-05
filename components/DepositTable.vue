<template>
  <Table>
    <TR>
      <TD> Materials </TD>
      <TD> <badge :level="materialsAverageLabel" /> </TD>
      <TD align="right"> ℏ {{ materialsFeeSum }} </TD>
    </TR>
    <TR
      v-for="(row, index) in selectedMaterials"
      :key="'j' + index"
      :sub="true"
    >
      <TD> {{ row.name }} </TD>
      <TD>
        <badge :level="$options.labels.find((l) => l.ID === row.label).name" />
      </TD>
      <TD align="right">
        ℏ {{ $options.labels.find((l) => l.ID === row.label).fee }}
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
      default: [],
    },
    country: {
      type: [Number, Boolean],
      default: false,
    },
  },

  computed: {
    //tdo
  },
};
</script>

<style lang="scss" scoped>
</style>