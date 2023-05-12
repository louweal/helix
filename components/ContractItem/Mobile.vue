<template>
  <div class="item position-relative">
    <div class="row g-2">
      <div
        class="col-3"
        @click="$store.commit('modals/show', { name: 'visual', data: c })"
      >
        <visual :product="c.product" />
      </div>
      <div class="col-9 align-self-center" @click="toggleDetails()">
        <div class="fw-bold text-primary">{{ c.product.name }}</div>
        <div class="font-xxs fw-light">{{ c.store.name }}</div>
      </div>
    </div>

    <div
      v-if="c.product.amount > 1"
      class="position-absolute bg-primary rounded-circle start-0 top-0 text-white py-1 px-2 ms-2 mt-2"
    >
      {{ c.product.amount }}X
    </div>

    <table class="table table-striped table-borderless mt-2" v-if="show">
      <tbody>
        <tr>
          <th scope="row">Contract ID</th>
          <td><contract-id :id="c.contract.id" /></td>
        </tr>
        <tr>
          <th scope="row">Start date</th>
          <td><formatted-date :date="c.contract.startdate" /></td>
        </tr>
        <tr>
          <th scope="row">End date</th>
          <td><formatted-date :date="c.contract.enddate" /></td>
        </tr>
        <tr>
          <th scope="row">Received</th>
          <td>€0,-</td>
        </tr>
        <tr>
          <th scope="row">Total deposit</th>
          <td>€{{ c.contract.deposit }}</td>
        </tr>
        <tr>
          <th scope="row">Actions</th>
          <td>
            <span
              class="text-primary"
              @click="
                $store.commit('modals/show', { name: 'transfer', data: c })
              "
              >Transfer ownership</span
            >
            <br />
            <span
              class="text-secondary"
              @click="$store.commit('modals/show', { name: 'donate', data: c })"
              >Donate deposit</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  props: {
    c: {
      type: [Object, Array],
      default: () => {},
    },
  },
  computed: {
    transferModalName() {
      return "transfer_" + this.c.contract.id;
    },
    donateModalName() {
      return "donate_" + this.c.contract.id;
    },
    visualModalName() {
      return "visual_" + this.c.contract.id;
    },
  },

  methods: {
    toggleDetails() {
      this.show = !this.show;
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  background-color: #fff;
  border-radius: 20px !important;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
}
</style>
