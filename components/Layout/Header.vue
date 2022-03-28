<template>
  <div>
    <span id="header"><!-- scroll anchor --></span>

    <header
      class="header"
      :class="fixed ? `header--fixed` : false"
      ref="header"
    >
      <categories />
    </header>

    <div ref="pushdown" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      prevPosY: 0,
    };
  },

  props: {
    fixed: {
      type: Boolean,
      default: false,
    },
  },

  computed: {},
  mounted() {
    let header = this.$refs["header"];

    if (header.classList.contains("header--fixed")) {
      window.addEventListener("scroll", this.aosHeader);

      this.setPushdownHeight();
      window.addEventListener("resize", this.setPushdownHeight);
    }
  },

  methods: {
    setPushdownHeight() {
      let header = this.$refs["header"];
      let pushdown = this.$refs["pushdown"];
      pushdown.style.height = header.offsetHeight + "px";
    },

    aosHeader() {
      let header = this.$refs["header"];
      let scrollY = window.pageYOffset; //window.scrollY || document.documentElement.scrollTop;
      let direction = scrollY > this.prevPosY ? "down" : "up";

      if (!header) {
        return;
      }

      if (
        direction === "down" &&
        scrollY > header.offsetHeight &&
        !header.classList.contains("move-up")
      ) {
        //move header upwards (i.e. hide header)
        header.classList.remove("move-down");
        header.classList.add("move-up");
      }

      if (direction === "up" && !header.classList.contains("move-down")) {
        // move header downwards (i.e. show header)
        header.classList.remove("move-up");
        header.classList.add("move-down");
      }

      // update previous scroll positon
      this.prevPosY = window.scrollY;
    },
  },
};
</script>

<style lang="scss" scoped>
.move-up {
  transform: translateY(-100%);
}

.move-down {
  transform: translateY(0);
}

.header {
  top: 0;
  // display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid get-color(line);
  box-shadow: 0px 4px 3px 0px rgba(0, 0, 0, 0.02);
  z-index: 11;
  transition: transform 0.4s ease-in-out;
  will-change: transform;

  &__inner {
    padding: 1.1rem 0;

    @include from(l) {
      padding: 1.1rem 0;
    }
  }

  &--fixed {
    position: fixed;
  }
}
</style>