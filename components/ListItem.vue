<template>
  <div class="list-item">
    <Stack :gap="1.2">
      <icon :icon="icon" size="lg" />
      <heading level="0" size="l" weight="400" class="bottom-xs-0"
        ><slot
      /></heading>
    </Stack>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: [String, Boolean],
      default: false,
    },
  },
};
</script>


<style lang="scss" scoped>
.list-item {
  width: 100%;
  border-bottom: 1px solid get-color(line);
  padding: 1rem 0;

  .icon {
    min-width: 37px;
  }
}
</style>