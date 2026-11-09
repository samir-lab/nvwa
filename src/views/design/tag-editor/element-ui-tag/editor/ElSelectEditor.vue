<template>
    <div>
        <mu-button small color="teal" @click="onClick(false)">
            <mu-icon value="add"></mu-icon> 添加 Option
        </mu-button><br/>
        <mu-button small color="teal" @click="onClick(true)">
            <mu-icon value="add"></mu-icon> 添加 Option 分组
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
        onClick(isGroup){
            let children = JSON.parse(JSON.stringify(this.node.children))
            let temp = buildDistAst({}, parseASTFromXmlStr(isGroup ? `<el-option-group label="分组名称"></el-option-group>` : `<el-option label="选项" value="选项"></el-option>`), this.idIndex)
            this.idIndex = temp.index
            children.push(temp.dist)
            this.$set(this.node, 'children', children)
        }
    }
}
</script>