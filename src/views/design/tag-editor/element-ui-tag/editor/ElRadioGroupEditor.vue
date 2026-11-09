<template>
    <div>
        <mu-button small color="teal" @click="onClick(false)">
            <mu-icon value="add"></mu-icon> 添加备选项
        </mu-button><br/>
        <mu-button small color="teal" @click="onClick(true)">
            <mu-icon value="add"></mu-icon> 添加备选项（按钮样式）
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
        onClick(isBtn){
            let children = JSON.parse(JSON.stringify(this.node.children))
            let temp = buildDistAst({}, parseASTFromXmlStr(isBtn ? `<el-radio-button>备选项</el-radio-button>` : `<el-radio>备选项</el-radio>`), this.idIndex)
            this.idIndex = temp.index
            children.push(temp.dist)
            this.$set(this.node, 'children', children)
        }
    }
}
</script>