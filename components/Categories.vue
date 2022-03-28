<template>
  <div class="categories">
    <Stack force-dir>
      <Button active />
      <Button />
      <Button />
    </Stack>
  </div>
</template>

<style lang="scss" scoped>
.categories {
  width: 100%;
  padding: 4px;
  overflow-x: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
    background: transparent;
  }
}
</style>