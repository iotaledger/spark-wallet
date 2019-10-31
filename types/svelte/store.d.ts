declare module "svelte/store" {
  export interface ReadableStore<T> {
    subscribe(fn: (value: T) => void): () => void;
  }

  export interface WritableStore<T> extends ReadableStore<T> {
    set(value: T): void;
    update(fn: (value: T) => T): void;
  }

  export function writable<T>(
    value: T,
    start?: (set: (value: T) => void) => () => void
  ): WritableStore<T>;

  export function readable<T>(
    value: T,
    start?: (set: (value: T) => void) => () => void
  ): ReadableStore<T>;

  export function derived<T, X>(
    stores: ReadableStore<X>,
    fn: (value: X, set?: (value: T) => void) => void,
    initial_value?: T
  ): ReadableStore<T>;

  export function derived<T>(
    stores: ReadableStore<T>[],
    fn: (value: T[], set?: (value: T) => void) => T,
    initial_value?: T
  ): ReadableStore<T>;

  export function get<T>(store: ReadableStore<T>): T;
}
