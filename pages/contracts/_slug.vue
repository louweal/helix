<template>
  <div class="page page--white">
    <back-button transparent />

    <template v-if="contract">
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
        <!-- {{ contract }} -->
        <Section>
          <heading size="3xl" level="1" weight="400" class="bottom-xs-0">
            {{ contract.name }}
          </heading>
          <span v-if="contract.contractId === -1">{{
            contract.contractId
          }}</span>

          <!-- <badge :level="contract.label" class="bottom-xs-2" />
          <badge v-if="contract.state === 1" color="primary">
            transferred
          </badge> -->

          <deposit
            :val="contract.deposit"
            class="bottom-xs-1"
            label="initial deposit"
          />

          <Stack :gap="0.5">
            <Button
              @click="false"
              class="button--primary"
              @click.native="toggleDrawer('#transfer-drawer')"
            >
              <icon icon="arrow-right" /> Transfer
            </Button>
            <Button
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
          <list-item icon="gift" v-if="!isShop">
            Bought from {{ contract.seller }}
          </list-item>

          <list-item icon="calendar" v-if="!isShop">
            Owner since {{ contract.startdate }}
          </list-item>

          <list-item icon="calendar" v-if="isShop">
            Listed on {{ contract.startdate }}
          </list-item>

          <list-item icon="pin">
            Produced in
            {{
              countries.find((c) => +c.ID === +contract.production_country).name
            }}
          </list-item>
        </Section>

        <Section>
          <p v-if="contract.description">{{ contract.description }}</p>
          <lorem v-else :max="50" />
        </Section>

        <Section>
          <hr />

          <accordion-item label="Collect deposit" icon="graph" level="2">
            <p><lorem /></p>

            todo
          </accordion-item>

          <!-- <accordion-item
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
            <deposit-table
              :materials="contract.materials"
              :country="contract.production_country"
            />
          </accordion-item> -->
        </Section>
      </div>
    </template>
    <div v-else class="page--placeholder">
      <p>Oh no. This contract doesn't exist.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transferred: false,
      deleted: false,
      buyer: false,
      charity: false,
    };
  },

  computed: {
    contracts() {
      return this.$store.state.contracts;
    },
    contract() {
      return this.contracts.find((c) => c.ID === +this.$route.params.slug);
    },
    countries() {
      return this.$store.state.countries;
    },
    accounts() {
      return this.$store.state.accounts;
    },
    images() {
      return this.$store.state.images;
    },
    visual() {
      return this.images.find((i) => i.ID === this.contract.visual).url;
    },
    me() {
      return +this.$store.state.currentAccount.ID;
    },
    isShop() {
      return this.$store.state.currentAccount.seller === true;
    },

    sold() {
      return (
        this.contract.owner !== this.me && this.contract.seller === this.me
      );
    },

    allAccounts() {
      return this.accounts
        .filter(
          (a) =>
            !a.seller &&
            !a.charity &&
            a.ID !== this.$store.state.currentAccount.ID
        )
        .map(({ ID, name, accountId }) => ({
          id: ID,
          label: name,
          value: accountId,
        }));
    },
    allCharities() {
      return this.accounts
        .filter((a) => a.charity)
        .map(({ ID, name, accountId }) => ({
          id: ID,
          label: name,
          value: accountId,
        }));
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
      this.buyer = data.ID;
      // console.log(data.ID);
    },
    getDepositRecepient(data) {
      this.charity = this.allCharities.find((c) => c.id == +data.ID).label;
      // console.log(this.charity);
    },
  },
};
</script>
<style lang="scss" scoped>
// silence
</style>
