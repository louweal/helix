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
        <div class="col-xs-11 offset-xs-1">
          <heading
            size="l"
            level="2"
            weight="400"
            class="bottom-xs-0"
            v-if="data.name"
          >
            {{ data.name }}
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

          {{ data.state }}
        </div>
        <div class="col-xs-8">
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
            @click.native="toggleDeleteOptions"
          >
            <icon icon="delete" />
            Delete
          </Button>
        </div>
        <div class="col-xs-8">
          <nuxt-link :to="data.ID ? '/contracts/' + data.ID : '/'">
            <Button class="button--fullwidth"> More info </Button>
          </nuxt-link>
        </div>
      </div>
      <div class="grid no-bottom-margin-cols" v-if="pending">
        <div class="col-xs-12">
          <Button @click="false" class="button--primary button--fullwidth">
            Confirm purchase
          </Button>
        </div>
        <div class="col-xs-12">
          <heading size="s" level="0" fstyle="italic" weight="400"
            >This action locks the deposit amount into the contract.</heading
          >
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
        @input="getBuyer()"
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
      <p>lorem ipsum</p>

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
  </div>
</template>

<script>
export default {
  data() {
    return {
      showActions: false,
      showTransferOptions: false,
      showDeleteOptions: false,
      showSellOptions: false,
      buyer: false,
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
        buyerId: this.buyer,
      });
    },
    toggleActions() {
      this.showActions = !this.showActions;

      if (this.showActions) {
        this.$emit("activeContract", this.data.ID);
      }
    },
    toggleTransferOptions() {
      this.showTransferOptions = !this.showTransferOptions;

      if (this.showTransferOptions) {
        // console.log("show!");
        this.showDeleteOptions = false;
      }
    },
    toggleDeleteOptions() {
      this.showDeleteOptions = !this.showDeleteOptions;

      if (this.showDeleteOptions) {
        // console.log("show!");
        this.showTransferOptions = false;
        this.showSellOptions = false;
      }
    },
    toggleSellOptions() {
      this.showSellOptions = !this.showSellOptions;

      if (this.showSellOptions) {
        // console.log("show!");
        this.showDeleteOptions = false;
      }
    },
    getBuyer(data) {
      this.buyer = data.ID;
      // console.log(data.ID);
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
        .map(({ ID, accountId, name }) => ({
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
