<template>
  <div class="pushmenu p-2 d-lg-none" v-if="$store.state.pushmenu.open">
    <div
      class="pushmenu--header d-flex w-100 justify-content-between align-items-center"
      data-aos="fade"
      data-aos-delay="400"
    >
      <nuxt-link
        to="/"
        event=""
        @click.native="
          $store.commit('pushmenu/toggle');
          $router.push('/');
        "
        class="header-logo"
        aria-label="to homepage"
      >
        <!-- <div class="logo"></div> -->
        <img src="@/images/logo.svg" alt="" width="119" height="44" />
      </nuxt-link>
      <div @click="$store.commit('pushmenu/toggle')">
        <i
          class="bi lh-1"
          style="font-size: 38px"
          :class="$store.state.pushmenu.open ? 'bi-x-lg' : 'bi-list'"
        ></i>
      </div>
    </div>

    <div class="pushmenu--body">
      <ul class="list-unstyled" @click="$store.commit('pushmenu/toggle')">
        <li class="" v-for="(l, i) in $options.menu" :key="i">
          <nuxt-link :to="{ path: l.url, hash: l.hash }" class="nav-link">
            {{ l.title }}
          </nuxt-link>
        </li>
      </ul>

      <div @click="$store.commit('pushmenu/toggle')">
        <div
          class="btn btn-primary"
          @click="disconnect()"
          v-if="$store.state.accountId"
        >
          Disconnect <span class="d-none d-md-inline"> wallet</span>
        </div>

        <div
          class="btn btn-primary"
          @click="$store.commit('modals/show', { name: 'connect' })"
          v-else
        >
          Connect <span class="d-none d-md-inline"> wallet</span>
        </div>
      </div>
    </div>

    <div class="pushmenu--footer"></div>
  </div>
</template>

<script>
import menu from "@/data/menu.json";

export default {
  menu,
};
</script>

<style lang="scss" scoped>
.pushmenu {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 2000;
  background-color: #fff;
  // color: #fff;
  text-align: center;
  transform: translateY(-100%);
  opacity: 0.2;
  animation: slideY 0.4s 0.05s ease-out forwards, fadeIn 0.3s 0s linear forwards;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
}
</style>
