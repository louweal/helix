<template>
  <main class="main">
    <Section class="section--light">
      <div class="container container--wide">
        <div class="grid">
          <div class="col-xs-6">
            <contract-card />
          </div>
        </div>
        <lorem :max="300" />
      </div>
    </Section>
  </main>
</template>

<script>
import tokens from "./../data/tokens.json";

export default {
  //   transition: "home",

  //   tokens: tokens.sort((a, b) => (a.ID > b.ID ? 1 : -1)),

  computed: {},
};
</script>
