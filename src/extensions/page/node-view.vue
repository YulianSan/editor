<template>
  <node-view-wrapper
    :id="node.attrs.id"
    ref="containerRef"
    class="umo-page-node-view"
    :class="{ 'no-shadow': exportImage }"
    :style="{
      '--umo-page-background': page.background,
      '--umo-page-margin-top': `${page.margin?.top ?? '0'}cm`,
      '--umo-page-margin-bottom': `${page.margin?.bottom ?? '0'}cm`,
      '--umo-page-margin-left': `${page.margin?.left ?? '0'}cm`,
      '--umo-page-margin-right': `${page.margin?.right ?? '0'}cm`,
      '--umo-page-width': `${pageSize.width}cm`,
      '--umo-page-height': `round(up, ${pageSize.height}cm, 1px)`,
    }"
  >
    <tooltip
      v-if="node.attrs.pageNumber > 1"
      placement="right"
      :content="t('pagination.toggle')"
    >
      <div
        class="umo-page-node-view-handler"
        @dblclick="page.pagination = !page.pagination"
      ></div>
    </tooltip>
    <t-watermark
      v-if="page.watermark"
      class="umo-page-watermark"
      :alpha="page.watermark?.alpha"
      v-bind="watermarkOptions"
      :watermark-content="page.watermark as WatermarkText"
    >
      <div class="umo-page-node-header" contenteditable="false">
        <div
          class="umo-page-corner corner-l"
          style="width: var(--umo-page-margin-left)"
        ></div>

        <div class="umo-page-node-header-content">
          <component
            :is="node.attrs.slots.page_header"
            v-if="page.header"
            :page-number="node.attrs.pageNumber"
            :total-pages="editor.$nodes('page')?.length ?? 0"
          />
        </div>
        <div
          class="umo-page-corner corner-r"
          style="width: var(--umo-page-margin-right)"
        ></div>
      </div>
      <node-view-content
        class="umo-page-node-content"
        :style="{
          height:
            pageSize.height -
            (page.margin?.top ?? 0) -
            (page.margin?.bottom ?? 0) +
            'cm',
        }"
      />
      <div class="umo-page-node-footer" contenteditable="false">
        <div
          class="umo-page-corner corner-l"
          style="width: var(--umo-page-margin-left)"
        ></div>
        <div class="umo-page-node-footer-content">
          <component
            :is="node.attrs.slots.page_footer"
            v-if="page.footer"
            :page-number="node.attrs.pageNumber"
            :total-pages="editor.$nodes('page')?.length ?? 0"
          />
        </div>
        <div
          class="umo-page-corner corner-r"
          style="width: var(--umo-page-margin-right)"
        ></div>
      </div>
    </t-watermark>
  </node-view-wrapper>
</template>
<script setup lang="ts">
import { NodeViewContent, type NodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import type { WatermarkText } from 'tdesign-vue-next'

import type { WatermarkOption } from '@/types'

interface LocalNodeViewProps extends NodeViewProps { }

const { page, exportImage } = useStore()
const { editor, node } = defineProps<LocalNodeViewProps>()
const containerRef = ref(null)

const pageSize = $computed(() => {
  if (!page.value.size) return { width: 0, height: 0 };

  const { width, height } = page.value.size

  return {
    width: page.value.orientation === 'portrait' ? width : height,
    height: page.value.orientation === 'portrait' ? height : width,
  }
})

// 水印
const watermarkOptions = $ref<{
  x: number
  y?: number
  width?: number
  height: number
  type?: string
}>({
  x: 0,
  height: 0,
})
watch(
  () => page.value.watermark,
  ({ type }: Partial<WatermarkOption> = { type: '' }) => {
    if (type === 'compact') {
      watermarkOptions.width = 320
      watermarkOptions.y = 240
    } else {
      watermarkOptions.width = 480
      watermarkOptions.y = 360
    }
  },
  { deep: true, immediate: true },
)
</script>

<style lang="less" scoped>
.umo-page-node-view {
  box-sizing: border-box;
  background-color: var(--umo-page-background);
  width: var(--umo-page-width);
  overflow: hidden;

  &.no-shadow {
    border: solid 1px var(--umo-border-color);
    box-shadow: unset;
  }

  &:not(.no-shadow) {
    box-shadow:
      rgba(0, 0, 0, 0.06) 0 0 10px 0,
      rgba(0, 0, 0, 0.04) 0 0 0 1px;
  }

  &:not(:first-child) {
    margin-top: 15px;
  }

  &:not(:last-child) {
    margin-bottom: 15px;
  }

  @media print {
    position: relative;
    box-shadow: unset !important;
    margin: 0 !important;
    overflow: hidden;
  }

  .umo-page-node-view-handler {
    position: absolute;
    width: 100%;
    height: 20px;
    cursor: row-resize;
    margin-top: -20px;
    z-index: 5;
    @media print {
      display: none;
    }
  }

  .umo-page-watermark {
    position: unset !important;
    width: var(--umo-page-width);
    height: var(--umo-page-height);
    display: flex;
    flex-direction: column;
  }

  .umo-page-node-header {
    height: var(--umo-page-margin-top);
    overflow: hidden;
  }

  .umo-page-node-footer {
    height: var(--umo-page-margin-bottom);
    overflow: hidden;
  }

  .umo-page-node-header,
  .umo-page-node-footer {
    display: flex;
    justify-content: space-between;
  }

  .umo-page-node-header {
    .umo-page-corner::after {
      height: min(calc(var(--umo-page-margin-top) - 1px), 1cm);
      border: solid min(1px, var(--umo-page-margin-top)) var(--umo-border-color);
      border-top: none;
      bottom: 0;
    }
  }

  .umo-page-node-footer {
    .umo-page-corner::after {
      height: min(calc(var(--umo-page-margin-bottom) - 1px), 1cm);
      border: solid min(1px, var(--umo-page-margin-bottom)) var(--umo-border-color);
      border-bottom: none;
      top: 0;
    }
  }

  .umo-page-corner {
    box-sizing: border-box;
    position: relative;
    z-index: 10;

    @media print {
      opacity: 0;
    }

    &::after {
      position: absolute;
      content: '';
      display: block;
    }

    &.corner-l::after {
      width: min(calc(var(--umo-page-margin-left) - 1px), 1cm);
      border-left: none;
      right: 0;
    }

    &.corner-r::after {
      width: min(calc(var(--umo-page-margin-right) - 1px), 1cm);
      border-right: none;
      left: 0;
    }
  }

  .umo-page-node-header-content,
  .umo-page-node-footer-content {
    flex: 1;
  }

  .umo-page-node-content {
    flex: 1;
    box-sizing: border-box;
    padding: 0 var(--umo-page-margin-right) 0 var(--umo-page-margin-left);
  }
}
</style>

<style lang="less">
.disable-page-break .umo-page-node-view {
  &:not(:first-child) {
    margin-top: 0 !important;

    .umo-page-node-header {
      display: none;
    }
  }

  &:not(:last-child) {
    margin-bottom: 0 !important;

    .umo-page-node-footer {
      display: none;
    }
  }

  .umo-page-node-view-handler {
    background-color: var(--umo-page-background);
    margin-top: -10px;

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      position: absolute;
      border-bottom: dashed 1px var(--umo-border-color);
      top: 9px;
    }
  }

  .umo-page-watermark {
    padding: 20px 0;
    height: calc(
      var(--umo-page-height) - var(--umo-page-margin-top) -
        var(--umo-page-margin-bottom)
    );
  }

  &:first-child {
    .umo-page-watermark {
      padding-top: 0;
      height: calc(var(--umo-page-height) - var(--umo-page-margin-top));
    }
  }

  &:last-child {
    .umo-page-watermark {
      padding-bottom: 0;
      height: calc(var(--umo-page-height) - var(--umo-page-margin-bottom));
    }
  }
}
</style>
