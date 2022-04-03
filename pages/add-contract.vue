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

        <dropdown
          @input="getCountry"
          class="field field--light"
          defaultVal="Country of production"
          :options="[
            { label: 'China', value: 'china' },
            { label: 'India', value: 'india' },
            { label: 'Vietnam', value: 'vietnam' },
            { label: 'Germany', value: 'germany' },
          ]"
        />

        <dropdown
          @input="getNumMaterials"
          class="field field--light"
          defaultVal="Number of materials"
          :options="[
            { label: '1 material', value: 1 },
            { label: '2 materials', value: 2 },
            { label: '3 materials', value: 3 },
            { label: '4 materials', value: 4 },
            { label: '5 materials', value: 5 },
            { label: '6 materials', value: 6 },
            { label: '7 materials', value: 7 },
          ]"
        />

        <div class="grid align-xs-middle">
          <template v-for="(material, index) in numMaterials">
            <div class="col-xs-2" :key="'i' + index">{{ index + 1 }}</div>
            <div class="col-xs-10" :key="index">
              <dropdown
                @input="getMaterial"
                :index="index"
                :key="index"
                class="field field--light"
                :defaultVal="`Material ${index + 1}`"
                :options="$options.materials"
              />
            </div>
            <div class="col-xs-12" :key="'sub' + index">
              <!-- <template v-if="subMaterials[index]"> -->
              <!-- {{ subMaterials[index] }} -->
              <dropdown
                @input="getSubMaterial"
                :index="index"
                :key="index"
                class="field field--light"
                :defaultVal="`Specify`"
                :options="subMaterials[index]"
              />
              <!-- </template> -->
            </div>
          </template>
        </div>

        <!-- <heading size="l" level="2" class="bottom-xs-0">Materials (2)</heading> -->

        <!-- <categories />

        <categories />

        <Button class="button--primary">Add another material</Button> -->

        <textarea
          class="field field--light field--textarea"
          placeholder="Additional material information (optional)"
        />

        <dropdown
          @input="getCharity"
          class="field field--light"
          defaultVal="Choose charity to support"
          :options="allCharities"
        />

        <heading size="l" level="2" class="bottom-xs-0"
          >Contract summary</heading
        >

        <lorem :max="100" />

        <Button class="button--primary button--fullwidth">
          Create contract
        </Button>

        <div class="bottom-xs-5"></div>
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
import Vue from "vue";
import accounts from "~/data/accounts.json";

export default {
  accounts,

  materials: ["Wood", "Glass", "Textile", "Metal"].map((m) => ({
    label: m,
    value: m.toLowerCase(),
  })),
  wood: ["oak", "pine", "teak", "beech", "ash"].map((m) => ({
    label: m,
    value: m.toLowerCase(),
  })),
  metal: ["silver", "gold", "lithium"].map((m) => ({
    label: m,
    value: m.toLowerCase(),
  })),
  textile: ["cotton", "bio cotton", "silk", "wool", "nylon", "polyester"].map(
    (m) => ({
      label: m,
      value: m.toLowerCase(),
    })
  ),

  data() {
    return {
      numMaterials: 0,
      materials: () => [],
      subMaterials: () => [],
    };
  },

  computed: {
    allCharities() {
      return this.$options.accounts
        .filter((a) => a.charity)
        .map(({ name }) => ({ label: name, value: name.toLowerCase() }));
    },
  },

  methods: {
    toggleDrawer(id) {
      let drawer = document.querySelector(id);
      // console.log(id);
      drawer.classList.toggle("drawer--active");
    },

    getNumMaterials(data) {
      console.log(data.val);
      let num = +data.val;
      this.numMaterials = num;
      this.materials = new Array(num);
      this.subMaterials = new Array(num);
    },

    getMaterial(data) {
      console.log(data.val);
      this.materials[data.index] = data.val;

      console.log(this.$options[data.val]);

      Vue.set(this.subMaterials, data.index, this.$options[data.val]);
      // this.subMaterials[data.index] = this.$options[data.val];

      console.log(this.subMaterials);
    },

    getSubMaterial(data) {
      //todo
    },

    getCountry(data) {
      console.log(data.val);
    },
    getCharity(data) {
      console.log(data.val);
    },
  },
};
</script>
