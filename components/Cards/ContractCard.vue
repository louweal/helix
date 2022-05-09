<template>
  <div class="contract-card">
    <div
      class="contract-card__body"
      @click="toggleActions()"
      :class="pending ? 'pending' : false"
    >
      <div class="grid no-bottom-margin-cols">
        <div class="col-xs-4">
          <div class="contract-card__visual">
            <div
              v-if="visual"
              class="img ratio-1x1"
              :style="{
                backgroundImage:
                  `url(` +
                  require(`~/assets/images/products/${visual.url}`) +
                  `)`,
              }"
            ></div>
          </div>
        </div>
        <div class="col-xs-15 offset-xs-1">
          <heading
            size="l"
            level="2"
            weight="400"
            class="bottom-xs-0"
            v-if="data.name"
          >
            {{ data.name }} - {{ data.index }}
          </heading>
          <heading
            size="s"
            level="0"
            weight="400"
            fstyle="italic"
            xxxv-if="seller"
          >
            {{ data.description }}
          </heading>

          <!-- {{ data.state }} -->
        </div>
        <div class="col-xs-4">
          <div class="contract-card__footer align-xs-end" v-if="data.deposit">
            <deposit :val="data.deposit" />
          </div>
        </div>
      </div>
    </div>

    <div class="contract-card__actions" v-if="showActions">
      <div class="grid no-bottom-margin-cols" v-if="!pending && !isShop">
        <div class="col-xs-8">
          <Button
            class="button--light button--fullwidth"
            @click.native="toggleTransferOptions"
          >
            <icon icon="arrow-right" /> Transfer
          </Button>
        </div>
        <div class="col-xs-8">
          <Button
            class="button--light button--fullwidth"
            @click.native="toggleDeleteOptions"
          >
            <icon icon="delete" />
            Delete
          </Button>
        </div>
        <div class="col-xs-8">
          <nuxt-link :to="data.ID ? '/contracts/' + data.ID : '/'">
            <Button class="button--fullwidth"> View details </Button>
          </nuxt-link>
        </div>
      </div>
      <div class="grid no-bottom-margin-cols" v-if="!pending && isShop">
        <div class="col-xs-8">
          <Button
            class="button--light button--fullwidth"
            @click.native="toggleSellOptions"
          >
            <icon icon="arrow-right" /> Sell
          </Button>
        </div>
        <div class="col-xs-8">
          <Button
            class="button--light button--fullwidth"
            @click.native="toggleRemoveOptions"
          >
            <icon icon="delete" />
            Remove
          </Button>
        </div>
        <div class="col-xs-8">
          <nuxt-link :to="data.ID ? '/contracts/' + data.ID : '/'">
            <Button class="button--fullwidth"> More details </Button>
          </nuxt-link>
        </div>
      </div>
      <div class="grid no-bottom-margin-cols" v-if="pending">
        <div class="col-xs-12">
          <input
            class="field field--light"
            type="text"
            :placeholder="'*DEMO FIELD*'"
            @input="(e) => setFakeBuyDate(e.target.value)"
          />
        </div>
        <div class="col-xs-12">
          <!-- <heading size="s" level="0" fstyle="italic" weight="400"
            >This action locks the deposit amount into the contract.</heading
          > -->
          <Button
            @click.native="confirmPurchase"
            class="button--primary button--fullwidth"
          >
            Confirm purchase
          </Button>
        </div>
      </div>
    </div>

    <div
      v-if="showActions && showTransferOptions"
      class="contract-card__options"
    >
      <div class="contract-card__options__header">
        <heading size="m" level="2" class="bottom-xs-0" color="black">
          Transfer ownership
        </heading>
      </div>
      <p>
        If you transfer the ownership of this contract to someone, the new owner
        receives 30% of the deposit ({{ "hbars(30)" }}).
      </p>

      <heading size="m" level="3" class="bottom-xs-0">
        Item recepient <badge color="primary">30%</badge>
      </heading>

      <dropdown
        key="0"
        class="dropdown--white"
        @input="getBuyer"
        :options="allAccounts"
      />
      <Button
        class="button--primary button--fullwidth"
        xxxclick.native="doTransfer"
      >
        Confirm
      </Button>
    </div>
    <div v-if="showActions && showSellOptions" class="contract-card__options">
      <div class="contract-card__options__header">
        <heading size="m" level="2" class="bottom-xs-0" color="black">
          Set buyer
        </heading>
      </div>
      <p>
        Did you sell this item? Select the buyer below such that he can obtain
        the contract.
      </p>

      <heading size="m" level="3" class="bottom-xs-0"> Buyer </heading>

      <dropdown
        key="0"
        class="dropdown--white"
        @input="getBuyer"
        :options="allAccounts"
      />
      <Button
        class="button--primary button--fullwidth"
        @click.native="setBuyer()"
      >
        Confirm
      </Button>
    </div>

    <div v-if="showActions && showDeleteOptions" class="contract-card__options">
      <div class="contract-card__options__header">
        <heading size="m" level="2" class="bottom-xs-0" color="black">
          Delete contract
        </heading>
      </div>
      <p>
        Do you want to delete this contract? This action donates the complete
        remainder of the deposit to the charity that is on this contract.
      </p>

      <Button
        class="button--primary button--fullwidth"
        @click.native="deleteContract()"
      >
        Confirm
      </Button>
    </div>
    <div v-if="showActions && showRemoveOptions" class="contract-card__options">
      <div class="contract-card__options__header">
        <heading size="m" level="2" class="bottom-xs-0" color="black">
          Remove contract
        </heading>
      </div>
      <p>
        If you accidentially created this contract, you can remove it from the
        list. It will remain as an inactive contract on the Hedera network.
      </p>

      <Button
        class="button--primary button--fullwidth"
        @click.native="removeContract"
      >
        Confirm
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showActions: false,
      showTransferOptions: false,
      showDeleteOptions: false,
      showRemoveOptions: false,
      showSellOptions: false,
      buyer: false,
      fakeBuyDate: 0,
    };
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    pending: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    async setBuyer() {
      let contractId = await this.$store.dispatch("setBuyer", {
        contractId: this.data.ID,
        index: this.data.index,
        buyerId: this.buyer,
      });
    },

    setFakeBuyDate(val) {
      console.log(val);
      this.fakeBuyDate = parseInt((Date.now() - val * 1000 * 86400) / 1000); // convert 'days ago' to timestamp in seconds
      console.log(this.fakeBuyDate);
    },

    async confirmPurchase() {
      // console.log(this.data.deposit);
      // console.log(this.data.ID);

      if (isNaN(this.fakeBuyDate)) {
        console.log("Invalid buy date");
        return;
      }

      let payload = {
        contractId: this.data.ID,
        deposit: +this.data.deposit,
        fakeBuyDate: this.fakeBuyDate,
      };
      await this.$store.dispatch("confirmPurchase", payload);

      this.$router.push({
        path: "/",
      });
    },

    getFakeDate(val) {
      let today = Date.now() / 1000;
      let date = today - val * 86400;
      //todo
    },

    async deleteContract() {},
    async removeContract() {
      await this.$store.dispatch("removeContract", {
        contractId: this.data.ID,
        index: this.data.index,
      });
    },

    toggleActions() {
      this.showActions = !this.showActions;
    },
    toggleTransferOptions() {
      this.showTransferOptions = !this.showTransferOptions;
      this.showDeleteOptions = false;
    },
    toggleDeleteOptions() {
      this.showDeleteOptions = !this.showDeleteOptions;
      this.showTransferOptions = false;
    },
    toggleRemoveOptions() {
      this.showRemoveOptions = !this.showRemoveOptions;
      this.showSellOptions = false;
    },
    toggleSellOptions() {
      this.showSellOptions = !this.showSellOptions;
      this.showRemoveOptions = false;
    },
    getBuyer(data) {
      this.buyer = data.id;
      console.log(data);
    },
  },

  computed: {
    visual() {
      return this.images.find((i) => i.ID === this.data.visual);
    },

    accounts() {
      return this.$store.state.accounts;
    },

    allAccounts() {
      return this.accounts
        .filter(
          (a) =>
            !a.seller &&
            !a.charity &&
            a.ID !== this.$store.state.currentAccount.ID
        )
        .map(({ accountId, name }) => ({
          id: accountId,
          label: name + " (" + accountId + ")",
          value: accountId,
        }));
    },

    isShop() {
      return this.$store.state.currentAccount.seller === true;
    },

    images() {
      return this.$store.state.images;
    },

    categories() {
      return this.$store.state.categories;
    },

    categoryName() {
      return this.categories.find((c) => c.ID === this.data.category).name;
    },

    me() {
      return +this.$store.state.currentAccount.ID;
    },
    // labels() {
    //   return this.$store.state.labels;
    // },

    sold() {
      return this.data.owner !== this.me && this.data.seller === this.me;
    },

    seller() {
      // let seller = this.accounts.find((a) => a.ID === this.data.seller).name;
      let seller = this.accounts.find(
        (a) => a.accountId === this.data.seller
      ).name;
      return seller !== this.$store.state.currentAccount.name ? seller : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.contract-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 6px;
  width: 100%;
  // padding-bottom: 7px;
  padding: 4px;
  height: 100%;

  &__body {
    &.pending {
      opacity: 0.5;
    }
  }

  &__actions {
    margin-top: 5px;
  }

  &__options {
    &__header {
      width: 100%;
      background-color: get-color(light);
      text-align: center;
      border-radius: 6px;
      padding: 7px 0;
      margin-bottom: 5px;
      margin-top: 5px;
    }
  }

  &__visual {
    position: relative;
    background-color: #fff;
    // padding: 24px;
  }

  // &__state {
  //   position: absolute;
  //   left: 0px;
  //   bottom: 0px;
  // }
}
</style>
