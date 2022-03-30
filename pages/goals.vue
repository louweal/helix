<template>
  <div class="page">
    <div class="container container--wide">
      sticky header

      <div class="grid">
        <div
          class="col-xs-12"
          v-for="(goal, index) in $options.goals"
          :key="index"
        >
          <goal-card :data="goal" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import goals from "./../data/goals.json";

export default {
  // transition: "rtl",
  goals,
};
</script>

<style lang="scss" scoped>
// silence
</style>
