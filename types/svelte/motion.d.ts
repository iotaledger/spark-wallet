declare module "svelte/motion" {
  export interface SpringOptions {
    stiffness: number;
    damping: number;
    precision: number;
  }

  export interface Spring<T> extends SpringOptions {
    set: (value: T) => Promise<void>;
    update: (fn: (target: T, value: T) => T) => Promise<void>;
    subscribe(fn: (value: T) => void): () => void;
  }

  export function spring<T>(value: T, opts?: Partial<SpringOptions>): Spring<T>;

  export interface TweenedOptions<T> {
    delay: number;
    duration: number;
    easing: (value: number) => number;
    interpolator: (a: T, b: T) => (t: T) => T;
  }

  export interface Tweened<T> {
    set: (value: T, opts?: Partial<TweenedOptions<T>>) => Promise<void>;
    update: (
      fn: (target: T, value: T) => T,
      opts?: Partial<TweenedOptions<T>>
    ) => Promise<void>;
    subscribe(fn: (value: T) => void): () => void;
  }

  export function tweened<T>(
    value: T,
    opts?: Partial<TweenedOptions<T>>
  ): Tweened<T>;
}
