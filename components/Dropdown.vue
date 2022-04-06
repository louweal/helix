<template>
  <div class="dropdown">
    <div class="dropdown__current" @click="toggle">
      <slot name="default">
        <span v-if="current" style="font-weight: 700">{{ current }}</span>
        <span v-else>{{ defaultVal }}</span>
      </slot>
    </div>
    <ul ref="dropdown" v-if="active">
      <slot name="options">
        <li
          v-for="(option, index) in options"
          :key="index"
          :id="option.id"
          :class="option.label === current ? 'active' : false"
          :data-value="option.value"
          @click="handleInput"
        >
          {{ option.label }}
        </li>
      </slot>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: [Array, Object, Boolean],
      default: () => {},
    },
    fieldName: {
      type: String,
      default: "test",
    },
    defaultVal: {
      type: [String, Boolean],
      default: false,
    },
    index: {
      // for material fields
      type: Number,
      default: -1,
    },
  },

  data() {
    return {
      val: null,
      current: null,
      active: false,
    };
  },

  computed: {
    theLabel() {
      if (!this.defaultVal) {
        let defaultOption = this.options.filter((o) => o.default === true);
        // console.log(defaultOption);
        if (defaultOption.length === 1) {
          defaultOption = defaultOption[0];
        } else {
          defaultOption = this.options[0]; //.set first option as default
        }

        return defaultOption.label;
      } else {
        return false;
      }
    },
  },

  mounted() {
    if (!this.defaultVal) {
      let defaultOption = this.options.filter((o) => o.default === true);
      if (defaultOption.length === 1) {
        defaultOption = defaultOption[0];
      } else {
        defaultOption = this.options[0]; //.set first option as default
      }

      this.val = defaultOption.value;
      this.current = defaultOption.label;
      // console.log("current: " + this.current);

      this.$emit(
        "input",
        {
          ID: defaultOption.id,
          index: this.index,
          val: defaultOption.value,
        },
        this.fieldName
      );
    }
  },

  methods: {
    handleInput(e) {
      // console.log(e.target.dataset.value);
      this.$emit(
        "input",
        {
          index: this.index,
          ID: e.target.id,
          val: e.target.dataset.value,
        },
        this.fieldName
      );
      this.val = e.target.innerText;
      this.current = e.target.innerText;
      this.active = !this.active;
    },
    toggle() {
      this.active = !this.active;
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  font-size: $input-font-size;
  min-width: 20px;
  margin-bottom: 4px;

  &--white {
    .dropdown__current {
      background-color: #fff;
      border: 1px solid get-color(line);
    }
  }

  &__current {
    border: $input-border-width solid $input-border-color;
    border-radius: $input-border-radius;
    background-color: $input-background-hover-color;
    padding-top: $input-spacing;
    padding-bottom: $input-spacing;
  }

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: $input-background-hover-color;
  }

  span {
    width: 100%;
    height: 100%;
    font-style: italic;
    padding-left: 4px;
  }

  &::after {
    position: absolute;
    content: "\e90c";
    font-family: icomoon-helix;
    right: 20px;
    top: $input-spacing * 0.1;
    height: 100%;
    width: 10px;
    line-height: 40px;
    z-index: 0;
  }

  ::v-deep ul {
    display: block;
    width: 100%;
    height: 100%;

    li {
      background-color: $input-background-color;
      padding-left: 4px;
      padding-top: $input-spacing * 0.42; // magic ...
      padding-bottom: $input-spacing * 0.42; // more magic ...
      box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.09);
      margin-top: -1px; // because some browsers show a small gap

      &.active {
        color: get-color(primary); //rgba(get-color(base-text), 0.6);
      }

      &:first-of-type {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
      &:not(:first-of-type) {
        border-top: 1px solid get-color(line);
      }

      &:last-of-type {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }

      &:hover {
        background-color: $input-background-color;
      }
    }
  }
}
</style>
