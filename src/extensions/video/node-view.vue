<template>
  <node-view-wrapper
    :id="node.attrs.id"
    ref="containerRef"
    class="umo-node-view"
    :style="nodeStyle"
  >
    <div class="umo-node-container umo-hover-shadow umo-node-video">
      <drager
        :selected="selected"
        :rotatable="false"
        :boundary="false"
        :width="Number(node.attrs.width)"
        :height="Number(node.attrs.height)"
        :min-width="300"
        :min-height="200"
        :max-width="maxWidth"
        :max-height="maxHeight"
        :equal-proportion="true"
        @resize="onResize"
        @resize-start="onResizeStart"
        @resize-end="onResizeEnd"
        @click="selected = true"
      >
        <video
          ref="videoRef"
          :src="node.attrs.src"
          preload="metadata"
          controls
          crossorigin="anonymous"
          @canplay="onLoad"
        ></video>
        <div
          v-if="!node.attrs.uploaded && node.attrs.file !== null"
          class="uploading"
        ></div>
      </drager>
    </div>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { type NodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import Drager from 'es-drager'

import { mediaPlayer } from '@/utils/player'
import type { ComponentPublicInstance } from 'vue';

interface LocalNodeViewProps extends NodeViewProps { }

const { node, updateAttributes } = defineProps<LocalNodeViewProps>()
const { options, editor } = useStore()

const containerRef = ref<ComponentPublicInstance | null>(null)
let selected = $ref(false)
const videoRef = $ref<HTMLVideoElement | null>(null)
let player = $ref<Plyr | null>(null)
let maxWidth = $ref(0)
let maxHeight = $ref(0)

const nodeStyle = $computed(() => {
  const { nodeAlign, margin } = node.attrs
  const marginTop =
    margin?.top && margin?.top !== '' ? `${margin.top}px` : undefined
  const marginBottom =
    margin?.bottom && margin?.bottom !== '' ? `${margin.bottom}px` : undefined
  return {
    'justify-content': nodeAlign,
    marginTop,
    marginBottom,
  }
})

onMounted(async () => {
  await nextTick()
  if (videoRef) {
    player = mediaPlayer(videoRef)
  }

  if (node.attrs.uploaded === false && node.attrs.file) {
    try {
      const { url } =
        (await options.value?.onFileUpload?.(node.attrs.file)) ?? {}
      if (containerRef.value) {
        updateAttributes({ src: url, file: null, uploaded: true })
      }
    } catch (error) {
      useMessage('error', (error as Error).message)
    }
  }
})
const onLoad = () => {
  if (node.attrs.width === null) {
    const { clientWidth = 0, clientHeight = 0 } = videoRef ?? {}
    maxWidth = containerRef.value?.$el.clientWidth ?? 0
    const ratio = clientWidth / clientHeight
    maxHeight = containerRef.value?.$el.clientWidth / ratio
    updateAttributes({
      width: (200 * ratio).toFixed(2),
    })
    setTimeout(() => {
      updateAttributes({
        height: containerRef.value?.$el.clientHeight,
      })
    }, 200)
  }
}
const onResize = ({ width, height }: { width: number; height: number }) => {
  updateAttributes({ width, height })
}
const onResizeStart = () => {
  editor.value?.commands.autoPaging(false)
}
const onResizeEnd = () => {
  editor.value?.commands.autoPaging(true)
}
onBeforeUnmount(() => {
  if (player) {
    player?.destroy()
  }
})

onClickOutside(containerRef, () => {
  selected = false
})
</script>

<style lang="less">
.umo-node-view {
  .umo-node-video {
    max-width: 100%;
    pointer-events: none;
    border-radius: var(--umo-radius);

    .es-drager {
      max-width: 100%;
      max-height: 100%;
      .es-drager-dot {
        pointer-events: auto;
      }

      .plyr {
        height: 100%;
      }

      video {
        display: block;
        border-radius: var(--umo-radius);
        overflow: hidden;
        pointer-events: auto;
        outline: none;
        max-width: 100%;
        max-height: 100%;
        width: 100%;
        height: 100%;
      }
    }

    .plyr {
      pointer-events: auto;
    }

    .uploading {
      position: absolute;
      right: 0;
      top: 0;
      background: rgba(255, 255, 255, 0.7);
      height: 2px;
      left: 0;
      border-top-left-radius: var(--umo-radius);
      border-top-right-radius: var(--umo-radius);

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

@keyframes progress {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>
