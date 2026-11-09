<template>
    <div>
        <mu-select label="尺寸" v-model="propMap.size" full-width>
            <mu-option label="normal" value=""></mu-option>
            <mu-option label="medium" value="medium"></mu-option>
            <mu-option label="small" value="small"></mu-option>
            <mu-option label="mini" value="mini"></mu-option>
        </mu-select>
        <mu-text-field v-model="propMap.vModel" label="绑定变量"></mu-text-field>
        <mu-text-field v-model="propMap.min" type="number" label="允许的最小值"></mu-text-field>
        <mu-text-field v-model="propMap.max" type="number" label="允许的最大值"></mu-text-field>
        <mu-text-field v-model="propMap.step" type="number" label="计数器步长"></mu-text-field>
        <mu-text-field v-model="propMap.precision" type="number" label="数值精度（小数位数）"></mu-text-field>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.stepStrictly" label="是否只能输入 step 的倍数" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.disabled" label="是否禁用计数器" ></mu-switch>
        </div>
        <mu-select label="控制按钮位置" v-model="propMap.controlsPosition" full-width>
            <mu-option label="normal" value=""></mu-option>
            <mu-option label="right" value="right"></mu-option>
        </mu-select>
    </div>
</template>

<script>
import { hyphenate, createAttrs } from '@/views/design/tag-editor/helper/propsHelper.js'

const defaultMap = {
    min:-100000,
    max:100000,
    step:1,
    stepStrictly:false,
    precision:0,
    size:'',
    disabled:false,
    controlsPosition:''
}

const bindArr = [
    'min', 'max', 'step', 'stepStrictly', 'precision', 'disabled', 'controls'
]

export default {
    data(){
        if(this.node['x-props'] && JSON.stringify(this.node['x-props']) != '{}'){
            return Object.assign({}, this.node['x-props'])
        }
        return{
            propMap: {
                vModel:this.node.attrsMap['v-model'],
                min:-100000,
                max:100000,
                step:1,
                stepStrictly:false,
                precision:0,
                size:'',
                disabled:false,
                controlsPosition:''
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
    },
}
</script>

<style>

</style>