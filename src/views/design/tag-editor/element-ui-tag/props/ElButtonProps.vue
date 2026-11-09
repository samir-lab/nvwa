<template>
    <div>
        <div>
            <div>
                <mu-select label="尺寸" v-model="propMap.size" full-width>
                    <mu-option label="normal" value=""></mu-option>
                    <mu-option label="medium" value="medium"></mu-option>
                    <mu-option label="small" value="small"></mu-option>
                    <mu-option label="mini" value="mini"></mu-option>
                </mu-select>
            </div>
            <div>
                <mu-select label="类型" v-model="propMap.type" full-width>
                    <mu-option label="normal" value=""></mu-option>
                    <mu-option label="primary" value="primary"></mu-option>
                    <mu-option label="success" value="success"></mu-option>
                    <mu-option label="warning" value="warning"></mu-option>
                    <mu-option label="danger" value="danger"></mu-option>
                    <mu-option label="info" value="info"></mu-option>
                    <mu-option label="text" value="text"></mu-option>
                </mu-select>
            </div>
            <div class="prop-var-box">
                <EleIconSelect @change="onIconSelected" :icon="propMap.icon" />
            </div>
            <div style="margin:5px 0px">
                <mu-switch v-model="propMap.plain" label="朴素" ></mu-switch>
            </div>
            <div style="margin:5px 0px">
                <mu-switch v-model="propMap.round" label="圆角" ></mu-switch>
            </div>
            <div style="margin:5px 0px">
                <mu-switch v-model="propMap.circle" label="圆形" ></mu-switch>
            </div>
            <div style="margin:5px 0px">
                <mu-switch v-model="propMap.loading" label="加载" ></mu-switch>
            </div>
            <div style="margin:5px 0px">
                <mu-switch v-model="propMap.disabled" label="禁用" ></mu-switch>
            </div>
        </div>
    </div>
</template>

<script>
import EleIconSelect from '@/views/design/tag-editor/common/EleIconSelect.vue'
import { hyphenate, createAttrs } from '@/views/design/tag-editor/helper/propsHelper.js'

const defaultMap = {
    plain: false,
    round:  false, 
    circle:  false, 
    loading:  false, 
    disabled:  false,
}

const bindArr = [
    'plain',
    'round', 
    'circle', 
    'loading', 
    'disabled',
]

export default {
    data(){
        if(this.node['x-props'] && JSON.stringify(this.node['x-props']) != '{}'){
            return Object.assign({}, this.node['x-props'])
        }
        return{
            propMap:{
                size: this.node.attrsMap['size'] || '',
                type: this.node.attrsMap['type'] || '',
                plain: this.node.attrsMap[':plain'] || false,
                round:  this.node.attrsMap[':round'] || false, 
                circle:  this.node.attrsMap[':circle'] || false, 
                loading:  this.node.attrsMap[':loading'] || false, 
                disabled:  this.node.attrsMap[':disabled'] || false,
                icon:this.node.attrsMap['icon'] || ''
            }
        }
    },
    props:{
        node:{}
    },
    components:{
        EleIconSelect
    },
    created(){
        
    },
    watch:{
        propMap:{
            handler(newVal,oldVal){
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
            },
            deep:true
        }
    },
    methods:{
        onIconSelected(value){
            this.propMap.icon = value
        }
    }
}
</script>

<style>
</style>