<!--- usage example 1:
  <Dropdown
    :options="[
      { label: '10 km', value: 10 },
      { label: '20 km', value: 20 },
      { label: '50 km', value: 50, default: true },
      { label: '80 km', value: 80 },
      { label: 'Alles', value: 9999999999 },
    ]"
  />

usage example 2 (using the named slots):<template>
  
  <dropdown>
    <template #default>
      <span>{{$i18n.locales.filter((l) => l.code == $i18n.locale)[0].name}}</span>
    </template>

    <template #options>
      <lang-switcher />
    </template>
  </dropdown>
</template>
-->

<template>
  <div class="dropdown" @click="toggle" ref="dropdown">
    <slot name="default">
      <span v-if="label" style="font-weight: 700">{{ label }}</span>
      <span v-else>{{ defaultVal }}</span>
    </slot>
    <slot name="options">
      <ul>
        <li
          v-for="(option, index) in options"
          :key="index"
          :data-value="option.value"
          @click="handleInput"
        >
          {{ option.label }}
        </li>
      </ul>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: [Array, Object, Boolean],
      default: () => {},
    },
    defaultVal: {
      type: String,
      default: "Select",
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
      label: null,
    };
  },

  mounted() {
    if (this.options) {
      let defaultOption = this.options.filter((opt) => opt.default === true);
      if (defaultOption.length === 1) {
        this.val = defaultOption[0].value;
        this.label = defaultOption[0].label;
        this.$emit("input", {
          val: this.val,
        });
      } else if (defaultOption.length > 1) {
        console.log("Too many default values provided");
      }
    }
  },

  methods: {
    handleInput(e) {
      // console.log(e.target.dataset.value);
      this.$emit("input", {
        index: this.index,
        val: e.target.dataset.value,
      });
      this.val = e.target.innerText;
      this.label = e.target.innerText;
    },
    toggle() {
      let dropdown = this.$refs["dropdown"];
      if (dropdown) {
        //   console.log("toggled!");
        if (!dropdown.classList.contains("dropdown--active")) {
          dropdown.classList.add("dropdown--active");
        } else {
          dropdown.classList.remove("dropdown--active");
        }
        this.active = !this.active;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown--active {
  ::v-deep ul {
    opacity: 1;
    visibility: visible !important;
    animation: slide-in 0.3s cubic-bezier(0.2, 0, 0.1, 1) both;
  }
}

.dropdown {
  position: relative;
  // min-width: 167px;
  border: $input-border-width solid $input-border-color;
  border-radius: $input-border-radius;
  transition: all 0.3s ease-in;
  background-color: $input-background-hover-color;
  padding-top: $input-spacing !important; // * 0.42; // magic ...
  padding-bottom: $input-spacing; // * 0.42; // more magic ...
  font-size: $input-font-size;
  min-width: 106px;

  &:hover {
    // background-color: $input-background-color;
    cursor: pointer;
  }

  &:active {
    background-color: $input-background-hover-color;
  }

  span {
    width: 100%;
    height: 100%;
    font-style: italic;

    // padding-left: 1.5rem;
  }

  &::after {
    position: absolute;
    content: "\e90c";
    font-family: icomoon-helix;
    right: 0;
    top: $input-spacing * 0.1;
    height: 100%;
    width: 30px;
    line-height: 40px;
  }

  ::v-deep ul {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50px;
    left: 0;
    opacity: 0;
    // background-color: #fff;
    // border: 1px solid red;
    visibility: hidden;
    z-index: 3;

    // margin: 0;

    li {
      // line-height: 40px;
      background-color: rgba($input-background-color, 0.88);
      padding-left: 1.5rem;
      padding-top: $input-spacing * 0.42; // magic ...
      padding-bottom: $input-spacing * 0.42; // more magic ...
      // box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.29);
      margin-top: -1px; // because some browsers show a small gap

      &:first-of-type {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }

      &:last-of-type {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }

      &:hover {
        background-color: $input-background-hover-color;
      }
    }
  }
}
</style>
