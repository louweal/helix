<template>
  <div>
    <span id="header"><!-- scroll anchor --></span>

    <header
      class="header"
      :class="fixed ? `header--fixed` : false"
      ref="header"
    >
      <div class="container container--wide">
        <slot>
          <add-button />
        </slot>
      </div>
    </header>

    <div ref="pushdown" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      prevPosY: 0,
      seller: true,
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

  beforeDestroy() {
    window.removeEventListener("resize", this.setPushdownHeight);
  },
  methods: {
    setPushdownHeight() {
      let header = this.$refs["header"];
      let pushdown = this.$refs["pushdown"];
      pushdown.style.height = "58px"; //header.offsetHeight + "px";
    },

    aosHeader() {
      let header = this.$refs["header"];
      let scrollY = window.pageYOffset;
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
  background-color: transparent;
  z-index: 11;
  transition: transform 0.4s ease-in-out;
  will-change: transform;
  padding: 6px 4px 6px 4px;

  &--fixed {
    position: fixed;
  }
}
</style>
