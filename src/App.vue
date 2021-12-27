<template>
  <div
    class="as-flex as-flex-row as-flex-wrap as-justify-start as-items-start as-overflow-y-auto as-pt-16"
  >
    <Fonts />
    <Surfaces />
    <Inputs />
    <Loaders />
    <Miscelanious />
  </div>
  <NavBar
    class="as-fixed as-left-0 as-top-0 as-right-0"
    home-title="Anime Skip"
    home-icon="https://www.anime-skip.com/assets/logo_nav.49e247d2.svg"
    home-link="/"
    :left-items="leftNavItems"
    :right-items="rightNavItems"
  />
</template>

<script lang="ts">
import { defineComponent, h } from 'vue';
import Fonts from './components/groups/Fonts.vue';
import Surfaces from './components/groups/Surfaces.vue';
import Inputs from './components/groups/Inputs.vue';
import Loaders from './components/groups/Loaders.vue';
import Miscelanious from './components/groups/Miscelanious.vue';
import { LeftNavItem, RightNavItem, Icon } from './lib';

const searchIconPath =
  'M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z';

export default defineComponent({
  components: { Fonts, Surfaces, Inputs, Loaders, Miscelanious },
  setup() {
    const leftNavItems: LeftNavItem[] = [
      {
        type: 'basic',
        key: 'dashboard',
        title: 'Dashboard',
        link: '/dashboard',
        icon: () => h(Icon, { path: searchIconPath }),
      },
      {
        type: 'click',
        key: 'team',
        title: 'Team',
        icon: () => h(Icon, { path: searchIconPath }),
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

<style>
body {
  position: relative;
}
</style>
