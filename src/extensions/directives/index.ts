import { Extension } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'
import type { Editor, Range } from '@tiptap/vue-3'

export default Extension.create({
  name: 'commands',

  addOptions() {
    return {
      suggestion: {
        char: '@',
        command: (
          { editor, range, props }: { editor: Editor, range: Range, props: any }
        ) => {
          props.command({ editor, range })
        },
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})
