<template>
  <node-view-wrapper
    :id="node.attrs.id"
    ref="containerRef"
    class="umo-node-view"
    :style="{
      zIndex: 90,
      '--umo-textbox-border-color': node.attrs.borderColor,
      '--umo-textbox-border-width': node.attrs.borderWidth + 'px',
      '--umo-textbox-border-style': node.attrs.borderStyle,
      '--umo-textbox-background-color': node.attrs.backgroundColor,
    }"
    @dblclick.capture="disabled = true"
  >
    <div
      class="umo-node-container umo-node-text-box"
      :class="{ 'is-draggable': node.attrs.draggable }"
    >
      <drager
        :selected="selected"
        :disabled="disabled || options?.document?.readOnly"
        :rotatable="true"
        :boundary="false"
        :angle="node.attrs.angle"
        :width="node.attrs.width"
        :height="node.attrs.height"
        :left="node.attrs.left"
        :top="node.attrs.top"
        :min-width="14"
        :min-height="14"
        :title="t('node.textBox.tip')"
        :disabledKeyEvent="true"
        @rotate="onRotate"
        @resize="onResize"
        @drag="onDrag"
        @blur="onBlur"
        @click="selected = true"
      >
        <node-view-content class="umo-node-text-box-content" />
      </drager>
    </div>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { debounce } from '@/utils/debounce';
import { NodeViewContent, type NodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import Drager from 'es-drager'

interface LocalNodeViewProps extends NodeViewProps { }

const { node, updateAttributes } = defineProps<LocalNodeViewProps>()

let newAttributes = {}

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

const { options } = useStore()

const containerRef = ref(null)
let selected = $ref(false)
let disabled = $ref(false)

const onBlur = () => {
  disabled = false
}

const onRotate = ({ angle }: { angle: number }) => {
  updateAllAttributes({ angle })
}
const onResize = ({ width, height }: { width: number; height: number }) => {
  updateAllAttributes({ width, height })
}
const onDrag = ({ left, top }: { left: number; top: number }) => {
  updateAllAttributes({ left, top })
}

onClickOutside(containerRef, () => { selected = false })
</script>

<style lang="less">
.umo-node-view {
  .umo-node-text-box {
    position: relative;
    .es-drager {
      user-select: text !important;
      cursor: default !important;
      z-index: 90 !important;
      background-color: var(--umo-textbox-background-color);
      &.dragging {
        caret-color: transparent;
      }
      &.disabled {
        outline: none;
        &:after {
          display: none !important;
        }
      }
      &.selected {
        .umo-node-text-box-content {
          outline: none;
        }
      }
      &.disabled.selected {
        .umo-node-text-box-content {
          outline: var(--umo-textbox-border-style)
            var(--umo-textbox-border-width) var(--umo-textbox-border-color);
        }
      }
    }
    .umo-node-text-box-content {
      outline: var(--umo-textbox-border-style) var(--umo-textbox-border-width)
        var(--umo-textbox-border-color);
      height: 100%;
      padding: 5px;
      box-sizing: border-box;
      overflow: hidden;
    }
  }
}
</style>
