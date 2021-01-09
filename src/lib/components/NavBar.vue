<template>
  <nav class="elevation elevation-6 bg-control">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button
            class="inline-flex items-center justify-center p-2 rounded-md text-on-surface text-opacity-medium hover:text-opacity-100 hover:bg-on-surface hover:bg-opacity-hover"
            aria-expanded="false"
            @click="toggleMenu"
          >
            <span class="sr-only">Open main menu</span>
            <DrawerOpen :class="menuHiddenClass" @click="toggleMenu" />
            <DrawerClose :class="menuOpenClass" @click="toggleMenu" />
          </button>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <a v-if="!!homeLink" class="flex-shrink-0 flex items-center" :href="homeLink">
            <img class="block h-6 mr-4 w-auto" :src="homeIcon" :alt="homeTitle" />
            <p class="sm:block lg:block heading-6 font-bold">{{ homeTitle }}</p>
          </a>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <NavBarItem
                v-for="item of items"
                :key="item.title"
                :link="item.link"
                :title="item.title"
              />
              <!-- Current: "bg-gray-900 text-on-surface", Default: "text-gray-300 hover:bg-gray-700 hover:text-on-surface" -->
              <!-- <a href="#" class="bg-gray-900 text-on-surface px-3 py-2 rounded-md text-sm font-medium"
                >Dashboard</a
              >
              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-on-surface px-3 py-2 rounded-md text-sm font-medium"
                >Team</a
              >
              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-on-surface px-3 py-2 rounded-md text-sm font-medium"
                >Projects</a
              >
              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-on-surface px-3 py-2 rounded-md text-sm font-medium"
                >Calendar</a
              > -->
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <!-- <button
            class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-on-surface focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <span class="sr-only">View notifications</span>
            !-- Heroicon name: bell --
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button> -->

          <!-- Profile dropdown -->
          <!-- <div class="ml-3 relative">
            <div>
              <button
                class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                id="user-menu"
                aria-haspopup="true"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </button>
            </div>
            !--
            Profile dropdown panel, show/hide based on dropdown state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          --
            <div
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                >Your Profile</a
              >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                >Settings</a
              >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                >Sign out</a
              >
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <div :class="menuOpenClass" class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <NavBarItem
          v-for="item of items"
          :key="item.title"
          :link="item.link"
          :title="item.title"
          dropdown
          @click="toggleMenu()"
        />
        <!-- Current: "bg-gray-900 text-on-surface", Default: "text-gray-300 hover:bg-gray-700 hover:text-on-surface" -->
        <!-- <a href="#" class="bg-gray-900 text-on-surface block px-3 py-2 rounded-md text-base font-medium"
          >Dashboard</a
        >
        <a
          href="#"
          class="text-gray-300 hover:bg-gray-700 hover:text-on-surface block px-3 py-2 rounded-md text-base font-medium"
          >Team</a
        >
        <a
          href="#"
          class="text-gray-300 hover:bg-gray-700 hover:text-on-surface block px-3 py-2 rounded-md text-base font-medium"
          >Projects</a
        >
        <a
          href="#"
          class="text-gray-300 hover:bg-gray-700 hover:text-on-surface block px-3 py-2 rounded-md text-base font-medium"
          >Calendar</a
        > -->
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, ref, defineComponent, PropType } from 'vue';
import DrawerOpen from './icons/DrawerOpen.vue';
import DrawerClose from './icons/DrawerClose.vue';
import NavBarItem from './NavBarItem.vue';

interface NavItem {
  link: string;
  title: string;
}

export default defineComponent({
  components: { DrawerOpen, DrawerClose, NavBarItem },
  props: {
    homeTitle: { type: String, default: 'Anime Skip' },
    homeIcon: { type: String, default: '' },
    homeLink: String,
    items: { type: Array as PropType<NavItem[]>, required: true },
  },
  setup() {
    const menuOpen = ref(false);
    const menuOpenClass = computed(() => (menuOpen.value ? 'block' : 'hidden'));
    const menuHiddenClass = computed(() => (menuOpen.value ? 'hidden' : 'block'));
    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };

    return {
      menuOpenClass,
      menuHiddenClass,
      toggleMenu,
    };
  },
});
</script>

<style lang="scss" scoped>
nav {
  background-color: theme('colors.control');
}

.font-bold {
  font-weight: 600;
}
</style>
