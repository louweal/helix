<template>
  <main>
    <!-- <pre-loader /> -->

    <template v-if="width >= 800">
      <div class="container container--wide">
        <notification>
          <p>Switch to a mobile device for better user experience.</p>
          <p>
            <a href="https://helixheroes.org">helixheroes.org</a>
          </p>
        </notification>
      </div>
    </template>

    <Nuxt />

    <Footer />
  </main>
</template>

<script>
export default {
  name: "Default",

  transition: "page",

  data() {
    return {
      width: document.documentElement.clientWidth,
    };
  },

  methods: {
    aos() {
      // console.log("aos");
      let animTargets = document.querySelectorAll("[data-aos]");
      [].forEach.call(animTargets, (target) => {
        let startAt = parseInt(target.dataset.aos);
        let rect = target.getBoundingClientRect();
        let elemTop = rect.top;

        target.style.opacity = "0"; // hide element by default

        let startTrigger =
          elemTop < window.innerHeight * (startAt / 100) && elemTop > 0;

        if (startTrigger) {
          if (!target.classList.contains("start-animation")) {
            target.classList.add("start-animation");
          }
        }
      });
    },

    getWidth() {
      this.width = document.documentElement.clientWidth;
    },
  },

  mounted() {
    this.aos();
    window.addEventListener("scroll", this.aos);

    this.getWidth();
    window.addEventListener("resize", this.getWidth);

    // let gaScript = document.createElement("script");
    // gaScript.setAttribute(
    //   "src",
    //   "https://www.googletagmanager.com/gtag/js?id=G-HNSQMHP9VF"
    // );
    // document.head.appendChild(gaScript);
    // window.dataLayer = window.dataLayer || [];

    // function gtag() {
    //   dataLayer.push(arguments);
    // }
    // gtag("js", new Date());
    // gtag("config", "G-HNSQMHP9VF");
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.sos);
    window.removeEventListener("resize", this.getWidth);
  },
};
</script>

<style lang="scss" scoped>
main {
  position: relative;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter,
.page-leave-to {
  opacity: 0.5;
  // transform: translateY(40px);
}

// .rtl-enter-active,
// .rtl-leave-active {
//   transition: all 0.5s;
// }
// .rtl-enter {
//   transform: translateX(40px);
// }
// .rtl-leave-to {
//   // opacity: 0;
//   transform: translateX(0px);
// }
</style>