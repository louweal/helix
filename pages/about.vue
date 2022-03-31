<template>
  <div class="page page--white">
    <back-button to="/account" bg />

    <div class="container">
      &nbsp;
      <div class="bottom-xs-3"></div>
      <Section>
        <heading size="2xl" level="1" weight="400"> About Helix </heading>
        <heading size="s" fstyle="italic" level="0"> v.0.0.1-beta </heading>

        <p>
          This dApp was build during the
          <a href="https://hedera22.devpost.com/" target="_blank"
            >Hedera 2022</a
          >
          'Hello Smart Contracts' Hackathon on Devpost and was submitted as
          project in the Sustainability Challenge sponsored by Avery Dennison,
          Atma.io.
        </p>

        <p>
          It was developed by
          <nuxt-link to="/contact">Anneloes Louwe</nuxt-link>, a junior
          full-stack developer + UX designer from The Netherlands.
        </p>

        [promo video]
      </Section>
    </div>
    <div class="page__footer">
      <div class="container">
        <heading>Disclaimer</heading>
        <p class="fs-s">
          This app runs on the Hedera Testnet and all users and products in this
          app are fictional. All product images are courtesy of IKEA.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
// silence
</style>
