<template>
  <div>
    <div class="form-check" v-for="(o, i) in $options.sortOptions" :key="i">
      <input
        name="sortOptions"
        class="form-check-input"
        type="radio"
        :id="'radio_' + i"
        @change="setSort(o)"
        :checked="
          $store.state.data.sortBy.field === o.field &&
          $store.state.data.sortBy.group === o.group &&
          $store.state.data.sortBy.direction === o.direction
        "
      />
      <label class="form-check-label" :for="'radio_' + i">
        {{ o.name }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  sortOptions: [
    {
      name: "Newest",
      group: "contract",
      field: "startdate",
      direction: 1,
    },
    {
      name: "Oldest",
      group: "contract",
      field: "startdate",
      direction: -1,
    },
    {
      name: "Product name",
      group: "product",
      field: "name",
      direction: -1,
    },
    {
      name: "Store",
      group: "store",
      field: "name",
      direction: -1,
    },
    {
      name: "Deposit: Lowest to highest",
      group: "contract",
      field: "deposit",
      direction: -1,
    },
    {
      name: "Deposit: Highest to lowest",
      group: "contract",
      field: "deposit",
      direction: 1,
    },
  ],

  methods: {
    setSort(o) {
      this.$store.commit("data/setSortBy", {
        group: o.group,
        field: o.field,
        direction: o.direction,
      });
      this.$store.commit("modals/hide");
    },
  },
};
</script>

<style></style>
