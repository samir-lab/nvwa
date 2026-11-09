<template>
    <div>
        <TplComp v-if="comp && comp.content" :html="`<div style='height:100%'>${comp.content}</div>`" 
            :dataScope="comp.dataScope" :methodsScope="comp.methodsScope">
        </TplComp>
    </div>
</template>

<script>
import { parseComponentFromAST} from '@/helpers/AstHelper.js'

export default {
    data(){
        return{
            comp:{}
        }
    },
    props:{
        node:{}
    },
    created(){
        this.comp = parseComponentFromAST(this.node)
    },
    watch:{
        node:{
            handler(newVal,oldVal){
                this.comp = parseComponentFromAST(newVal)
            },
            deep: true
        }
    }
}
</script>