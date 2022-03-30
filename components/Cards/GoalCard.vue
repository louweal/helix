<template>
  <div class="goal-card">
    <heading size="xl" level="1" xxxweight="400" xxxxclass="bottom-xs-0">
      During this {{ data.duration }} I'm going to {{ data.goal }}.
    </heading>
    <p>
      Startdate: {{ data.startdate }} <br />
      Enddate: todo
    </p>
  </div>
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
.goal-card {
  display: block;
  background-color: #fff;
  border-radius: 6px;
  width: 100%;
  padding: 12px 4px 12px 4px;
}
</style>
