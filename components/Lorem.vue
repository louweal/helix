
<!-- generates a paragraph with lorem ipsum text with a length "MAX" or a random length between MIN and MAX -->
<template>
  <span v-if="lowercase">
    {{ mode === "chars" ? firstChars.toLowerCase() : firstWords.toLowerCase() }}
  </span>
  <span v-else>
    {{ mode === "chars" ? firstChars : firstWords }}
  </span>
</template>

<script>
import loremIpsum from "./../lorem-ipsum.json";

export default {
  loremIpsum: loremIpsum,

  props: {
    min: {
      type: [Number, Boolean],
      default: false,
    },
    max: {
      type: Number,
      default: 20,
    },
    mode: {
      type: String,
      default: "words", // words || chars
    },
    lowercase: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    shuffled() {
      return this.$options.loremIpsum.text
        .split(".")
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        .join(".");
    },

    randomIntFromInterval() {
      let min = this.min + 1;
      let max = this.max + 1;

      if (min && max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      } else {
        return max;
      }
    },

    firstChars() {
      return this.shuffled.substring(0, this.randomIntFromInterval);
    },

    firstWords() {
      return this.shuffled
        .split(/[ ,]+/)
        .slice(0, this.randomIntFromInterval)
        .join(" ");
    },
  },
};
</script>

