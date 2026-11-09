<template>
    <div>
        <mu-tooltip placement="left" content="规定表头单元格可横跨的列数。">
            <mu-text-field v-model="propMap.colspan" label="单元格占据的列数" type="number"></mu-text-field>
        </mu-tooltip>
        <mu-tooltip placement="left" content="规定表头单元格可横跨的行数。">
            <mu-text-field v-model="propMap.rowspan" label="单元格占据的行数" type="number"></mu-text-field>
        </mu-tooltip>
        <mu-tooltip placement="left" content="规定表头单元格是否是行、列、行组或列组的头部。">
            <mu-select label="表头属性" v-model="propMap.scope" full-width>
                <mu-option label="col" value="col"></mu-option>
                <mu-option label="colgroup" value="colgroup"></mu-option>
                <mu-option label="row" value="row"></mu-option>
                <mu-option label="rowgroup" value="rowgroup"></mu-option>
            </mu-select>
        </mu-tooltip>
    </div>
</template>

<script>
import { hyphenate, createAttrs } from '@/views/design/tag-editor/helper/propsHelper.js'

const defaultMap = {
    colspan: "1",
    rowspan: "1",
    scope:'col'
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
                rowspan: "1",
                scope:'col'
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