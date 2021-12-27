<template>
  <nav class="as-elevation as-elevation-6">
    <div class="as-bg-control">
      <div class="as-max-w-7xl as-mx-auto as-px-2 sm:as-px-6 lg:as-px-8">
        <div class="as-relative as-flex as-items-center as-justify-between as-h-16">
          <div class="as-absolute as-inset-y-0 as-left-0 as-flex as-items-center md:as-hidden">
            <button
              class="as-inline-flex as-items-center as-justify-center as-p-2 as-rounded-md as-text-on-surface as-text-opacity-medium hover:as-text-opacity-100 hover:as-bg-on-surface hover:as-bg-opacity-hover"
              aria-expanded="false"
              @click="toggleOverflow"
            >
              <span class="as-sr-only">Open main overflow</span>
              <DrawerOpen :class="overflowHiddenClass" @click="toggleOverflow" />
              <DrawerClose :class="overflowOpenClass" @click="toggleOverflow" />
            </button>
          </div>
          <div
            class="as-flex-1 as-flex as-items-center as-justify-center md:as-items-stretch md:as-justify-start"
          >
            <router-link
              v-if="!!homeLink"
              class="as-flex-shrink-0 as-flex as-items-center hover:as-no-underline"
              :to="homeLink"
            >
              <img class="as-block as-h-6 as-mr-4 as-w-auto" :src="homeIcon" :alt="homeTitle" />
              <p class="sm:as-block lg:as-block as-heading-6 as-font-bold">{{ homeTitle }}</p>
            </router-link>
            <div class="as-hidden md:as-block md:as-ml-6">
              <div class="as-flex as-space-x-1">
                <NavBarItem v-for="item of leftItems" :item="item" :key="item.key" />
              </div>
            </div>
          </div>
          <div
            class="as-absolute as-inset-y-0 as-right-0 as-flex as-items-center as-pr-2 sm:as-static sm:as-inset-auto sm:as-ml-6 sm:as-pr-0"
          >
            <slot name="before-right" />
            <NavBarItem
              v-for="item of rightItems"
              class="as-hidden md:as-flex"
              :item="item"
              :key="item.key"
            />
            <slot name="after-right" />
          </div>
        </div>
      </div>
    </div>
    <height-reveal class="as-bg-control" :visible="isOverflowOpen">
      <div class="md:as-hidden as-space-y-1 as-pb-1 as-flex as-flex-col">
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

    const overflowOpenClass = computed(() => (isOverflowOpen.value ? 'as-block' : 'as-hidden'));
    const overflowHiddenClass = computed(() => (isOverflowOpen.value ? 'as-hidden' : 'as-block'));
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
