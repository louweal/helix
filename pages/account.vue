<template>
  <div class="page page--white">
    <div class="container">
      <Section>
        <div class="grid collapse">
          <div class="col-xs-2">
            <div
              class="img ratio-1x1 img--round img--light"
              :style="{
                backgroundImage:
                  `url(` + require(`~/assets/images/avatar1.png`) + `)`,
              }"
            />
          </div>
        </div>

        <heading
          size="2xl"
          level="1"
          weight="400"
          class="bottom-xs-0"
          color="black"
        >
          Jane Doe
        </heading>

        <heading size="m" level="0" weight="400" color="black">
          Hedera ID: 0.0.1234567
        </heading>
      </Section>

      <Section>
        <hr />
        <nav-item to="/faq">Frequently asked questions</nav-item>
        <nav-item to="/login">Sign out</nav-item>
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