import { ObjectSchema } from '@eslint/object-schema'

// 默认配置
const defaultOptions = {
  editorKey: 'default',
  locale: 'zh-CN',
  theme: 'light',
  height: '100%',
  dicts: {
    fonts: [
      { label: { en_US: 'Default Font', zh_CN: '默认字体' }, value: null },
      { label: { en_US: 'Songti', zh_CN: '宋体' }, value: 'SimSun' },
      { label: { en_US: 'Heiti', zh_CN: '黑体' }, value: 'SimHei' },
      { label: { en_US: 'Kaiti', zh_CN: '楷体' }, value: 'KaiTi' },
      {
        label: { en_US: 'Kaiti GB2312', zh_CN: '楷体_GB2312' },
        value: 'KaiTi_GB2312',
      },
      { label: { en_US: 'Fangsong', zh_CN: '仿宋' }, value: 'FangSong' },
      {
        label: { en_US: 'Fangsong GB2312', zh_CN: '仿宋_GB2312' },
        value: 'FangSong_GB2312',
      },
      { label: { en_US: 'STSong', zh_CN: '华文宋体' }, value: 'STSong' },
      {
        label: { en_US: 'STFangsong', zh_CN: '华文仿宋' },
        value: 'STFangsong',
      },
      {
        label: { en_US: 'FZ Fangsong Simplified', zh_CN: '方正仿宋简体' },
        value: 'FZFangSong-Z02S',
      },
      {
        label: { en_US: 'FZ Xiaobiao Song', zh_CN: '方正小标宋' },
        value: 'FZXiaoBiaoSong-B05S',
      },
      {
        label: { en_US: 'Microsoft Yahei', zh_CN: '微软雅黑' },
        value: 'Microsoft Yahei',
      },
      { label: 'Arial', value: 'Arial' },
      { label: 'Times New Roman', value: 'Times New Roman' },
      { label: 'Verdana', value: 'Verdana' },
      { label: 'Helvetica', value: 'Helvetica' },
      { label: 'Calibri', value: 'Calibri' },
      { label: 'Cambria', value: 'Cambria' },
      { label: 'Tahoma', value: 'Tahoma' },
      { label: 'Georgia', value: 'Georgia' },
      { label: 'Comic Sans MS', value: 'Comic Sans MS' },
      { label: 'Impact', value: 'Impact' },
    ],
    // prettier-ignore
    colors: [
      '#FFF','#000','#4A5366','#3B74EC','#45A2EF','#529867','#CD4A3F','#EA8D40','#EEC543', '#8E45D0','#F2F2F2','#7F7F7F','#F4F5F7','#CBDCFC','#E8F6FE','#EDFAF2','#FCEAE9','#FDF3EC','#FEF9E5','#FAECFE','#EEE','#595959','#C6CAD2','#CEEBFD','#CBDCFC','#CBE9D7','#F7CBC9','#FADDC7','#FDEEB5','#EBCAFC', '#BFBFBF','#3F3F3F','#828B9D','#A0BEFA','#A7DCFC','#A6D5B8','#F2A19C','#F5BC8C','#FBE281','#CB94F9','#A5A5A5','#262626','#363B44','#2452B2','#3473A1','#417A53','#922B22','#AD642A','#9E8329','#57297D','#939393','#0D0D0D','#25272E','#15316A','#1C415A','#284D34','#511712','#573213','#635217','#36194E',
    ],
    lineHeights: [
      { label: { en_US: 'Single', zh_CN: '单倍行距' }, value: 1 },
      {
        label: { en_US: '1.5 Line Spacing', zh_CN: '1.5 倍行距' },
        value: 1.5,
        default: true,
      },
      { label: { en_US: 'Double', zh_CN: '2 倍行距' }, value: 2 },
      { label: { en_US: '2.5 Line Spacing', zh_CN: '2.5 倍行距' }, value: 2.5 },
      { label: { en_US: 'Triple', zh_CN: '3 倍行距' }, value: 3 },
    ],
    symbols: [
      {
        label: { en_US: 'Plain Text', zh_CN: '普通文本' },
        items: '‹›«»‘’“”‚„¡¿‥…‡‰‱‼⁈⁉⁇©®™§¶⁋',
      },
      {
        label: { en_US: 'Currency Symbols', zh_CN: '货币符号' },
        items: '$€¥£¢₠₡₢₣₤¤₿₥₦₧₨₩₪₫₭₮₯₰₱₲₳₴₵₶₷₸₹₺₻₼₽',
      },
      {
        label: { en_US: 'Mathematical Symbols', zh_CN: '数学符号' },
        items: '<>≤≥–—¯‾°−±÷⁄×ƒ∫∑∞√∼≅≈≠≡∈∉∋∏∧∨¬∩∪∂∀∃∅∇∗∝∠¼½¾',
      },
      { label: { en_US: 'Arrows', zh_CN: '箭头' }, items: '←→↑↓⇐⇒⇑⇓⇠⇢⇡⇣⇤⇥⤒⤓↨' },
      {
        label: { en_US: 'Latin Script', zh_CN: '拉丁语' },
        items:
          'ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſ',
      },
    ],
    emojis: [
      {
        label: { en_US: 'Emotions & People', zh_CN: '表情与角色' },
        items:
          '😀 😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 🫠 😉 😊 😇 🥰 😍 🤩 😘 😗 ☺️ 😚 😙 🥲 😋 😛 😜 🤪 😝 🤑 🤗 🤭 🫢 🫣 🤫 🤔 🫡 🤐 🤨 😐 😑 😶 🫥 😶‍🌫️ 😏 😒 🙄 😬 😮‍💨 🤥 😌 😔 😪 🤤 😴 😷 🤒 🤕 🤢 🤮 🤧 🥵 🥶 🥴 😵 😵‍💫 🤯 🤠 🥳 🥸 😎 🤓 🧐 😕 🫤 😟 🙁 ☹️ 😮 😯 😲 😳 🥺 🥹 😦 😧 😨 😰 😥 😢 😭 😱 😖 😣 😞 😓 😩 😫 🥱 😤 😡 😠 🤬 😈 👿 💀 ☠️ 💩 🤡 👹 👺 👻 👽 👾 🤖 👋 🤚 🖐️ ✋ 🖖 🫱 🫲 🫳 🫴 👌 🤌 🤏 ✌️ 🤞 🫰 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 🫵 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 🫶 👐 🤲 🤝 🙏 ✍️ 💅 🤳 💪 🦾 🦿 🦵 🦶 👂 🦻',
      },
      {
        label: { en_US: 'Animals & Nature', zh_CN: '动物与自然' },
        items:
          '🐵 🐒 🦍 🦧 🐶 🐕 🦮 🐕‍🦺 🐩 🐺 🦊 🦝 🐱 🐈 🐈‍⬛ 🦁 🐯 🐅 🐆 🐴 🐎 🦄 🦓 🦌 🦬 🐮 🐂 🐃 🐄 🐷 🐖 🐗 🐽 🐏 🐑 🐐 🐪 🐫 🦙 🦒 🐘 🦣 🦏 🦛 🐭 🐁 🐀 🐹 🐰 🐇 🐿️ 🦫 🦔 🦇 🐻 🐻‍❄️ 🐨 🐼 🦥 🦦 🦨 🦘 🦡 🐾 🦃 🐔 🐓 🐣 🐤 🐥 🐦 🐧 🕊️ 🦅 🦆 🦢 🦉 🦤 🪶 🦩 🦚 🦜 🐸 🐊 🐢 🦎 🐍 🐲 🐉 🦕 🦖 🐳 🐋 🐬 🦭 🐟 🐠 🐡 🦈 🐙 🐚 🪸 🐌 🦋 🐛 🐜 🐝 🪲 🐞 🦗 🪳 🕷️ 🕸️ 🦂 🦟 🪰 🪱 🦠 💐 🌸 💮 🪷 🏵️ 🌹 🥀 🌺 🌻 🌼 🌷 🌱 🪴 🌲 🌳 🌴 🌵 🌾 🌿 ☘️ 🍀 🍁 🍂 🍃 🪹 🪺',
      },
      {
        label: { en_US: 'Food & Drink', zh_CN: '食物与食品' },
        items:
          '🥬 🥦 🧄 🧅 🍄 🥜 🫘 🌰 🍞 🥐 🥖 🫓 🥨 🥯 🥞 🧇 🧀 🍖 🍗 🥩 🥓 🍔 🍟 🍕 🌭 🥪 🌮 🌯 🫔 🥙 🧆 🥚 🍳 🥘 🍲 🫕 🥣 🥗 🍿 🧈 🧂 🥫 🍱 🍘 🍙 🍚 🍛 🍜 🍝 🍠 🍢 🍣 🍤 🍥 🥮 🍡 🥟 🥠 🥡 🦀 🦞 🦐 🦑 🦪 🍦 🍧 🍨 🍩 🍪 🎂 🍰 🧁 🥧 🍫 🍬 🍭 🍮 🍯 🍼 🥛 ☕ 🫖 🍵 🍶 🍾 🍷 🍸 🍹 🍺 🍻 🥂 🥃 🫗 🥤 🧋 🧃 🧉 🧊 🥢 🍽️ 🍴 🥄 🔪 🫙 🏺',
      },
      {
        label: { en_US: 'Activities', zh_CN: '活动' },
        items:
          '🎗️ 🎟️ 🎫 🎖️ 🏆 🏅 🥇 🥈 🥉 ⚽ ⚾ 🥎 🏀 🏐 🏈 🏉 🎾 🥏 🎳 🏏 🏑 🏒 🥍 🏓 🏸 🥊 🥋 🥅 ⛳ ⛸️ 🎣 🤿 🎽 🎿 🛷 🥌 🎯 🪀 🪁 🎱 🔮 🪄 🧿 🪬 🎮 🕹️ 🎰 🎲 🧩 🧸 🪅 🪩 🪆 ♠️ ♥️ ♦️ ♣️ ♟️ 🃏 🀄 🎴 🎭 🖼️ 🎨 🧵 🪡 🧶 🪢',
      },
      {
        label: { en_US: 'Travel & Places', zh_CN: '旅行与景点' },
        items:
          '🚈 🚉 🚊 🚝 🚞 🚋 🚌 🚍 🚎 🚐 🚑 🚒 🚓 🚔 🚕 🚖 🚗 🚘 🚙 🛻 🚚 🚛 🚜 🏎️ 🏍️ 🛵 🦽 🦼 🛺 🚲 🛴 🛹 🛼 🚏 🛣️ 🛤️ 🛢️ ⛽ 🛞 🚨 🚥 🚦 🛑 🚧 ⚓ 🛟 ⛵ 🛶 🚤 🛳️ ⛴️ 🛥️ 🚢 ✈️ 🛩️ 🛫 🛬 🪂 💺 🚁 🚟 🚠 🚡 🛰️ 🚀 🛸 🛎️ 🧳 ⌛ ⏳ ⌚ ⏰ ⏱️ ⏲️ 🕰️ 🕛 🕧 🕐 🕜 🕑 🕝 🕒 🕞 🕓 🕟 🕔 🕠 🕕 🕡 🕖 🕢 🕗 🕣 🕘 🕤 🕙 🕥 🕚 🕦 🌑 🌒 🌓 🌔 🌕 🌖 🌗 🌘 🌙 🌚 🌛 🌜 🌡️ ☀️ 🌝 🌞 🪐 ⭐ 🌟 🌠 🌌 ☁️ ⛅ ⛈️ 🌤️ 🌥️ 🌦️ 🌧️ 🌨️ 🌩️ 🌪️ 🌫️ 🌬️ 🌀 🌈 🌂 ☂️ ☔ ⛱️ ⚡ ❄️ ☃️ ⛄ ☄️ 🔥 💧 🌊',
      },
      {
        label: { en_US: 'Objects', zh_CN: '物品' },
        items:
          '📃 📜 📄 📰 🗞️ 📑 🔖 🏷️ 💰 🪙 💴 💵 💶 💷 💸 💳 🧾 💹 ✉️ 📧 📨 📩 📤 📥 📦 📫 📪 📬 📭 📮 🗳️ ✏️ ✒️ 🖋️ 🖊️ 🖌️ 🖍️ 📝 💼 📁 📂 🗂️ 📅 📆 🗒️ 🗓️ 📇 📈 📉 📊 📋 📌 📍 📎 🖇️ 📏 📐 ✂️ 🗃️ 🗄️ 🗑️ 🔒 🔓 🔏 🔐 🔑 🗝️ 🔨 🪓 ⛏️ ⚒️ 🛠️ 🗡️ ⚔️ 🔫 🪃 🏹 🛡️ 🪚 🔧 🪛 🔩 ⚙️ 🗜️ ⚖️ 🦯 🔗 ⛓️ 🪝 🧰 🧲 🪜 ⚗️ 🧪 🧫 🧬 🔬 🔭 📡 💉 🩸 💊 🩹 🩼 🩺 🩻 🚪 🛗 🪞 🪟 🛏️ 🛋️ 🪑 🚽 🪠 🚿 🛁 🪤 🪒 🧴 🧷 🧹 🧺 🧻 🪣 🧼 🫧 🪥 🧽 🧯 🛒 🚬 ⚰️ 🪦 ⚱️ 🗿 🪧 🪪',
      },
      {
        label: { en_US: 'Symbols', zh_CN: '符号' },
        items:
          '➰ ➿ 〽️ ✳️ ✴️ ❇️ ©️ ®️ ™️ #️⃣ *️⃣ 0️⃣ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟 🔠 🔡 🔢 🔣 🔤 🅰️ 🆎 🅱️ 🆑 🆒 🆓 ℹ️ 🆔 Ⓜ️ 🆕 🆖 🅾️ 🆗 🅿️ 🆘 🆙 🆚 🈁 🈂️ 🔴 🟠 🟡 🟢 🔵 🟣 🟤 ⚫ ⚪ 🟥 🟧 🟨 🟩 🟦 🟪 🟫 ⬛ ⬜ ◼️ ◻️ ◾ ◽ ▪️ ▫️ 🔶 🔷 🔸 🔹 🔺 🔻 💠 🔘 🔳 🔲',
      },
      {
        label: { en_US: 'Flags', zh_CN: '旗帜' },
        items:
          '🏁 🇨🇳 🎌 🇩🇪 🇪🇸 🇦🇨 🇦🇩 🇦🇪 🇦🇫 🇦🇬 🇦🇮 🇦🇱 🇦🇲 🇦🇴 🇦🇶 🇦🇷 🇦🇸 🇦🇹 🇦🇺 🇦🇼 🇦🇽 🇦🇿 🇧🇦 🇧🇧 🇧🇩 🇧🇪 🇧🇫 🇧🇬 🇧🇭 🇧🇮 🇧🇯 🇧🇱 🇧🇲 🇧🇳 🇧🇴 🇧🇶 🇧🇷 🇧🇸 🇧🇹 🇧🇻 🇧🇼 🇧🇾 🇧🇿 🇨🇦 🇨🇨 🇨🇩 🇨🇫 🇨🇬 🇨🇭 🇨🇮 🇨🇰 🇨🇱 🇨🇲 🇨🇴 🇨🇵 🇨🇷 🇨🇺 🇨🇻 🇨🇼 🇨🇽 🇨🇾 🇨🇿 🇩🇬 🇩🇯 🇩🇰 🇩🇲 🇩🇴 🇩🇿 🇪🇦 🇪🇨 🇪🇪 🇪🇬 🇪🇭 🏴󠁧󠁢󠁥󠁮󠁧󠁿 🇪🇷 🇪🇹 🇪🇺 🇫🇮 🇫🇯 🇫🇰 🇫🇲 🇫🇴 🇬🇦 🇬🇩 🇬🇪 🇬🇫 🇬🇬 🇬🇭 🇬🇮 🇬🇱 🇬🇲 🇬🇳 🇬🇵 🇬🇶 🇬🇷 🇬🇸 🇬🇹 🇬🇺 🇬🇼 🇬🇾 🇭🇰 🇭🇲 🇭🇳 🇭🇷 🇭🇹 🇭🇺 🇮🇨 🇮🇩 🇮🇪 🇮🇱 🇮🇲 🇮🇳 🇮🇴 🇮🇶 🇮🇷 🇮🇸 🇯🇪 🇯🇲 🇯🇴 🇰🇪 🇰🇬 🇰🇭 🇰🇮 🇰🇲 🇰🇳 🇰🇵 🇰🇼 🇰🇾 🇰🇿 🇱🇦 🇱🇧 🇱🇨 🇱🇮 🇱🇰 🇱🇷 🇱🇸 🇱🇹 🇱🇺 🇱🇻 🇱🇾 🇲🇦 🇲🇨 🇲🇩 🇲🇪 🇲🇫 🇲🇬 🇲🇭 🇲🇰 🇲🇱 🇲🇲 🇲🇳 🇲🇴 🇲🇵 🇲🇶 🇲🇷 🇲🇸 🇲🇹 🇲🇺 🇲🇻 🇲🇼 🇲🇽 🇲🇾 🇲🇿 🇳🇦 🇳🇨 🇳🇪 🇳🇫 🇳🇬 🇳🇮 🇳🇱 🇳🇴',
      },
    ],
    pageSizes: [
      { label: 'A4', width: 21.0, height: 29.4, default: true },
      { label: 'A3', width: 29.7, height: 42.0 },
      { label: 'A5', width: 14.8, height: 21.0 },
      { label: 'B5', width: 17.6, height: 25.0 },
      {
        label: { en_US: 'No. 5 Envelope', zh_CN: '5号信封' },
        width: 10.9,
        height: 12.9,
      },
      {
        label: { en_US: 'No. 6 Envelope', zh_CN: '6号信封' },
        width: 11.9,
        height: 22.9,
      },
      {
        label: { en_US: 'No. 7 Envelope', zh_CN: '7号信封' },
        width: 16.1,
        height: 22.8,
      },
      {
        label: { en_US: 'No. 9 Envelope', zh_CN: '9号信封' },
        width: 22.8,
        height: 32.3,
      },
      {
        label: { en_US: 'Legal Paper', zh_CN: '法律用纸' },
        width: 21.5,
        height: 33.5,
      },
      {
        label: { en_US: 'Letter Paper', zh_CN: '信纸' },
        width: 21.5,
        height: 27.9,
      },
    ],
  },
  toolbar: {
    defaultMode: 'ribbon',
    enableSourceEditor: false,
    menus: ['base', 'insert', 'table', 'tools', 'page', 'export'],
    disableMenuItems: [],
    importWord: {
      enabled: true,
      options: {},
      useCustomMethod: true,
    },
  },
  page: {
    defaultMargin: {
      left: 3.18,
      right: 3.18,
      top: 2.54,
      bottom: 2.54,
    },
    defaultOrientation: 'portrait',
    defaultBackground: '#fff',
    showBreakMarks: true,
    watermark: {
      type: 'compact',
      alpha: 0.2,
      fontColor: '#000',
      fontSize: 16,
      fontFamily: 'SimSun',
      fontWeight: 'normal',
      text: '',
    },
  },
  document: {
    title: '',
    content: '',
    placeholder: {
      en_US: 'Please enter the document content...',
      zh_CN: '请输入文档内容...',
    },
    enableSpellcheck: true,
    enableMarkdown: true,
    enableBubbleMenu: true,
    enableBlockMenu: true,
    readOnly: false,
    autofocus: true,
    characterLimit: 0,
    typographyRules: {},
    // https://prosemirror.net/docs/ref/#view.EditorProps
    editorProps: {},
    // https://prosemirror.net/docs/ref/#model.ParseOptions
    parseOptions: {
      preserveWhitespace: 'full',
    },
    autoSave: {
      enabled: true,
      interval: 300000,
    },
  },
  assistant: {
    enabled: false,
    maxlength: 100,
    commands: [
      {
        label: { en_US: 'Continuation', zh_CN: '续写' },
        value: { en_US: 'Continuation', zh_CN: '续写' },
      },
      {
        label: { en_US: 'Rewrite', zh_CN: '重写' },
        value: { en_US: 'Rewrite', zh_CN: '重写' },
      },
      {
        label: { en_US: 'Abbreviation', zh_CN: '缩写' },
        value: { en_US: 'Abbreviation', zh_CN: '缩写' },
      },
      {
        label: { en_US: 'Expansion', zh_CN: '扩写' },
        value: { en_US: 'Expansion', zh_CN: '扩写' },
      },
      {
        label: { en_US: 'Polish', zh_CN: '润色' },
        value: { en_US: 'Polish', zh_CN: '润色' },
      },
      {
        label: { en_US: 'Proofread', zh_CN: '校阅' },
        value: { en_US: 'Proofread', zh_CN: '校阅' },
      },
      {
        label: { en_US: 'Translate', zh_CN: '翻译' },
        value: { en_US: 'Translate to chinese', zh_CN: '翻译成英文' },
        autoSend: false,
      },
    ],
  },
  templates: [],
  cdnUrl: 'https://unpkg.com/@umoteam/editor-external@latest',
  shareUrl: location?.href || '',
  diagrams: {
    domain: 'https://embed.diagrams.net',
    // https://www.drawio.com/doc/faq/supported-url-parameters
    params: {},
  },
  file: {
    allowedMimeTypes: [],
    maxSize: 1024 * 1024 * 100, // 100M
  },
  extensions: [],
  translations: {
    en_US: {},
    zh_CN: {},
  },
  async onSave(content, page, document) {
    throw new Error('Key "onSave": Please set the save method')
  },
  async onFileUpload(file) {
    if (!file) {
      throw new Error('File not found')
    }
    throw new Error('Key "onFileUpload": Please set the upload method')
  },
  onFileDelete(id, src) {
    console.error(
      'The file has been deleted. Please configure the onFileDelete to completely delete the file from the server.',
    )
  },
  async onAssistant(payload, content) {
    throw new Error('Key "onAssistant": Please set the onAssistant method')
  },
  async onCustomImportWordMethod(file) {
    throw new Error(
      'Key "onCustomImportWordMethod": Please set the onAssistant method',
    )
  },
}

// 组件 props 所需格式
const propsOptions = Object.keys(defaultOptions)

const isNumber = (value) => {
  if (typeof value === 'number') {
    return isFinite(value)
  }
  if (typeof value === 'string') {
    const parsed = parseFloat(value)
    return !isNaN(parsed) && isFinite(parsed) && value === parsed.toString()
  }
  return false
}
const isLocale = (value) => {
  if (typeof value === 'string' && value.length > 0) {
    return true
  }
  if (typeof value === 'object' && value !== null) {
    for (let key in value) {
      if (!['en_US', 'zh_CN'].includes(key)) {
        return false
      }
    }
    return true
  }
  return false
}
const isAsyncFunction = (value) => {
  return (
    value.constructor.name === 'AsyncFunction' ||
    Promise.resolve(value) instanceof Promise
  )
}

const ojbectSchema = new ObjectSchema({
  editorKey: {
    merge: 'replace',
    validate: 'string!',
  },
  locale: {
    merge: 'replace',
    validate(value) {
      if (value && !['en-US', 'zh-CN'].includes(value)) {
        throw new Error('Key "locale": must be one of "en-US" or "zh-CN".')
      }
    },
  },
  theme: {
    merge: 'replace',
    validate(value) {
      if (value && !['dark', 'light', 'auto'].includes(value)) {
        throw new Error(
          'Key "theme": must be one of "dark", "light" or "auto".',
        )
      }
    },
  },
  height: {
    merge: 'replace',
    validate: 'string!',
  },
  dicts: {
    schema: {
      fonts: {
        merge: 'replace',
        validate(value) {
          if (value && !Array.isArray(value)) {
            throw new Error('Key "dicts": Key "fonts" must be a array.')
          }
          value.forEach((item) => {
            if (!item.label || (!item.value && item.value !== null)) {
              throw new Error(
                'Key "dicts": Key "fonts" must be a array of objects with "label" and "value" properties.',
              )
            }
          })
        },
      },
      colors: {
        merge: 'replace',
        validate: 'array',
      },
      lineHeights: {
        merge: 'replace',
        validate(value) {
          if (value && !Array.isArray(value)) {
            throw new Error('Key "dicts": Key "lineHeights": must be a array.')
          }
          if (!value.find((item) => item.default)) {
            throw new Error(
              'Key "dicts": Key "lineHeights": please set a default value.',
            )
          }
          value.forEach((item, index) => {
            if (!item.label || (!item.value && item.value !== null)) {
              throw new Error(
                `Key "dicts": Key "lineHeights[${index}]": must be a array of objects with "label" and "value" properties.`,
              )
            }
            if (!isLocale(item.label)) {
              throw new Error(
                `Key "dicts": Key "lineHeights[${index}]": Key "label" must be string, or a object with "en_US" and "zh_CN" properties.`,
              )
            }
          })
        },
      },
      symbols: {
        merge: 'replace',
        validate(value) {
          if (value && !Array.isArray(value)) {
            throw new Error('Key "dicts": Key "symbols" must be a array.')
          }
          value.forEach((item, index) => {
            if (!item.label || typeof item.items !== 'string') {
              throw new Error(
                `Key "dicts": Key "symbols[${index}]": must be a array of objects with "label" and "items" properties.`,
              )
            }
            if (!isLocale(item.label)) {
              throw new Error(
                `Key "dicts": Key "symbols[${index}]": Key "label" must be string, or a object with "en_US" and "zh_CN" properties.`,
              )
            }
          })
        },
      },
      emojis: {
        merge: 'replace',
        validate(value) {
          if (value && !Array.isArray(value)) {
            throw new Error('Key "dicts": Key "emojis" must be a array.')
          }
          value.forEach((item, index) => {
            if (!item.label || typeof item.items !== 'string') {
              throw new Error(
                `Key "dicts": Key "emojis[${index}]": must be a array of objects with "label" and "value" properties.`,
              )
            }
            if (!isLocale(item.label)) {
              throw new Error(
                `Key "dicts": Key "emojis[${index}]": Key "label" must be string, or a object with "en_US" and "zh_CN" properties.`,
              )
            }
          })
        },
      },
      pageSizes: {
        merge: 'replace',
        validate(value) {
          if (value && !Array.isArray(value)) {
            throw new Error('Key "dicts": Key "pageSizes": must be a array.')
          }
          if (!value.find((item) => item.default)) {
            throw new Error(
              'Key "dicts": Key "pageSizes": please set a default value.',
            )
          }
          value.forEach((item, index) => {
            if (!item.label || item.label === '') {
              throw new Error(
                `Key "dicts": Key "pageSizes[${index}]" Key: "label" cannot be empty.`,
              )
            }
            if (!isLocale(item.label)) {
              throw new Error(
                `Key "dicts": Key "pageSizes[${index}]": Key "label" must be string, or a object with "en_US" and "zh_CN" properties.`,
              )
            }
            if (!isNumber(item.width)) {
              throw new Error(
                `Key "dicts": Key "pageSizes[${index}]" Key: "width" must be a number.`,
              )
            }
            if (!isNumber(item.height)) {
              throw new Error(
                `Key "dicts": Key "pageSizes[${index}]" Key: "height" must be a number.`,
              )
            }
          })
        },
      },
    },
  },
  toolbar: {
    schema: {
      defaultMode: {
        merge: 'replace',
        validate(value) {
          if (value && !['classic', 'ribbon'].includes(value)) {
            throw new Error(
              'Key "toolbar": Key "defaultMode" must be one of "classic" or "ribbon".',
            )
          }
        },
      },
      enableSourceEditor: {
        merge: 'replace',
        validate: 'boolean',
      },
      menus: {
        merge: 'replace',
        validate(value) {
          const defaultMenus = defaultOptions.toolbar.menus
          if (value && !Array.isArray(value)) {
            throw new Error('Key "toolbar": Key "menus" must be a array.')
          }
          if (!value.includes('base')) {
            throw new Error(
              'Key "toolbar": Key "menus" should at least contain "base".',
            )
          }
          if (!value.every((item) => defaultMenus.includes(item))) {
            throw new Error(
              `Key "toolbar": Key "menus" the array items of toolbar.menus must contain only one or multiple of ${JSON.stringify(defaultMenus)}.`,
            )
          }
        },
      },
      disableMenuItems: {
        merge: 'replace',
        validate(value) {
          if (value && !Array.isArray(value)) {
            throw new Error(
              'Key "toolbar": Key "disableMenuItems" must be a array.',
            )
          }
        },
      },
      importWord: {
        merge: 'replace',
        validate: 'object',
      },
    },
  },
  page: {
    schema: {
      defaultMargin: {
        schema: {
          left: {
            merge: 'replace',
            validate: 'number',
          },
          right: {
            merge: 'replace',
            validate: 'number',
          },
          top: {
            merge: 'replace',
            validate: 'number',
          },
          bottom: {
            merge: 'replace',
            validate: 'number',
          },
        },
      },
      defaultOrientation: {
        merge: 'replace',
        validate(value) {
          if (value && !['portrait', 'landscape'].includes(value)) {
            throw new Error(
              'Key "page": Key "defaultOrientation" must be one of "portrait" or "landscape".',
            )
          }
        },
      },
      defaultBackground: {
        merge: 'replace',
        validate: 'string',
      },
      showBreakMarks: {
        merge: 'replace',
        validate: 'boolean',
      },
      watermark: {
        schema: {
          type: {
            merge: 'replace',
            validate(value) {
              if (value && !['compact', 'spacious'].includes(value)) {
                throw new Error(
                  'Key "watermark": Key "type" must be one of "compact" or "spacious".',
                )
              }
            },
          },
          alpha: {
            merge: 'replace',
            validate: 'number',
          },
          fontColor: {
            merge: 'replace',
            validate: 'string',
          },
          fontFamily: {
            merge: 'replace',
            validate(value) {
              if (value !== null && typeof value !== 'string') {
                throw new Error(
                  'Key "watermark": Key "fontFamily" must be a string.',
                )
              }
            },
          },
          fontSize: {
            merge: 'replace',
            validate: 'number',
          },
          fontWeight: {
            merge: 'replace',
            validate: 'string',
          },
          text: {
            merge: 'replace',
            validate: 'string',
          },
        },
      },
    },
  },
  document: {
    schema: {
      title: {
        merge: 'replace',
        validate: 'string',
      },
      content: {
        merge: 'replace',
        validate() {},
      },
      placeholder: {
        merge: 'replace',
        validate(value) {
          if (!isLocale(value)) {
            throw new Error(
              `Key "document": Key "title": Key "label" must be string, or a object with "en_US" and "zh_CN" properties.`,
            )
          }
        },
      },
      enableSpellcheck: {
        merge: 'replace',
        validate: 'boolean',
      },
      enableMarkdown: {
        merge: 'replace',
        validate: 'boolean',
      },
      enableBubbleMenu: {
        merge: 'replace',
        validate: 'boolean',
      },
      enableBlockMenu: {
        merge: 'replace',
        validate: 'boolean',
      },
      readOnly: {
        merge: 'replace',
        validate: 'boolean',
      },
      autofocus: {
        merge: 'replace',
        validate(value) {
          if (
            !['start', 'end', 'all', true, false, null].includes(value) &&
            !isNumber(value)
          ) {
            throw new Error(
              'Key "document": Key "autofocus" must be one of "start", "end", "all", Number, true, false, null.',
            )
          }
        },
      },
      characterLimit: {
        merge: 'replace',
        validate: 'number',
      },
      typographyRules: {
        merge: 'replace',
        validate: 'object',
      },
      editorProps: {
        merge: 'replace',
        validate: 'object',
      },
      parseOptions: {
        merge: 'replace',
        validate: 'object',
      },
      autoSave: {
        schema: {
          enabled: {
            merge: 'replace',
            validate: 'boolean',
          },
          interval: {
            merge: 'replace',
            validate: 'number',
          },
        },
      },
    },
  },
  assistant: {
    schema: {
      enabled: {
        merge: 'replace',
        validate: 'boolean',
      },
      maxlength: {
        merge: 'replace',
        validate(value) {
          if (!isNumber(value) || !Number.isInteger(value) || value <= 0) {
            throw new Error(
              'Key "assistant": Key "maxlength" must be a number.',
            )
          }
        },
      },
      commands: {
        merge: 'replace',
        validate(value) {
          if (value && !Array.isArray(value)) {
            throw new Error('Key "assistant": Key "commands" must be a array.')
          }
          value.forEach((item) => {
            if (!item.label || !item.value) {
              throw new Error(
                'Key "assistant": Key "commands" must be a array of objects with "label" and "value" properties.',
              )
            }
            if (!isLocale(item.label)) {
              throw new Error(
                `Key "assistant": Key "commands[${index}]": Key "label" must be string, or a object with "en_US" and "zh_CN" properties.`,
              )
            }
            if (!isLocale(item.value)) {
              throw new Error(
                `Key "assistant": Key "commands[${index}]": Key "value" must be string, or a object with "en_US" and "zh_CN" properties.`,
              )
            }
          })
        },
      },
    },
  },
  shareUrl: { merge: 'replace', validate: 'string' },
  templates: {
    merge: 'replace',
    validate(value) {
      if (value && !Array.isArray(value)) {
        throw new Error('Key "templates": Key "menus" must be a array.')
      }
      value.forEach((item, index) => {
        if (!item.title || !item.title === '') {
          throw new Error(
            `Key "templates[${index}]": Key "title" cannot be empty.`,
          )
        }
        if (!item.content || !item.content === '') {
          throw new Error(
            `Key "templates[${index}]": Key "content" cannot be empty.`,
          )
        }
      })
    },
  },
  cdnUrl: {
    merge: 'replace',
    validate: 'string',
  },
  diagrams: {
    merge: 'assign',
    validate: 'object',
  },
  file: {
    schema: {
      allowedMimeTypes: {
        merge: 'replace',
        validate: 'array',
      },
      maxSize: {
        merge: 'replace',
        validate: 'number',
      },
    },
  },
  extensions: {
    merge: 'replace',
    validate: 'array',
  },
  translations: {
    merge: 'replace',
    validate: 'object',
  },
  onSave: {
    merge: 'replace',
    validate(value) {
      if (!isAsyncFunction(value)) {
        throw new Error('Key "onSave" must be a async function.')
      }
    },
  },
  onFileUpload: {
    merge: 'replace',
    validate(value) {
      if (!isAsyncFunction(value)) {
        throw new Error('Key "onFileUpload" must be a async function.')
      }
    },
  },
  onFileDelete: {
    merge: 'replace',
    validate(value) {
      if (
        typeof value !== 'function' &&
        value.constructor.name !== 'AsyncFunction'
      ) {
        throw new Error('Key "onFileDelete" must be a function.')
      }
    },
  },
  onAssistant: {
    merge: 'replace',
    validate(value) {
      if (!isAsyncFunction(value)) {
        throw new Error('Key "onAssistant" must be a async function.')
      }
    },
  },
  onCustomImportWordMethod: {
    merge: 'replace',
    validate(value) {
      if (!isAsyncFunction(value)) {
        throw new Error(
          'Key "onCustomImportWordMethod" must be a async function.',
        )
      }
    },
  },
})

export { defaultOptions, propsOptions, ojbectSchema }
