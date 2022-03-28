<template>
  <main class="main">
    <pre-loader />
  </main>
</template>

<script>
export default {
  created() {
    setTimeout(() => this.$router.push({ path: "/app" }), 5000);
  },
};
</script>
