<template>
  <nav class="navbar is-link" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        :aria-expanded="isExpanded"
        data-target="navbarBasicExample"
        @click="isExpanded = !isExpanded"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu is-mobile" :class="{ 'is-active': isExpanded }">
      <div class="navbar-end">
        <nuxt-link
          v-for="link in Routes"
          :key="link.url"
          :to="`${link.url}`"
          class="navbar-item"
          :class="{ active: isActiveRoute(link.url) }"
        >
          {{ link.label }}
        </nuxt-link>
      </div>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <nuxt-link
          v-for="link in Routes"
          :key="link.url"
          :to="`${link.url}`"
          class="navbar-item"
          :class="{ active: isActiveRoute(link.url) }"
        >
          {{ link.label }}
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    isExpanded: false,
  }),
  computed: {
    Routes() {
      return [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'Feistel',
          url: '/feistel',
        },
      ];
    },
  },
  methods: {
    isActiveRoute(url) {
      return this.$route?.path?.includes(url);
    },
  },
};
</script>

<style lang="scss">
@media screen and (min-width: 1025px) {
  .navbar-menu {
    &.is-mobile {
      display: none;
    }
  }
}
</style>
