import { VNode } from 'vue';

export interface BasicNavItem {
  type: 'basic';
  key: string;
  link: string;
  title: string;
  icon?: () => VNode;
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
  icon?: () => VNode;
}
