/// <reference types="vite/client" />
// eslint-disable-next-line no-restricted-imports
import 'dayjs/plugin/duration';

declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>;
  export default component;
}
