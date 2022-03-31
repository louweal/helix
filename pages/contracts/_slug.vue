<template>
  <div class="page page--white">
    <drawer :heading="'Transfer ownership'" id="transfer-drawer">
      <template v-slot:header> Transfer ownership </template>
      <p>
        If you transfer the ownership of this contract to someone, the new owner
        receives 30% of the deposit (xxx h).
      </p>

      <heading size="m" level="3" class="bottom-xs-0">
        Item recepient <badge color="primary">30%</badge>
      </heading>

      <account-card
        class="bottom-xs-1"
        :data="$options.accounts[1]"
        :list="
          $options.accounts.filter((a) => a.ID !== 1 && !a.seller && !a.charity)
        "
        dropdown
      />

      <p>
        After transfering the ownership you will instantly receive the remaining
        60% of your deposit ({{ contract.deposit * 0.6 }} h) and you will donate
        10% ({{ contract.deposit * 0.1 }} h) to The Plastic Soup Foundation.
      </p>

      <Button class="button--primary button--fullwidth"> Confirm </Button>
    </drawer>

    <drawer :heading="'Delete contract'" id="delete-drawer">
      <template v-slot:header> Delete contract </template>

      <p>
        Do you want to delete this contract? This action donates the complete
        remainder of the deposit to the charity selected below.
      </p>

      <heading size="m" level="3" class="bottom-xs-0">
        Deposit recepient <badge color="primary">99%</badge>
      </heading>

      <account-card
        class="bottom-xs-1"
        :data="$options.accounts[3]"
        :list="$options.accounts.filter((a) => a.ID !== 3 && a.charity)"
        dropdown
      />

      <Button class="button--primary button--fullwidth"> Confirm </Button>
    </drawer>

    <div class="container container--full">
      <back-button />

      <div class="img--light" style="padding: 15%">
        <div
          v-if="contract.visual"
          class="img ratio-1x1"
          :style="{
            backgroundImage:
              `url(` +
              require(`~/assets/images/products/${contract.visual}`) +
              `)`,
          }"
        ></div>
      </div>
    </div>

    <div class="container">
      <Section>
        <heading size="3xl" level="1" weight="400" class="bottom-xs-0">
          {{ contract.name }}
        </heading>

        <badge color="label-b" class="bottom-xs-2">B</badge>
        <badge
          v-if="contract.state !== 0"
          :color="contract.state === 1 ? 'primary' : false"
        >
          {{ contract.state === 1 ? "transferred" : "deleted" }}
        </badge>

        <deposit :value="contract.deposit" class="bottom-xs-1" />

        <Stack :gap="0.5">
          <Button
            v-if="contract.state === 0"
            @click="false"
            class="button--primary"
            @click.native="toggleDrawer('#transfer-drawer')"
          >
            <icon icon="arrow-right" /> Transfer
          </Button>
          <Button
            v-if="contract.state !== 2"
            @click="false"
            class="button--dark"
            @click.native="toggleDrawer('#delete-drawer')"
          >
            <icon icon="delete" />
            Delete
          </Button>
        </Stack>
      </Section>

      <Section>
        <hr />
        <list-item icon="gift"> Bought from {{ contract.seller }} </list-item>

        <list-item icon="calendar">
          Owner since {{ contract.startdate }}
        </list-item>

        <list-item icon="pin">
          Produced in {{ contract.production_country }}
        </list-item>
      </Section>

      <Section>
        <p v-if="contract.intro">{{ contract.intro }}</p>
        <lorem v-else :max="50" />
      </Section>

      <Section>
        <hr />

        <accordion-item label="Materials" icon="tools" level="2">
          <lorem :max="200" />
        </accordion-item>

        <accordion-item label="Deposit breakdown" icon="grid" level="2">
          <Table>
            <TR v-for="(row, index) in 5" :key="index">
              <TD> <lorem :min="2" :max="4" /> </TD>
              <TD> <badge level="B" /> </TD>
              <TD align="right"> ℏ 9.99 </TD>
            </TR>
            <TR v-for="(row, index) in 1" :key="'j' + index" :sub="true">
              <TD> <lorem :min="2" :max="4" /> </TD>
              <TD> <badge level="B" /> </TD>
              <TD align="right"> ℏ 9.99 </TD>
            </TR>
          </Table>
        </accordion-item>
      </Section>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import contracts from "~/data/contracts.json";
import accounts from "~/data/accounts.json";

export default {
  // transition: "rtl",

  contracts, //.sort((a, b) => (a.ID > b.ID ? 1 : -1)),
  accounts,

  computed: {
    contract() {
      return this.$options.contracts.filter(
        (c) => c.ID === +this.$route.params.slug
      )[0];
    },
  },

  methods: {
    toggleDrawer(id) {
      let drawer = document.querySelector(id);
      // console.log(id);
      drawer.classList.toggle("drawer--active");
    },
  },
};
</script>
<style lang="scss" scoped>
// silence
</style>
