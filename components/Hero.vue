<template>
  <div class="hero min-vh-100 d-flex align-items-center mb-3">
    <div class="hero--bg"></div>

    <div class="hero--inner w-100">
      <div class="container-xl align-self-center">
        <div class="row">
          <div class="col-12 col-lg-8">
            <vue-typed-js
              data-aos="fade-up-scale"
              data-aos-duration="1000"
              :strings="['emission', 'pollution', 'waste']"
              :loop="true"
              :typeSpeed="90"
              :backSpeed="80"
              :startDelay="1300"
            >
              <h1 class="hero--title display-1 lh-sm pb-5">
                Together we can reduce <span class="typing">waste</span>
              </h1>
            </vue-typed-js>

            <h2
              class="hero--intro"
              data-aos="fade-up-scale"
              data-aos-duration="1000"
            >
              Join the sustainability revolution and make a positive impact on
              the planet with Helix. Partner with us today and start making a
              difference!
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.hero {
  background-color: #000;
  position: relative;

  &--inner {
    z-index: 2;
  }

  &--title {
    color: #fff;

    min-height: 245px;
    span {
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: white;
      color: transparent;
    }
  }

  &--intro {
    font-size: 1.625rem;
    font-family: $font-family-base;
    color: #fff;
    line-height: 1.5;
  }

  &--bg {
    // background-color: #000;
    overflow: hidden;
    z-index: 1;
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100vw;
    background-image: url("@/images/earth.png");
    background-size: 240%;
    background-repeat: no-repeat;
    background-position: -40vw 0;
    filter: hue-rotate(-35deg);
    opacity: 0;
    animation: fadeIn 1s 0.1s cubic-bezier(0.2, 0, 0.1, 1) forwards;

    @include media-breakpoint-up(lg) {
      background-size: 100%;
      background-position: 25vw 5vh;
    }
  }
}
</style>
