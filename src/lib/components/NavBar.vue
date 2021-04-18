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
          <router-link v-if="!!homeLink" class="flex-shrink-0 flex items-center" :to="homeLink">
            <img class="block h-6 mr-4 w-auto" :src="homeIcon" :alt="homeTitle" />
            <p class="sm:block lg:block heading-6 font-bold">{{ homeTitle }}</p>
          </router-link>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <NavBarItem
                v-for="item of leftItems"
                :key="item.title"
                :link="item.link"
                :title="item.title"
              />
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <slot name="before-right" />
          <NavBarItem
            v-for="item of rightItems"
            :key="item.title"
            :link="item.link"
            :title="item.title"
            class="hidden md:flex"
          />
          <slot name="after-right" />

          <!-- Profile dropdown -->
          <div v-if="rightMenu" class="ml-3 relative">
            <div>
              <nav-bar-button @click="toggleRightDropDown">
                <span class="sr-only">Open user menu</span>
                {{ rightMenuText }}
                <icon path="M7,10L12,15L17,10H7Z" />
              </nav-bar-button>
            </div>
            <card
              v-if="rightDropdownOpen"
              class="origin-top-right absolute -mt-2 right-0 w-64 rounded-md"
              :class="{
                block: rightDropdownOpen,
                hidden: !rightDropdownOpen,
              }"
              :elevation="8"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <router-link
                v-for="item of rightMenuItems"
                :key="item.link"
                :to="item.link"
                class="w-full h-12 flex items-center px-4 subtitle-1 text-on-surface text-opacity-high"
                @click="toggleRightDropDown"
              >
                {{ item.title }}
              </router-link>
            </card>
          </div>
        </div>
      </div>
    </div>
    <div :class="menuOpenClass" class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <NavBarItem
          v-for="item of allItems"
          :key="item.title"
          :link="item.link"
          :title="item.title"
          dropdown
          @click="toggleMenu()"
        />
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, ref, defineComponent, PropType } from 'vue';
import DrawerOpen from './icons/DrawerOpen.vue';
import DrawerClose from './icons/DrawerClose.vue';
import NavBarItem from './NavBarItem.vue';
import NavBarButton from './NavBarButton.vue';
import Icon from './icons/Icon.vue';
import Card from './Card.vue';

export interface NavItem {
  link: string;
  title: string;
}

export default defineComponent({
  components: {
    DrawerOpen,
    DrawerClose,
    NavBarItem,
    NavBarButton,
    Icon,
    Card,
  },
  props: {
    homeTitle: { type: String, default: 'Anime Skip' },
    homeIcon: { type: String, default: '' },
    homeLink: String,
    leftItems: { type: Array as PropType<NavItem[]>, required: true },
    rightItems: { type: Array as PropType<NavItem[]>, required: true },
    rightMenuItems: { type: Array as PropType<NavItem[]>, required: true },
    rightMenu: Boolean,
    rightMenuText: String,
  },
  setup(props) {
    const menuOpen = ref(false);
    const menuOpenClass = computed(() => (menuOpen.value ? 'block' : 'hidden'));
    const menuHiddenClass = computed(() => (menuOpen.value ? 'hidden' : 'block'));
    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
      rightDropdownOpen.value = false;
    };

    const rightDropdownOpen = ref(false);
    const toggleRightDropDown = () => {
      rightDropdownOpen.value = !rightDropdownOpen.value;
      menuOpen.value = false;
    };

    const allItems = computed(() => [...props.leftItems, ...props.rightItems]);

    return {
      menuOpenClass,
      menuHiddenClass,
      toggleMenu,
      rightDropdownOpen,
      toggleRightDropDown,
      allItems,
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
