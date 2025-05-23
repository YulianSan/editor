<template>
  <menus-button
    :ico="!!attrs ? 'edit' : 'image'"
    :text="!!attrs ? t('insert.link.editImage') : t('insert.link.image')"
    huge
    @menu-click="dialogVisible = true"
  >
    <modal :visible="dialogVisible" icon="image" :header="t('insert.link.image')" width="420px"
      @confirm="setImage" @close="dialogVisible = false">
      <div class="umo-link-container">
        <t-form label-align="top">
          <t-form-item :label="t('insert.image_link.name')">
            <t-input @blur="onBlur" v-model="form.name" type="text" clearable :placeholder="t('insert.image_link.nameTip')" />
          </t-form-item>
          <t-form-item :label="t('insert.link.href')">
            <t-input @blur="onBlur" v-model="form.src" type="url" clearable :placeholder="t('insert.link.hrefTip')" />
          </t-form-item>
          <t-form-item :label="t('insert.link.hrefDefault')">
            <t-input @blur="onBlur" v-model="form.defaultSrc" type="url" clearable :placeholder="t('insert.link.hrefTip')" />
          </t-form-item>
        </t-form>
        <div class="umo-preview-image-render">
          <div class="umo-preview-title" v-text="t('tools.barcode.preview')"></div>
          <div class="umo-preview-image narrow-scrollbar">
            <img :src="urlPreview" />
          </div>
        </div>
      </div>
    </modal>
  </menus-button>
</template>
<script setup lang="ts">
import { validImage } from '@/extensions/image';

const { editor } = useStore()

const { attrs } = defineProps<{
  attrs?: any
}>()

let dialogVisible = $ref(false)

const IMAGE_PLACEHOLDER = 'https://dummyimage.com/100x100/eee/aaa'

const form = reactive({
  src: '',
  defaultSrc: '',
  name: '',
  errors: {
    src: false
  }
})

let urlPreview = $ref(IMAGE_PLACEHOLDER)

const onBlur = async () => {
  if (form?.src?.match(/^(https?:\/\/|data:)/)) {
    try {
      await validImage(form.src, 10000)
      form.errors.src = false
      urlPreview = form.src
    } catch (e) {
      form.errors.src = true
      urlPreview = form.defaultSrc
    }

    return;
  }

  form.errors.src = true
  urlPreview = form.defaultSrc
}

const setImage = () => {
  editor.value
    ?.chain()
    .focus()
    .setImage({
      rotatable: true,
      type: 'image-url',
      ...(attrs ?? {}),
      src: urlPreview,
      defaultSrc: form.defaultSrc,
      originalSrc: form.errors.src ? form.src : null,
      name: form.name
    }, true)
    .run()

  dialogVisible = false
}

watch(() => dialogVisible, () => {
  const src = attrs?.originalSrc ?? attrs?.src
  const defaultSrc = attrs?.defaultSrc ?? IMAGE_PLACEHOLDER
  form.defaultSrc = defaultSrc

  if (dialogVisible && src) {
    urlPreview = src
    form.src = src
    form.name = attrs?.name
    onBlur()
    return
  }

  urlPreview = form.defaultSrc
  form.src = ''
  form.errors.src = false
})
</script>
<style lang="less" scoped>
.umo-link-container {
  padding: 2px;
  :deep(.umo-form__item) {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}

.umo-preview-image-render {
  border: solid 1px var(--td-border-level-2-color);
  border-radius: var(--umo-radius);
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  margin-top: 10px;
  .umo-preview-title {
    background-color: var(--umo-button-hover-background);
    padding: 0 10px;
    position: absolute;
    font-size: 12px;
    border-bottom-right-radius: var(--umo-radius);
  }
  .umo-preview-image {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100px;
    img {
      max-width: 100%;
      max-height: 250px;
      object-fit: cover;
    }
  }
}
</style>
