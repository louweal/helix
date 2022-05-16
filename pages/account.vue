<template>
  <div class="page page--white">
    <div class="container">
      <Section>
        <div class="grid collapse bottom-xs-2">
          <div class="col-xs-7">
            <div
              class="img ratio-1x1 img--round img--light"
              :style="{
                backgroundImage:
                  `url(` +
                  require(`~/assets/images/${this.$store.state.currentAccount.avatar}`) +
                  `)`,
              }"
            />
          </div>
          <div class="col-xs-17">
            <div class="align-xs-end">
              <Button to="/login" class="button--secondary"> Sign out </Button>
            </div>
          </div>
        </div>

        <heading
          size="2xl"
          level="1"
          weight="400"
          class="bottom-xs-0"
          color="black"
        >
          {{ account.name }}
        </heading>

        <template v-if="account.city && account.country">
          <heading size="m" level="0" weight="400" fstyle="italic">
            {{ account.city }},
            {{ account.country }}
          </heading>
          <br />
        </template>

        <heading size="m" level="0" weight="400" color="black">
          <a
            target="_blank"
            :href="`https://testnet.dragonglass.me/hedera/accounts/${account.accountId}`"
            >{{ account.accountId }}
          </a>
        </heading>
      </Section>

      <Section>
        <nav-item to="/about">About</nav-item>
      </Section>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentAccount() {
      return this.$store.state.currentAccount;
    },

    contracts() {
      return this.$store.state.contracts;
    },

    isShop() {
      return this.$store.state.currentAccount.seller === true;
    },

    account() {
      return this.$store.state.currentAccount;
    },

    me() {
      return +this.$store.state.currentAccount.ID;
    },
  },
};
</script>

<style lang="scss" scoped>
// silence
</style>
