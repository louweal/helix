<template>
  <div>
    <!-- <pre-loader /> -->
    <div id="page">
      <div class="min-vh-100 d-flex flex-column justify-content-between">
        <div>
          <Header />

          <div
            id="pushdown"
            class="w-100 mb-2 mb-md-3 mb-lg-4"
            :class="$route.path === '/' ? 'd-none' : false"
          ></div>
          <Nuxt />
        </div>

        <Footer v-if="$route.path !== '/app'" />
      </div>
    </div>
    <modal name="connect" title="Connect">
      <modal-connect />
    </modal>
    <pushmenu />
    <notice v-if="$store.state.notice.active"> </notice>
  </div>
</template>

<script>
export default {
  transition: {
    name: "page",
    mode: "out-in",
  },
  async created() {
    let appMetadata = {
      name: "Helix",
      description: "Help the environment with Hedera Helix for Heroes",
      icon: this.$store.state.domain + "favicon.png",
    };

    console.log("in created!!!");

    if (process.env.MY_ACCOUNT_ID) {
      this.$store.commit("setAccountId", process.env.MY_ACCOUNT_ID);
    }

    this.$hashconnect.foundExtensionEvent.on((data) => {
      console.log("foundExtensionEvent", data);
      this.$store.commit("setFoundExtension", data);
    });

    this.$hashconnect.pairingEvent.once((data) => {
      this.$store.commit("setPairingData", data);
    });

    //This is fired when HashConnect loses connection, pairs successfully, or is starting connection
    this.$hashconnect.connectionStatusChangeEvent.on((status) => {
      console.log("hashconnect state change event", status);
    });

    this.$hashconnect.acknowledgeMessageEvent.once((acknowledgeData) => {
      //do something with acknowledge response data
      console.log("acknowledgeMessageEvent:");
      console.log(acknowledgeData);
    });

    this.$hashconnect.connectionStatusChangeEvent.once((connectionStatus) => {
      //do something with connection status
      console.log("connectionStatusChangeEvent");
      console.log(connectionStatus);
    });

    this.$hashconnect.init(appMetadata, this.$network, false);
  },

  async mounted() {
    let headerHeight = document.querySelector("#header").offsetHeight; //refs ?
    let pushdown = document.querySelector("#pushdown"); // refs?
    pushdown.style.height = headerHeight + "px";
  },

  watch: {
    "$store.state.modals.disableScroll": function (val) {
      if (val) {
        // this.posY = window.scrollY;
        document.body.style.top = `-${window.scrollY}px`;
      }
      document.body.classList.toggle("disable-scroll");
    },
  },
};
</script>

<style lang="scss" scoped></style>
