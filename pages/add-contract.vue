<template>
  <div class="page page--white">
    <back-button bg> Add contract </back-button>

    <div class="container">
      &nbsp;
      <div class="bottom-xs-3"></div>

      {{ makeContract }}

      <div class="add-form">
        <Section v-if="currentStep === 1">
          <div v-if="selectedImage">
            <div
              @click="toggleDrawer('#gallery-drawer')"
              class="field--upload img ratio-1x1 img--light"
              :style="{
                marginBottom: '4px',
                backgroundImage:
                  `url(` +
                  require(`~/assets/images/products/${selectedImage}`) +
                  `)`,
              }"
            ></div>
          </div>
          <div
            v-else
            class="field field--light field--upload"
            @click="toggleDrawer('#gallery-drawer')"
          >
            Upload image
          </div>

          <input
            class="field field--light"
            type="text"
            placeholder="Product name"
            @input="(e) => (title = e.target.value)"
          />

          <textarea
            class="field field--light field--textarea"
            placeholder="Product description (optional)"
          />
          <dropdown
            key="1"
            @input="getCategory"
            defaultVal="Product category"
            :options="$options.categories"
          />
          <dropdown
            key="2"
            @input="getDuration"
            defaultVal="Contract duration"
            :options="[{ label: '15 years', value: 15 }]"
          />

          <Button
            class="button--primary button--fullwidth"
            @click.native="showNextStep"
          >
            Next
          </Button>
        </Section>

        <Section v-if="currentStep === 2">
          <heading size="l" level="2" class="bottom-xs-0">
            Country of production
          </heading>
          <dropdown
            key="3"
            @input="getProdCountry"
            :options="$options.countriesOpt"
          />

          <heading size="l" level="2" class="bottom-xs-0"> Materials </heading>
          <dropdown
            key="4"
            @input="getNumMaterials"
            :options="[
              { label: '1 material', value: 1 },
              { label: '2 materials', value: 2 },
              { label: '3 materials', value: 3, default: true },
              { label: '4 materials', value: 4 },
              { label: '5 materials', value: 5 },
              { label: '6 materials', value: 6 },
              { label: '7 materials', value: 7 },
            ]"
          />

          <div class="grid no-bottom-margin-cols">
            <template v-for="(material, index) in numMaterials">
              <!-- <div class="col-xs-2" :key="'i' + index">{{ index + 1 }}</div> -->
              <div class="col-xs-12" :key="index">
                <dropdown
                  @input="getMaterial"
                  :index="index"
                  :key="index"
                  defaultVal="Group"
                  :options="materialGroups"
                />
              </div>
              <div class="col-xs-12" :key="'sub' + index">
                <dropdown
                  @input="getSubMaterial"
                  :index="index"
                  :key="index"
                  defaultVal="Type"
                  :options="subMaterials[index]"
                />
              </div>
            </template>
          </div>

          <textarea
            class="field field--light field--textarea"
            placeholder="Additional material information (optional)"
          />

          <Button
            v-if="selectedMaterials.length === numMaterials"
            class="button--primary button--fullwidth"
            @click.native="showNextStep"
          >
            Next
          </Button>
        </Section>

        <Section v-if="currentStep === 3">
          <heading size="l" level="2" class="bottom-xs-0"
            >Deposit summary</heading
          >

          <Table>
            <TR>
              <TD> Materials </TD>
              <TD> <badge :level="materialsAverageLabel" /> </TD>
              <TD align="right"> ℏ {{ materialsFeeSum }} </TD>
            </TR>
            <TR
              v-for="(row, index) in selectedMaterials"
              :key="'j' + index"
              :sub="true"
            >
              <TD> {{ row.name }} </TD>
              <TD>
                <badge :level="row.label.name" />
              </TD>
              <TD align="right"> ℏ {{ row.label.fee }} </TD>
            </TR>
            <TR>
              <TD> Product shipment </TD>
              <TD> <badge :level="productionCountryLabel" /> </TD>
              <TD align="right">
                ℏ
                {{ shipmentFee }}
              </TD>
            </TR>
          </Table>

          <deposit
            :value="totalFee"
            class="bottom-xs-1"
            label="total deposit"
          />

          <Button
            class="button--primary button--fullwidth"
            @click.native="showNextStep"
          >
            Next
          </Button>
        </Section>

        <Section v-if="currentStep === 4">
          <heading size="l" level="2" class="bottom-xs-0"> Charity </heading>
          <lorem :max="30" />
          <dropdown @input="getCharity" :options="allCharities" />

          <Button
            class="button--primary button--fullwidth bottom-xs-2"
            @click.native="createContract"
          >
            Create contract
          </Button>
        </Section>
      </div>
    </div>

    <drawer id="gallery-drawer">
      <template v-slot:header> Gallery (demo) </template>

      <div class="grid">
        <div
          class="col-xs-6"
          v-for="(image, index) in $options.images"
          :key="index"
        >
          <div
            @click="selectImage(image)"
            class="img ratio-1x1 img--light"
            :style="{
              backgroundImage:
                `url(` + require(`~/assets/images/products/${image}`) + `)`,
            }"
          ></div>
        </div>
      </div>

      <!-- <Button class="button--primary button--fullwidth"> Confirm </Button> -->
    </drawer>
  </div>
</template>

<script>
import Vue from "vue";
import accounts from "~/data/accounts.json";
import materials from "~/data/materials.json";
import countries from "~/data/countries.json";
import categories from "~/data/categories.json";
import labels from "~/data/labels.json";

export default {
  labels,
  accounts,
  materials,
  countries: countries,
  countriesOpt: [...countries]
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map(({ name }) => ({
      label: name,
      value: name.toLowerCase(),
    })),
  categories: categories.map(({ name }) => ({
    label: name,
    value: name.toLowerCase(),
  })),

  images: ["bunny.png", "fruit-basket.png", "pies.png", "pizza.png"],

  data() {
    return {
      currentStep: 1,
      numMaterials: 0,
      materials: () => [],
      subMaterials: () => [],
      selectedImage: false,
      title: false,
      category: false,
      productionCountry: false,
      selectedMaterials: [],

      contract: {},
    };
  },

  computed: {
    makeContract() {
      let allContracts = this.$store.state.contracts;
      let contract = {};

      contract.ID = Math.max(...allContracts.map((c) => c.ID)) + 1;
      console.log(contract.ID);

      return contract;
    },

    shipmentFee() {
      return this.$options.labels.find(
        (l) => l.name == this.productionCountryLabel
      ).fee;
    },

    totalFee() {
      let sum = this.shipmentFee + this.materialsFeeSum;
      return parseFloat(sum).toFixed(2).toString();
    },

    materialsAverageLabel() {
      let sum = this.selectedMaterials
        .map((m) => m.label.ID)
        .reduce((a, b) => a + b, 0);
      let avg = parseInt(sum / this.numMaterials);

      return this.$options.labels.find((l) => l.ID === avg).name;
    },

    materialsFeeSum() {
      let sum = this.selectedMaterials
        .map((m) => m.label.fee)
        .reduce((a, b) => a + b, 0);
      return sum;
    },

    allCharities() {
      return this.$options.accounts
        .filter((a) => a.charity)
        .map(({ name }) => ({ label: name, value: name.toLowerCase() }));
    },
    materialGroups() {
      return [...new Set(this.$options.materials.map((m) => m.parent).flat())]

        .map((m) => ({
          label: m,
          value: m.toLowerCase(),
        }))
        .sort((a, b) => (a.label > b.label ? 1 : -1));
    },
    currentCountry() {
      return this.$options.countries.find(
        (c) => c.name == this.$store.state.currentAccount.country
      );
    },
  },

  methods: {
    showNextStep() {
      this.currentStep += 1;
    },
    selectImage(image) {
      this.selectedImage = image;
      this.toggleDrawer("#gallery-drawer");
    },
    createContract() {
      console.log("todo create contract on hedera network");

      // add contract directly to store
      // let newContract = {};
      // this.$store.commit("addContract", newContract);

      this.$router.push({
        path: "/",
      });
    },
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
      // this.selectedMaterials = this.selectedMaterials.slice(0, num);
    },

    getAllFromGroup(group) {
      return this.$options.materials
        .filter((m) => m.parent === group)
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map(({ name }) => ({
          label: name,
          value: name.toLowerCase(),
        }));
    },

    getMaterial(data) {
      this.materials[data.index] = data.val;
      Vue.set(
        this.subMaterials,
        data.index,
        this.getAllFromGroup(this.materials[data.index])
      );
    },

    getCategory(data) {
      this.category = data.val;
    },

    getSubMaterial(data) {
      let index = data.index;
      let name = data.val;
      console.log(name);

      let labelName = this.$options.materials.find(
        (m) => m.name.toLowerCase() == name
      ).label;

      let label = this.$options.labels.find((l) => l.name == labelName);

      // let fee = this.$options.labels.find((l) => l.name == label).fee;

      // console.log(label);
      // console.log(fee);

      Vue.set(this.selectedMaterials, index, {
        name: name,
        label: label,
      });

      console.log(this.selectedMaterials);
    },

    getDuration(data) {},

    getProdCountry(data) {
      this.productionCountry = data.val;

      let currentCountryId = this.currentCountry.ID;
      console.log(currentCountryId);

      let prodCountry = this.$options.countries.find(
        (c) => c.name.toLowerCase() === data.val
      );

      if (prodCountry) {
        let prodCountryId = prodCountry.ID;

        console.log(prodCountryId);

        let distanceLabel = this.currentCountry.distances[prodCountryId];

        console.log(distanceLabel);

        this.productionCountryLabel = distanceLabel;
      }
    },
    getCharity(data) {
      console.log(data.val);
    },
  },
};
</script>
