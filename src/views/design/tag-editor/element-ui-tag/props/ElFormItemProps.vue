<template>
    <div>
        <mu-text-field v-model="propMap.prop" label="表单域 model 中的字段"></mu-text-field>
        <mu-text-field v-model="propMap.label" label="标签文本"></mu-text-field>
        <mu-select label="尺寸" v-model="propMap.size" full-width>
            <mu-option label="normal" value=""></mu-option>
            <mu-option label="medium" value="medium"></mu-option>
            <mu-option label="small" value="small"></mu-option>
            <mu-option label="mini" value="mini"></mu-option>
        </mu-select>
        <mu-tooltip placement="left" content="表单域标签的的宽度，例如 '50px'。支持 auto。">
            <mu-text-field v-model="propMap.labelWidth" label="表单域标签的宽度"></mu-text-field>
        </mu-tooltip>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.showMessage" label="是否显示校验错误信息" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.inlineMessage" label="以行内形式展示校验信息" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.required" label="是否必填" ></mu-switch>
        </div>
    </div>
</template>

<script>
import { hyphenate, createAttrs } from '@/views/design/tag-editor/helper/propsHelper.js'

const defaultMap = {
    showMessage:true,
    inlineMessage:false,
    required:false,
}

const bindArr = [
    'showMessage','inlineMessage','required'
]

export default {
    data(){
        if(this.node['x-props'] && JSON.stringify(this.node['x-props']) != '{}'){
            return Object.assign({}, this.node['x-props'])
        }
        return{
            propMap: {
                size:'',
                prop:'',
                label:this.node.attrsMap['label'],
                labelWidth:'',
                showMessage:true,
                inlineMessage:false,
                required:false,
            }
        }
    },
    props:{
        node:{}
    },
    watch:{
        propMap:{
            deep:true,
            handler(val) {
                this.$nextTick(() => {
                    let attrs = JSON.parse(JSON.stringify(this.node.attrsMap))
                    let p = createAttrs(this.propMap, defaultMap, bindArr)
                    for(let key in this.propMap){
                        if(bindArr.indexOf(key) == -1){
                            delete attrs[hyphenate(key)]
                        } else {
                            delete attrs[':' + hyphenate(key)]
                        }
                    }
                    Object.assign(attrs, p)
                    this.$set(this.node, 'x-props', this.$data)
                    this.$set(this.node, 'attrsMap', attrs)
                })
            }
        }
    }
}
</script>