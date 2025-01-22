declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, any>

  export default component
}

declare module 'dom-to-image-more' {
  export function toBlob(node: HTMLElement, options?: any): Promise<Blob>
  export function toJpeg(node: HTMLElement, options?: any): Promise<Blob>
  export function toPng(node: HTMLElement, options?: any): Promise<Blob>
}
