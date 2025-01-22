export {}

declare module '@vue/runtime-core' {
  import type {
    ComposerTranslation,
    LocaleMessage,
    LocaleMessageValue,
    RemoveIndexSignature,
    VueMessageType,
  } from 'vue-i18n';

  import type { KeyLocaleLabel } from '.';

  import type {
    ComponentCustomOptions as _ComponentCustomOptions,
    ComponentCustomProperties as _ComponentCustomProperties,
  } from 'vue';

  interface ComponentCustomProperties extends _ComponentCustomProperties {
    t: ComposerTranslation<
      {
        [x: KeyLocaleLabel]: LocaleMessage<VueMessageType>;
      },
      string,
      RemoveIndexSignature<{
        [x: KeyLocaleLabel]: LocaleMessageValue<VueMessageType>;
      }>,
      never,
      string,
      string
    >;
    l: (data: string | Record<string, string>) => string | undefined;
  }
  interface ComponentCustomOptions extends _ComponentCustomOptions { }
}
