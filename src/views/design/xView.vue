<template>
    <div style="background:#FFFFFF">
        <div class="outer-drag-box" @dragover="allowDrop" @drop="drop">
            <mu-flex style="padding:8px;">
                <mu-checkbox style="padding-right:8px" v-model="draggable" label="拖放"></mu-checkbox>
                <mu-checkbox style="padding-right:8px" v-model="resizable" label="调整大小"></mu-checkbox>
                <mu-checkbox style="padding-right:8px" v-model="checkCollision" label="固定元素"></mu-checkbox>
                <mu-checkbox style="padding-right:8px" v-model="verticalCompact" label="向上合并"></mu-checkbox>
            </mu-flex>
            <mu-flex style="padding:0px 8px;">
                <span style="line-height: 38px;">行高：</span>
                <el-slider style="width:305px;margin:0;z-index:0" :step="1" :min="1" :show-input="false" v-model="rowHeight"></el-slider>
            </mu-flex>
            <mu-flex style="padding:8px;">
                <mu-button class="btn" style="width:100px" small color="teal" @click="addBox">⿻ 背景盒子</mu-button> 
            </mu-flex>
            <mu-divider></mu-divider>
            <grid-layout ref="gridLayout" 
                    :rowHeight="rowHeight"
                    :layout.sync="layout"
                    :is-draggable="draggable"
                    :is-resizable="resizable"
                    :prevent-collision="checkCollision"
                    :vertical-compact="verticalCompact"
                    @layout-created="layoutCreatedEvent"
                    @layout-before-mount="layoutBeforeMountEvent"
                    @layout-mounted="layoutMountedEvent"
                    @layout-ready="layoutReadyEvent"
                    @layout-updated="layoutUpdatedEvent" >
                <div v-if="layout && layout.length > 0">
                    <grid-item v-for="item in layout" :key="item.i"
                            @contextmenu.native="showContextMenu($event,item) " 
                            :static="item.static"
                            :zIndex="item.zIndex"
                            :x="item.x"
                            :y="item.y"
                            :w="item.w"
                            :h="item.h"
                            :i="item.i"
                            @resize="resize"
                            @resized="resized"
                            @move="move"
                            @moved="moved"
                            @container-resized="containerResized" >
                        <TplComp :html="`<div style='height:100%'>${item.content}</div>`" :dataScope="item.dataScope" :methodsScope="item.methodsScope" ></TplComp>
                        <div class="box-index">{{item.i}}</div>
                    </grid-item>
                </div>
                <div v-else>
                    <p class="empty-msg">试试拖个控件进来！ ：-）</p>
                </div>
            </grid-layout>
            <ContextMenu :show="contextMenuVisible" :offset="contextMenuOffset" @update:show="show => (contextMenuVisible = show)">
                <div class="context-menu-item-e" style="color:#a2312b" @click="delItem">ㄨ 删除</div>
                <div class="context-menu-item-e" @click="editItem">✐ 编辑</div>
                <mu-divider></mu-divider>
                <div class="context-menu-item-e" @click="calcZIndex(2)">⿶ 置于顶层</div>
                <div class="context-menu-item-e" @click="calcZIndex(1)">⿺ 上移一层</div>
                <div class="context-menu-item-e" @click="calcZIndex(-1)">⿹ 下移一层</div>
                <div class="context-menu-item-e" @click="calcZIndex(-2)">⿵ 置于底层</div>
            </ContextMenu>
        </div>
        <transition name="slide-bottom">
            <div class="edit-pop-box" v-if="openEditPanel" v-focus @keyup.esc="openEditPanel = false" tabindex="0">
                <mu-appbar class="bar" :z-depth="2" color="#9A3EC2">
                    <i class="el-icon-edit" style="font-size:18px;margin-right:9px;"></i><span class="title"> 编辑 </span>
                    <mu-button small slot="right" icon @click="openEditPanel = false">
                        <mu-icon value="close"></mu-icon>
                    </mu-button>
                </mu-appbar>
                <div>
                    <mu-row>
                        <mu-col span="3">
                            <mu-paper :z-depth="1" class="edit-item-paper">
                                <div class="edit-item-box">
                                    <span class="group-desc">组件节点树</span>
                                    <mu-divider></mu-divider>
                                    <xCompTree :ast="editAst" :editNode="contextNode" @onNodeClick="onCompTreeNodeClick" /> 
                                </div>
                            </mu-paper>
                        </mu-col>
                        <mu-col span="6">
                            <mu-paper :z-depth="1" class="edit-item-paper">
                                <div class="edit-item-box">
                                    <xCompEditor :node="contextNode" />
                                </div>
                            </mu-paper>
                        </mu-col>
                        <mu-col span="3">
                            <mu-paper :z-depth="1">
                                <mu-tabs full-width color="#19A15F" :value="currentSettingView" indicator-color="gold">
                                    <mu-tab @click="currentSettingView = 'xProps'" value="xProps">属性</mu-tab>
                                    <mu-tab @click="currentSettingView = 'xCss'" value="xCss">样式</mu-tab>
                                    <mu-tab @click="currentSettingView = 'xAdvance'" value="xAdvance">高级</mu-tab>
                                </mu-tabs>
                                <div class="edit-box" style="height: calc(100vh - 64px - 48px - 48px);">
                                    <transition name="component-fade" mode="out-in">
                                        <component :node="contextNode" v-bind:is="currentSettingView"></component>
                                    </transition>
                                </div>
                            </mu-paper>
                        </mu-col>
                    </mu-row>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import ContextMenu from "@/components/common/ContextMenu.vue";
import { parseASTFromXmlStr, parseComponentFromAST} from '@/helpers/AstHelper.js'
import xCompTree from './xCompTree'
import xCompEditor from './xCompEditor'
import xCss from './xCss'
import xProps from './xProps'
import xAdvance from './xAdvance'

export default {
    name:'xView',
    components: {
        ContextMenu,
        xCompTree,
        xCompEditor,
        xCss,
        xProps,
        xAdvance
    },
    data () {
        return {
            rowHeight:5,
            layout: [],
            draggable: true,
            resizable: true,
            checkCollision: true,
            verticalCompact: false,
            index:1,
            contextMenuVisible: false,
            contextMenuOffset: {
                left: 0,
                top: 0
            },
            contextItem:{},
            editAst:{},
            openEditPanel:false,
            currentSettingView:'xProps',
            contextNode:{}
        }
    },
    created(){
        this.$store.dispatch('updateCurrentPage', '')
    },
    directives: {
        focus: {
            inserted: function (el) {
                setTimeout(() => {
                    el.focus()
                }, 500);
            }
        }
    },
    mounted: function () {
        this.init()
    },
    computed:{
    },
    watch:{
        '$store.state.currentPage'(newVal,oldVal){
            this.init()
        },
        rowHeight(newVal,oldVal){
            this.updatePageSetting()
        },
        draggable(newVal,oldVal){
            this.updatePageSetting()
        },
        resizable(newVal,oldVal){
            this.updatePageSetting()
        },
        checkCollision(newVal,oldVal){
            this.updatePageSetting()
        },
        verticalCompact(newVal,oldVal){
            this.updatePageSetting()
        },
        contextNode(newVal,oldVal){
            this.currentSettingView = 'xCss'
            this.$nextTick(() => {
                this.currentSettingView = 'xProps'
            })
        },
        openEditPanel(newVal){
            if(newVal == false){
                // 关闭编辑窗口后，重新渲染当前编辑的组件
                this.resetContextItem(parseComponentFromAST(this.$store.state.contextCompAst))
            }
        }
    },
    methods: {
        init(){
            if(localStorage.currentPage && localStorage.pages && JSON.parse(localStorage.pages)[localStorage.currentPage]){
                let page = JSON.parse(localStorage.pages)[localStorage.currentPage]
                this.layout = page.layout || []
                this.rowHeight = page.rowHeight
                this.draggable = page.draggable
                this.resizable = page.resizable
                this.checkCollision = page.checkCollision
                this.verticalCompact = page.verticalCompact
            } else {
                this.layout = []
                this.rowHeight = 5
                this.draggable = true
                this.resizable = true
                this.checkCollision = true
                this.verticalCompact = false
            }
            this.index = this.layout.length + 1;
            if (this.index == 0){
                this.index = 1
            }
            this.openEditPanel = false
        },
        showContextMenu(e, item) {
            this.contextItem = item
            e.preventDefault();
            this.contextMenuVisible = true;
            this.contextMenuOffset = {
                left: e.clientX,
                top: e.clientY
            };
        },
        move: function(i, newX, newY){
            //console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
        },
        resize: function(i, newH, newW, newHPx, newWPx){
            //console.log("RESIZE i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
        },
        moved: function(i, newX, newY){
            this.updatePageSetting()
        },
        resized: function(i, newH, newW, newHPx, newWPx){
            this.updatePageSetting()
        },
        containerResized: function(i, newH, newW, newHPx, newWPx){
            //console.log("### CONTAINER RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
        },
        layoutCreatedEvent: function(newLayout){
            //console.log("Created layout: ", newLayout)
        },
        layoutBeforeMountEvent: function(newLayout){
            //console.log("beforeMount layout: ", newLayout)
        },
        layoutMountedEvent: function(newLayout){
            //console.log("Mounted layout: ", newLayout)
        },
        layoutReadyEvent: function(newLayout){
            //console.log("Ready layout: ", newLayout)
        },
        layoutUpdatedEvent: function(newLayout){
            this.updatePageSetting()
        },
        allowDrop(ev) {
            ev.preventDefault()
        },
        delItem(){
            this.layout = this.layout.filter(p => p.i != this.contextItem.i)
            this.contextMenuVisible = false
            this.updatePageSetting()
        },
        clearItems(){
            this.index = 1
            this.layout = []
            this.updatePageSetting()
        },
        drop(ev) {
            let item = this.addItem(ev)
            item.content = ev.dataTransfer.getData("_html")
            if (ev.dataTransfer.getData("_dataScope")){
                item.dataScope = JSON.parse(ev.dataTransfer.getData("_dataScope"))
            }
            item.ast = parseASTFromXmlStr(item.content, item.dataScope)
            this.updatePageSetting()
        },
        addItem(ev){
            let last = this.layout.sort((m,n) => {
                if (n.y != m.y) {
                    return n.y - m.y
                } 
                return n.x - m.x
            })[0]

            let w = 75
            let h = 10
            let x = last ? (last.x + last.w + w > 256 ? 0 : last.x + last.w) : 0
            let y = last ? (x != 0 ? last.y : last.y + last.h) : 0 

            let item = {"x":x,"y":y,"w":w,"h":h, static: false, "i":this.index, zIndex:this.layout.length + 1, content: "<div />"};            
            this.index++;
            this.layout.push(item);
            return item
        },
        addBox(){
            if(!localStorage.currentPage || localStorage.currentPage == ''){
                return
            }
            let item = {"x":0,"y":0,"w":70,"h":10, static: false, boxed:true, "i":this.index, zIndex:this.layout.length + 1, content: "<div style='width:100%;height:100%;background:rgb(0, 150, 136)' />"};
            this.index++;
            this.layout.push(item);
            item.ast = parseASTFromXmlStr(item.content)
            this.updatePageSetting()
        },
        calcZIndex(op){
            let length = this.layout.length
            switch (op){
                case 2://置顶
                    for(let i = 0; i < length; ++i){
                        if(this.layout[i].i == this.contextItem.i){
                            this.layout[i].zIndex = this.layout.length
                        } else if(this.layout[i].zIndex > this.contextItem.zIndex) {
                            this.layout[i].zIndex = this.layout[i].zIndex - 1
                        }
                    }
                    break;
                case 1: //上移一层
                    if(this.contextItem.zIndex == length){
                        break;
                    }
                    for(let i = 0; i < length; ++i){
                        if(this.layout[i].zIndex == this.contextItem.zIndex + 1){
                            this.layout[i].zIndex = this.contextItem.zIndex
                            break
                        }
                    }
                    this.contextItem.zIndex = this.contextItem.zIndex + 1
                    break;
                case -1: //下移一层
                    if(this.contextItem.zIndex == 1){
                        break;
                    }
                    for(let i = 0; i < length; ++i){
                        if(this.layout[i].zIndex == this.contextItem.zIndex - 1){
                            this.layout[i].zIndex = this.contextItem.zIndex
                            break
                        }
                    }
                    this.contextItem.zIndex = this.contextItem.zIndex - 1
                    break;
                case -2: //置底
                    for(let i = 0; i < length; ++i){
                        if(this.layout[i].i == this.contextItem.i){
                            this.layout[i].zIndex = 1
                        } else if(this.layout[i].zIndex < this.contextItem.zIndex) {
                            this.layout[i].zIndex = this.layout[i].zIndex + 1
                        }
                    }
                    break;
                default:
                    break;
            }
            this.contextMenuVisible = false
            this.updatePageSetting()
        },
        renderCode(){
            let code = `<grid-layout :rowHeight="${this.rowHeight}" >`
            if(this.layout && this.layout.length > 0){
                this.layout.forEach(item => {
                    // TODO 需对 x，w 重新计算以消除同比放大问题
                    let deltaX = item.x
                    let deltaW = item.w
                    code += `<grid-item :zIndex="${item.zIndex}" :x="${deltaX}" :y="${item.y}" :w="${deltaW}" :h="${item.h}" :i="${item.i}" >
                                ${item.content}
                            </grid-item>`
                })
            }
            code += '</grid-layout>'
            return `<template><div>${code}</div></template>`
        },
        renderScript(){
            let data = {}
            let methods = {}
            if(this.layout && this.layout.length > 0){
                this.layout.forEach(item => {
                    Object.assign(data, item.dataScope)
                    Object.assign(methods, item.methodsScope)
                })
            }
            // TODO 如果手工修改了脚本，如何兼容
            return `export default { 
                        data() { return ${JSON.stringify(data).replace(/\"(\w+)\"(\s*:\s*)/g, "$1$2")} } ,
                        methods: ${JSON.stringify(methods).replace(/\"(\w+)\"(\s*:\s*)\"(\S*\s*\})\"(?=,)/g, "$1$2$3").replace(/\"(\w+)\"(\s*:\s*)\"(\S*\s*\})\"/g, "$1$2$3")} 
                    }`
        },
        updatePageSetting: async function(){
            let page = {
                layout : this.layout,
                code : this.renderCode(),
                script: this.renderScript(),
                rowHeight : this.rowHeight,
                draggable : this.draggable,
                resizable : this.resizable,
                checkCollision : this.checkCollision,
                verticalCompact : this.verticalCompact
            }
            await this.$store.dispatch('updatePageSetting', page)
        },
        editItem(){
            this.contextMenuVisible = false;
            this.openEditPanel = true
            this.$nextTick(() => {
                if(this.contextItem && this.contextItem.ast){
                    this.editAst = JSON.parse(JSON.stringify(this.contextItem.ast))
                    this.contextNode = {}
                }
            })
        },
        onCompTreeNodeClick(arg){
            this.currentSettingView = 'xProps'
            this.contextNode = arg
        },
        resetContextItem(data){
            if(this.contextItem){
                this.contextItem.content = data.content
                this.contextItem.ast = data.ast
                this.contextItem.dataScope = data.dataScope
                this.contextItem.methodsScope = data.methodsScope
                this.updatePageSetting()
            }
        }
    },
}
</script>

<style>
.empty-msg {
    text-align: center;
    line-height: 200px;
    background: #FFF;
    height: 200px;
}

.box-index{
    border: 1px dotted black;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-weight: bold;
    position: absolute;
    left: 0px;
    top: 0px;
    color: red;
    opacity: 0.8;
    z-index: 999;
    background: orange;
}
.context-menu-item-e{
    padding: 2px 15px;
}
.context-menu-item-e:hover{
    color:rgb(16, 150, 212) !important;
}
.edit-pop-box{
    width:100%;
    height:calc(100vh - 64px);
    overflow: auto;
    position: absolute;
    top:0px;
    left:0px;
    z-index: 1000;
}
.edit-item-paper {
    height: calc(100vh - 64px - 48px);
    overflow: auto;
}
.edit-item-paper-1 {
    height: calc(100vh - 64px - 48px - 48px);
    overflow: auto;
}
.edit-item-box{
    height: calc(100vh - 64px - 48px);
    overflow: auto;
    padding:10px;
}
.outer-drag-box{
    height: calc(100vh - 64px - 48px);
    overflow: auto;
}

.slide-bottom-enter-active {
  transition: all .2s ease;
}
.slide-bottom-leave-active {
  transition: all .3s cubic-bezier(1, 0.3, 0.5, 1.0);
}
.slide-bottom-enter, .slide-bottom-leave-to {
  transform: translateY(calc(100vh - 64px - 48px));
  opacity: 0;
}
</style>