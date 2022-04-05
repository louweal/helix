<template>
  <div class="page page--white">
    <back-button transparent />

    <div class="container container--full">
      <div class="img--light" style="padding: 15%">
        <div
          v-if="contract.visual"
          class="img ratio-1x1"
          :style="{
            backgroundImage:
              `url(` + require(`~/assets/images/products/${visual}`) + `)`,
          }"
        ></div>
      </div>
    </div>

    <div class="container">
      <Section>
        <heading size="3xl" level="1" weight="400" class="bottom-xs-0">
          {{ contract.name }}
        </heading>

        <badge :level="contract.label" class="bottom-xs-2" />
        <badge
          v-if="contract.state !== 0"
          :color="contract.state === 1 ? 'primary' : false"
        >
          {{ contract.state === 1 ? "transferred" : "deleted" }}
        </badge>

        <deposit
          :val="contract.deposit"
          class="bottom-xs-1"
          label="initial deposit"
        />

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
        <list-item icon="gift" v-if="contract.seller !== contract.owner">
          Bought from {{ contract.seller }}
        </list-item>

        <list-item icon="calendar" v-if="contract.seller !== contract.owner">
          Owner since {{ contract.startdate }}
        </list-item>

        <list-item icon="calendar" v-if="contract.seller === contract.owner">
          Listed on {{ contract.startdate }}
        </list-item>

        <list-item icon="pin">
          Produced in
          {{
            $options.countries.find(
              (c) => +c.ID === +contract.production_country
            ).name
          }}
        </list-item>
      </Section>

      <Section>
        <p v-if="contract.description">{{ contract.description }}</p>
        <lorem v-else :max="50" />
      </Section>

      <Section>
        <hr />

        <accordion-item
          label="Materials"
          icon="tools"
          level="2"
          v-if="contract.material_description !== false"
        >
          <p v-if="contract.material_description">
            {{ contract.material_description }}
          </p>
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

    <drawer id="transfer-drawer">
      <template v-slot:header> Transfer ownership </template>
      <p>
        If you transfer the ownership of this contract to someone, the new owner
        receives 30% of the deposit ({{ hbars(30) }}).
      </p>

      <heading size="m" level="3" class="bottom-xs-0">
        Item recepient <badge color="primary">30%</badge>
      </heading>

      <dropdown
        class="dropdown--white"
        @input="getItemRecepient"
        :options="allAccounts"
      />

      <p>
        After transfering the ownership you will instantly receive the remaining
        60% of your deposit ({{ hbars(60) }}) and you will donate 10% ({{
          hbars(10)
        }}) to The Plastic Soup Foundation.
      </p>

      <Button
        class="button--primary button--fullwidth"
        @click.native="doTransfer"
      >
        Confirm
      </Button>
    </drawer>

    <drawer id="delete-drawer">
      <template v-slot:header> Delete contract </template>

      <p>
        Do you want to delete this contract? This action donates the complete
        remainder of the deposit to the charity selected below.
      </p>
      <heading size="m" level="3" class="bottom-xs-0">
        Deposit recepient <badge color="primary">99%</badge>
      </heading>

      <dropdown
        class="dropdown--white"
        @input="getItemRecepient"
        :options="allCharities"
      />

      <Button
        class="button--primary button--fullwidth"
        @click.native="doDelete"
      >
        Confirm
      </Button>
    </drawer>

    <notification v-if="transferred">
      <p>Transfer successful</p>
    </notification>

    <notification v-if="deleted">
      <p>Deletion successful</p>
    </notification>
  </div>
</template>

<script>
// import contracts from "~/data/contracts.json";
import accounts from "~/data/accounts.json";
import images from "~/data/images.json";
import countries from "~/data/countries.json";

export default {
  // contracts,
  accounts,
  images,
  countries,

  data() {
    return {
      transferred: false,
      deleted: false,
    };
  },

  computed: {
    contracts() {
      return this.$store.state.contracts;
    },
    contract() {
      return this.contracts.filter((c) => c.ID === +this.$route.params.slug)[0];
    },
    visual() {
      return this.$options.images.find((i) => i.ID === this.contract.visual)
        .url;
    },
    allAccounts() {
      return this.$options.accounts
        .filter(
          (a) =>
            !a.seller &&
            !a.charity &&
            a.ID !== this.$store.state.currentAccount.ID
        )
        .map(({ name, accountId }) => ({ label: name, value: accountId }));
    },
    allCharities() {
      return this.$options.accounts
        .filter((a) => a.charity)
        .map(({ name, accountId }) => ({ label: name, value: accountId }));
    },
  },

  methods: {
    toggleDrawer(id) {
      let drawer = document.querySelector(id);
      // console.log(id);
      drawer.classList.toggle("drawer--active");
    },
    hbars(percentage) {
      return (
        parseFloat(this.contract.deposit * (percentage / 100)).toFixed(2) + " ℏ"
      );
    },
    getItemRecepient(data) {
      console.log(data.val);
    },
    doTransfer() {
      //to do
      this.transferred = true;
      this.toggleDrawer("#transfer-drawer");
    },
    doDelete() {
      // todo
      this.deleted = true;
      this.toggleDrawer("#delete-drawer");
    },
  },
};
</script>
<style lang="scss" scoped>
// silence
</style>
