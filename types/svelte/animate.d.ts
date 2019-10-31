declare module "svelte/animate" {
  import { DurationFn, BaseOptions } from "svelte/transition";

  export interface FlipParams {
    delay: number;
    duration: number | DurationFn;
    easing(value: number): number;
  }
  export interface Flip extends BaseOptions {
    easing(value: number): number;
    css(t: number, u: number): string;
  }

  export function flip(
    node: Node,
    animation: Animation,
    params: FlipParams
  ): Flip;
}
