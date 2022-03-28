<template>
  <main class="main">
    <Section>
      <div class="container">
        <div class="grid collapse">
          <div class="col-xs-11 col-l-5">
            <h1 class="fs-5xl" data-sos="85">
              Find the perfect coin for your inner hbarbarian
            </h1>
          </div>
        </div>

        <hr class="fade-in-up delay-500 start-animation" />
      </div>
      <div id="alpha"></div>
    </Section>

    <Section>
      <div class="container">
        <div class="grid collapse align-l-middle no-bottom-margin-cols">
          <div class="col-xs-12 col-l-7 align-xs-center align-l-start">
            <h2 class="fs-4xl" data-sos="85">Alpha Series</h2>
          </div>
          <div class="col-xs-12 col-l-5 align-xs-center align-l-end">
            Release date: Dec 7nd 2021
          </div>
        </div>
        <br /><br />
        <div class="grid">
          <div
            v-for="(item, index) in alphaSet"
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
      <div id="beta"></div>
    </Section>

    <Section>
      <div class="container">
        <div class="grid collapse align-l-middle xxxno-bottom-margin-cols">
          <div class="col-xs-12 col-l-7 align-xs-center align-l-start">
            <h2 class="fs-4xl" data-sos="85">Beta Series</h2>
          </div>
          <div
            class="col-xs-12 col-l-5 align-xs-center align-l-end fade-in-up"
            data-aos="90"
          >
            Release date: Feb 7th
          </div>
        </div>
        <br /><br />
        <div class="grid">
          <div
            v-for="(item, index) in betaSet"
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
        <!-- </div> -->
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
    alphaSet() {
      return this.$options.tokens.filter((t) => t.set === "alpha");
    },

    betaSet() {
      return this.$options.tokens.filter((t) => t.set === "beta");
    },
  },
};
</script>

<style lang="scss" scoped></style>
