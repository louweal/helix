<template>
  <div id="top">
    <div class="bg"></div>
    <!-- <pre-loader /> -->

    <!-- <div class="wrapper" ref="wrapper"> -->
    <template v-if="windowWidth < 800">
      <Header fixed />

      <transition v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter">
        <Nuxt />
      </transition>

      <Footer />
    </template>

    <template v-else>
      Please view this app on a mobile device (or resize your browser window and
      refresh) todo change windowWidth on resize
    </template>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: "Default",

  computed: {
    windowWidth() {
      return window.innerWidth;
    },
  },

  methods: {
    beforeEnter: function (el) {
      if (this.$route.hash[0] !== "#") {
        window.scrollTo(0, 0);
      }
    },

    afterEnter: function (el, done) {},

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
  },

  mounted() {
    this.aos();
    window.addEventListener("scroll", this.aos);

    let gaScript = document.createElement("script");
    gaScript.setAttribute(
      "src",
      "https://www.googletagmanager.com/gtag/js?id=G-HNSQMHP9VF"
    );
    document.head.appendChild(gaScript);
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-HNSQMHP9VF");
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.sos);
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
}
</style>