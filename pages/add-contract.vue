<template>
  <div class="page page--white">
    <back-button bg> Add contract </back-button>

    <div class="container">
      &nbsp;
      <div class="bottom-xs-3"></div>

      <div class="add-form">
        <input
          class="field field--light"
          type="text"
          placeholder="Product name"
        />

        <div
          class="field field--light field--upload"
          @click="toggleDrawer('#gallery-drawer')"
        >
          Upload image
        </div>

        <textarea
          class="field field--light field--textarea"
          placeholder="Product description (optional)"
        />

        <div class="field field--light field--dropdown" @click="toggleDropdown">
          {{ "Country of production" }}
        </div>
        <div class="field--dropdown--list">
          <ul>
            <li>China</li>
            <li>India</li>
            <li>Vietnam</li>
          </ul>
        </div>

        <textarea
          class="field field--light field--textarea"
          placeholder="Additional material information (optional)"
        />
      </div>
    </div>

    <drawer id="gallery-drawer">
      <template v-slot:header> Gallery (demo) </template>

      <div class="grid">
        <div class="col-xs-6" v-for="index in 8" :key="index">
          <div class="img ratio-1x1 img--light"></div>
        </div>
      </div>

      <Button class="button--primary button--fullwidth"> Confirm </Button>
    </drawer>
  </div>
</template>

<script>
export default {
  methods: {
    toggleDrawer(id) {
      let drawer = document.querySelector(id);
      // console.log(id);
      drawer.classList.toggle("drawer--active");
    },
  },
};
</script>

