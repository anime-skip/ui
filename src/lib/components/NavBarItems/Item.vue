<template>
  <nav-link
    v-if="item.type === 'basic'"
    :title="item.title"
    :link="item.link"
    :in-overflow="inOverflow"
  />
  <click
    v-else-if="item.type === 'click'"
    :title="item.title"
    :on-click="item.onClick"
    :in-overflow="inOverflow"
  />
  <dropdown
    v-else-if="item.type === 'dropdown'"
    :id="item.key"
    :title="item.title"
    :children="item.children"
    :in-overflow="inOverflow"
  />
  <divider v-else />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import NavLink from './Link.vue';
import Click from './Click.vue';
import Dropdown from './Dropdown.vue';
import Divider from './Divider.vue';

export interface BasicNavItem {
  type: 'basic';
  key: string;
  link: string;
  title: string;
}
export interface DropdownNavItem {
  type: 'dropdown';
  key: string;
  title: string;
  children: Array<BasicNavItem | ClickNavItem | DividerMenuItem>;
}
export interface DividerMenuItem {
  type: 'divider';
  key: string;
}
export interface ClickNavItem {
  type: 'click';
  key: string;
  title: string;
  onClick: () => void;
}

export default defineComponent({
  name: 'NavBarItem',
  components: { NavLink, Click, Dropdown, Divider },
  props: {
    inOverflow: Boolean,
    item: {
      type: Object as PropType<BasicNavItem | DropdownNavItem | DividerMenuItem | ClickNavItem>,
      required: true,
    },
  },
});
</script>
