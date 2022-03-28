<template>
<div>
  <NuxtLink v-if="url[0] === '#' || url[0] === '/'" :to="url"> <!-- anchor -->
    {{title}}
  </NuxtLink>
  <a v-else :href="url" target="_blank" rel="noopener noreferrer">
    {{title}}
  </a>
  </div>
</template>

<script>
export default {
  name: "Link",

  props: {
    title: {
      type: String,
      default: "",
    },
        url: {
      type: String,
      default: "",
    },
  },
};
</script>
