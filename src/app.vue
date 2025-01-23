<template>
  <div class="box" :class="{ 'hide-editor': readOnly }">
    <!-- <button @click="toggleReadOnly">readonly</button> -->
    <!-- <button @click="editorRef?.print">print</button> -->
    <umo-editor @created="onCreated" ref="editorRef" v-bind="options" />
  </div>
</template>

<script setup lang="ts">
import type { UmoEditorExpose } from './components/index.vue';

const editorRef = $ref<null | UmoEditorExpose>(null)
let readOnly = $ref(true)

const toggleReadOnly = () => {
  readOnly = !readOnly
  editorRef?.setReadOnly(readOnly)
}

const onCreated = () => {
  console.log('sim')
  editorRef?.setContent(`<page id="mzngrgra" extend="false" pagenumber="1" force="false"><p id="r27887oo" extend="false"></p><p id="x9u7p4ur" extend="false" class="p-empty"></p><text-box id="v5uggu07" extend="false" vnode="true" width="230" height="42" left="24" top="76" draggable="true" rotatable="true" borderwidth="0" bordercolor="transparent" borderstyle="none" backgroundcolor="transparent"><p id="fcv0ph61" extend="false"><span style="font-size: 11px">Eliezer</span></p></text-box><img id="7s9tr1vd" extend="false" vnode="true" type="image-url" originalsrc="http://izziback.localhost:83/api/clientes/d9907620-f075-11eb-b75a-c79209bd3e2a/imagem" src="https://dummyimage.com/100x100/eee/aaa" width="81.89" height="83" left="60.106666666666676" top="-30" draggable="true" rotatable="true" equalproportion="true" flipx="false" flipy="false" uploaded="false" error="false" previewtype="image" zindex="10"><p id="vxbm4tnp" extend="false" class="p-empty"></p><p id="xfzcl1zj" extend="false" class="p-empty"></p><p id="3anxk869" extend="false" class="p-empty"></p><p id="qj7rpy7b" extend="false" class="p-empty"></p><text-box id="22m80p7m" extend="false" vnode="true" width="205" height="34" left="23" top="-35" draggable="true" rotatable="true" borderwidth="0" bordercolor="transparent" borderstyle="none" backgroundcolor="transparent"><p id="mvvnog7v" extend="false"><span style="font-size: 11px">sem data de nascimento</span></p></text-box><img id="s5424u7a" extend="false" vnode="true" type="image-url" src="https://png.pngtree.com/thumb_back/fw800/background/20210826/pngtree-ocean-waves-paper-effect-with-blue-gradient-color-image_769292.jpg" width="378" height="202" left="-330.4947340705635" top="86.49473407056348" angle="270" draggable="true" rotatable="true" equalproportion="false" flipx="false" flipy="false" uploaded="false" error="false" previewtype="image" zindex="0"><p id="6i55syba" extend="false" class="p-empty"></p><p id="k7pywz29" extend="false" class="p-empty"></p><p id="ix5nap3y" extend="false" class="p-empty"></p><img id="dxvpk6lc" extend="false" vnode="true" type="image-url" src="https://png.pngtree.com/thumb_back/fw800/background/20210826/pngtree-ocean-waves-paper-effect-with-blue-gradient-color-image_769292.jpg" width="379.8" height="200" left="-332" top="-364" angle="270" draggable="true" rotatable="true" equalproportion="true" flipx="false" flipy="false" uploaded="false" error="false" previewtype="image" zindex="0"><p id="5pl19tvt" extend="false" class="p-empty"></p></page><page id="s5y0wyq6" extend="false" pagenumber="2" force="false"><p id="otp2khhx" extend="false" class="p-empty"></p><p id="0f5h83fx" extend="false"></p><p id="x9u7p4ur" extend="false" class="p-empty"></p><text-box id="v5uggu07" extend="false" vnode="true" width="230" height="42" left="24" top="76" draggable="true" rotatable="true" borderwidth="0" bordercolor="transparent" borderstyle="none" backgroundcolor="transparent"><p id="fcv0ph61" extend="false"><span style="font-size: 11px">ELIEZER 1</span></p></text-box><img id="7s9tr1vd" extend="false" vnode="true" type="image-url" originalsrc="http://izziback.localhost:83/api/clientes/edbf3cb0-dc12-11ea-b060-731e0ea9161d/imagem" src="https://dummyimage.com/100x100/eee/aaa" width="81.89" height="83" left="60.106666666666676" top="-30" draggable="true" rotatable="true" equalproportion="true" flipx="false" flipy="false" uploaded="false" error="false" previewtype="image" zindex="10"><p id="vxbm4tnp" extend="false" class="p-empty"></p><p id="xfzcl1zj" extend="false" class="p-empty"></p><p id="3anxk869" extend="false" class="p-empty"></p><p id="qj7rpy7b" extend="false" class="p-empty"></p><text-box id="22m80p7m" extend="false" vnode="true" width="205" height="34" left="23" top="-35" draggable="true" rotatable="true" borderwidth="0" bordercolor="transparent" borderstyle="none" backgroundcolor="transparent"><p id="mvvnog7v" extend="false"><span style="font-size: 11px">1988-04-20</span></p></text-box><img id="s5424u7a" extend="false" vnode="true" type="image-url" src="https://png.pngtree.com/thumb_back/fw800/background/20210826/pngtree-ocean-waves-paper-effect-with-blue-gradient-color-image_769292.jpg" width="378" height="202" left="-330.4947340705635" top="86.49473407056348" angle="270" draggable="true" rotatable="true" equalproportion="false" flipx="false" flipy="false" uploaded="false" error="false" previewtype="image" zindex="0"><p id="6i55syba" extend="false" class="p-empty"></p><p id="k7pywz29" extend="false" class="p-empty"></p><p id="ix5nap3y" extend="false" class="p-empty"></p><img id="dxvpk6lc" extend="false" vnode="true" type="image-url" src="https://png.pngtree.com/thumb_back/fw800/background/20210826/pngtree-ocean-waves-paper-effect-with-blue-gradient-color-image_769292.jpg" width="379.8" height="200" left="-332" top="-364" angle="270" draggable="true" rotatable="true" equalproportion="true" flipx="false" flipy="false" uploaded="false" error="false" previewtype="image" zindex="0"><p id="5pl19tvt" extend="false" class="p-empty"></p></page><page id="s5y0wyq6" extend="false" pagenumber="2" force="false"><p id="otp2khhx" extend="false" class="p-empty"></p><p id="0f5h83fx" extend="false"></p><p id="x9u7p4ur" extend="false" class="p-empty"></p><text-box id="v5uggu07" extend="false" vnode="true" width="230" height="42" left="24" top="76" draggable="true" rotatable="true" borderwidth="0" bordercolor="transparent" borderstyle="none" backgroundcolor="transparent"><p id="fcv0ph61" extend="false"><span style="font-size: 11px">ELIEZER RIANI DE ANDRADE</span></p></text-box><img id="7s9tr1vd" extend="false" vnode="true" type="image-url" originalsrc="http://izziback.localhost:83/api/clientes/1edf1d60-dc13-11ea-851b-b97e4d2cf6dc/imagem" src="https://dummyimage.com/100x100/eee/aaa" width="81.89" height="83" left="60.106666666666676" top="-30" draggable="true" rotatable="true" equalproportion="true" flipx="false" flipy="false" uploaded="false" error="false" previewtype="image" zindex="10"><p id="vxbm4tnp" extend="false" class="p-empty"></p><p id="xfzcl1zj" extend="false" class="p-empty"></p><p id="3anxk869" extend="false" class="p-empty"></p><p id="qj7rpy7b" extend="false" class="p-empty"></p><text-box id="22m80p7m" extend="false" vnode="true" width="205" height="34" left="23" top="-35" draggable="true" rotatable="true" borderwidth="0" bordercolor="transparent" borderstyle="none" backgroundcolor="transparent"><p id="mvvnog7v" extend="false"><span style="font-size: 11px">sem data de nascimento</span></p></text-box><img id="s5424u7a" extend="false" vnode="true" type="image-url" src="https://png.pngtree.com/thumb_back/fw800/background/20210826/pngtree-ocean-waves-paper-effect-with-blue-gradient-color-image_769292.jpg" width="378" height="202" left="-330.4947340705635" top="86.49473407056348" angle="270" draggable="true" rotatable="true" equalproportion="false" flipx="false" flipy="false" uploaded="false" error="false" previewtype="image" zindex="0"><p id="6i55syba" extend="false" class="p-empty"></p><p id="k7pywz29" extend="false" class="p-empty"></p><p id="ix5nap3y" extend="false" class="p-empty"></p><img id="dxvpk6lc" extend="false" vnode="true" type="image-url" src="https://png.pngtree.com/thumb_back/fw800/background/20210826/pngtree-ocean-waves-paper-effect-with-blue-gradient-color-image_769292.jpg" width="379.8" height="200" left="-332" top="-364" angle="270" draggable="true" rotatable="true" equalproportion="true" flipx="false" flipy="false" uploaded="false" error="false" previewtype="image" zindex="0"><p id="5pl19tvt" extend="false" class="p-empty"></p></page><page id="s5y0wyq6" extend="false" pagenumber="2" force="false"><p id="otp2khhx" extend="false" class="p-empty"></p><p id="0f5h83fx" extend="false"></p><p id="x9u7p4ur" extend="false" class="p-empty"></p><text-box id="v5uggu07" extend="false" vnode="true" width="230" height="42" left="24" top="76" draggable="true" rotatable="true" borderwidth="0" bordercolor="transparent" borderstyle="none" backgroundcolor="transparent"><p id="fcv0ph61" extend="false"><span style="font-size: 11px">ELIEZER RIANI DE ANDRADE</span></p></text-box><img id="7s9tr1vd" extend="false" vnode="true" type="image-url" originalsrc="http://izziback.localhost:83/api/clientes/c69693a0-dcaf-11ea-ad57-d12232b3d720/imagem" src="https://dummyimage.com/100x100/eee/aaa" width="81.89" height="83" left="60.106666666666676" top="-30" draggable="true" rotatable="true" equalproportion="true" flipx="false" flipy="false" uploaded="false" error="false" previewtype="image" zindex="10"><p id="vxbm4tnp" extend="false" class="p-empty"></p><p id="xfzcl1zj" extend="false" class="p-empty"></p><p id="3anxk869" extend="false" class="p-empty"></p><p id="qj7rpy7b" extend="false" class="p-empty"></p><text-box id="22m80p7m" extend="false" vnode="true" width="205" height="34" left="23" top="-35" draggable="true" rotatable="true" borderwidth="0" bordercolor="transparent" borderstyle="none" backgroundcolor="transparent"><p id="mvvnog7v" extend="false"><span style="font-size: 11px">sem data de nascimento</span></p></text-box><img id="s5424u7a" extend="false" vnode="true" type="image-url" src="https://png.pngtree.com/thumb_back/fw800/background/20210826/pngtree-ocean-waves-paper-effect-with-blue-gradient-color-image_769292.jpg" width="378" height="202" left="-330.4947340705635" top="86.49473407056348" angle="270" draggable="true" rotatable="true" equalproportion="false" flipx="false" flipy="false" uploaded="false" error="false" previewtype="image" zindex="0"><p id="6i55syba" extend="false" class="p-empty"></p><p id="k7pywz29" extend="false" class="p-empty"></p><p id="ix5nap3y" extend="false" class="p-empty"></p><img id="dxvpk6lc" extend="false" vnode="true" type="image-url" src="https://png.pngtree.com/thumb_back/fw800/background/20210826/pngtree-ocean-waves-paper-effect-with-blue-gradient-color-image_769292.jpg" width="379.8" height="200" left="-332" top="-364" angle="270" draggable="true" rotatable="true" equalproportion="true" flipx="false" flipy="false" uploaded="false" error="false" previewtype="image" zindex="0"><p id="5pl19tvt" extend="false" class="p-empty"></p></page><page id="s5y0wyq6" extend="false" pagenumber="2" force="false"><p id="otp2khhx" extend="false" class="p-empty"></p><p id="0f5h83fx" extend="false"></p><p id="x9u7p4ur" extend="false" class="p-empty"></p><text-box id="v5uggu07" extend="false" vnode="true" width="230" height="42" left="24" top="76" draggable="true" rotatable="true" borderwidth="0" bordercolor="transparent" borderstyle="none" backgroundcolor="transparent"><p id="fcv0ph61" extend="false"><span style="font-size: 11px">Eliezer mob</span></p></text-box><img id="7s9tr1vd" extend="false" vnode="true" type="image-url" originalsrc="http://izziback.localhost:83/api/clientes/23e067b0-dcb5-11ea-afab-9d5e29248353/imagem" src="https://dummyimage.com/100x100/eee/aaa" width="81.89" height="83" left="60.106666666666676" top="-30" draggable="true" rotatable="true" equalproportion="true" flipx="false" flipy="false" uploaded="false" error="false" previewtype="image" zindex="10"><p id="vxbm4tnp" extend="false" class="p-empty"></p><p id="xfzcl1zj" extend="false" class="p-empty"></p><p id="3anxk869" extend="false" class="p-empty"></p><p id="qj7rpy7b" extend="false" class="p-empty"></p><text-box id="22m80p7m" extend="false" vnode="true" width="205" height="34" left="23" top="-35" draggable="true" rotatable="true" borderwidth="0" bordercolor="transparent" borderstyle="none" backgroundcolor="transparent"><p id="mvvnog7v" extend="false"><span style="font-size: 11px">sem data de nascimento</span></p></text-box><img id="s5424u7a" extend="false" vnode="true" type="image-url" src="https://png.pngtree.com/thumb_back/fw800/background/20210826/pngtree-ocean-waves-paper-effect-with-blue-gradient-color-image_769292.jpg" width="378" height="202" left="-330.4947340705635" top="86.49473407056348" angle="270" draggable="true" rotatable="true" equalproportion="false" flipx="false" flipy="false" uploaded="false" error="false" previewtype="image" zindex="0"><p id="6i55syba" extend="false" class="p-empty"></p><p id="k7pywz29" extend="false" class="p-empty"></p><p id="ix5nap3y" extend="false" class="p-empty"></p><img id="dxvpk6lc" extend="false" vnode="true" type="image-url" src="https://png.pngtree.com/thumb_back/fw800/background/20210826/pngtree-ocean-waves-paper-effect-with-blue-gradient-color-image_769292.jpg" width="379.8" height="200" left="-332" top="-364" angle="270" draggable="true" rotatable="true" equalproportion="true" flipx="false" flipy="false" uploaded="false" error="false" previewtype="image" zindex="0"><p id="5pl19tvt" extend="false" class="p-empty"></p></page><page id="s5y0wyq6" extend="false" pagenumber="2" force="false"><p id="otp2khhx" extend="false" class="p-empty"></p><p id="0f5h83fx" extend="false"></p></page>`)
}

onMounted(() => {
  editorRef?.setReadOnly(readOnly)
})

const options = {
  "locale": "pt-BR",
  "document": { "enableComment": false, "typographyRules": { "openDoubleQuote": false, "rightArrow": false, "leftArrow": false, "closeDoubleQuote": false, "openSingleQuote": false, "closeSingleQuote": false, "notEqual": false } },
  "dicts": {
    "pageSizes": [
      { "label": "A4", "width": 21, "height": 29.4 },
      { "label": "A3", "width": 29.7, "height": 42 },
      { "label": "A5", "width": 14.8, "height": 21 },
      { "label": "B5", "width": 17.6, "height": 25 },
      { "label": { "en_US": "No. 5 Envelope", "zh_CN": "5号信封" }, "width": 10.9, "height": 12.9 },
      { "label": { "en_US": "No. 6 Envelope", "zh_CN": "6号信封" }, "width": 11.9, "height": 22.9 },
      { "label": { "en_US": "No. 7 Envelope", "zh_CN": "7号信封" }, "width": 16.1, "height": 22.8 },
      { "label": { "en_US": "No. 9 Envelope", "zh_CN": "9号信封" }, "width": 22.8, "height": 32.3 },
      { "label": { "en_US": "Legal Paper", "zh_CN": "法律用纸" }, "width": 21.5, "height": 33.5 },
      { "label": { "en_US": "Letter Paper", "zh_CN": "信纸" }, "width": 21.5, "height": 27.9 },
      { "label": "Personalizado", "height": 10, "width": 7.5, "default": true },
    ],
  },
  "page": {
    "defaultMargin": { "left": 0, "right": 0, "top": 0, "bottom": 0 },
    "watermark": { "type": "compact", "alpha": 0.2, "fontColor": "#000", "fontSize": 16, "fontFamily": "SimSun", "fontWeight": "normal", "text": "" },
    "defaultOrientation": "portrait",
    "defaultBackground": "#fff",
  },
  "editorKey": "9d9ac533-11aa-4706-9960-7b8aae6f4492",
  async onFileDelete(...args: any) {
    console.log(args)
  },
  async onFileUpload(file: File & { url?: string }) {
    console.log(file)
    if (!file) {
      throw new Error('没有找到要上传的文件')
    }

    await new Promise((resolve) => setTimeout(resolve, 3000))
    return {
      url: file.url ?? URL.createObjectURL(file),
      name: file.name,
      type: file.type,
      size: file.size,
    }
  },
}
</script>

<style>
.box {
  height: 100vh;
  box-sizing: border-box;
  position: relative;
}
</style>
