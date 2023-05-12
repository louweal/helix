<template>
  <div class="item position-relative">
    <div class="row g-2">
      <div class="col-3">
        <!-- {{ p }} -->
        <visual :product="p" />
      </div>
      <div class="col-9 align-self-center">
        <div class="fw-bold text-primary">{{ p.name }}</div>
        <div class="font-xxs fw-light">Duration: {{ duration }}</div>
        <div class="font-xxs fw-light">Deposit: {{ p.deposit }}</div>
      </div>
    </div>

    <div
      v-if="p.amount > 1"
      class="position-absolute bg-primary rounded-circle start-0 top-0 text-white py-1 px-2 ms-2 mt-2 translate-middle"
    >
      {{ p.amount }}X
    </div>
  </div>
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

      var yearsDisplay =
        years > 0 ? years + (years == 1 ? " year, " : " years, ") : "";
      var monthsDisplay =
        months > 0 ? months + (months == 1 ? " month, " : " months, ") : "";
      var daysDisplay = days > 0 ? days + (days == 1 ? " day" : " days") : "";
      return yearsDisplay + monthsDisplay + daysDisplay;
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  background-color: #fff;
  border-radius: 20px !important;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
}
</style>
