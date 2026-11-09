<template>
    <div>
        <mu-select label="尺寸" v-model="propMap.size" full-width>
            <mu-option label="normal" value=""></mu-option>
            <mu-option label="medium" value="medium"></mu-option>
            <mu-option label="small" value="small"></mu-option>
            <mu-option label="mini" value="mini"></mu-option>
        </mu-select>
        <mu-text-field v-model="propMap.vModel" label="绑定变量"></mu-text-field>
        <mu-text-field v-model="propMap.placeholder" label="输入框占位文本"></mu-text-field>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.multiple" label="是否多选" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.disabled" label="是否禁用" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.clearable" label="是否可清空" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.filterable" label="是否可搜索" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.collapseTags" label="多选是否展示文字形式" ></mu-switch>
        </div>
        <mu-tooltip placement="left" content="多选时用户最多可以选择的项目数，为 0 则不限制">
            <mu-text-field v-model="propMap.multipleLimit" type="number" label="最多可选项目数"></mu-text-field>
        </mu-tooltip>
        <mu-text-field v-model="propMap.name" label="select input 的 name 属性"></mu-text-field>
        <mu-select label="原生属性，自动补全" v-model="propMap.autocomplete" full-width>
            <mu-option label="on" value="on"></mu-option>
            <mu-option label="off" value="off"></mu-option>
        </mu-select>
        <mu-text-field v-model="propMap.noMatchText" label="无匹配时显示的文字"></mu-text-field>
        <mu-text-field v-model="propMap.noDataText" label="选项为空时显示的文字"></mu-text-field>
        <mu-text-field v-model="propMap.popperClass" label="Select 下拉框的类名"></mu-text-field>
        <mu-tooltip placement="left" content="在输入框按下回车，选择第一个匹配项。需配合 filterable 或 remote 使用">
            <mu-switch v-model="propMap.defaultFirstOption" label="默认选择第一个匹配项" ></mu-switch>
        </mu-tooltip>
        <mu-tooltip placement="left" content="是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false">
            <mu-switch v-model="propMap.popperAppendToBody" label="将弹框插入至 body 元素" ></mu-switch>
        </mu-tooltip>
        <mu-tooltip placement="left" content="对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单">
            <mu-switch v-model="propMap.automaticDropdown" label="自动弹出选项菜单" ></mu-switch>
        </mu-tooltip> 
    </div>
</template>

<script>
import { hyphenate, createAttrs } from '@/views/design/tag-editor/helper/propsHelper.js'

const defaultMap = {
    multiple:false,
    disabled:false,
    clearable:false,
    collapseTags:false,
    multipleLimit:0,
    autocomplete:'off',
    filterable:false,
    noMatchText:'无匹配数据',
    noDataText:'无数据',
    defaultFirstOption:false,
    popperAppendToBody:true,
    automaticDropdown:false
}
const bindArr = [
    'multiple','disabled','clearable','collapseTags','multipleLimit','filterable','defaultFirstOption','popperAppendToBody','automaticDropdown'
]

export default {
    data(){
        if(this.node['x-props'] && JSON.stringify(this.node['x-props']) != '{}'){
            return Object.assign({}, this.node['x-props'])
        }
        return{
            propMap: {
                vModel:this.node.attrsMap['v-model'],
                placeholder:this.node.attrsMap['placeholder'] || '',
                name:'',
                size:'',
                multiple:false,
                disabled:false,
                clearable:false,
                collapseTags:false,
                multipleLimit:0,
                autocomplete:'off',
                filterable:false,
                noMatchText:'无匹配数据',
                noDataText:'无数据',
                popperClass:'',
                defaultFirstOption:false,
                popperAppendToBody:true,
                automaticDropdown:false
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