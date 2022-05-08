<template>
  <div class="page">
    <Header fixed />
    <div class="container container--wide">
      {{ $store.state.waiting }}
      {{ myContracts }}

      <template v-if="pendingContracts.length > 0">
        <heading size="l" level="2" class="bottom-xs-0">
          Pending contracts
        </heading>
        <div class="grid">
          <div
            class="col-xs-24"
            v-for="(contract, index) in pendingContracts.slice(0, 2).reverse()"
            :key="index"
          >
            <contract-card :data="contract" pending />
          </div>
        </div>
      </template>

      <template v-if="selectedContracts.length > 0">
        <heading size="l" level="2" class="bottom-xs-0">
          {{ isShop ? "Created contracts" : "Active contracts" }}
        </heading>
        <div class="grid">
          <div
            class="col-xs-24"
            v-for="(contract, index) in selectedContracts.slice().reverse()"
            :key="index"
          >
            <contract-card :data="contract" />
          </div>
        </div>
      </template>

      <notification>
        <p>
          <a
            target="_blank"
            :href="`https://testnet.dragonglass.me/hedera/accounts/${$store.state.currentAccount.accountId}`"
          >
            Inspect {{ $store.state.currentAccount.accountId }} on DragonGlass
          </a>
        </p>
      </notification>
    </div>
    <div
      v-if="myContracts.length === 0 && !$store.state.waiting"
      class="page--placeholder"
    >
      <div>
        <p class="bottom-xs-2">No contracts found</p>

        <template v-if="!$store.state.currentAccount.seller">
          <Button to="/login" class="button--secondary">
            Switch account
          </Button>
        </template>

        <Button
          v-if="$store.state.currentAccount.seller"
          to="/new"
          class="button--primary"
          >Add contract</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allContracts: [],
    };
  },

  async mounted() {
    if (this.$store.state.currentAccount.ID === undefined) {
      console.log("not signed in yet");
      return;
    }
    if (
      this.$store.state.currentAccount.ID !== undefined &&
      this.$store.state.currentAccount.fetched === false
    ) {
      let data = await this.$store.dispatch("getSmartContracts");
      // this.selectedContracts = data;
    } else {
      console.log("already fetched");
    }
  },

  computed: {
    contracts() {
      // from store
      return this.$store.state.contracts;
    },
    me() {
      return this.$store.state.currentAccount.accountId;
    },
    isShop() {
      return this.$store.state.currentAccount.seller === true;
    },

    myContracts() {
      let myContracts = this.contracts.filter((c) => c.owner === this.me);

      let selected = this.$store.state.currentCategory;
      if (selected === -1) {
        return myContracts;
      } else {
        return myContracts.filter(
          (c) => +c.category === this.$store.state.currentCategory
        );
      }
    },
    selectedContracts() {
      if (this.isShop) {
        return this.myContracts.filter((c) => c.state === 0);
      } else {
        // show only Pending, Sold and [todo] Resold contracts
        return this.myContracts.filter((c) => c.state === 2 || c.state === 3);
      }
    },

    pendingContracts() {
      if (this.isShop) {
        return [];
      } else {
        return this.myContracts.filter((c) => c.state === 1);
      }
    },
  },

  methods: {
    doTransfer() {
      if (this.isShop) {
        this.$store.commit("sellContract", {
          ID: +this.contract.ID,
          buyer: +this.buyer,
        });
      } else {
        if (this.contract.owner !== this.buyer) {
          this.$store.commit("transferContract", {
            ID: +this.contract.ID,
            seller: +this.me,
            buyer: +this.buyer,
          });
        }
      }

      this.$store.commit("setAction", "transferSuccess");

      this.transferred = true;
      this.toggleDrawer("#transfer-drawer");
      this.$router.push({
        path: "/",
      });
    },
    doDelete() {
      this.$store.commit("deleteContract", this.contract);

      this.$store.commit("setAction", "deleteSuccess");

      this.toggleDrawer("#delete-drawer");
      this.$router.push({
        path: "/",
      });
    },
  },
};
</script>
