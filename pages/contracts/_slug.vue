<template>
  <div class="page page--white">
    <div class="container container--full">
      <back-button />
      <div
        v-if="contract.visual"
        class="img ratio-1x1 img--light"
        :style="{
          backgroundImage:
            `url(` +
            require(`~/assets/images/products/${contract.visual}`) +
            `)`,
        }"
      ></div>
    </div>

    <div class="container">
      <Section>
        <heading size="3xl" level="1" weight="400" class="bottom-xs-0">
          {{ contract.name }}
        </heading>

        <badge color="label-b" class="bottom-xs-2">B</badge>

        <deposit value="30.30" class="bottom-xs-1" />
        <Stack :gap="0.5">
          <Button @click="false" class="button--primary">
            <icon icon="arrow-right" /> Transfer
          </Button>
          <Button @click="false" class="button--dark">
            <icon icon="delete" />
            Delete
          </Button>
        </Stack>
      </Section>

      <Section>
        <hr />
        <list-item icon="gift"> Bought from {{ contract.seller }} </list-item>

        <list-item icon="calendar">
          Owner since {{ contract.startdate }}
        </list-item>

        <list-item icon="pin">
          Produced in {{ contract.production_country }}
        </list-item>
      </Section>

      <Section>
        <p v-if="contract.intro">{{ contract.intro }}</p>
        <lorem v-else :max="50" />
      </Section>

      <Section>
        <accordion-item label="Materials" icon="tools" level="2">
          <lorem :max="200" />
        </accordion-item>

        <accordion-item label="Deposit table" icon="grid" level="2">
          <Table>
            <TR v-for="(row, index) in 5" :key="index">
              <TD> <lorem :min="2" :max="4" /> </TD>
              <TD> <badge level="B" /> </TD>
              <TD align="right"> ℏ 9.99 </TD>
            </TR>
            <TR v-for="(row, index) in 1" :key="'j' + index" :sub="true">
              <TD> <lorem :min="2" :max="4" /> </TD>
              <TD> <badge level="B" /> </TD>
              <TD align="right"> ℏ 9.99 </TD>
            </TR>
          </Table>
        </accordion-item>
      </Section>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import contracts from "~/data/contracts.json";

export default {
  // transition: "rtl",

  contracts: contracts, //.sort((a, b) => (a.ID > b.ID ? 1 : -1)),

  computed: {
    contract() {
      return this.$options.contracts.filter(
        (c) => c.ID === +this.$route.params.slug
      )[0];
    },
  },
};
</script>
<style lang="scss" scoped>
// silence
</style>