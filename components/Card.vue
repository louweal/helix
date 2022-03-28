<template>
  <div class="card">
    <div>
      <div class="card__header ratio-16x9">header img</div>

      <div class="card__body">
        <h3 class="fs-3xl">{{ data.token_id }}. {{ data.name }}</h3>
        <p>
          {{ data.intro }}
        </p>
      </div>
    </div>

    <div class="card__footer">
      <StockIndicator
        :current="currentStock !== -1 ? currentStock : data.stock.max"
        :max="data.stock.max"
      />

      <div v-if="inStock">
        <span class="price">{{ data.price }} HBAR</span>
        <Button
          title="Buy"
          :url="`https://gomint.me/gallery/?network=mainnet&tokenId=${data.gomint_id}`"
        />
      </div>
      <div v-else>NOT AVAILABLE</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",

  props: {
    data: {
      type: Object,
      default: {},
      required: true,
    },
  },

  data() {
    return {
      currentStock: -1,
    };
  },

  async created() {
    // check store
    let stockFromStore = this.$store.state.stock[this.data.gomint_id];

    if (stockFromStore) {
      this.currentStock = stockFromStore;
    } else {
      // fetch data from gomint
      let response = await fetch(
        `https://gomint.me/saas/v1/token/supply.php?tokenId=${this.data.gomint_id}`
      );
      let gomint = await response.json();
      this.currentStock = gomint.supply.status.on_sale;

      // commit to store
      this.$store.commit("stock/setStock", {
        id: this.data.gomint_id,
        onSale: this.currentStock,
      });
    }
  },

  computed: {
    inStock() {
      return this.currentStock > 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  background-color: rgba(#403345, 0.2);
  width: 100%;
  height: 100%;
  padding: 0;
  transition: all 0.3s ease-in;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: background-color 0.3s 0.1s ease-in;

  &:hover .card__header .card__visual {
    opacity: 0;
  }

  &:hover .card__header .card__video {
    opacity: 1;
  }

  &__header {
    position: relative;
    overflow: hidden;
    // content: "test";
  }

  &__play {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 5px 7px;
    text-transform: uppercase;
    font-family: $base-font;
    font-size: 0.8rem;
    text-align: center;
    font-weight: 600;
    opacity: 0.7;
  }

  &__id {
    position: absolute;
    font-family: $heading-font;
    top: 10px;
    left: 16px;
    font-size: 16px;
  }

  &__visual {
    position: absolute;
    background-size: cover;
    background-position: center;
    transition: opacity 0.6s ease-in;
  }

  &__video {
    position: absolute;
    background: transparent;
    width: 100%;
    height: 100%;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.6s ease-in;

    video {
      height: 120%;
    }
  }

  &__body {
    padding: 25px;
    padding-bottom: 20px;

    span.hidden {
      font-size: 0.6rem;
      opacity: 0;

      &:hover {
        opacity: 0.5;
      }
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px;
    padding-top: 0;

    .button-container {
      margin-left: 15px;
    }
  }

  &:hover {
    background-color: rgba(#403345, 0.4); //rgba(#000, 0.2);
    cursor: pointer;
  }
}
</style>
