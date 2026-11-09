<template>
    <div>
        <mu-text-field v-model="propMap.value" label="选项的值"></mu-text-field>
        <mu-tooltip placement="left" content="选项的标签，若不设置则默认与选项的值相同">
            <mu-text-field v-model="propMap.label" label="选项的标签"></mu-text-field>
        </mu-tooltip>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.disabled" label="是否禁用该选项" ></mu-switch>
        </div>
    </div>
</template>

<script>
import { hyphenate, createAttrs } from '@/views/design/tag-editor/helper/propsHelper.js'

const defaultMap = {
    disabled:false
}
const bindArr = [
    'disabled'
]

export default {
    data(){
        if(this.node['x-props'] && JSON.stringify(this.node['x-props']) != '{}'){
            return Object.assign({}, this.node['x-props'])
        }
        return{
            propMap: {
                value:this.node.attrsMap['value'],
                label:this.node.attrsMap['label'],
                disabled:false,
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