<template>
  <div class="pre-loader">
    <div class="pre-loader__inner">
      <img src="@/assets/images/logo.svg" alt="logo" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.pre-loader {
  background-color: #fff;
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100%;
  z-index: 3000;
  overflow: hidden;
  animation: disappear 0.3s 2.1s ease-in forwards;
  padding: 1.2rem;

  &__inner {
    background-color: get-color(light);
    border-radius: 1rem;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 275px;
    animation: disappear 2s 0s reverse cubic-bezier(0.2, 0, 0.1, 1) forwards; // makes the image appear slowly

    @include from(l) {
      width: 538px;
    }
  }
}

@keyframes disappear {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
}
</style>