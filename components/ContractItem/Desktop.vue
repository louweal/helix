<template>
  <tr class="item">
    <td scope="row">
      <div
        class="ratio ratio-1x1 cp"
        @click="$store.commit('modals/show', { name: 'visual', data: c })"
      >
        <visual :product="c.product" />
      </div>
    </td>
    <td>
      <contract-id :id="c.contract.id" />
    </td>
    <td><formatted-date :date="c.contract.startdate" /></td>
    <td><formatted-date :date="c.contract.enddate" /></td>
    <td>
      <div class="fw-bold">{{ c.product.name }}</div>
      <div class="font-xxs fw-light">{{ c.store.name }}</div>
    </td>
    <td>
      <div class="fw-bold">€0</div>
      <div class="font-xxs fw-light">€{{ c.contract.deposit }}</div>
    </td>
    <!-- <td>
      <span
        class="text-primary cp"
        @click="$store.commit('modals/show', { name: 'transfer', data: c })"
        >Transfer ownership</span
      >
      <br />
      <span
        class="text-secondary cp"
        @click="$store.commit('modals/show', { name: 'donate', data: c })"
      >
        Donate deposit
      </span>
    </td> -->

    <div
      v-if="c.product.amount > 1"
      class="position-absolute bg-primary rounded-circle start-0 top-0 text-white px-2 ms-2 mt-2"
    >
      {{ c.product.amount }}X
    </div>
  </tr>
</template>

<script>
export default {
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
};
</script>

<style lang="scss" scoped>
tr {
  padding-bottom: 1rem;
}

.item {
  position: relative;
  &:hover {
    .visual {
      padding: 0;
    }
  }
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    content: "";
    background-color: #fff;
    border-radius: 20px !important;
    z-index: -1;
  }
}
</style>
