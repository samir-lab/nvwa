<template>
    <div style="width:100%;height:100%;border:2px dashed #d0ba9170;"  @dragover="allowDrop" @drop="drop">
        <TplComp v-if="comp && comp.content && node.children.length > 0" :html="`<div style='height:100%'>${comp.content.replace(/el-form-item/g,'div')}</div>`" 
            :dataScope="comp.dataScope" :methodsScope="comp.methodsScope">
        </TplComp>
        <div v-else style="color:lightgray;text-align:center;line-height:50px;">
            拖入控件以自定义内容
        </div>
    </div>
</template>

<script>
import { parseComponentFromAST, parseASTFromXmlStr, nextId, buildDistAst} from '@/helpers/AstHelper.js'

export default {
    data(){
        return{
            comp:{},
            idIndex:0
        }
    },
    props:{
        node:{}
    },
    created(){
        this.comp = parseComponentFromAST(this.node)
        this.idIndex = 100 * this.node.id + nextId(this.node)
    },
    watch:{
        node:{
            handler(newVal,oldVal){
                this.comp = parseComponentFromAST(newVal)
            },
            deep: true
        }
    },
    methods:{
        allowDrop(ev) {
            ev.preventDefault()
        },
        drop(ev){
            let item = {}
            item.content = ev.dataTransfer.getData("_html")
            if (ev.dataTransfer.getData("_dataScope")){
                item.dataScope = JSON.parse(ev.dataTransfer.getData("_dataScope"))
            }
            let children = JSON.parse(JSON.stringify(this.node.children))
            let temp = buildDistAst({}, parseASTFromXmlStr(item.content, item.dataScope), this.idIndex)
            this.idIndex = temp.index
            children.push(temp.dist)
            this.$set(this.node, 'children', children)
        }
    }
}
</script>