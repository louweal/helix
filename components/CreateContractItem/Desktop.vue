<template>
  <tr class="item">
    <td scope="row">
      <div class="ratio ratio-1x1">
        <visual :product="p" />
      </div>
    </td>

    <td>
      <div class="fw-bold">{{ p.name }}</div>
    </td>
    <td>{{ duration }}</td>
    <td>
      {{ p.deposit }}
    </td>

    <!-- <div
      v-if="p.amount > 1"
      class="position-absolute bg-primary rounded-circle start-0 top-0 text-white px-2 ms-2 mt-2"
    >
      {{ p.amount }}X
    </div> -->
  </tr>
</template>

<script>
export default {
  props: {
    p: {
      type: [Object, Array],
      default: () => {},
    },
    meta: {
      type: [Object, Array],
      default: () => {},
    },
  },

  computed: {
    duration() {
      let numberOfDays = this.p.lifespan;
      var years = Math.floor(numberOfDays / 365);
      var months = Math.floor((numberOfDays % 365) / 30);
      var days = Math.floor((numberOfDays % 365) % 30);

      var yearsDisplay = years > 0 ? years + (years == 1 ? " year, " : " years, ") : "";
      var monthsDisplay = months > 0 ? months + (months == 1 ? " month, " : " months, ") : "";
      var daysDisplay = days > 0 ? days + (days == 1 ? " day" : " days") : "";
      return yearsDisplay + monthsDisplay + daysDisplay;
    },
  },
};
</script>

<style lang="scss" scoped>
tr {
  padding-bottom: 1rem;
}

.item {
  position: relative;
  &:hover {
    .visual {
      padding: 0;
    }
  }
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    content: "";
    background-color: #fff;
    border-radius: 20px !important;
    z-index: -1;
  }
}
</style>
