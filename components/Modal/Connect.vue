<template>
  <div>
    <div class="text-center mb-2" v-if="hashpackError">
      <p class="text-danger">
        Unable to detect HashPack browser extension. Please, install the
        <a
          href="https://chrome.google.com/webstore/detail/hashpack/gjagmgiddbbciopjhllkdnddhcglnemk"
          target="_blank"
          >HashPack
          <i class="bi bi-box-arrow-up-right"></i>
        </a>
        browser extension from the Chrome Web Store.
      </p>
    </div>

    <div class="d-grid gap-2 mb-1">
      <div
        class="btn"
        :class="hashpackFound ? 'btn-primary cursor-pointer' : 'bg-light'"
        @click="hashpackFound ? signIn() : toggleHashpackError()"
      >
        HashPack
      </div>
    </div>
    <p class="text-center">
      <nuxt-link
        class="text-secondary"
        to="/app"
        event=""
        @click.native="
          $store.commit('modals/hide');
          $router.push('/app');
        "
        >or continue as guest</nuxt-link
      >
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: false,
      hashpackError: false,
    };
  },

  computed: {
    hashpackFound() {
      return this.$store.state.foundExtension.name === "HashPack";
    },
  },

  methods: {
    toggleHashpackError() {
      this.hashpackError = !this.hashpackError;
    },

    async signIn() {
      this.$hashconnect.connectToLocalWallet();

      this.$store.commit("modals/hide");
    },
  },
};
</script>

<style lang="scss"></style>
