<template>
    <div>
        <div>
            <mu-text-field v-model="text" label="固定文本" ></mu-text-field>
        </div>
        <div style="width:49%;margin-right:2%;display:inline-block;">
            <mu-text-field style="width:100%" v-model="varName" label="绑定变量" ></mu-text-field>
        </div>
        <div style="width:49%;display:inline-block;">
            <mu-text-field style="width:100%" v-model="mockVal" label="Mock值" ></mu-text-field>
        </div>
        <div><mu-text-field label="变量表达式"  v-model="varExp" :disabled="!varName || varName.trim() == ''" ></mu-text-field></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            text:'',
            varName:'',
            mockVal:'',
            varExp:''
        }
    },
    props:{
        node:{}
    },
    created(){
        if(this.node.textBindVar){
            this.varName = this.node.textBindVar
            this.mockVal = this.node.textMockVal
            if(this.node.text != `{{${this.varName}}}`){
                this.varExp = this.node.text.replace('{','').replace('}','')
            }
        } else {
            this.text = this.node.text || ''
        }
    },
    watch:{
        node:{
            handler(val){
                
            },
            deep:true
        },
        text(value){
            this.$set(this.node, 'text', value ? value : '')
            this.varName = ''
            this.mockVal = ''
        },
        varName(value){
            if(value && value.trim()){
                this.text = ''
                this.$set(this.node, 'text', `{{${value}}}`)
                this.$set(this.node, 'textBindVar', value)
            } else {
                this.$set(this.node, 'text', '')
                this.$set(this.node, 'textBindVar', '')
                this.varExp = ''
            }
        },
        mockVal(value){
            this.$set(this.node, 'textMockVal', value)
        },
        varExp(value){
            if(value && value.trim() && this.varName && this.varName.trim()){
                this.$set(this.node, 'text', `{{${value}}}`)
            } else {
                if(this.varName){
                    this.$set(this.node, 'text', `{{${this.varName}}}`)
                } else {
                    this.$set(this.node, 'text', `{{${this.text}}}`)
                }
            }
        }
    },
    methods:{

    }
}
</script>