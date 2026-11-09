<template>
    <div>
        <mu-button small color="teal" @click="onClick">
            <mu-icon value="add"></mu-icon> 添加按钮
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
        onClick(){
            let children = JSON.parse(JSON.stringify(this.node.children))
            let temp = buildDistAst({}, parseASTFromXmlStr(`<el-button>默认按钮</el-button>`), this.idIndex)
            this.idIndex = temp.index
            children.push(temp.dist)
            this.$set(this.node, 'children', children)
        }
    }
}
</script>