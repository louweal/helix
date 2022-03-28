
<!-- generates a paragraph with lorem ipsum text with a length "MAX" or a random length between MIN and MAX -->
<template>
  <span>
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
  },

  computed: {
    randomIntFromInterval() {
      if (this.min && this.max) {
        return Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
      } else {
        return this.max;
      }
    },

    firstChars() {
      return this.$options.loremIpsum.text.substring(
        0,
        this.randomIntFromInterval
      );
    },

    firstWords() {
      return this.$options.loremIpsum.text
        .split(/[ ,]+/)
        .slice(0, this.randomIntFromInterval)
        .join(" ");
    },
  },
};
</script>

