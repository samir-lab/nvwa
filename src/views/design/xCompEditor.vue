<template>
    <div style='height:100%'>
        <div class="comp-edit-scope">
            <component v-if="node.tag && node.tag.trim()" v-bind:is="`${tags[node.tag]}Editor`" :node="node"></component>
            <div v-else style="text-align:center;margin-top:50px;">请选择要编辑的节点！</div>
        </div>
        <mu-divider></mu-divider>
        <div style='height:49%;padding:10px'>
            <TplComp v-if="comp && comp.content" :html="`<div style='height:100%'>${comp.content}</div>`" 
                :dataScope="comp.dataScope" :methodsScope="comp.methodsScope">
            </TplComp>
        </div>
    </div>
</template>

<script>
import TAG_MAP_HTML from '@/views/design/tag-editor/html-tag/config.js'
import TAG_MAP_ELEMENT_UI from '@/views/design/tag-editor/element-ui-tag/config.js'
import { parseComponentFromAST } from '@/helpers/AstHelper.js'

export default {
    data(){
        return{
            tags: { ...TAG_MAP_HTML, ...TAG_MAP_ELEMENT_UI },
            comp: {}
        }
    },
    props:{
        node:{}
    },
    watch:{
        '$store.state.contextCompAst'(newVal,oldVal){
            this.comp = parseComponentFromAST(newVal)
        },
    },
    created(){

    }
}
</script>

<style>
.comp-edit-scope {
    height:50%;
    padding:10px;
}
</style>