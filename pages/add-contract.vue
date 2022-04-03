<template>
  <div class="page page--white">
    <back-button bg> Add contract </back-button>

    <div class="container">
      &nbsp;
      <div class="bottom-xs-3"></div>

      <div class="add-form">
        <Section>
          <div
            class="field field--light field--upload"
            @click="toggleDrawer('#gallery-drawer')"
          >
            Upload image
          </div>
          <input
            class="field field--light"
            type="text"
            placeholder="Product name"
          />

          <textarea
            class="field field--light field--textarea"
            placeholder="Product description (optional)"
          />
        </Section>

        <Section>
          <heading size="l" level="2" class="bottom-xs-0">
            Country of production
          </heading>
          <dropdown
            @input="getProdCountry"
            :options="[
              { label: 'China', value: 'china' },
              { label: 'India', value: 'india' },
              { label: 'Vietnam', value: 'vietnam' },
              { label: 'Germany', value: 'germany' },
            ]"
          />
        </Section>

        <Section>
          <heading size="l" level="2" class="bottom-xs-0"> Materials </heading>
          <dropdown
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
              <div class="col-xs-8" :key="index">
                <dropdown
                  @input="getMaterial"
                  :index="index"
                  :key="index"
                  defaultVal="Group"
                  :options="materialGroups"
                />
              </div>
              <div class="col-xs-8" :key="'sub' + index">
                <!-- <template v-if="subMaterials[index]"> -->
                <!-- {{ subMaterials[index] }} -->
                <dropdown
                  @input="getSubMaterial"
                  :index="index"
                  :key="index"
                  defaultVal="Type"
                  :options="subMaterials[index]"
                />
                <!-- </template> -->
              </div>
              <div class="col-xs-8" :key="'source' + index">
                <dropdown
                  @input="getCountry"
                  :index="index"
                  :key="index"
                  defaultVal="Origin"
                  :options="$options.countries"
                />
              </div>
            </template>
          </div>

          <textarea
            class="field field--light field--textarea"
            placeholder="Additional material information (optional)"
          />
        </Section>

        <Section>
          <heading size="l" level="2" class="bottom-xs-0">
            Charity to support with this product
          </heading>
          <dropdown @input="getCharity" :options="allCharities" />
        </Section>

        <Section>
          <heading size="l" level="2" class="bottom-xs-0">Deposits</heading>

          <Table>
            <TR>
              <TD> Materials </TD>
              <TD> <badge level="B" /> </TD>
              <TD align="right"> ℏ 9.99 </TD>
            </TR>
            <TR v-for="(row, index) in 3" :key="'j' + index" :sub="true">
              <TD> Material {{ index + 1 }} </TD>
              <TD> <badge level="B" /> </TD>
              <TD align="right"> ℏ 9.99 </TD>
            </TR>
            <TR>
              <TD> Shipment </TD>
              <TD> <badge level="B" /> </TD>
              <TD align="right"> ℏ 9.99 </TD>
            </TR>

            <TR v-for="(row, index) in 3" :key="'k' + index" :sub="true">
              <TD> Material {{ index + 1 }} shipment </TD>
              <TD> <badge level="B" /> </TD>
              <TD align="right"> ℏ 9.99 </TD>
            </TR>
            <TR sub>
              <TD> Product shipment </TD>
              <TD> <badge level="B" /> </TD>
              <TD align="right"> ℏ 9.99 </TD>
            </TR>
          </Table>
        </Section>

        <deposit :value="'999.49'" class="bottom-xs-1" />

        <Button
          class="button--primary button--fullwidth bottom-xs-2"
          @click.native="createContract"
        >
          Create contract
        </Button>

        <!-- <div class="bottom-xs-5"></div> -->
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
import materials from "~/data/materials.json";
import countries from "~/data/countries.json";

export default {
  accounts,
  materials,
  countries: countries.map(({ name }) => ({
    label: name,
    value: name.toLowerCase(),
  })),

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
    materialGroups() {
      return [
        ...new Set(this.$options.materials.map((m) => m.parent).flat()),
      ].map((m) => ({
        label: m,
        value: m.toLowerCase(),
      }));
    },
  },

  methods: {
    createContract() {
      console.log("todo create contract on hedera network");
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
    },

    getAllFromGroup(group) {
      return this.$options.materials
        .filter((m) => m.parent === group)
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

    getSubMaterial(data) {
      //todo
    },
    getCountry(data) {
      console.log(data.val);
    },

    getProdCountry(data) {
      console.log(data.val);
    },
    getCharity(data) {
      console.log(data.val);
    },
  },
};
</script>
