import { defineComponent, ComponentOptions, h } from 'vue';

export function Interactive(Component: ComponentOptions) {
  return defineComponent({
    name: Component.name,
    render() {
      h(Component);
    },
  });
}
