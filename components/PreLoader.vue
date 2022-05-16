<template>
  <div class="pre-loader">
    <div class="pre-loader__inner">
      <img
        src="@/assets/images/logo.svg"
        alt="logo"
        width="212.62"
        height="99.41"
      />

      <div class="bottom-xs-5"></div>

      <icon icon="refresh" />
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

  ::v-deep i {
    display: block;
    font-size: 1.8rem;
    font-weight: 700;
    color: get-color(primary);
    animation: rotate 2s ease-in-out infinite;
  }

  &__inner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center; //space-around;
    align-items: center;
  }
}

@keyframes disappear {
  to {
    transform: translateY(-100%);
  }
}

@keyframes rotate {
  to {
    transform: rotate(-360deg);
  }
}
</style>
