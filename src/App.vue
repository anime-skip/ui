<template>
  <div class="flex flex-row flex-wrap justify-start items-start overflow-y-auto pt-16">
    <Fonts />
    <Surfaces />
    <Inputs />
    <Loaders />
    <Miscelanious />
  </div>
  <NavBar
    class="fixed left-0 top-0 right-0"
    homeTitle="Anime Skip"
    homeIcon="https://www.anime-skip.com/img/logo_nav.e785b842.svg"
    homeLink="/"
    :items="navItems"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Fonts from './components/Fonts.vue';
import Surfaces from './components/Surfaces.vue';
import Inputs from './components/Inputs.vue';
import Loaders from './components/Loaders.vue';
import Miscelanious from './components/Miscelanious.vue';

export default defineComponent({
  components: { Fonts, Surfaces, Inputs, Loaders, Miscelanious },
  setup() {
    const navItems = [
      { title: 'Dashboard', link: '/dashboard' },
      { title: 'Team', link: '/team' },
      { title: 'Projects', link: '/projects?test=param' },
      { title: 'Calendar', link: '/calendar#test' },
    ];
    return {
      navItems,
    };
  },
});
</script>

<style lang="scss">
body {
  position: relative;
}
</style>
