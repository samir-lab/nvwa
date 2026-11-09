<template>
    <div>
        <mu-tooltip placement="left" content="所有列占据的栅格数之和不能超过24">
            <mu-text-field v-model="propMap.span" label="栅格占据的列数" type="number"></mu-text-field>
        </mu-tooltip>
        <mu-text-field v-model="propMap.offset" label="栅格左侧的间隔格数" type="number"></mu-text-field>
    </div>
</template>

<script>
import { hyphenate, createAttrs } from '@/views/design/tag-editor/helper/propsHelper.js'

const defaultMap = {
    offset:0
}
const bindArr = ['span','offset']

export default {
    data(){
        if(this.node['x-props'] && JSON.stringify(this.node['x-props']) != '{}'){
            return Object.assign({}, this.node['x-props'])
        }
        return{
            propMap: {
                span:this.node.attrsMap[':span'] || 1,
                offset:this.node.attrsMap[':offset'] || 0
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