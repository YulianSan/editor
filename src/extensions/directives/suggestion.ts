import { VueRenderer, type Editor, type Range } from "@tiptap/vue-3"
import NodeView from './node-view.vue'
import tippy, { type Tippy } from "tippy.js"
import type { EditorView } from "@tiptap/pm/view"

export default {
  items: ({ query }: { query: string }) => {
    const { options } = useStore()

    return options.value?.directives?.map(
      item => ({
        title: item.replace(/^@/, ''),
        command: ({ editor, range }: { editor: Editor, range: Range }) => {
          editor
            .chain()
            .focus()
            .insertContentAt(range, `${item}`)
            .run()
        }
      }),
    )?.filter(
      item => item.title.toLowerCase().startsWith(query.toLowerCase())
          && item.title.length !== query.length,
    ).slice(0, 10)
  },

  render: () => {
    let component: VueRenderer
    let popup: any

    return {
      onStart: (props: any) => {

        component = new VueRenderer(NodeView, {
          props,
          editor: props.editor,
        })

        if (!props.clientRect) {
          return
        }

        /** @ts-ignore */
        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props: any) {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props: { event: KeyboardEvent, range: Range, view: EditorView }) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }

        return component.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}
