<template>
  <div class="page page--white">
    <back-button to="/account" bg> FAQ </back-button>

    &nbsp;
    <div class="bottom-xs-5"></div>

    <div class="container">
      <hr />
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
    </div>
  </div>
</template>

<script>
export default {
  faqs: [
    {
      question: "What are these contracts for?",
      answer: false,
    },

    {
      question: "What is a deposit?",
      answer: false,
    },

    {
      question: "How is the deposit determined?",
      answer: false,
    },
    {
      question: "How can I obtain a contract?",
      answer: false,
    },
    {
      question: "Can I transfer a contract?",
      answer: false,
    },
    {
      question: "Can I delete a contract?",
      answer: false,
    },
    {
      question: "Can I transfer my contracts to myself?",
      answer: false,
    },
  ],

  computed: {},
};
</script>

<style lang="scss" scoped>
// silence
</style>
