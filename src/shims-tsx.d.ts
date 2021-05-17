import Vue, { VNode } from 'vue'
import { Store } from 'vuex'

declare global {
  namespace JSX {
    interface ComponentCustomProperties  {
      $store: Store;
    }
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
