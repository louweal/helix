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
          <heading
            size="3xl"
            level="1"
            weight="400"
            class="bottom-xs-0"
            v-if="contract.name"
          >
            {{ contract.name }}
          </heading>

          <heading size="m" level="0" weight="400" fstyle="italic">
            {{ contract.ID }}
          </heading>

          <span v-if="contract.contractId === -1">{{
            contract.contractId
          }}</span>

          <!-- <badge :level="contract.label" class="bottom-xs-2" />
          <badge v-if="contract.state === 1" color="primary">
            transferred
          </badge> -->

          <template v-if="!isShop">
            <deposit
              :val="(contract.deposit * 0.6).toFixed()"
              class="bottom-xs-1"
              label="collectable deposit"
            />

            <Stack :gap="0.5">
              <Button
                class="button--primary"
                xxxclick.native="toggleDrawer('#transfer-drawer')"
              >
                <icon icon="payouts" /> Collect now
              </Button>
              <Button
                class="button--secondary"
                xxxclick.native="toggleDrawer('#delete-drawer')"
              >
                <icon icon="donations" />
                Donate now
              </Button>
            </Stack>
          </template>
        </Section>

        <Section>
          <hr />
          <list-item icon="gift" v-if="!isShop">
            Bought from {{ sellerName }}
          </list-item>

          <list-item icon="calendar" v-if="!isShop && contract.startdate">
            Owner since
            {{ parseInt((Date.now() / 1000 - contract.startdate) / 86400) }}
            days
          </list-item>

          <list-item icon="calendar" v-if="isShop && contract.startdate > -1">
            Listed
            {{ parseInt((Date.now() / 1000 - contract.startdate) / 86400) }}
            days ago
          </list-item>

          <list-item icon="pin" v-if="contract.production_country">
            Produced in
            {{
              countries.find((c) => +c.ID === +contract.production_country).name
            }}
          </list-item>

          <list-item icon="heart" v-if="contract.charity">
            Charity: {{ charityName }}
          </list-item>

          <list-item icon="trophy" v-if="!isShop && contract.duration">
            {{
              parseInt(contract.duration / 86400) -
              parseInt((Date.now() / 1000 - contract.startdate) / 86400)
            }}
            days left
          </list-item>
        </Section>

        <Section>
          <p v-if="contract.description">{{ contract.description }}</p>
        </Section>

        <Section>
          <hr />
          <accordion-item
            label="Materials"
            icon="tools"
            level="2"
            v-if="contract.material_description !== undefined"
          >
            <p>
              {{ contract.material_description }}
            </p>
          </accordion-item>
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
      return this.contracts.find((c) => c.ID == this.$route.params.slug);
    },
    countries() {
      return this.$store.state.countries;
    },
    accounts() {
      return this.$store.state.accounts;
    },

    sellerName() {
      return this.accounts.find((a) => a.accountId === this.contract.seller)
        .name;
    },

    charityName() {
      return this.accounts.find((a) => a.accountId === this.contract.charity)
        .name;
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
