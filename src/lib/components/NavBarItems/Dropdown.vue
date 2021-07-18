<template>
  <div class="relative flex flex-col">
    <!-- Visible Button -->
    <click :in-overflow="inOverflow" :on-click="onClickItem" disable-hide-overflow-on-click>
      <dropdown-icon
        v-if="inOverflow"
        class="-ml-10 mr-4 transform transition-transform"
        :class="{
          'rotate-180': isOpen,
        }"
      />
      {{ title }}
      <dropdown-icon
        v-if="!inOverflow"
        class="-mr-2 ml-1 transform transition-transform"
        :class="{
          'rotate-180': isOpen,
        }"
      />
    </click>

    <!-- Dismiss Overlay -->
    <div v-if="isOpen" class="sm:hidden md:block md:fixed md:inset-0" @click="dismiss" />

    <!-- Children expanded in  -->
    <div v-if="inOverflow">
      <height-reveal :visible="isOpen" :duration-ms="100">
        <div :elevation="inOverflow ? undefined : 12" class="flex flex-col px-6">
          <template v-for="item of children" :key="item.key">
            <router-link
              v-if="item.type === 'basic'"
              :to="item.link"
              @click="dismiss"
              class="drop-down-row"
            >
              {{ item.title }}
            </router-link>
            <button v-else-if="item.type === 'click'" @click="dismiss" class="drop-down-row">
              {{ item.title }}
            </button>
            <divider v-else />
          </template>
        </div>
      </height-reveal>
    </div>

    <!-- Dialog Overlay -->
    <div v-else class="absolute right-0 -bottom-2 h-0 overflow-visible">
      <height-reveal :visible="isOpen" :duration-ms="100">
        <card
          :elevation="inOverflow ? undefined : 12"
          class="min-w-200px max-w-300px flex flex-col"
        >
          <template v-for="item of children" :key="item.key">
            <router-link
              v-if="item.type === 'basic'"
              :to="item.link"
              @click="dismiss"
              class="drop-down-row"
            >
              {{ item.title }}
            </router-link>
            <button v-else-if="item.type === 'click'" @click="dismiss" class="drop-down-row">
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
import { BasicNavItem, ClickNavItem, DividerMenuItem } from './Item.vue';

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
.min-w-200px {
  min-width: 200px;
}
.max-w-300px {
  max-width: 300px;
}

.drop-down-row {
  @apply h-12 px-4 flex items-center bg-on-surface bg-opacity-0 hover:bg-opacity-hover transition-colors text-on-surface text-opacity-high;
}
</style>
