<template>
    <div>
        <mu-tooltip  placement="left" content="只有在checkbox-group或者绑定对象类型为array时有效">
            <mu-text-field v-model="propMap.label" label="Group选中时的值（label）"></mu-text-field>
        </mu-tooltip>
        <mu-text-field v-model="propMap.trueLabel" label="选中时的值（true-label）"></mu-text-field>
        <mu-text-field v-model="propMap.falseLabel" label="未选中时的值（false-label）"></mu-text-field>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.disabled" label="是否禁用" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.checked" label="当前是否勾选" ></mu-switch>
        </div>
    </div>
</template>

<script>
import { hyphenate, createAttrs } from '@/views/design/tag-editor/helper/propsHelper.js'

const defaultMap = {
    disabled:false,
    checked:false
}

const bindArr = [
    'disabled','checked'
]

export default {
    data(){
        if(this.node['x-props'] && JSON.stringify(this.node['x-props']) != '{}'){
            return Object.assign({}, this.node['x-props'])
        }
        return{
            propMap: {
                label:this.node.attrsMap['label'] || '',
                trueLabel:this.node.attrsMap['true-label'] || '',
                falseLabel:this.node.attrsMap['false-label'] || '',
                disabled:this.node.attrsMap[':disabled'] || false,
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