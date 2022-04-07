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
              <Button to="/login" class="button--secondary">
                Switch account
              </Button>
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
          {{ this.$store.state.currentAccount.name }}
        </heading>

        <heading size="m" level="0" weight="400" color="black">
          {{ this.$store.state.currentAccount.accountId }}
        </heading>
      </Section>

      <Section v-if="numSoldNew > 0">
        <p v-if="numSoldNew > 1">
          Good job! You have sold {{ numSoldNew }} sustainable products! Keep up
          the good work!
        </p>
        <p v-else-if="numSoldNew === 1">
          Good job! You have sold 1 sustainable product.
        </p>
      </Section>

      <Section v-if="numSoldSecondhand > 0">
        <p v-if="numSoldSecondhand > 1">
          Good job! You gave {{ numSoldSecondhand }} of your things a second
          owner.
        </p>
        <p v-else-if="numSoldSecondhand === 1">
          Good job! You gave 1 of your things a second owner. Keep up the good
          work!
        </p>
      </Section>

      <Section v-if="numBoughtSecondhand > 0">
        <p v-if="numBoughtSecondhand > 1">
          Good job! You have bought {{ numBoughtSecondhand }} of your things
          secondhand. Now xxx% percent of your items is bought secondhand.
        </p>
        <p v-else-if="numBoughtSecondhand === 1">
          Good job! You have bought 1 of your things secondhand. Keep up the
          good work!
        </p>
      </Section>

      <Section>
        <!-- <hr /> -->
        <nav-item to="/about">About</nav-item>

        <nav-item to="/settings">Settings</nav-item>
        <!-- <nav-item to="/contact">Contact</nav-item> -->
        <!-- <nav-item to="/login">Sign out</nav-item> -->
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

    me() {
      return +this.$store.state.currentAccount.ID;
    },

    numSoldNew() {
      if (this.isShop) {
        return this.contracts.filter(
          (c) => c.store === this.me && c.owner !== this.me
        ).length;
      }
      return 0;
    },
    numSoldSecondhand() {
      if (!this.isShop) {
        return this.contracts.filter(
          (c) => c.seller === this.me && c.owner !== this.me
        ).length;
      }
      return 0;
    },
    numBoughtSecondhand() {
      return this.contracts.filter(
        (c) => +c.store !== +c.seller && c.owner === this.me
      ).length;
    },
  },
};
</script>

<style lang="scss" scoped>
// silence
</style>
