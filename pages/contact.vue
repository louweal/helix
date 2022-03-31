<template>
  <div class="page page--white">
    <back-button bg to="/account" />

    <div class="container">
      &nbsp;
      <div class="bottom-xs-3"></div>
      <Section>
        <heading size="2xl" level="1" weight="400"> Contact </heading>

        <lorem :max="200" />

        <input class="input" type="text" placeholder="Name" />
      </Section>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
// silence
</style>
