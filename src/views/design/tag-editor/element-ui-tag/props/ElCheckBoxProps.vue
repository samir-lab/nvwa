<template>
    <div>
        <mu-tooltip placement="left" content="在非checkbox-group的情况使用">
            <mu-text-field v-model="propMap.vModel" label="绑定变量"></mu-text-field>
        </mu-tooltip>
        <mu-text-field v-model="propMap.trueLabel" label="选中时的值（true-label）"></mu-text-field>
        <mu-text-field v-model="propMap.falseLabel" label="未选中时的值（false-label）"></mu-text-field>
        <mu-tooltip  placement="left" content="只有在checkbox-group或者绑定对象类型为array时有效">
            <mu-text-field v-model="propMap.label" label="Group选中时的值（label）"></mu-text-field>
        </mu-tooltip>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.disabled" label="是否禁用" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.border" label="是否显示边框" ></mu-switch>
        </div>
        <mu-tooltip placement="left" content="Checkbox 的尺寸，仅在 border 为真时有效">
            <mu-select label="尺寸" v-model="propMap.size" full-width>
                <mu-option label="normal" value=""></mu-option>
                <mu-option label="medium" value="medium"></mu-option>
                <mu-option label="small" value="small"></mu-option>
                <mu-option label="mini" value="mini"></mu-option>
            </mu-select>
        </mu-tooltip>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.checked" label="当前是否勾选" ></mu-switch>
        </div>
    </div>
</template>

<script>
import { hyphenate, createAttrs } from '@/views/design/tag-editor/helper/propsHelper.js'

const defaultMap = {
    disabled:false,
    border:false,
    checked:false
}

const bindArr = [
    'disabled','border','checked'
]

export default {
    data(){
        if(this.node['x-props'] && JSON.stringify(this.node['x-props']) != '{}'){
            return Object.assign({}, this.node['x-props'])
        }
        return{
            propMap: {
                vModel:this.node.attrsMap['v-model'],
                label:this.node.attrsMap['label'] || '',
                trueLabel:this.node.attrsMap['true-label'] || '',
                falseLabel:this.node.attrsMap['false-label'] || '',
                size:this.node.attrsMap['size'] || '',
                disabled:this.node.attrsMap[':disabled'] || false,
                border:this.node.attrsMap[':border'] || false,
                checked:this.node.attrsMap[':checked'] || false
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