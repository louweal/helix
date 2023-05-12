<template>
  <div>
    <div class="accordion-item" @click="toggle()">
      <button
        class="accordion-button"
        :class="isActive ? 'accordion-button--active' : false"
      >
        {{ title }}
      </button>
      <div v-if="isActive" class="accordion-collapse">
        <div class="accordion-body">
          <slot>
            <p>
              Morbi quam sed auctor pellentesque sed. Mauris iaculis nunc odio
              faucibus amet tempor mattis quis. Turpis amet phasellus nunc
              malesuada.
            </p>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      // accordion name which the item is in
      type: String,
      default: "",
      required: true,
    },
    slug: {
      // slug of the item
      type: String,
      default: "",
      required: true,
    },
    title: {
      type: String,
      default: "Lorem ipsum dolor sit amet",
    },
  },

  computed: {
    isActive() {
      return this.$store.state.accordions.list[this.name] === this.slug;
    },
  },

  methods: {
    toggle() {
      console.log("toggle!");
      this.$store.commit("accordions/toggle", {
        name: this.name,
        item: this.slug,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.accordion-collapse {
  opacity: 0;
  animation: fadeIn 0.3s ease-in forwards;
}

$accordion-icon-color: "black";

button.accordion-button {
  color: $headings-color;
}

.accordion-button {
  &:hover {
    &::after {
      background-color: $primary;
      $accordion-icon-color: "white";
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#{$accordion-icon-color}' class='bi bi-plus-lg' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z'/%3E%3C/svg%3E");
    }
  }
  &::after {
    background-color: $light;
    transition: all 0.9s cubic-bezier(0.2, 0, 0.1, 1);
    border-radius: 50%;
    padding: 15px;
    background-position: center;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#{$accordion-icon-color}' class='bi bi-plus-lg' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z'/%3E%3C/svg%3E");
  }
}
.accordion-button--active {
  &:hover {
    &::after {
      $accordion-icon-color: "white";
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#{$accordion-icon-color}' class='bi bi-dash-lg' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z'/%3E%3C/svg%3E");
    }
  }
  &::after {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#{$accordion-icon-color}' class='bi bi-dash-lg' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z'/%3E%3C/svg%3E");
  }
}
</style>
