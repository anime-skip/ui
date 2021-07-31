<template>
  <nav class="elevation elevation-6">
    <div class="bg-control">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              class="inline-flex items-center justify-center p-2 rounded-md text-on-surface text-opacity-medium hover:text-opacity-100 hover:bg-on-surface hover:bg-opacity-hover"
              aria-expanded="false"
              @click="toggleOverflow"
            >
              <span class="sr-only">Open main overflow</span>
              <DrawerOpen :class="overflowHiddenClass" @click="toggleOverflow" />
              <DrawerClose :class="overflowOpenClass" @click="toggleOverflow" />
            </button>
          </div>
          <div class="flex-1 flex items-center justify-center md:items-stretch md:justify-start">
            <router-link
              v-if="!!homeLink"
              class="flex-shrink-0 flex items-center hover:no-underline"
              :to="homeLink"
            >
              <img class="block h-6 mr-4 w-auto" :src="homeIcon" :alt="homeTitle" />
              <p class="sm:block lg:block heading-6 font-bold">{{ homeTitle }}</p>
            </router-link>
            <div class="hidden md:block md:ml-6">
              <div class="flex space-x-1">
                <NavBarItem v-for="item of leftItems" :item="item" :key="item.key" />
              </div>
            </div>
          </div>
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
          >
            <slot name="before-right" />
            <NavBarItem
              v-for="item of rightItems"
              class="hidden md:flex"
              :item="item"
              :key="item.key"
            />
            <slot name="after-right" />
          </div>
        </div>
      </div>
    </div>
    <height-reveal class="bg-control" :visible="isOverflowOpen">
      <div class="md:hidden space-y-1 pb-1 flex flex-col">
        <NavBarItem v-for="item of allItems" :key="item.key" :item="item" in-overflow />
      </div>
    </height-reveal>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, watch } from 'vue';
import DrawerOpen from './icons/DrawerOpen.vue';
import DrawerClose from './icons/DrawerClose.vue';
import NavBarItem from './NavBarItems/Item.vue';
import { BasicNavItem, ClickNavItem, DividerMenuItem, DropdownNavItem } from './NavBarItems/types';
import { provideNavBarOverflowState, provideNavBarDropdownState } from './NavBarState';
import { useRoute } from 'vue-router';
import HeightReveal from './HeightReveal.vue';

export type LeftNavItem = BasicNavItem | ClickNavItem;
export type RightNavItem = BasicNavItem | ClickNavItem | DropdownNavItem;

export default defineComponent({
  name: 'NavBar',
  components: {
    DrawerOpen,
    DrawerClose,
    NavBarItem,
    HeightReveal,
  },
  props: {
    homeTitle: { type: String, default: 'Anime Skip' },
    homeIcon: { type: String, default: '' },
    homeLink: { type: String, default: undefined },
    leftItems: { type: Array as PropType<LeftNavItem[]>, required: true },
    rightItems: {
      type: Array as PropType<RightNavItem[]>,
      required: true,
    },
  },
  setup(props) {
    const { isOverflowOpen, updateIsOverflowOpen } = provideNavBarOverflowState();
    const { updateOpenDropdownId } = provideNavBarDropdownState();

    const overflowOpenClass = computed(() => (isOverflowOpen.value ? 'block' : 'hidden'));
    const overflowHiddenClass = computed(() => (isOverflowOpen.value ? 'hidden' : 'block'));
    const toggleOverflow = () => {
      updateIsOverflowOpen(!isOverflowOpen.value);
      updateOpenDropdownId(undefined);
    };

    const allItems = computed(() => {
      const all: Array<BasicNavItem | ClickNavItem | DropdownNavItem | DividerMenuItem> = [
        ...props.leftItems,
        ...props.rightItems,
      ];

      const allWithDividers: typeof all = [];
      let wasDropdown = false;
      for (const item of all) {
        if (item.type === 'dropdown') {
          allWithDividers.push({
            type: 'divider',
            key: item.key + '-divider',
          });
          wasDropdown = true;
        } else if (wasDropdown) {
          allWithDividers.push({
            type: 'divider',
            key: item.key + '-divider',
          });
        }
        allWithDividers.push(item);
      }
      return allWithDividers;
    });

    const route = useRoute();
    watch(
      () => route.path,
      () => {
        updateIsOverflowOpen(false);
        updateOpenDropdownId(undefined);
      }
    );

    return {
      isOverflowOpen,
      overflowOpenClass,
      overflowHiddenClass,
      toggleOverflow,
      allItems,
    };
  },
});
</script>
