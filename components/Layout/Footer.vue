<template>
  <footer class="footer">
    <ul>
      <li>
        <nuxt-link to="/"
          ><img
            src="@/assets/images/icons/ico-contracts.svg"
            alt="all contracts"
            height="24"
        /></nuxt-link>
      </li>
      <li>
        <nuxt-link to="/search"
          ><img
            src="@/assets/images/icons/ico-search.svg"
            alt="search contracts"
            height="24"
        /></nuxt-link>
      </li>
      <li>
        <nuxt-link to="/goals"
          ><img
            src="@/assets/images/icons/ico-goals.svg"
            alt="personal goals"
            height="24"
        /></nuxt-link>
      </li>
      <li>
        <nuxt-link to="/account"
          ><img
            src="@/assets/images/icons/ico-account.svg"
            alt="account"
            height="24"
        /></nuxt-link>
      </li>
    </ul>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.09);

  ul {
    display: flex;
    width: 100%;
    padding: 0.5rem 0.2rem;

    li {
      display: flex;
      flex-grow: 1;

      ::v-deep a {
        width: 100%;
        height: 100%;
        padding: 0.5rem 0;
        text-align: center;
      }

      img {
        max-height: 24px;
        margin: 0 auto;
      }
    }
  }
}
</style>
