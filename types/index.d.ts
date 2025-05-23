import type { Extension } from '@tiptap/core'
import type { AsyncFunction } from '@tool-belt/type-predicates'

import type { NodesComputed } from '@/extensions/page/types'
export type SupportedLocale = 'en-US' | 'zh-CN' | 'pt-BR'
export interface MarginOption {
  left: number
  right: number
  top: number
  bottom: number
}
export interface WatermarkOption {
  type: string
  alpha: number
  fontColor: string
  fontSize: number
  fontFamily: string
  fontWeight: string
  text: string
}
export interface NodesComputedOption {
  types: string[]
  nodesComputed: NodesComputed
}

export interface PageOption {
  defaultMargin?: MarginOption
  defaultOrientation?: string
  defaultBackground?: string
  watermark?: WatermarkOption
  nodesComputedOption?: NodesComputedOption
  size?: {
    width: number
    height: number
    label?: LocaleLabel
  }
  margin?: {
    right: number
    left: number
    bottom: number
    top: number
    layout?: 'narrow' | 'moderate' | 'wide' | 'custom'
  }
  orientation?: string
  background?: string
  header?: boolean
  footer?: boolean
  showLineNumber?: boolean
  showToc?: boolean
  pagination?: boolean
  zoomLevel?: number
  bodyHeight?: number
  autoWidth?: boolean
  preview?: {
    enabled?: boolean
    laserPointer?: boolean
  }
}

export type ToolbarMenu =
  | 'base'
  | 'insert'
  | 'table'
  | 'tools'
  | 'page'
  | 'export'
  | 'advanced'
  | 'custom'

export interface ToolbarOptions {
  defaultMode: 'classic' | 'ribbon'
  enableSourceEditor: boolean
  menus: ToolbarMenu[]
  disableMenuItems: string[]
  importWord: {
    enabled: boolean
    options: unknown
    useCustomMethod?: boolean
    onCustomImportWordMethod?: (file: File) => Promise<{
      id: string
      url: string
      value: string
      messages: { type: string; message: string }
    }>
  }
}

export interface AutoSaveOptions {
  enabled: boolean
  interval: number
}

export interface DocumentOptions {
  id?: string
  title: string
  content: string
  placeholder?: Record<string, string>
  enableSpellcheck?: boolean
  enableMarkdown?: boolean
  enableBubbleMenu?: boolean
  enableBlockMenu?: boolean
  enableComment?: boolean
  readOnly?: boolean
  autofocus?: 'start' | 'end' | 'all' | number | boolean | null
  characterLimit?: number
  typographyRules?: Record<string, unknown>
  editorProps?: Record<string, unknown>
  parseOptions?: Record<string, unknown>
  autoSave?: AutoSaveOptions
}

export type KeyLocaleLabel = 'en_US' | 'zh_CN' | 'pt_BR'
export type LocaleLabel = string | Record<KeyLocaleLabel, string>

export interface PageSize {
  label: LocaleLabel
  width: number
  height: number
  default?: boolean
}

export interface Font {
  label: LocaleLabel
  value: string | undefined
}

export interface LineHeight {
  label: LocaleLabel
  value: number
  default?: boolean
}

export interface GraphicSymbol {
  label: LocaleLabel
  items: string
}

export interface Emoji {
  label: LocaleLabel
  items: string
}

export interface Template {
  title: string
  content: string
  description?: string
  value: string
  divider?: boolean
}

export interface AssistantOptions {
  maxlength: number
  commands: CommandItem[]
  enabled: boolean
}

export interface CommandItem {
  label: LocaleLabel
  value: LocaleLabel
  autoSend?: boolean
}

export interface AssistantPayload {
  lang: string
  input: string
  command: string
  output: string
}

export interface AssistantContent {
  html: string
  text: string
  json: unknown
}
export interface AssistantResult {
  prompt: string
  content: string
  error: boolean
  command?: string
}

export interface UmoEditorOptions {
  editorKey: string
  locale: SupportedLocale
  theme: 'light' | 'dark'
  height: string
  dicts?: {
    pageSizes: PageSize[]
    fonts: Font[]
    colors: string[]
    lineHeights: LineHeight[]
    symbols: GraphicSymbol[]
    emojis: Emoji[]
  }
  toolbar?: ToolbarOptions
  page: PageOption
  document?: DocumentOptions
  assistant?: AssistantOptions
  templates?: Template[]
  cdnUrl?: string
  shareUrl?: string
  diagrams?: Record<string, unknown>
  file?: { allowedMimeTypes: string[]; maxSize: number }
  user?: Record<string, unknown>
  extensions?: Extension[]
  translations?: Record<string, unknown>
  onSave?: AsyncFunction
  onFileUpload?: (file: File) => Promise<{ id: string; url: string }>
  onFileDelete?: CallableFunction
  onAssistant?: AsyncFunction
  onCustomImportWordMethod?: AsyncFunction
  contentIsValid?: (content: string) => boolean
  directives?: string[]
}
