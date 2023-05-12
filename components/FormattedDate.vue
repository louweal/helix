<template>
  <span>
    {{ formatDate(date) }}
  </span>
</template>

<script>
export default {
  props: {
    date: {
      type: Number,
      default: "",
    },
  },
  methods: {
    formatDate(date) {
      let locale = "us-EN";
      return new Date(date * 1000).toLocaleDateString(locale, {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });
    },
  },
};
</script>

<style></style>
