<template>
  <div class="page page--white">
    <back-button bg> Add contract </back-button>

    <div class="container" style="margin-top: 53px">
      <!-- <br /> -->
      <!-- {{ $store.state.currentAccount.accountId }} -->

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
            Upload image
          </div>

          <input
            class="field field--light"
            type="text"
            :placeholder="'Product name'"
            :value="
              contract.visual && !contract.name
                ? contract.visual.alt
                : contract.name
            "
            @input="(e) => setValue('name', e.target.value)"
          />

          <textarea
            key="0"
            class="field field--light field--textarea"
            placeholder="Product description (optional)"
            @input="(e) => setValue('description', e.target.value)"
          />

          <input
            class="field field--light"
            type="text"
            :placeholder="'Product price in hbar'"
            @input="(e) => setValue('price', e.target.value)"
          />
          <!-- <heading size="l" level="2" class="bottom-xs-0">
            Product category
          </heading>
          <dropdown
            key="1"
            fieldName="category"
            @input="setDropdownValue"
            :options="categories"
          /> -->
          <heading size="l" level="2" class="bottom-xs-0">
            Expected product lifetime
          </heading>
          <dropdown
            key="2"
            fieldName="duration"
            @input="setDropdownValue"
            :options="durationOptions"
          />

          <!-- <template v-if="contract.visual && contract.duration">
            <Button
              class="button--primary button--fullwidth"
              @click.native="currentStep += 1"
            >
              Next
            </Button>
          </template>

          <template v-else>
            <Button class="button--primary button--fullwidth" disabled>
              Next
            </Button>
          </template> -->
          <!-- </Section> -->

          <!-- <Section xxv-if="currentStep >= 2"> -->
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

          <textarea
            key="1"
            class="field field--light field--textarea"
            placeholder="Additional material information (optional)"
            @input="(e) => setValue('material_description', e.target.value)"
          />

          <div class="grid">
            <!-- <div class="col-xs-12">
              <Button
                class="button--secondary button--fullwidth"
                @click.native="currentStep -= 1"
              >
                Back
              </Button>
            </div> -->
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
          <!-- <heading size="l" level="2" class="bottom-xs-0">
            Select charity
          </heading>
          <p>
            At least 10% of the deposit will be donated to the selected charity.
            If the buyer disposes the product before the contract has ended, the
            complete remainder of the deposit is donated.
          </p>
          <dropdown
            fieldName="charity"
            @input="setDropdownValue"
            :options="allCharities"
          /> -->

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
            <!-- <div class="col-xs-12">
              <Button
                class="button--secondary button--fullwidth"
                @click.native="currentStep -= 1"
              >
                Back
              </Button>
            </div> -->
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
        label: `${(d / 365.242199).toFixed(2)} years (${d} days)`,
        value: d,
      }));
    },

    // categories() {
    //   return this.$store.state.categories.map(({ name, ID }) => ({
    //     id: ID,
    //     label: name,
    //     value: name.toLowerCase(),
    //   }));
    // },

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

    // allCharities() {
    //   return this.accounts
    //     .filter((a) => a.charity)
    //     .map(({ name, ID, accountId }) => ({
    //       id: ID,
    //       label: name,
    //       value: accountId,
    //     }));
    // },
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
      Vue.set(this.contract, "name", image.alt);
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
        charity: "0.0.0", // todo this.contract.charity.val,
        name: this.contract.name,
        description: this.contract.description,
        material_description: this.contract.material_description,
        production_country: +this.contract.production_country.ID,
        category: 0, // todo remove +this.contract.category.ID,
        visual: +this.contract.visual.ID,
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

      // console.log("materi : " + materialSum);
      let ccname = this.$store.state.currentAccount.country;
      let countryData = this.$store.state.countries.find(
        (c) => c.name === ccname
      );
      let dist = countryData.distances[this.contract.production_country.ID];
      let shipmentDeposit = +this.labels.find((l) => l.name == dist).fee;

      let totalAvg = parseInt((1.0 * materialAvg + 1.0 * shipmentDeposit) / 2);
      // console.log(totalAvg);
      let totalLabel = this.labels.find((l) => l.ID === totalAvg).name;

      // console.log(materialSum + shipmentDeposit);

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
