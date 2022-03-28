<template>
  <div class="tabs">
    <div class="tabs__header">
      <div class="tabs__nav">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{ 'tabs__label--active': activeTab === tab }"
          class="tabs__label"
          @click="setActiveTab(tab)"
        >
          {{ tab }}
        </div>
      </div>
    </div>
    <div class="tabs__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",

  data() {
    return {
      activeTab: "",
      tabs: [],
    };
  },

  mounted() {
    this.tabs = this.$children.map((child) => child.label);
    this.setActiveTab(this.tabs[0]);
  },

  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
  },
};
</script>

<style lang="scss">
.tabs {
  &__nav {
    display: flex;
  }

  &__label {
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: border-color 0.2s ease-in;

    &:hover {
      border-color: get-color(meta);
    }

    &--active {
      border-color: get-color(accent);
    }
  }

  &__content {
    padding: 1rem 0;
  }
}
</style>
