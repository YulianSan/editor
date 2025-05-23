<template>
  <node-view-wrapper
    :id="node.attrs.id"
    ref="containerRef"
    class="umo-node-view"
    :class="{
      'umo-node-view-empty': node.attrs.draggable,
    }"
    :style="nodeStyle"
    @dblclick="openImageViewer"
  >
    <div
      class="umo-node-container umo-node-image"
      :class="{
        'is-loading': node.attrs.src && isLoading,
        'is-error': node.attrs.src && error,
        'is-draggable': node.attrs.draggable,
        'umo-hover-shadow': !options.document?.readOnly,
        'umo-select-outline': !node.attrs.draggable,
      }"
    >
      <div
        v-if="node.attrs.src && isLoading"
        class="loading"
        :style="{ height: `${node.attrs.height}px` }"
      >
        <icon name="loading" class="loading-icon" />
        {{ t('node.image.loading') }}
      </div>
      <div
        v-else-if="node.attrs.src && error"
        class="error"
        :style="{ height: `${node.attrs.height}px` }"
      >
        <icon name="image-failed" class="error-icon" />
        {{ t('node.image.error') }}
      </div>
      <drager
        v-else
        :selected="selected"
        :rotatable="true"
        :boundary="false"
        :disabled="options.document?.readOnly"
        :angle="node.attrs.angle"
        :width="node.attrs.width ? Number(node.attrs?.width) : undefined"
        :height="node.attrs.height ? Number(node.attrs?.height) : undefined"
        :left="Number(node.attrs.left)"
        :top="Number(node.attrs.top)"
        :min-width="14"
        :min-height="14"
        :max-height="node.attrs.equalProportion ? maxHeight : undefined"
        :z-index="node.attrs.zIndex"
        :equal-proportion="node.attrs.equalProportion"
        @rotate="onRotate"
        @resize="onResize"
        @resize-start="onResizeStart"
        @resize-end="onResizeEnd"
        @drag="onDrag"
      >
        <img
          ref="imageRef"
          :src="node.attrs.src"
          :style="{
            transform:
              node.attrs.flipX || node.attrs.flipY
                ? `rotateX(${node.attrs.flipX ? '180' : '0'}deg) rotateY(${node.attrs.flipY ? '180' : '0'}deg)`
                : 'none',
            objectFit: node.attrs.type === 'image-url' ? 'cover' : 'fill'
          }"
          :data-id="node.attrs.id"
          loading="lazy"
          @load="onLoad"
        />
        <div
          v-if="!node.attrs.uploaded && node.attrs.file !== null"
          class="uploading"
        >
          <span></span>
        </div>
      </drager>
    </div>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { type NodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import Drager from 'es-drager'
import { base64ToFile } from 'file64'

import { shortId } from '@/utils/short-id'
import { validImage } from '.';

interface LocalNodeViewProps extends NodeViewProps { }

const { node, updateAttributes } = defineProps<LocalNodeViewProps>()
const { options, editor, imageViewer } = useStore()
const { isLoading, error } = useImage({ src: node.attrs.src })

import type { ComponentPublicInstance } from 'vue';
import { debounce } from '@/utils/debounce';

const containerRef = ref<ComponentPublicInstance | null>(null)
const imageRef = $ref<HTMLImageElement | null>(null)
let selected = $computed(() => editor.value?.isActive('image') && editor.value?.getAttributes('image').id === node.attrs.id)
let maxHeight = $ref(200)
let newAttributes: { [key: string]: any } = {}

const updateAllAttributes = debounce(
  () => {
    updateAttributes(newAttributes)
    newAttributes = {}
  },
  1000,
  (attrs: { [key: string]: any }) => {
    newAttributes = {
      ...newAttributes,
      ...attrs
    }
  }
)

const nodeStyle = $computed(() => {
  const { nodeAlign, margin } = node.attrs
  const marginTop =
    margin?.top && margin?.top !== '' ? `${margin.top}px` : undefined
  const marginBottom =
    margin?.bottom && margin?.bottom !== '' ? `${margin.bottom}px` : undefined
  return {
    justifyContent: nodeAlign,
    marginTop,
    marginBottom,
    zIndex: selected ? 1000000 : node.attrs.draggable ? node.attrs.zIndex : 0,
  }
})

const uploadImage = async () => {
  if (node.attrs.uploaded || !node.attrs.file) {
    if (
      node.attrs.originalSrc
        && options.value.document?.readOnly
        && node.attrs.type === 'image-url'
    ) {
      try{
        await validImage(node.attrs.originalSrc, 1000)
        updateAttributes({
          src: node.attrs.originalSrc,
          originalSrc: null
        })
      } catch (error) {
        updateAttributes({
          originalSrc: null
        })
      }
    }
    return
  }

  try {
    const { id, url } =
      (await options.value?.onFileUpload?.(node.attrs.file)) ?? {}
    if (containerRef.value) {
      updateAttributes({ id, src: url, file: null, uploaded: true })
    }
  } catch (error) {
    useMessage('error', (error as Error).message)
  }
}
const onLoad = async () => {
  if (node.attrs.width === null) {
    const { clientWidth = 1, clientHeight = 1 } = imageRef ?? {}
    const ratio = clientWidth / clientHeight
    maxHeight = containerRef.value?.$el.clientWidth / ratio
    updateAttributes({ width: (200 * ratio).toFixed(2) })
  }

  if ([null, 'auto', 0].includes(node.attrs.width)) {
    await nextTick()
    const { width } = imageRef?.getBoundingClientRect() ?? {}
    if (typeof width !== 'number') return
    updateAttributes({ width: width.toFixed(2) })
  }

  if ([null, 'auto', 0].includes(node.attrs.height)) {
    await nextTick()
    const { height } = imageRef?.getBoundingClientRect() ?? {}
    if (typeof height !== 'number') return
    updateAttributes({ height: height.toFixed(2) })
  }
}

const onRotate = ({ angle }: { angle: number }) => {
  updateAllAttributes({ angle })
}

const onResize = ({ width, height }: { width: number; height: number }) => {
  updateAllAttributes({
    width: width.toFixed(2),
    height: height.toFixed(2)
  })
}

const onResizeStart = () => {
  editor.value?.commands.autoPaging(false)
}
const onResizeEnd = () => {
  editor.value?.commands.autoPaging(true)
}

const onDrag = ({ left, top }: { left: number; top: number }) => {
  updateAllAttributes({ left, top })
}

const openImageViewer = () => {
  imageViewer.value.visible = true
  imageViewer.value.current = node.attrs.id
}

watch(
  () => node.attrs.equalProportion,
  async () => {
    await nextTick()
    const width = imageRef?.offsetWidth ?? 1
    const height = imageRef?.offsetHeight ?? 1
    updateAttributes({ width, height })
  },
)
watch(
  () => node.attrs.src,
  async (src: string) => {
    if (node.attrs.uploaded === false && !error.value) {
      if (src?.startsWith('data:image')) {
        const [data, type] = src.split(';')[0].split(':')
        let [_, ext] = type.split('/')
        if (ext === 'jpeg') {
          ext = 'jpg'
        }
        if (ext === 'svg+xml') {
          ext = 'svg'
        }
        const filename = shortId(10)
        const file = await base64ToFile(src, `${filename}.${ext}`, {
          type,
        })
        updateAttributes({ file })
      }
      await nextTick()
      void uploadImage()
    }
  },
  { immediate: true },
)
watch(
  () => error.value,
  (errorValue: any) => {
    if (errorValue?.type) {
      updateAttributes({ error: errorValue.type === 'error' })
    } else {
      updateAttributes({ error: false })
    }
  },
)

onUnmounted(() => {
  if (node.attrs.uploaded) options.value.onFileDelete?.(node.attrs.id, node.attrs.src)
})
</script>

<style lang="less">
.umo-node-view {
  .umo-node-image {
    max-width: 100%;
    width: auto;
    position: relative;
    z-index: 20;
    &.is-loading,
    &.is-error {
      outline: none !important;
      box-shadow: none !important;
    }
    &:not(.is-draggable) .es-drager {
      max-width: 100%;
      max-height: 100%;
    }
    img {
      display: block;
      max-width: 100%;
      max-height: 100%;
      width: 100%;
      height: 100%;
    }

    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--umo-text-color-light);
      font-size: 12px;
      gap: 10px;

      .loading-icon {
        color: var(--umo-primary-color);
        font-size: 22px;
        animation: turn 1s linear infinite;
      }
    }

    .error {
      width: 200px;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: var(--umo-text-color-light);
      font-size: 12px;

      .error-icon {
        font-size: 72px;
        margin: -8px 0 -2px;
      }
    }

    .uploading {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.1);

      span {
        display: block;
        position: absolute;
        background: rgba(0, 0, 0, 0.2);
        height: 4px;
        border-radius: 2px;
        top: 50%;
        left: 20%;
        right: 20%;
        transform: translateY(-50%);
        overflow: hidden;

        &:after {
          content: '';
          display: block;
          height: 100%;
          background-color: var(--umo-primary-color);
          animation: progress 1s linear infinite;
        }
      }
    }
  }
}

@keyframes turn {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes progress {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>
