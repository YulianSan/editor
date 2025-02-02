import type { Mark } from '@tiptap/pm/model'
import type { Editor } from '@tiptap/vue-3'
import type { TableOfContentDataItem } from '@tiptap-pro/extension-table-of-contents'

import { changeComputedHtml } from '@/extensions/page/core'
import { defaultOptions, objectSchema } from '@/options'
import type { PageOption, UmoEditorOptions } from '@/types'
import { shortId } from '@/utils/short-id'
import { ref } from 'vue'

export type TableOfContentItem = TableOfContentDataItem & { title: string }

export const useStore = createGlobalState(() => {
  const toolbarKey = ref<string>(shortId())
  const options = ref<UmoEditorOptions>(defaultOptions)
  const defaultOptionsCustom = ref<Partial<UmoEditorOptions> | undefined>()
  const page = ref<PageOption>(defaultOptions.page)
  const editor: Ref<Editor | undefined> = ref()

  const painter = ref<{
    enabled: boolean
    once: boolean
    marks: Mark[]
  }>({
    enabled: false,
    once: true,
    marks: [],
  })

  const blockMenu = ref(false)
  const assistantBox = ref(false)
  const commentBox = ref(false)
  const tableOfContents = ref<TableOfContentItem[]>([])
  const imageViewer = ref({
    visible: false,
    current: null,
  })
  const searchReplace = ref(false)
  const savedAt = ref<number | null>(null)
  const printing = ref(false)
  const exportImage = ref(false)
  const exportPDF = ref(false)
  const hidePageHeader = ref(true)
  const hidePageFooter = ref(true)
  const editorDestroyed = ref(false)

  type TKeyUmoEditorOptions = keyof UmoEditorOptions

  const setOptions = (value: Partial<UmoEditorOptions> | Ref<Partial<UmoEditorOptions>>, isDefault = false) => {
    const opts = isRef(value) ? value.value : value

    if (isDefault) {
      defaultOptionsCustom.value = opts
    }

    options.value = objectSchema.merge(
      options.value,
      Object.keys(opts).reduce<Record<string, TKeyUmoEditorOptions>>(
        (acc: Record<TKeyUmoEditorOptions, any>, _key: string) => {
          const key = _key as TKeyUmoEditorOptions

          if (opts[key] !== undefined) {
            acc[key] = opts[key]
          }
          return acc
        },
        {} as  Record<TKeyUmoEditorOptions, any>,
      ),
    )
    const $locale = useState('locale')
    if (!options.value.locale) {
      $locale.value = options.value.locale
    }
    return options.value
  }

  const setPainter = ({
    enabled,
    once,
    marks,
  }: {
    enabled: boolean
    once: boolean
    marks: Mark[]
  }) => {
    painter.value.enabled = enabled
    painter.value.once = once
    painter.value.marks = marks
  }

  watch(options, ({ page }: UmoEditorOptions) => {
    updatePage(page)
  })

  const updatePage = ({ size, defaultBackground, defaultMargin, defaultOrientation, watermark, }: PageOption) => {
    page.value = {
      size: size ?? options.value.dicts?.pageSizes.find(
        (item: { default?: boolean }) => item?.default ?? false,
      ),
      margin: defaultMargin,
      background: defaultBackground,
      orientation: defaultOrientation,
      watermark,
      header: true,
      footer: true,
      showLineNumber: false,
      showToc: false,
      pagination: true,
      zoomLevel: 100,
      autoWidth: false,
      preview: {
        enabled: false,
        laserPointer: true,
      },
    }
  }

  watch(
    () => options.value.page,
    updatePage,
    { immediate: true, once: true, deep: true },
  )

  watch(
    () => [page.value.size, page.value.margin, page.value.orientation],
    () => {
      editor.value?.commands.autoPaging(false)
      changeComputedHtml()
      setTimeout(() => {
        editor.value?.commands.autoPaging(true)
      }, 1000)
    },
    { deep: true },
  )

  const setEditor = (editorInstance: Editor) => {
    editor.value = editorInstance
  }
  const resetStore = () => {
    options.value = objectSchema.merge(
      defaultOptions,
      defaultOptionsCustom.value ?? {},
    )
    editor.value = undefined
    tableOfContents.value = []
    searchReplace.value = false
    savedAt.value = null
    editorDestroyed.value = true
  }

  watch(
    () => options.value.document?.readOnly,
    (val?: boolean) => {
      editor.value?.setEditable(!val)
      toolbarKey.value = shortId()
    },
  )

  return {
    toolbarKey,
    container: `#umo-editor-${shortId(4)}`,
    options,
    page,
    editor,
    painter,
    blockMenu,
    assistantBox,
    commentBox,
    tableOfContents,
    imageViewer,
    searchReplace,
    savedAt,
    printing,
    exportImage,
    exportPDF,
    hidePageHeader,
    hidePageFooter,
    editorDestroyed,
    setOptions,
    setEditor,
    setPainter,
    resetStore,
  }
})
