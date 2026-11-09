<template>
    <div>
        <mu-select label="边框" v-model="propMap.border" full-width>
            <mu-option label="去除" value=""></mu-option>
            <mu-option label="显示" value="1"></mu-option>
        </mu-select>
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
                border:'1'
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