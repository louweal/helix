<template>
  <div
    class="accordion-item"
    :class="isExpanded ? 'accordion-item--active' : false"
  >
    <div class="accordion-item__header" @click="isExpanded = !isExpanded">
      <Stack :gap="1.3">
        <icon v-if="icon" :icon="icon" size="lg" />
        <Heading level="3" size="m" class="bottom-xs-0" weight="400">
          {{ label }}
        </Heading>
      </Stack>
      <icon icon="chevron-down" class="accordion-item__icon" />
    </div>
    <transition name="expand">
      <div class="accordion-item__body" v-if="isExpanded">
        <div class="accordion-item__inner">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    level: {
      type: String,
      default: 3,
    },
    icon: {
      type: [String, Boolean],
      default: false,
    },
  },

  data() {
    return {
      isExpanded: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.accordion-item {
  position: relative;
  display: block;
  border-bottom: 1px solid get-color(line);

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 1rem 0;
  }

  &__icon {
    display: inline-flex;
    font-size: 1.5rem;
    transition: transform 0.25s ease-in;
  }

  &__body {
    overflow: hidden;
  }

  &__inner {
    // do not add margin or padding to __body!
    margin-bottom: 1.25rem;
  }

  &--active {
    .accordion-item__icon {
      transform: rotate(-180deg);
    }
  }
}

.expand-enter-active,
.expand-leave-active {
  height: auto;
  transition: all 0.4s ease-in;
}
.expand-enter,
.expand-leave-to {
  opacity: 0;
  height: 0;
}
</style>
