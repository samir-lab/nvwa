<template>
    <div>
        <mu-text-field v-model="propMap.vModel" label="绑定变量"></mu-text-field>
        <mu-select label="尺寸" v-model="propMap.size" full-width>
            <mu-option label="normal" value=""></mu-option>
            <mu-option label="medium" value="medium"></mu-option>
            <mu-option label="small" value="small"></mu-option>
            <mu-option label="mini" value="mini"></mu-option>
        </mu-select>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.disabled" label="是否禁用" ></mu-switch>
        </div>
        <mu-tooltip placement="left" content="按钮形式的 Radio 激活时的文本颜色">
            <div style="margin:15px 0px;">
                <span style="line-height: 40px;margin-right:10px;position: relative;left: 0px;top: -10px;"> 文本颜色 </span>
                <el-color-picker show-alpha size="mini" v-model="propMap.textColor" ></el-color-picker>
            </div>
        </mu-tooltip>
        <mu-tooltip placement="left" content="按钮形式的 Radio 激活时的填充色和边框色">
            <div style="margin:15px 0px;">
                <span style="line-height: 40px;margin-right:10px;position: relative;left: 0px;top: -10px;"> 填充色和边框色 </span>
                <el-color-picker show-alpha size="mini" v-model="propMap.fill" ></el-color-picker>
            </div>
        </mu-tooltip>
    </div>
</template>

<script>
import { hyphenate, createAttrs } from '@/views/design/tag-editor/helper/propsHelper.js'

const defaultMap = {
    disabled:false,
    textColor:'#ffffff',
    fill:'#409EFF'
}

const bindArr = [
    'disabled',
]

export default {
    data(){
        if(this.node['x-props'] && JSON.stringify(this.node['x-props']) != '{}'){
            return Object.assign({}, this.node['x-props'])
        }
        return{
            propMap: {
                size:'',
                vModel:this.node.attrsMap['v-model'],
                disabled:false,
                textColor:'#ffffff',
                fill:'#409EFF'
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