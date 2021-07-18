import { inject, provide, ref, Ref } from '@vue/runtime-core';

const OVERFLOW_KEYS = {
  value: Symbol('overflow-open.value'),
  update: Symbol('overflow-open.update'),
};

type IsOverflowOpen = Ref<boolean>;
type UpdateIsOverflowOpen = (newIsOverflowOpen: boolean) => void;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function provideNavBarOverflowState() {
  const isOverflowOpen: IsOverflowOpen = ref(false);
  provide(OVERFLOW_KEYS.value, isOverflowOpen);

  const updateIsOverflowOpen: UpdateIsOverflowOpen = newIsOverflowOpen => {
    isOverflowOpen.value = newIsOverflowOpen;
  };
  provide(OVERFLOW_KEYS.update, updateIsOverflowOpen);

  return {
    isOverflowOpen,
    updateIsOverflowOpen,
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function injectNavBarOverflowState() {
  const isOverflowOpen = inject<IsOverflowOpen>(OVERFLOW_KEYS.value);
  const updateIsOverflowOpen = inject<UpdateIsOverflowOpen>(OVERFLOW_KEYS.update);
  return {
    isOverflowOpen,
    updateIsOverflowOpen,
  };
}

const OPEN_DROPDOWN_KEYS = {
  value: Symbol('open-dropdown.value'),
  update: Symbol('open-dropdown.update'),
};

type OpenDropDownId = Ref<string | undefined>;
type UpdateOpenDropDownId = (newOpenDropDownId: string | undefined) => void;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function provideNavBarDropdownState() {
  const openDropdownId: OpenDropDownId = ref();
  provide(OPEN_DROPDOWN_KEYS.value, openDropdownId);

  const updateOpenDropdownId: UpdateOpenDropDownId = newOpenDropDownId => {
    openDropdownId.value = newOpenDropDownId;
  };
  provide(OPEN_DROPDOWN_KEYS.update, updateOpenDropdownId);

  return {
    openDropdownId,
    updateOpenDropdownId,
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function injectNavBarDropdownState() {
  const openDropdownId = inject<OpenDropDownId>(OPEN_DROPDOWN_KEYS.value);
  const updateOpenDropdownId = inject<UpdateOpenDropDownId>(OPEN_DROPDOWN_KEYS.update);
  return {
    openDropdownId,
    updateOpenDropdownId,
  };
}
