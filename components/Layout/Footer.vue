<template>
  <footer class="footer">
    <div class="container">
      <!-- {{ $route.path }} -->
      <ul>
        <li @click="showAllContracts">
          <nuxt-link to="/"
            ><img
              :src="
                require(isActive('/') || $route.path.startsWith('/contract')
                  ? '@/assets/images/icons/ico-contracts-active.svg'
                  : '@/assets/images/icons/ico-contracts.svg')
              "
              alt="all contracts"
              height="24"
            />Items</nuxt-link
          >
        </li>
        <li>
          <nuxt-link to="/search"
            ><img
              :src="
                require(isActive('/search')
                  ? '@/assets/images/icons/ico-search-active.svg'
                  : '@/assets/images/icons/ico-search.svg')
              "
              alt="search contracts"
              height="24"
            />Search
          </nuxt-link>
        </li>
        <!-- <li>
          <nuxt-link to="/faq"
            ><img
              :src="
                require(isActive('/faq')
                  ? '@/assets/images/icons/ico-faq-active.svg'
                  : '@/assets/images/icons/ico-faq.svg')
              "
              alt="faq"
              height="24"
            />
            FAQ
          </nuxt-link>
        </li> -->
        <li>
          <nuxt-link to="/account"
            ><img
              :src="
                require(isActive('/account') ||
                  isActive('/settings') ||
                  isActive('/about')
                  ? '@/assets/images/icons/ico-account-active.svg'
                  : '@/assets/images/icons/ico-account.svg')
              "
              alt="account"
              height="24"
            />
            Account
          </nuxt-link>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  methods: {
    isActive(link) {
      return link === this.$route.path;
    },
    showAllContracts() {
      this.$store.commit("setCurrentCategory", -1);
    },
  },
};
</script>

<style lang="scss" scoped>
// ::v-deep .nuxt-link-exact-active {
//   border: 3px solid red;
// }

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #fff;
  z-index: 5;
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
        padding: 0.5rem 0 0rem 0;
        text-align: center;
        font-size: 11px;
        color: get-color(base-text);
      }

      img {
        max-height: 24px;
        margin: 0 auto;
      }
    }
  }
}
</style>
