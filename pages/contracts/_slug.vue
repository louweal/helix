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

          <br /><br />

          <template v-if="!isShop && contract.state === 2">
            <deposit
              :val="amount"
              class="bottom-xs-1"
              label="collectable deposit"
            />

            <div class="grid">
              <div class="col-xs-12">
                <Button
                  class="button--primary button--fullwidth"
                  @click.native="collectNow"
                >
                  <icon icon="bars" /> Collect now
                </Button>
              </div>
              <div class="col-xs-12">
                <Button
                  class="button--light button--fullwidth"
                  @click.native="toggleDrawer('#donate-drawer')"
                >
                  <icon icon="recycle" />
                  or donate ...
                </Button>
              </div>
            </div>
          </template>
        </Section>

        <Section>
          <hr />
          <list-item icon="gift" v-if="!isShop">
            Bought from {{ sellerName }}
          </list-item>

          <list-item icon="trophy" v-if="contract.state === 1">
            Contract duration: {{ parseInt(contract.duration / 8640) }} days
          </list-item>

          <list-item
            icon="calendar"
            v-if="contract.startdate > -1 && contract.state > 1"
          >
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

          <list-item icon="recycle" v-if="contract.state === 3">
            You got this item secondhand
          </list-item>

          <list-item icon="bars" v-if="contract.state === 3">
            You received ℏ
            {{ parseFloat((contract.deposit / 1e8) * 0.3).toFixed(2) }}
          </list-item>

          <list-item
            icon="trophy"
            v-if="!isShop && contract.duration && contract.state === 2"
          >
            {{
              parseInt(contract.duration / 86400) -
              parseInt((Date.now() / 1000 - contract.startdate) / 86400)
            }}
            days left
          </list-item>
        </Section>

        <Section>
          <p v-if="contract.description">{{ contract.description }}</p>
          <p v-else>No description available</p>
        </Section>

        <Section>
          <hr />
          <accordion-item
            label="Materials"
            icon="tools"
            level="2"
            xxxv-if="contract.material_description !== undefined"
          >
            <p v-if="contract.material_description !== 'undefined'">
              {{ contract.material_description }}
            </p>

            <p v-else>No material information available</p>
          </accordion-item>
        </Section>
      </div>
    </template>
    <div v-else class="page--placeholder">
      <p>Oh no. This contract doesn't exist.</p>
    </div>

    <drawer id="donate-drawer">
      <template v-slot:header> Choose charity </template>
      <p>
        Great that you want to help a charity organisation! Please select one
        below.
      </p>

      <dropdown
        key="2"
        class="dropdown--white"
        @input="getCharity"
        :options="allCharities"
      />

      <Button
        class="button--primary button--fullwidth"
        @click.native="donateNow"
      >
        Confirm
      </Button>
    </drawer>
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
      amount: 0,
    };
  },

  async created() {
    if (this.contract.state !== 2) {
      return;
    }
    let amount = await this.$store.dispatch("getAvailableDeposit", {
      contractId: this.contract.ID,
    });
    this.amount = parseFloat(amount);
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
          id: accountId,
          label: name + " (" + accountId + ")",
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
    async collectNow() {
      // console.log(this.contract.ID);

      await this.$store.dispatch("collect", {
        contractId: this.contract.ID,
      });

      this.$store.commit("setAction", "collectSuccess");
      this.$router.push({
        path: "/",
      });
    },
    async donateNow() {
      await this.$store.dispatch("donate", {
        contractId: this.contract.ID,
        charityId: this.charity,
      });

      this.$store.commit("setAction", "donateSuccess");
      this.toggleDrawer("#donate-drawer");
      this.$router.push({
        path: "/",
      });
    },
    // hbars(percentage) {
    //   return (
    //     parseFloat(this.contract.deposit * (percentage / 100)).toFixed(2) + " ℏ"
    //   );
    // },
    // getItemRecepient(data) {
    //   this.buyer = data.ID;
    //   // console.log(data.ID);
    // },
    // getDepositRecepient(data) {
    //   this.charity = this.allCharities.find((c) => c.id == +data.ID).label;
    //   // console.log(this.charity);
    // },

    getCharity(sel) {
      this.charity = sel.ID;
    },
  },
};
</script>
<style lang="scss" scoped>
// silence
</style>
