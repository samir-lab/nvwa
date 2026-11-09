<template>
    <div>
        <mu-tooltip placement="left" content="规定单元格可横跨的列数。">
            <mu-text-field v-model="propMap.colspan" label="单元格占据的列数" type="number"></mu-text-field>
        </mu-tooltip>
        <mu-tooltip placement="left" content="规定单元格可横跨的行数。">
            <mu-text-field v-model="propMap.rowspan" label="单元格占据的行数" type="number"></mu-text-field>
        </mu-tooltip>
    </div>
</template>

<script>
import { hyphenate, createAttrs } from '@/views/design/tag-editor/helper/propsHelper.js'

const defaultMap = {
    colspan: "1",
    rowspan: "1"
}
const bindArr = [
]

export default {
    data(){
        if(this.node['x-props'] && JSON.stringify(this.node['x-props']) != '{}'){
            return Object.assign({}, this.node['x-props'])
        }
        return{
            propMap: {
                colspan: "1",
                rowspan: "1"
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