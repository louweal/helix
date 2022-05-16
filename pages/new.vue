<template>
  <div class="page page--white">
    <back-button bg> Add contract </back-button>

    <div class="container" style="margin-top: 53px">
      <div class="add-form">
        <Section v-if="currentStep < 2">
          <div v-if="contract.visual">
            <div
              @click="toggleDrawer('#gallery-drawer')"
              class="field--upload img ratio-1x1 img--light"
              :style="{
                marginBottom: '4px',
                backgroundImage:
                  `url(` +
                  require(`~/assets/images/products/${contract.visual.url}`) +
                  `)`,
              }"
            ></div>
          </div>
          <div
            v-else
            class="field field--light field--upload"
            @click="toggleDrawer('#gallery-drawer')"
          >
            Add demo image
          </div>

          <heading size="l" level="2" class="bottom-xs-0">
            Product name
          </heading>

          <input
            class="field field--light"
            type="text"
            :placeholder="
              contract.visual ? contract.visual.alt : 'Product name'
            "
            @input="(e) => setValue('name', e.target.value)"
          />

          <heading size="l" level="2" class="bottom-xs-0">
            Product description (optional)
          </heading>
          <textarea
            key="0"
            class="field field--light field--textarea"
            :placeholder="
              contract.visual
                ? contract.visual.alt + ' description'
                : 'Product description (optional)'
            "
            @input="(e) => setValue('description', e.target.value)"
          />

          <heading size="l" level="2" class="bottom-xs-0">
            Product price (ℏ)
          </heading>
          <input
            class="field field--light"
            type="text"
            :placeholder="contract.visual ? contract.visual.price * 10 : 'ℏ'"
            @input="(e) => setValue('price', e.target.value)"
          />

          <heading size="l" level="2" class="bottom-xs-0">
            Expected product lifetime
          </heading>
          <dropdown
            key="2"
            fieldName="duration"
            @input="setDropdownValue"
            :options="durationOptions"
          />

          <heading size="l" level="2" class="bottom-xs-0">
            Country of production
          </heading>
          <dropdown
            key="3"
            fieldName="production_country"
            @input="setDropdownValue"
            :options="countries"
          />

          <heading size="l" level="2" class="bottom-xs-0">
            Number of materials
          </heading>
          <dropdown
            key="4"
            @input="getNumMaterials"
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

          <heading size="l" level="2" class="bottom-xs-0"> Materials </heading>

          <div class="grid no-bottom-margin-cols">
            <template v-for="(material, index) in numMaterials">
              <div class="col-xs-12" :key="index">
                <dropdown
                  @input="getMaterialType"
                  :index="index"
                  :key="index"
                  defaultVal="Group"
                  :options="materialGroups"
                />
              </div>
              <div class="col-xs-12" :key="'sub' + index">
                <dropdown
                  v-if="subMaterials[index]"
                  @input="getSelectedMaterial"
                  :index="index"
                  :key="index"
                  :defaultVal="subMaterials[index].length > 1 ? 'Type' : false"
                  :options="subMaterials[index]"
                />
                <dropdown v-else :options="false" defaultVal="Type" />
              </div>
            </template>
          </div>

          <heading size="l" level="2" class="bottom-xs-0">
            Additional material information (optional)
          </heading>

          <textarea
            key="1"
            class="field field--light field--textarea"
            :placeholder="
              contract.visual
                ? contract.visual.materials
                : 'Additional material information (optional)'
            "
            @input="(e) => setValue('material_description', e.target.value)"
          />

          <div class="grid">
            <div class="col-xs-24 bottom-xs-3">
              <Button
                v-if="selectedMaterials.length === numMaterials"
                class="button--primary button--fullwidth"
                @click.native="computeDeposit"
              >
                Continue &amp; calculate deposit
              </Button>
            </div>
          </div>
        </Section>

        <Section v-if="currentStep === 2">
          <div class="bottom-xs-2"></div>
          <heading size="l" level="2" class="bottom-xs-0"
            >Deposit summary</heading
          >

          <deposit-table
            :materials="this.selectedMaterials.map((m) => m.ID)"
            :country="parseInt(this.contract.production_country.ID)"
            show-total
          />

          <deposit
            :val="this.contract.deposit"
            class="bottom-xs-1"
            label="total deposit"
          />

          <div class="grid">
            <div class="col-xs-24">
              <Button
                class="button--primary button--fullwidth"
                @click.native="createContract"
              >
                Create contract
              </Button>
            </div>
          </div>
        </Section>
      </div>
    </div>

    <drawer id="gallery-drawer">
      <template v-slot:header> Gallery (demo) </template>

      <div class="grid">
        <div
          class="col-xs-6"
          v-for="(image, index) in images.filter((i) => !i.used)"
          :key="index"
        >
          <div
            @click="selectImage(image)"
            class="img ratio-1x1 img--light"
            :id="image.ID"
            :style="{
              backgroundImage:
                `url(` + require(`~/assets/images/products/${image.url}`) + `)`,
            }"
          ></div>
        </div>
      </div>
    </drawer>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      currentStep: 1,
      numMaterials: 0,
      subMaterials: [],
      production_country: false,
      selectedMaterials: [],
      contract: {},
    };
  },

  computed: {
    countries() {
      return [...this.$store.state.countries]
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map(({ name, ID }) => ({
          id: ID,
          label: name,
          value: name.toLowerCase(),
        }));
    },

    accounts() {
      return this.$store.state.accounts;
    },
    labels() {
      return this.$store.state.labels;
    },
    images() {
      return this.$store.state.images;
    },
    materials() {
      return this.$store.state.materials;
    },

    durationOptions() {
      return [3000, 6000].map((d) => ({
        id: d,
        label: `${(d / 365.242199).toFixed(2)} years / ${d} days`,
        value: d,
      }));
    },

    newId() {
      let allContracts = this.$store.state.contracts;

      return allContracts.length === 0
        ? 0
        : Math.max(...allContracts.map((c) => +c.ID)) + 1;
    },

    todayDate() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0");
      var yyyy = today.getFullYear();

      return dd + "-" + mm + "-" + yyyy;
    },

    materialGroups() {
      return [...new Set(this.materials.map((m) => m.parent).flat())]

        .map((m) => ({
          label: m,
          value: m.toLowerCase(),
        }))
        .sort((a, b) => (a.label > b.label ? 1 : -1));
    },
  },

  methods: {
    setValue(field, value) {
      Vue.set(this.contract, field, value);
    },
    setDropdownValue(data, fieldName) {
      Vue.set(this.contract, fieldName, data);
    },
    selectImage(image) {
      Vue.set(this.contract, "visual", image);
      Vue.set(this.contract, "description", image.alt + " description");
      Vue.set(this.contract, "name", image.alt);
      Vue.set(this.contract, "price", image.price * 10);
      Vue.set(this.contract, "material_description", image.materials);
      this.toggleDrawer("#gallery-drawer");
    },
    async createContract() {
      this.$store.commit("toggleAwaitState");
      // collect all data in single object
      let data = {
        startdate: Date.now() / 1000,
        state: 0,
        owner: this.$store.state.currentAccount.accountId,
        seller: this.$store.state.currentAccount.accountId,
        duration: this.contract.duration.val * 86400,
        deposit: parseInt(this.contract.deposit), // string to int tinybar
        name: this.contract.name,
        description: this.contract.description,
        material_description: this.contract.material_description,
        production_country: +this.contract.production_country.ID,
        visual: +this.contract.visual.ID,
        price: parseInt(this.contract.price * 1e8),
      };

      // add the contract on hedera network and to the store
      let contractId = await this.$store.dispatch("addSmartContract", data);

      this.$store.commit("toggleAwaitState");

      this.$router.push({
        path: "/",
      });
    },
    toggleDrawer(id) {
      let drawer = document.querySelector(id);
      drawer.classList.toggle("drawer--active");
    },

    getNumMaterials(data) {
      this.numMaterials = +data.val;
    },

    getAllFromGroup(group) {
      return this.materials
        .filter((m) => m.parent === group)
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map(({ name, ID }) => ({
          id: ID,
          label: name,
          value: name.toLowerCase(),
        }));
    },

    getMaterialType(data) {
      Vue.set(this.subMaterials, data.index, this.getAllFromGroup(data.val));
    },

    getSelectedMaterial(data) {
      let material = this.materials.find((m) => m.ID === +data.ID);
      Vue.set(this.selectedMaterials, data.index, material);

      if (this.selectedMaterials.length === this.numMaterials) {
        // update materials property in contract
        Vue.set(this.contract, "materials", this.selectedMaterials);
      }
    },

    computeDeposit() {
      let materialSum = +this.selectedMaterials
        .map((m) => +this.labels.find((l) => l.ID === m.label).fee)
        .reduce((a, b) => a + b, 0);

      let materialAvg = parseInt(materialSum / this.selectedMaterials.length);

      let ccname = this.$store.state.currentAccount.country;
      let countryData = this.$store.state.countries.find(
        (c) => c.name === ccname
      );
      let dist = countryData.distances[this.contract.production_country.ID];
      let shipmentDeposit = +this.labels.find((l) => l.name == dist).fee;

      let totalAvg = parseInt((1.0 * materialAvg + 1.0 * shipmentDeposit) / 2);
      let totalLabel = this.labels.find((l) => l.ID === totalAvg).name;

      Vue.set(
        this.contract,
        "deposit",
        parseInt((materialSum + shipmentDeposit) * 100000000)
      );

      Vue.set(this.contract, "label", totalLabel);

      this.currentStep += 1;
    },
  },
};
</script>
