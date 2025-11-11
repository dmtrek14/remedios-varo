/// <reference types="astro/client" />
/// <reference types="solid-js" />

declare namespace JSX {
  type Element = import("solid-js").JSX.Element;
  interface IntrinsicElements
    extends import("solid-js").JSX.IntrinsicElements {}
}
