<script setup lang="ts">
import { Node } from '@tiptap/pm/model';

const props = defineProps<{
  content: readonly Node[]
}>()

const validNodes = $computed(() => {
  return props.content.filter((item: Node) => {
    return !!item.attrs.id
  })
})

defineOptions({
  name: 'ContainerTocSubmenu',
})
</script>
<template>
  <div>
    <div v-for="item in validNodes" :key="item.attrs.id" class="umo-toc-item">
      <container-toc-submenu-content :item="item" />
    </div>
  </div>
</template>
