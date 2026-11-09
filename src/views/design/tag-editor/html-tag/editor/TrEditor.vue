<template>
    <div>
        <mu-button small color="teal" @click="onAddCell(true)" style="margin-right:10px;">
            <mu-icon value="add"></mu-icon> 添加表头单元格
        </mu-button>
        <mu-button small color="teal" @click="onAddCell(false)">
            <mu-icon value="add"></mu-icon> 添加表体单元格
        </mu-button>
    </div>
</template>

<script>
import { parseComponentFromAST, parseASTFromXmlStr, nextId, buildDistAst} from '@/helpers/AstHelper.js'

export default {
    data(){
        return{
            idIndex: 0
        }
    },
    props:{
        node:{}
    },
    created(){
        this.idIndex = 100 * this.node.id + nextId(this.node)
    },
    methods:{
        onAddCell(isHead){
            let children = JSON.parse(JSON.stringify(this.node.children))
            let temp = buildDistAst({}, parseASTFromXmlStr(isHead ? `<th>表头</th>` : `<td>表体</td>`), this.idIndex)
            this.idIndex = temp.index
            children.push(temp.dist)
            this.$set(this.node, 'children', children)
        }
    }
}
</script>