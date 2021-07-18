import { onUnmounted, ref } from 'vue';

/**
 * @returns `[setTimeout, clearTimeout]`
 */
export function useTimeout(): [typeof setTimeout, () => void] {
  const timeout = ref<any | undefined>();
  // @ts-expect-error: Arg spreading to resolve overridden method types
  const setCustomTimeout: typeof setTimeout = (...args) => {
    timeout.value = setTimeout(...args);
  };
  onUnmounted(() => {
    if (timeout.value != null) clearTimeout(timeout.value);
  });
  const clearCustomTimeout = () => {
    if (timeout.value != null) {
      clearTimeout(timeout.value);
    }
  };

  return [setCustomTimeout, clearCustomTimeout];
}
