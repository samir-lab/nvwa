<template>
    <div>
        <mu-switch 
            :input-value="node.children && node.children[0] && (node.children.length == 1 || node.children[0].tag == 'template')" 
            @change="onChange"
            label="自定义列内容" 
            :disabled="node.children && node.children[0] && (node.children.length == 1 || node.children[0].tag == 'template')" >
        </mu-switch>
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
    created(){
        this.idIndex = 100 * this.node.id + nextId(this.node)
    },
    props:{
        node:{}
    },
    methods:{
        onChange(value){
            if(value == true){
                let children = JSON.parse(JSON.stringify(this.node.children))
                let temp = buildDistAst({}, parseASTFromXmlStr(`<template slot-scope="scope"></template>`), this.idIndex)
                this.idIndex = temp.index
                children.push(temp.dist)
                this.$set(this.node, 'children', children)
            }
        },
    },
    watch:{
        node:{
            deep:true,
            handler(newVal, oldVal){

            }
        }
    }
}
</script>