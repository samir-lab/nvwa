<template>
    <div>
        <mu-text-field v-model="propMap.label" label="Radio 的 value"></mu-text-field>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.disabled" label="是否禁用" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.border" label="是否显示边框" ></mu-switch>
        </div>
        <mu-tooltip placement="left" content="Radio 的尺寸，仅在 border 为真时有效">
            <mu-select label="尺寸" v-model="propMap.size" full-width>
                <mu-option label="normal" value=""></mu-option>
                <mu-option label="medium" value="medium"></mu-option>
                <mu-option label="small" value="small"></mu-option>
                <mu-option label="mini" value="mini"></mu-option>
            </mu-select>
        </mu-tooltip>
    </div>
</template>

<script>
import { hyphenate, createAttrs } from '@/views/design/tag-editor/helper/propsHelper.js'

const defaultMap = {
    disabled:false,
    border:false
}

const bindArr = [
    'disabled','border'
]

export default {
    data(){
        if(this.node['x-props'] && JSON.stringify(this.node['x-props']) != '{}'){
            return Object.assign({}, this.node['x-props'])
        }
        return{
            propMap: {
                label:this.node.attrsMap['label'] || '',
                disabled:false,
                border:false,
                size:''
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