<template>
  <Section>
    <div class="container" style="margin-top: 30px">
      <div class="align-xs-center">
        <heading level="1" size="5xl" weight="700" color="black">FAQ</heading>
      </div>

      <AccordionItem
        :label="faq.question"
        level="2"
        v-for="(faq, index) in $options.faqs"
        :key="index"
      >
        <template v-if="answer">
          {{ faq.answer }}
        </template>
        <lorem v-else :max="45" />
      </AccordionItem>
    </div>
  </Section>
</template>

<script>
export default {
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