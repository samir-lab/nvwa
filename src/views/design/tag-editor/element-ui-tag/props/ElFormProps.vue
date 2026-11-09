<template>
    <div>
        <mu-text-field v-model="propMap.model" label="绑定变量"></mu-text-field>
        <mu-select label="尺寸" v-model="propMap.size" full-width>
            <mu-option label="normal" value=""></mu-option>
            <mu-option label="medium" value="medium"></mu-option>
            <mu-option label="small" value="small"></mu-option>
            <mu-option label="mini" value="mini"></mu-option>
        </mu-select>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.disabled" label="是否禁用" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.inline" label="行内表单模式" ></mu-switch>
        </div>
        <mu-tooltip placement="left" content="表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width">
            <mu-select label="表单域标签的位置" v-model="propMap.labelPosition" full-width>
                <mu-option label="right" value="right"></mu-option>
                <mu-option label="left" value="left"></mu-option>
                <mu-option label="top" value="top"></mu-option>
            </mu-select>
        </mu-tooltip>
        <mu-tooltip placement="left" content="表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。">
            <mu-text-field v-model="propMap.labelWidth" label="表单域标签的宽度"></mu-text-field>
        </mu-tooltip>
        <mu-text-field v-model="propMap.labelSuffix" label="表单域标签的后缀	"></mu-text-field>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.hideRequiredAsterisk" label="是否显示红色星号" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.showMessage" label="是否显示校验错误信息" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.inlineMessage" label="以行内形式展示校验信息" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.statusIcon" label="显示校验结果反馈图标" ></mu-switch>
        </div>

    </div>
</template>

<script>
import { hyphenate, createAttrs } from '@/views/design/tag-editor/helper/propsHelper.js'

const defaultMap = {
    disabled:false,
    inline:false,
    labelPosition:'right',
    hideRequiredAsterisk:false,
    showMessage:true,
    inlineMessage:false,
    statusIcon:false,
}

const bindArr = [
    'disabled','inline','hideRequiredAsterisk','showMessage','inlineMessage','statusIcon','model'
]

export default {
    data(){
        if(this.node['x-props'] && JSON.stringify(this.node['x-props']) != '{}'){
            return Object.assign({}, this.node['x-props'])
        }
        return{
            propMap: {
                size:'',
                model:this.node.attrsMap[':model'],
                disabled:false,
                inline:false,
                labelPosition:'right',
                labelWidth:'',
                labelSuffix:'',
                hideRequiredAsterisk:false,
                showMessage:true,
                inlineMessage:false,
                statusIcon:false,
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