<template>
  <div
    class="modal"
    :class="
      $store.state.modals.show === name ? 'modal--active' : 'modal--inactive'
    "
  >
    <div
      class="modal__bg cursor-pointer"
      @click="$store.commit('modals/hide')"
    ></div>
    <div class="modal__inner">
      <div class="modal__content p-3 rounded border">
        <div class="d-flex justify-content-between mb-3">
          <!-- <div class="p-3"></div> -->
          <h5 class="modal-title fs-5 align-self-center">{{ title }}</h5>

          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="$store.commit('modals/hide')"
          ></button>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "Connect",
    },
    title: {
      type: String,
      default: "",
    },
  },

  methods: {},
};
</script>

<style lang="scss">
.modal {
  width: 100%;
  height: 100vh;
  z-index: 1055;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  visibility: hidden;

  &__bg {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(222, 222, 222, 0.4);
    opacity: 0;
    visibility: hidden;
    backdrop-filter: blur(4px);
  }

  &__inner {
    width: 500px;
    margin: 0 auto;
    min-height: 100vh; //calc(100% - 2rem);
    padding: 6px 0;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  &__content {
    background-color: #fff;
    width: calc(100% - 1.6rem);
    margin: 0.8rem;
    transform: translateY(100px);
    visibility: hidden;
  }

  &--active {
    visibility: visible;

    .modal__bg {
      opacity: 1;
      visibility: visible;
      transition: all 0.5s linear;
    }

    .modal__content {
      visibility: visible;
      transform: translateY(0);
      transition: all 0.4s 0.4s cubic-bezier(0.2, 0, 0.1, 1);
    }
  }

  &--inactive {
    visibility: hidden;

    .modal__bg {
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s 0.15s linear;
    }

    .modal__content {
      visibility: hidden;
      opacity: 0;
      transform: translateY(100px);
      transition: all 0.3s cubic-bezier(0.2, 0, 0.1, 1);
    }
  }
}
</style>
