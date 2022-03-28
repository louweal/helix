<template>
  <main class="main">
    <Section>
      <div class="container">
        <div class="grid collapse">
          <div class="col-xs-11 col-l-5">
            <h1 class="fs-5xl" data-sos="85">
              Find the perfect silver coin for your inner hbarbarian
            </h1>
          </div>
        </div>

        <hr class="fade-in-up delay-500 start-animation" />
      </div>
    </Section>

    <Section>
      <div class="container">
        <div class="grid">
          <div
            v-for="(item, index) in silverSet"
            :key="item.ID"
            :class="`delay-l-${(index % 3) * 200}`"
            class="col-xs-12 col-l-4 fade-in-up"
            data-aos="90"
          >
            <Card :data="item" />
          </div>
          <div class="col-xs-12 col-l-4 delay-l-400 fade-in-up" data-aos="90">
            <ActionCard />
          </div>
        </div>
      </div>
      <div id="contact"></div>
    </Section>
  </main>
</template>

<script>
import tokens from "./../data/tokens.json";

export default {
  name: "Coins",

  transition: "home",

  tokens: tokens.sort((a, b) => (a.ID > b.ID ? 1 : -1)),

  computed: {
    silverSet() {
      return this.$options.tokens.filter((t) => t.color === "silver");
    },
  },
};
</script>

<style lang="scss" scoped></style>
