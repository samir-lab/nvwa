<template>
    <div>
        <mu-select label="类型" v-model="propMap.type" full-width>
            <mu-option label="normal" value=""></mu-option>
            <mu-option label="text" value="text"></mu-option>
            <mu-option label="textarea" value="textarea"></mu-option>
        </mu-select>
        <mu-select label="尺寸" v-model="propMap.size" full-width>
            <mu-option label="normal" value=""></mu-option>
            <mu-option label="medium" value="medium"></mu-option>
            <mu-option label="small" value="small"></mu-option>
            <mu-option label="mini" value="mini"></mu-option>
        </mu-select>
        <mu-text-field v-model="propMap.vModel" label="绑定变量"></mu-text-field>
        <mu-text-field v-model="propMap.maxlength" type="number" label="最大输入长度"></mu-text-field>
        <mu-text-field v-model="propMap.minlength" type="number" label="最小输入长度"></mu-text-field>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.showWordLimit" label="是否显示输入字数统计" ></mu-switch>
        </div>
        <mu-text-field v-model="propMap.placeholder" label="输入框占位文本"></mu-text-field>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.clearable" label="是否可清空" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.showPassword" label="是否显示切换密码图标" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.disabled" label="是否禁用" ></mu-switch>
        </div>
        <div class="prop-var-box">
            <EleIconSelect @change="onPrefixIconSelected" :label="'前缀图标'" :icon="propMap.prefixIcon" />
        </div>
        <div class="prop-var-box">
            <EleIconSelect @change="onSuffixIconSelected" :label="'后缀图标'" :icon="propMap.suffixIcon" />
        </div>
        <mu-text-field v-model="propMap.rows" type="number" label="Textarea 输入框行数"></mu-text-field>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.autosize" label="Textarea 自适应内容高度" ></mu-switch>
        </div>
        <mu-select label="原生属性，自动补全" v-model="propMap.autocomplete" full-width>
            <mu-option label="on" value="on"></mu-option>
            <mu-option label="off" value="off"></mu-option>
        </mu-select>
    </div>
</template>

<script>
import EleIconSelect from '@/views/design/tag-editor/common/EleIconSelect.vue'
import { hyphenate, createAttrs } from '@/views/design/tag-editor/helper/propsHelper.js'

const defaultMap = {
    maxlength:null,
    minlength:null,
    showWordLimit:false,
    clearable:false,
    showPassword:false,
    disabled:false,
    rows:2,
    autosize:false,
    autocomplete:'off',
}

const bindArr = [
    'maxlength',
    'minlength',
    'showWordLimit',
    'clearable',
    'showPassword',
    'disabled',
    'rows',
    'autosize',
]

export default {
    data(){
        if(this.node['x-props'] && JSON.stringify(this.node['x-props']) != '{}'){
            return Object.assign({}, this.node['x-props'])
        }
        return{
            propMap: {
                type:'',
                size:'',
                vModel:this.node.attrsMap['v-model'],
                maxlength:null,
                minlength:null,
                showWordLimit:false,
                placeholder:this.node.attrsMap['placeholder'] || '',
                clearable:false,
                showPassword:false,
                disabled:false,
                prefixIcon:'',
                suffixIcon:'',
                rows:2,
                autosize:false,
                autocomplete:'off'
            }
        }
    },
    props:{
        node:{}
    },
    components:{
        EleIconSelect
    },
    methods:{
        onPrefixIconSelected(value){
            this.propMap.prefixIcon = value
        },
        onSuffixIconSelected(value){
            this.propMap.suffixIcon = value
        }
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

<style>

</style>