<template>
    <div>
        <mu-tooltip placement="left" content="规定图像的替代文本。">
            <mu-text-field v-model="propMap.alt" label="替代文本" ></mu-text-field>
        </mu-tooltip>
        <mu-tooltip placement="left" content="规定显示图像的 URL。">
            <mu-text-field v-model="propMap.src" label="URL" multi-line :rows="3"></mu-text-field>
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
                alt: "loading...",
                src: "https://dimg04.c-ctrip.com/images/AQ0h1700000116oqlC947.png"
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