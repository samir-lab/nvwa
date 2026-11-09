<template>
    <div>
        <mu-select label="类型" v-model="propMap.type" full-width>
            <mu-option label="normal" value=""></mu-option>
            <mu-option label="success" value="success"></mu-option>
            <mu-option label="warning" value="warning"></mu-option>
            <mu-option label="danger" value="danger"></mu-option>
            <mu-option label="info" value="info"></mu-option>
        </mu-select>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.closable" label="是否可关闭" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.hit" label="是否有边框描边" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <span style="line-height: 40px;margin-right:10px;position: relative;left: 0px;top: -10px;"> 背景色 </span>
            <el-color-picker show-alpha size="mini" v-model="propMap.color" ></el-color-picker>
        </div>
        <mu-select label="尺寸" v-model="propMap.size" full-width>
            <mu-option label="normal" value=""></mu-option>
            <mu-option label="medium" value="medium"></mu-option>
            <mu-option label="small" value="small"></mu-option>
            <mu-option label="mini" value="mini"></mu-option>
        </mu-select>
        <mu-select label="主题" v-model="propMap.effect" full-width>
            <mu-option label="normal" value=""></mu-option>
            <mu-option label="dark" value="dark"></mu-option>
            <mu-option label="light" value="light"></mu-option>
            <mu-option label="plain" value="plain"></mu-option>
        </mu-select>
    </div>
</template>

<script>
import { hyphenate, createAttrs } from '@/views/design/tag-editor/helper/propsHelper.js'

const defaultMap = {
    closable:false,
    hit:false,
    effect:'light'
}
const bindArr = [
    'closable', 'hit'
]

export default {
    data(){
        if(this.node['x-props'] && JSON.stringify(this.node['x-props']) != '{}'){
            return Object.assign({}, this.node['x-props'])
        }
        return{
            propMap: {
                type:'',
                closable:false,
                hit:false,
                color:'',
                size:'',
                effect:'light'
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