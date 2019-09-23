import { GlobalStateContext, ApiExtender } from 'piral-core';
import { mount } from './mount';
import { PiletVueApi } from './types';

/**
 * Creates a new set of Piral Vue API extensions.
 * @param api The API to extend.
 */
export function createVueApi(context: GlobalStateContext): ApiExtender<PiletVueApi> {
  context.converters.vue = ({ root }) => (el, props, ctx) => mount(el, root, props, ctx);
  return api => ({
    getVueExtension(name) {
      const render = api.getHtmlExtension(name);
      return {
        functional: true,
        mounted() {
          const props = {
            empty: this.empty,
            params: this.params,
            render: this.render,
          };
          render(this.$el, props, {});
        },
      };
    },
  });
}
