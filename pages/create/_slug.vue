<template>
  <main v-if="order">
    <section>
      <div class="container-xl">
        <div class="row">
          <div class="col-12 col-md-6 align-self-center">
            <badge>Deposit bill</badge>

            <h2>A little money can make a big difference</h2>

            <p>
              On {{ order.meta.order_date }} you visited
              {{ order.meta.store }} and bought {{ numProducts }} products.
              {{ order.meta.store }}
              is dedicated to support global sustainability goals, such as
              reducing carbon emissions, conserving resources, and minimizing
              waste.
            </p>
            <p>
              {{ order.meta.store }} has carefully calculated a deposit for each
              product in your order and kindly asks you to pay these deposits.
              Currently, you can only pay this bill with a Hedera wallet (via
              Hashpack). Thank you for shopping consiously!
            </p>

            <p></p>

            <!-- <div class="d-grid gap-2 mb-3"> -->
            <button
              class="btn btn-primary mb-4"
              type="button"
              @click="
                $store.state.accountId
                  ? createContracts()
                  : $store.commit('modals/show', { name: 'connect' })
              "
            >
              Pay {{ totalBill }} <i>ħ</i> deposit
            </button>
          </div>
          <!-- </div> -->

          <div class="col-12 col-md-6">
            <img
              key="how-1"
              src="@/images/contribute.jpg"
              alt="contribute sustainability"
              class="rounded w-100"
            />
          </div>
        </div>
      </div>
    </section>

    <section id="about">
      <div class="container-xl">
        <div class="row justify-content-center text-center">
          <div class="col-12 col-md-8">
            <h2 class="lh-sm" data-aos="fade-up-scale">
              You'll will get up to 60% of the deposit back during the lifespan
              of the product and you can donate 10% or more to your favorite
              environmental charity.
            </h2>
          </div>
          <div class="col-12 col-md-10">
            <p data-aos="fade-up-scale">
              When you pay the deposit we will create the following
              {{ numContracts }} smart contracts. The duration of each contract
              is equal to the expected lifespan and the start date of all
              contracts is equal to the order date of your order.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container-xl">
        <div class="row justify-content-center">
          <div class="col-6 col-md-5">
            <h3 class="mb-0">Contracts</h3>
          </div>
          <div class="col-6 col-md-3 text-end align-self-center">
            <div class="vstack font-small">
              <span>Order ID: {{ order.meta.order_id }}</span>
              <span>Order date: {{ order.meta.order_date }}</span>
            </div>
          </div>
          <div class="col-12 col-md-8 border-md-top mt-3">
            <div class="d-sm-none">
              <create-contract-item-mobile
                :p="p"
                :meta="order.meta"
                v-for="(p, i) in this.order.products"
                :key="i"
              />
            </div>

            <div class="table-responsive d-none d-sm-block">
              <table class="table align-middle">
                <thead class="align-middle">
                  <tr>
                    <th scope="col" style="width: 130px"></th>
                    <th scope="col">Name</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Deposit</th>
                  </tr>
                </thead>
                <tbody>
                  <create-contract-item-desktop
                    :p="p"
                    :meta="order.meta"
                    v-for="(p, i) in order.products"
                    :key="i"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container-xl">
        <badge>FAQs</badge>
        <h2>Quick anwsers</h2>

        <p>
          Don’t see your answer?
          <nuxt-link to="/contact" class="border-bottom cp">
            Reach out to us, we’d love to help!
          </nuxt-link>
        </p>
        <div class="accordion" data-aos="fade-up-scale">
          <accordion-item
            name="how"
            slug="learn"
            :title="`Will ${order.meta.store} receive my deposits?`"
          >
            <div class="row">
              <div class="col-12 col-md-6">
                <p>
                  No, {{ order.meta.store }} will not receive your deposit. Your
                  deposits will be stored securely on the Hedera Hashgraph
                  network within a so-called <i>smart contract</i>. It will stay
                  there until <b>you</b> decide otherwise. Simply visit this
                  website again if you wish to collect or donate (part of) your
                  deposits in the future.
                </p>
              </div>
            </div>
          </accordion-item>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import demodata from "@/data/dummyorder.json";

export default {
  data() {
    return {
      order: undefined,
    };
  },

  demodata,

  computed: {
    totalBill() {
      return this.order.products
        .map((p) => p.deposit)
        .reduce((partialSum, a) => partialSum + a, 0);
    },
    numContracts() {
      return this.order.products.length;
    },

    numProducts() {
      return this.order.products
        .map((p) => p.amount)
        .reduce((partialSum, a) => partialSum + a, 0);
    },
  },

  mounted() {
    this.decode();
  },

  beforeDestroy() {
    console.log("hide");
    this.$store.commit("notice/hide");
  },

  methods: {
    decode() {
      let encoded = this.$route.params.slug;

      if (encoded) {
        let decoded = Buffer.from(encoded, "base64").toString();
        console.log("decoded :>> ", decoded);
        this.order = JSON.parse(decoded);
      } else {
        console.log("use demodata");
        this.order = this.$options.demodata;
        console.log(this.order.meta);
        this.$store.commit("notice/show");
      }
    },

    async createContracts() {
      console.log("clicked create");
      // console.log(this.order.meta);
      // console.log(this.order.products.length);
      let products = this.order.products;
      let meta = this.order.meta;
      for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let amount = 1;

        if (product.amount && product.amount > 1) {
          for (let j = 1; j <= product.amount; j++) {
            await this.$store.dispatch("data/addSmartContract", {
              ...meta,
              ...product,
            });
          }
        } else {
          await this.$store.dispatch("data/addSmartContract", {
            ...meta,
            ...product,
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  border-collapse: separate;
  border-spacing: 0 1rem;
}
</style>
