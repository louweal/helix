<template>
  <div class="page page--white">
    <Section>
      <div class="container">
        <Section class="bottom-xs-2">
          <back-button to="/account" />
        </Section>

        <div class="align-xs-center">
          <heading level="1" size="5xl" weight="700" color="black">FAQ</heading>
        </div>

        <accordion-item
          :label="faq.question"
          level="2"
          v-for="(faq, index) in $options.faqs"
          :key="index"
        >
          <template v-if="faq.answer">
            {{ faq.answer }}
          </template>
          <lorem v-else :max="45" />
        </accordion-item>

        <div class="bottom-xs-3"></div>

        <div class="align-xs-center bottom-xs-5">
          <img
            src="@/assets/images/logo-small.svg"
            alt="logo helix"
            width="39.1"
            height="14.32"
          />
        </div>
      </div>
    </Section>
  </div>
</template>

<script>
import BackButton from "../components/Buttons/BackButton.vue";
export default {
  components: { BackButton },
  faqs: [
    {
      question: "What is a Helix’ smart contract (HSC)?",
      answer: false,
    },
    {
      question: "What are the advantages of HSCs?",
      answer: false,
    },

    {
      question: "How is the deposit calculated?",
      answer: false,
    },

    {
      question: "Where can I buy items with a HSC?",
      answer: false,
    },

    {
      question: "How can I buy secondhand items with a HSC?",
      answer: false,
    },
    {
      question: "How do I sell new products with a HSC?",
      answer: false,
    },
    {
      question: "How do I sell secondhand items with a HSC?",
      answer: false,
    },
    {
      question: "Will I lose my deposit if I delete the HSC?",
      answer: false,
    },
    {
      question: "Can I transfer a HSC to myself?",
      answer: false,
    },
  ],
};
</script>

<style lang="scss" scoped>
// silence
</style>