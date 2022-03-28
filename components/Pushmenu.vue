<template>
  <nav class="pushmenu">
    <ul>
      <li class="delay-0" @click="togglePushmenu">
        <nuxt-link to="/" class="fs-5xl">Home</nuxt-link>
      </li>
      <li class="delay-200" @click="togglePushmenu">
        <!-- <a href="#about" class="fs-5xl">About</a> -->
        <nuxt-link to="/about" class="fs-5xl">Over ons</nuxt-link>
      </li>
      <li class="delay-400" @click="togglePushmenu">
        <nuxt-link to="/gold" class="fs-5xl">Werkwijze</nuxt-link>
      </li>
      <li class="delay-400" @click="togglePushmenu">
        <nuxt-link to="/silver" class="fs-5xl">Tarieven</nuxt-link>
      </li>
      <li class="delay-600" @click="togglePushmenu">
        <nuxt-link to="#contact" class="fs-5xl">Contact</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.pushmenu {
  font-size: 16px;
  width: 100%;
  height: 100vh;
  z-index: 3;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 1) 30%,
    rgba(#403345, 1) 100%
  );
  @include fix;
  transform: translateY(-100%);
  opacity: 0;
  transition: all 0.4s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  li {
    opacity: 0;
    font-family: $heading-font;
    line-height: 110px;
    transition: opacity 0.4s 0.4s linear;
  }

  li.delay-200 {
    transition-delay: 0.4s + 200ms;
  }

  li.delay-400 {
    transition-delay: 0.4s + 400ms;
  }

  li.delay-600 {
    transition-delay: 0.4s + 600ms;
  }

  a {
    font-family: $heading-font;
    line-height: 110px;
    // transition: color 0.3s ease-in;
  }

  &--active {
    transform: translateY(0);
    opacity: 1;

    li {
      opacity: 1 !important;
    }
  }
}
</style>

<script>
export default {
  name: "Pushmenu",

  methods: {
    togglePushmenu() {
      let pushmenu = document.querySelector(".pushmenu");
      // console.log(pushmenu);
      pushmenu.classList.toggle("pushmenu--active");

      let hamburger = document.querySelector(".hamburger");
      // console.log(hamburger);
      hamburger.classList.toggle("hamburger--active");
    },
  },
};
</script>
