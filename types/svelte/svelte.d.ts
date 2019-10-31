declare module "*.svelte" {
  interface ComponentOptions {
    target: HTMLElement;
    anchor?: HTMLElement | null;
    props?: {};
    hydrate?: boolean;
    intro?: boolean;
  }

  interface Component {
    new (options: ComponentOptions): any;
    // client-side methods
    $set(props: {}): void;
    $on(event: string, callback: (event: CustomEvent) => void): void;
    $destroy(): void;

    // server-side methods
    render(props?: {}): {
      html: string;
      css: { code: string; map: string | null };
      head?: string;
    };
  }

  const component: Component;
  export default component;
}

declare module "svelte" {
  export function afterUpdate(fn: () => void): void;

  export function beforeUpdate(fn: () => void): void;

  export function onDestroy(fn: () => void): void;

  export function onMount(fn: () => void): void;
  export function onMount(fn: () => () => void): void;

  export function setContext<K, C>(key: K, context: C): void;
  export function getContext<K, C>(key: K): C;

  export function tick(): Promise<void>;

  export function createEventDispatcher<D>(): (
    type: string,
    detail?: D
  ) => void;
}
