// 修复位置计算不正确的问题
import{TableOfContents}from"@tiptap-pro/extension-table-of-contents";const{page:page}=useStore(),a=(t,e)=>{const{editor:o}=e,n=[],s=[];let i=null;if(o.state.doc.descendants(((t,o)=>{var s;(null===(s=e.anchorTypes)||void 0===s?void 0:s.includes(t.type.name))&&n.push({node:t,pos:o})})),n.forEach((t=>{const n=o.view.domAtPos(t.pos+1).node;e.storage.scrollPosition>=n.offsetTop&&(i=t.node.attrs["data-toc-id"],s.push(t.node.attrs["data-toc-id"]))})),t=t.map((t=>({...t,isActive:t.id===i,isScrolledOver:s.includes(t.id)}))),e.onUpdate){const o=0===e.storage.content.length;e.onUpdate(t,o)}return t},r=(t,e)=>{let o=1;const n=e.at(-1),s=[...e].reverse().find((e=>e.originalLevel<=t.node.attrs.level)),i=(null==s?void 0:s.level)||1;return o=t.node.attrs.level>((null==n?void 0:n.originalLevel)||1)?((null==n?void 0:n.level)||1)+1:t.node.attrs.level<((null==n?void 0:n.originalLevel)||1)?i:(null==n?void 0:n.level)||1,o},c=t=>{const{editor:e,onUpdate:o}=t,n=[];let s=[];const i=[];if(e.state.doc.descendants(((e,o)=>{var s;(null===(s=t.anchorTypes)||void 0===s?void 0:s.includes(e.type.name))&&n.push({node:e,pos:o})})),n.forEach(((o,d)=>{if(0===o.node.textContent.length)return;const l=e.view.domAtPos(o.pos+1).node,r=t.storage.scrollPosition>=l.offsetTop;i.push(l);const a=o.node.attrs.level,c=n[d-1],p=t.getLevelFn(o,s),v=t.getIndexFn(o,s,p);s=c?[...s,{itemIndex:v,id:o.node.attrs["data-toc-id"],originalLevel:a,level:p,textContent:o.node.textContent,pos:o.pos,editor:e,isActive:!1,isScrolledOver:!1,node:o.node,dom:l}]:[...s,{itemIndex:v,id:o.node.attrs["data-toc-id"],originalLevel:a,level:p,textContent:o.node.textContent,pos:o.pos,editor:e,isActive:!1,isScrolledOver:r,node:o.node,dom:l}]})),s=a(s,t),o){const e=0===t.storage.content.length;o(s,e)}t.storage.anchors=i,t.storage.content=s,e.state.tr.setMeta("toc",s),e.view.dispatch(e.state.tr)};export default TableOfContents.extend({onCreate(){var t;const{tr:o}=this.editor.state,n=[];if(this.options.scrollParent&&this.options.scrollParent,this.editor.state.doc.descendants(((t,s)=>{var i;const d=t.attrs["data-toc-id"];if((null===(i=this.options.anchorTypes)||void 0===i?void 0:i.includes(t.type.name))&&0!==t.textContent.length){if(null==d||n.includes(d)){let n="";n=this.options.getId?this.options.getId(t.textContent):e(),o.setNodeMarkup(s,void 0,{...t.attrs,"data-toc-id":n,id:n})}n.push(d)}})),this.editor.view.dispatch(o),c({editor:this.editor,storage:this.storage,onUpdate:null===(t=this.options.onUpdate)||void 0===t?void 0:t.bind(this),getIndexFn:this.options.getIndex||l,getLevelFn:this.options.getLevel||r,anchorTypes:this.options.anchorTypes}),this.storage.scrollHandler=()=>{var t;const e=this.options.scrollParent().scrollTop-36*page.value.margin.top;this.storage.scrollPosition=e||0;const o=a(this.storage.content,{editor:this.editor,anchorTypes:this.options.anchorTypes,storage:this.storage,onUpdate:null===(t=this.options.onUpdate)||void 0===t?void 0:t.bind(this)});this.storage.content=o},!this.options.scrollParent)return;const s=this.options.scrollParent();s&&s.addEventListener("scroll",this.storage.scrollHandler)}});