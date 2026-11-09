<template>
    <div>
        <mu-button small color="teal" @click="onClick">
            <mu-icon value="add"></mu-icon> 添加项目
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
            let temp = buildDistAst({}, parseASTFromXmlStr(`<el-form-item label="新项目"></el-form-item>`), this.idIndex)
            this.idIndex = temp.index
            children.push(temp.dist)
            this.$set(this.node, 'children', children)
        }
    }
}
</script>