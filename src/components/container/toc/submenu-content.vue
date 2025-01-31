<script setup lang="ts">
import { IMAGE, PARAGRAPH } from '@/extensions/page/node-names';
import { Node } from '@tiptap/pm/model';
import { NodeSelection, TextSelection } from '@tiptap/pm/state';

const { item } = defineProps<{
  item: Node
}>()

const visible = ref(false)

const validNodes = $computed(
  () => item.content?.content?.filter?.((i: Node) => !!i.attrs.id)
)

const onClick = () => {
  const { container, editor } = useStore()
  if (validNodes.length) {
    visible.value = !visible.value
    return
  }

  if (!editor.value) {
    return
  }

  const element = editor.value.view.dom.querySelector(`#${item.attrs.id}`)

  const pageContainer = document.querySelector(
    `${container} .umo-zoomable-container`,
  )

  pageContainer?.scrollTo({
    top: (element as HTMLElement)?.offsetTop ?? 0 + 10,
  })

  const pos = editor.value.view.posAtDOM(element as Element, 0)
  if (pos < 0) return

  const { tr } = editor.value.view.state
  const resolvedPos = tr.doc.resolve(pos);

  if (resolvedPos.nodeAfter?.isTextblock) {
    tr.setSelection(TextSelection.create(tr.doc, pos + 1))
  } else if (resolvedPos.nodeAfter?.isBlock) {
    tr.setSelection(NodeSelection.create(tr.doc, pos))
  } else {
    tr.setSelection(TextSelection.create(tr.doc, pos))
  }

  editor.value.view.dispatch(tr)

  if (editor.value.can().focus()) {
    editor.value.view.focus()
  }
}

const label = $computed(() => {
  /** @ts-ignore */
  if (item.type.name == PARAGRAPH) return item.firstChild?.text ?? t('toc.paragraph.empty')
  /** @ts-ignore */
  if (item.type.name == IMAGE) return item.attrs?.name ?? t('toc.image.empty')

  return item.type.name
})

</script>
<template>
  <div class="umo-toc-text">
    <span @click="onClick">
      <icon :name="item.type.name.toLowerCase().trim()" />
      {{ label }}
    </span>
    <Transition v-if="validNodes.length" name="fade">
      <container-toc-submenu v-show="visible" :content="item.content.content" />
    </Transition>
  </div>
</template>
