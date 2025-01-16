<template>
  <div class="umo-toc-container">
    <div class="umo-toc-title">
      <icon class="icon-toc" name="toc" /> {{ t('toc.title') }}
      <div class="umo-dialog__close" @click="$emit('close')">
        <icon name="close" />
      </div>
    </div>
    <div class="umo-toc-content umo-scrollbar">
      <div
        v-if="!content"
        class="umo-toc-empty"
        v-text="t('toc.empty')"
      ></div>
      <container-toc-submenu :content="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { editor } = useStore()

const content = $computed(() => {
  console.log(editor.value.state)
  return editor.value.state.doc.content.content
})

defineEmits(['close'])
</script>

<style lang="less">
.umo-toc-container {
  background-color: var(--umo-color-white);
  border-right: solid 1px var(--umo-border-color);
  width: 360px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .umo-toc-title {
    border-bottom: solid 1px var(--umo-border-color-light);
    display: flex;
    align-items: center;
    position: relative;
    padding: 10px 15px;
    .icon-toc {
      margin-right: 5px;
      font-size: 20px;
    }
    .umo-dialog__close {
      position: absolute;
      right: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .umo-toc-content {
    list-style: none;
    flex: 1;
    display: flex;
    padding: 10px;
    flex-direction: column;
    .umo-toc-empty {
      font-size: 14px;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--umo-text-color-light);
    }
    .umo-toc-item {
      border-radius: 3px;
      padding: 5px 7px 5px 37px;
      box-sizing: border-box;
      align-items: center;
      position: relative;
      margin: 2px 0;
      .umo-icon {
        position: absolute;
        color: var(--umo-text-color-light);
        margin-right: 8px;
        border-radius: 2px;
        border: solid 1px var(--umo-border-color);
        font-size: 8px;
        padding: 5px 4px;
        left: 7px;
        top: 1.8em;
        transform: translateY(-50%);
      }
      &:not(:has(.umo-toc-item:hover)):hover {
        cursor: pointer;
        background: var(--umo-content-node-selected-background);
        color: var(--umo-primary-color);
        .umo-icon {
          color: var(--umo-primary-color);
          border-color: var(--umo-primary-color);
        }
        .umo-toc-item {
          color: var(--umo-text-color) !important;
        }
      }
      &.level-1 {
        margin-left: 0;
        width: 100%;
      }
      &.level-2 {
        margin-left: 15px;
        width: calc(100% - 15px);
      }
      &.level-3 {
        margin-left: 30px;
        width: calc(100% - 30px);
      }
      &.level-4 {
        margin-left: 45px;
        width: calc(100% - 45px);
      }
      &.level-5 {
        margin-left: 60px;
        width: calc(100% - 60px);
      }
      &.level-6 {
        padding-left: 75px;
        width: calc(100% - 75px);
      }
      .umo-toc-text {
        text-overflow: ellipsis;
        word-break: break-all;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
}
</style>
