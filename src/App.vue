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
    :leftItems="leftNavItems"
    :rightItems="rightNavItems"
    rightMenu
    rightMenuText="aklinker1"
    :rightMenuItems="rightMenuItems"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Fonts from './components/groups/Fonts.vue';
import Surfaces from './components/groups/Surfaces.vue';
import Inputs from './components/groups/Inputs.vue';
import Loaders from './components/groups/Loaders.vue';
import Miscelanious from './components/groups/Miscelanious.vue';

export default defineComponent({
  components: { Fonts, Surfaces, Inputs, Loaders, Miscelanious },
  setup() {
    const leftNavItems = [
      { title: 'Dashboard', link: '/dashboard' },
      { title: 'Team', link: '/team' },
    ];
    const rightNavItems = [
      { title: 'Projects', link: '/projects?test=param' },
      { title: 'Calendar', link: '/calendar#test' },
    ];
    const rightMenuItems = [
      { title: 'Account Settings', link: '/account' },
      { title: 'Log Out', link: '/log-out' },
    ];
    return {
      leftNavItems,
      rightNavItems,
      rightMenuItems,
    };
  },
});
</script>

<style lang="scss">
body {
  position: relative;
}
</style>
