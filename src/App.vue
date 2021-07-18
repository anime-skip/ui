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
    home-title="Anime Skip"
    home-icon="https://www.anime-skip.com/assets/logo_nav.49e247d2.svg"
    home-link="/"
    :left-items="leftNavItems"
    :right-items="rightNavItems"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Fonts from './components/groups/Fonts.vue';
import Surfaces from './components/groups/Surfaces.vue';
import Inputs from './components/groups/Inputs.vue';
import Loaders from './components/groups/Loaders.vue';
import Miscelanious from './components/groups/Miscelanious.vue';
import { LeftNavItem, RightNavItem } from './lib';

export default defineComponent({
  components: { Fonts, Surfaces, Inputs, Loaders, Miscelanious },
  setup() {
    const leftNavItems: LeftNavItem[] = [
      {
        type: 'basic',
        key: 'dashboard',
        title: 'Dashboard',
        link: '/dashboard',
      },
      {
        type: 'click',
        key: 'team',
        title: 'Team',
        onClick() {
          window.alert('Team clicked!');
        },
      },
    ];
    const rightNavItems: RightNavItem[] = [
      {
        type: 'basic',
        key: 'projects',
        title: 'Projects',
        link: '/projects?test=param',
      },
      {
        type: 'dropdown',
        key: 'account',
        title: 'Username',
        children: [
          {
            type: 'basic',
            key: 'account-settings',
            title: 'Account Settings',
            link: '/account',
          },
          {
            type: 'basic',
            key: 'logout',
            title: 'My Shows',
            link: '/my-shows',
          },
          {
            type: 'divider',
            key: 'divider-1',
          },
          {
            type: 'click',
            key: 'logout',
            title: 'Log out',
            onClick() {
              window.alert('Logged out');
            },
          },
        ],
      },
      {
        type: 'click',
        key: 'calendar',
        title: 'Calendar',
        onClick() {
          window.alert('Calendar clicked!');
        },
      },
    ];
    return {
      leftNavItems,
      rightNavItems,
    };
  },
});
</script>

<style lang="scss">
body {
  position: relative;
}
</style>
