<template>
    <div>
        <mu-tooltip placement="left" content="规定链接的目标 URL。">
            <mu-text-field v-model="propMap.href" label="URL" multi-line :rows="3"></mu-text-field>
        </mu-tooltip>
        <mu-tooltip placement="left" content="规定在何处打开目标 URL。仅在 href 属性存在时使用。">
            <mu-select label="target" v-model="propMap.target" full-width>
                <mu-option label="default" value=""></mu-option>
                <mu-option label="_blank" value="_blank"></mu-option>
                <mu-option label="_parent" value="_parent"></mu-option>
                <mu-option label="_self" value="_self"></mu-option>
                <mu-option label="_top" value="_top"></mu-option>
            </mu-select>
        </mu-tooltip>
    </div>
</template>

<script>
import { hyphenate, createAttrs } from '@/views/design/tag-editor/helper/propsHelper.js'

const defaultMap = {
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
                href: "http://www.trip.com",
                target: ""
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