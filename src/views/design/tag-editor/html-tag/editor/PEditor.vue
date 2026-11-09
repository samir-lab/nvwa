<template>
    <div style="width:100%;height:100%;border:2px dashed #d0ba9170;" @dragover="allowDrop" @drop="drop">
        <TplComp v-if="comp && comp.content" :html="`<div style='height:100%'>${content}</div>`" 
            :dataScope="comp.dataScope" :methodsScope="comp.methodsScope">
        </TplComp>
    </div>
</template>

<script>
import { parseComponentFromAST, parseASTFromXmlStr, nextId, buildDistAst} from '@/helpers/AstHelper.js'

export default {
    data(){
        return{
            comp:{},
            content:'',
            idIndex:0
        }
    },
    props:{
        node:{}
    },
    created(){
        this.comp = parseComponentFromAST(this.node)
        this.content = this.comp.content.replace('slot-scope="scope"','')
        this.idIndex = 100 * this.node.id + nextId(this.node)
    },
    watch:{
        node:{
            handler(newVal,oldVal){
                this.comp = parseComponentFromAST(newVal)
                this.content = this.comp.content.replace('slot-scope="scope"','')
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