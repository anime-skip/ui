<template>
  <div class="as-relative as-flex as-flex-col">
    <!-- Visible Button -->
    <click :in-overflow="inOverflow" :on-click="onClickItem" disable-hide-overflow-on-click>
      <dropdown-icon
        v-if="inOverflow"
        class="as--ml-10 as-mr-4 as-transform as-transition-transform"
        :class="{
          'as-rotate-180': isOpen,
        }"
      />
      {{ title }}
      <dropdown-icon
        v-if="!inOverflow"
        class="as--mr-2 as-ml-1 as-transform as-transition-transform"
        :class="{
          'as-rotate-180': isOpen,
        }"
      />
    </click>

    <!-- Dismiss Overlay -->
    <div
      v-if="isOpen"
      class="sm:as-hidden md:as-block md:as-fixed md:as-inset-0"
      @click="dismiss"
    />

    <!-- Children expanded in  -->
    <div v-if="inOverflow">
      <height-reveal :visible="isOpen" :duration-ms="100">
        <div :elevation="inOverflow ? undefined : 12" class="as-flex as-flex-col as-px-6">
          <template v-for="item of children" :key="item.key">
            <router-link
              v-if="item.type === 'basic'"
              :to="item.link"
              @click="dismiss"
              class="as-drop-down-row"
            >
              {{ item.title }}
            </router-link>
            <button v-else-if="item.type === 'click'" @click="dismiss" class="as-drop-down-row">
              {{ item.title }}
            </button>
            <divider v-else />
          </template>
        </div>
      </height-reveal>
    </div>

    <!-- Dialog Overlay -->
    <div v-else class="as-absolute as-right-0 as--bottom-2 as-h-0 as-overflow-visible">
      <height-reveal :visible="isOpen" :duration-ms="100">
        <card
          :elevation="inOverflow ? undefined : 12"
          class="as-min-w-200px as-max-w-300px as-flex as-flex-col"
        >
          <template v-for="item of children" :key="item.key">
            <router-link
              v-if="item.type === 'basic'"
              :to="item.link"
              @click="dismiss"
              class="as-drop-down-row"
            >
              {{ item.title }}
            </router-link>
            <button v-else-if="item.type === 'click'" @click="dismiss" class="as-drop-down-row">
              {{ item.title }}
            </button>
            <divider v-else />
          </template>
        </card>
      </height-reveal>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import Click from './Click.vue';
import Divider from './Divider.vue';
import { injectNavBarDropdownState, injectNavBarOverflowState } from '../NavBarState';
import DropdownIcon from '../icons/DropdownIcon.vue';
import HeightReveal from '../HeightReveal.vue';
import Card from '../Card.vue';
import { BasicNavItem, ClickNavItem, DividerMenuItem } from './types';

export default defineComponent({
  name: 'NavBarDropDown',
  components: { Click, DropdownIcon, HeightReveal, Card, Divider },
  props: {
    id: { type: String, required: true },
    title: { type: String, required: true },
    children: {
      type: Array as PropType<Array<BasicNavItem | ClickNavItem | DividerMenuItem>>,
      required: true,
    },
    inOverflow: Boolean,
  },
  setup(props) {
    const { openDropdownId, updateOpenDropdownId } = injectNavBarDropdownState();
    const { updateIsOverflowOpen } = injectNavBarOverflowState();
    const isOpen = computed(() => props.id === openDropdownId?.value);

    const onClickItem = () => updateOpenDropdownId?.(isOpen.value ? undefined : props.id);
    const dismiss = () => {
      updateOpenDropdownId?.(undefined);
      updateIsOverflowOpen?.(false);
    };

    return {
      isOpen,
      onClickItem,
      dismiss,
    };
  },
});
</script>

<style scoped>
.as-min-w-200px {
  min-width: 200px;
}
.as-max-w-300px {
  max-width: 300px;
}

.as-drop-down-row {
  @apply as-h-12 as-px-4 as-flex as-items-center as-bg-on-surface as-bg-opacity-0 hover:as-bg-opacity-hover as-transition-colors as-text-on-surface as-text-opacity-high as-no-underline;
}
</style>
