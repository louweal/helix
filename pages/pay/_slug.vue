<template>
  <div class="page page--white">
    <div class="container">
      hello
      {{ $route.params.slug }}

      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: undefined,
    };
  },
  computed: {},

  created() {
    this.decode();
  },

  methods: {
    decode() {
      this.item = Buffer.from(this.$route.params.slug, "base64"); //atob(this.$route.params.slug);
    },
  },
};
</script>

<style></style>
