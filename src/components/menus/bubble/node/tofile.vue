<template>
  <menus-button
    ico="file-view"
    :text="t('bubbleMenu.toFile')"
    @menu-click="nodeTofile"
  />
</template>

<script setup lang="ts">
import { getSelectionNode } from '@/extensions/selection'
const { editor } = useStore()

const nodeTofile = () => {
  const { attrs } = getSelectionNode(editor.value)
  if (!attrs) {
    return false
  }
  editor.value.commands.insertContent({
    type: 'file',
    attrs: {
      ...attrs,
      url: attrs.url || attrs.src,
    },
  })
  return true
}
</script>
