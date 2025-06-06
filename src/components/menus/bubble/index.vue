<template>
  <bubble-menu
    v-show="!blockMenu && !painter.enabled && !editor!.isEmpty"
    class="umo-editor-bubble-menu"
    :class="{ assistant: assistantBox }"
    :shouldShow="shouldShowBubbleMenu"
    :editor="editor!"
    :tippy-options="tippyOpitons"
  >
    <menus-bubble-menus
      v-if="options?.document?.enableBubbleMenu && !assistantBox && !commentBox"
    >
      <template #bubble_menu="props">
        <slot name="bubble_menu" v-bind="props" />
      </template>
    </menus-bubble-menus>
    <assistant-input v-if="options?.assistant?.enabled && assistantBox" />
  </bubble-menu>
</template>

<script setup lang="ts">
import type { Editor } from '@tiptap/core';
import type { EditorState } from '@tiptap/pm/state';
import { BubbleMenu } from '@tiptap/vue-3'
import type { Instance, Props } from 'tippy.js'

const { options, editor, painter, blockMenu, assistantBox, commentBox } =
  useStore()

const shouldShowBubbleMenu = (props: { editor: Editor, state: EditorState }) => {
  const { selection } = props.state
  const { empty } = selection

  return props.editor.isEditable && !empty;
}

// 气泡菜单
let tippyInstance = $ref<Instance | null>(null)
const tippyOpitons = $ref<Partial<Props>>({
  appendTo: 'parent',
  maxWidth: 580,
  zIndex: 9*(10**10),
  onShow(instance: Instance) {
    tippyInstance = instance
  },
  onHide() {
    assistantBox.value = false
    commentBox.value = false
  },
  onDestroy() {
    tippyInstance = null
  },
})

// AI 助手
watch(
  () => [assistantBox.value, commentBox.value],
  (visible: any[]) => {
    tippyInstance?.setProps({
      placement: visible.includes(true) ? 'bottom' : 'top',
    })
  },
)
</script>

<style lang="less">
.umo-editor-bubble-menu {
  border-radius: var(--umo-radius);
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &:not(.assistant) {
    padding: 8px 10px;
    box-shadow: var(--umo-shadow);
    border: 1px solid var(--umo-border-color);
    background-color: var(--umo-color-white);
  }

  &:empty {
    display: none;
  }

  .umo-menu-button.show-text .umo-button-content .umo-button-text {
    display: none !important;
  }

  .umo-menu-button.huge {
    height: var(--td-comp-size-xs);
    min-width: unset;

    .umo-button-content {
      min-width: unset !important;

      .umo-icon {
        font-size: 16px;
        margin-top: 0;
      }
    }
  }
}
</style>
