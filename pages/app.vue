<template>
  <main>
    <div class="container-xl" v-if="this.$store.state.data.contracts">
      <!-- <div class="d-sm-none">
        <TransitionGroup name="list" tag="div">
          <contract-item-mobile :c="c" v-for="c in this.$store.state.data.contracts" :key="c.contract.id" />
        </TransitionGroup>
      </div> -->
      <div class="table-responsive d-none d-sm-block">
        <table class="table align-middle">
          <thead class="align-middle">
            <tr>
              <th scope="col" style="min-width: 100px"></th>
              <th scope="col">
                <div class="cp" @click="sortBy('contract', 'id')">
                  Contract ID
                  <caret group="contract" field="id" />
                </div>
              </th>

              <th scope="col" @click="sortBy('contract', 'startdate')">
                <div class="cp">
                  Start date
                  <caret group="contract" field="startdate" />
                </div>
              </th>
              <th scope="col " @click="sortBy('contract', 'enddate')">
                <div class="col-12 col-sm cp">
                  End date
                  <caret group="contract" field="enddate" />
                </div>
              </th>

              <th scope="col">
                <div @click="sortBy('product', 'name')" class="cp">
                  Product name
                  <caret group="product" field="name" />
                </div>
                <div class="font-small fw-light cp" @click="sortBy('store', 'name')">
                  Store
                  <caret group="store" field="name" />
                </div>
              </th>
              <th scope="col">
                <div>Received</div>
                <div class="font-small fw-light cp" @click="sortBy('contract', 'deposit')">
                  Total deposit
                  <caret group="contract" field="deposit" />
                </div>
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <!-- <TransitionGroup name="list" tag="tbody">
            <contract-item-desktop :c="c" v-for="(c, i) in $store.state.data.contracts" :key="c.contract.id" />
          </TransitionGroup> -->

          {{
            $store.state.data.contracts
          }}
        </table>
      </div>
    </div>

    <div v-else class="text-center">
      <p>No contracts found.</p>
    </div>

    <div class="position-fixed bottom-0 start-50 translate-middle d-sm-none">
      <div class="btn bg-light" @click="$store.commit('modals/show', { name: 'sort' })">
        <i class="bi bi-sort-down-alt"></i> Sort
      </div>
    </div>

    <modal name="sort" title="Sort contracts"> <modal-sort /> </modal>

    <modal name="transfer" title="Transfer ownership">
      <modal-transfer />
    </modal>
    <modal name="donate" title="Donate deposit">
      <modal-donate />
    </modal>

    <modal name="visual">
      <modal-visual />
    </modal>
  </main>
</template>

<script>
import demodata from "@/data/dummy.json";

export default {
  data() {
    return {
      numContracts: -1,
    };
  },
  async fetch() {
    if (!this.$store.state.accountId) {
      this.$store.commit("data/SET_DEMO_CONTRACTS", demodata);
    } else {
      if (this.$store.state.data.contracts.length === 0) {
        console.log("getting user contracts from Hedera network...");
        let numContracts = await this.$store.dispatch("data/getNumContracts");

        for (let i = 0; i < numContracts; i++) {
          let contractId = await this.$store.dispatch("data/getContractId", {
            accountId: this.$store.state.accountId,
            i: i,
          });

          console.log(contractId);
          if (contractId === "0.0.0") {
            continue; // skip deleted contracts
          }

          await this.$store.dispatch("data/getMetadata", { contractId, contractId, i: i });
        }
      }
    }
  },

  methods: {
    sortBy(group, field) {
      this.$store.commit("data/setSortBy", {
        group: group,
        field: field,
      });
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
