<template>
  <div class="page">
    <Header fixed />
    <div class="container container--wide">
      <!-- {{ contracts }} -->

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
            <contract-card
              :data="contract"
              @activeContract="setActiveContract"
              pending
            />
          </div>
        </div>
      </template>

      <!-- {{ selectedContracts }} -->

      <template v-if="selectedContracts.length > 0">
        <heading size="l" level="2" class="bottom-xs-0">
          Active contracts
        </heading>
        <div class="grid">
          <div
            class="col-xs-24"
            v-for="(contract, index) in selectedContracts.slice().reverse()"
            :key="index"
          >
            <contract-card
              :data="contract"
              @activeContract="setActiveContract"
            />
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

      <!-- <notification v-if="$store.state.currentContractId !== -1">
        <p>
          The smart contract with ID {{ $store.state.currentContractId }} was
          successfully created!
        </p>
      </notification> -->
    </div>
    <div
      v-if="selectedContracts.length === 0 && !$store.state.fetching"
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
    <div class="page--placeholder" v-if="$store.state.fetching">
      <div>
        <p>Awaiting query ...</p>
      </div>
    </div>

    <drawer id="transfer-drawer">
      <template v-slot:header> Transfer ownership </template>
      <p>
        If you transfer the ownership of this contract to someone, the new owner
        receives 30% of the deposit ({{ "hbars(30)" }}).
      </p>

      <heading size="m" level="3" class="bottom-xs-0">
        Item recepient <badge color="primary">30%</badge>
      </heading>

      <!-- <dropdown
        key="0"
        class="dropdown--white"
        @input="getItemRecepient"
        :options="allAccounts"
      /> -->

      <!-- <heading size="m" level="3" class="bottom-xs-0">
        Donation recepient <badge color="primary">10%</badge>
      </heading>

      <dropdown
        key="1"
        class="dropdown--white"
        @input="getDepositRecepient"
        :options="allCharities"
      /> -->

      <!-- <p>
        After transfering the ownership you will instantly receive the remaining
        60% of your deposit ({{ hbars(60) }}) and you will donate 10% ({{
          hbars(10)
        }}) to {{ "todo" }} .
      </p> -->

      <Button
        class="button--primary button--fullwidth"
        xxxclick.native="doTransfer"
      >
        Confirm
      </Button>
    </drawer>

    <drawer id="delete-drawer">
      <template v-slot:header> Delete contract </template>

      <p>
        Do you want to delete this contract? This action donates the complete
        remainder of the deposit to the charity that is on this contract.
      </p>
      <!-- <heading size="m" level="3" class="bottom-xs-0">
        Deposit recepient <badge color="primary">10%</badge>
      </heading>

      <dropdown
        key="1"
        class="dropdown--white"
        @input="getDepositRecepient"
        :options="allCharities"
      /> -->

      <Button
        class="button--primary button--fullwidth"
        xxxclick.native="doDelete"
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
      // selectedContracts: [],
      allContracts: [],
      activeContract: "",
    };
  },

  async mounted() {
    if (
      this.$store.state.currentAccount.ID &&
      !this.$store.state.currentAccount.fetched
    ) {
      this.$store.commit("toggleFetchState");
      let data = await this.$store.dispatch("getSmartContracts");
      this.selectedContracts = data;
      this.$store.commit("toggleFetchState");
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
    selectedContracts() {
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

    pendingContracts() {
      return this.selectedContracts.filter((c) => c.state === 1); // temp
    },
  },

  methods: {
    setActiveContract(val) {
      // console.log("the active contract is ", val);
      this.activeContract = val;
    },
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
