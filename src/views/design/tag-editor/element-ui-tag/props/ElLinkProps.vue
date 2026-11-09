<template>
    <div>
        <div>
            <mu-select label="类型" v-model="propMap.type" full-width>
                <mu-option label="normal" value=""></mu-option>
                <mu-option label="primary" value="primary"></mu-option>
                <mu-option label="success" value="success"></mu-option>
                <mu-option label="warning" value="warning"></mu-option>
                <mu-option label="danger" value="danger"></mu-option>
                <mu-option label="info" value="info"></mu-option>
            </mu-select>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.underline" label="是否下划线" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.disabled" label="是否禁用状态" ></mu-switch>
        </div>
        <mu-text-field v-model="propMap.href" label="原生 href 属性"></mu-text-field>
        <div>
            <mu-select label="原生 target 属性" v-model="propMap.target" full-width>
                <mu-option label="unset" value=""></mu-option>
                <mu-option label="_blank" value="_blank"></mu-option>
                <mu-option label="_self" value="_self"></mu-option>
                <mu-option label="_parent" value="_parent"></mu-option>
                <mu-option label="_top" value="_top"></mu-option>
            </mu-select>
        </div>
        <div class="prop-var-box">
            <EleIconSelect @change="onIconSelected" :icon="propMap.icon" />
        </div>
    </div>
</template>

<script>
import EleIconSelect from '@/views/design/tag-editor/common/EleIconSelect.vue'
import { hyphenate, createAttrs } from '@/views/design/tag-editor/helper/propsHelper.js'

const defaultMap = {
    underline: true,
    disabled: false
}

const bindArr = ['underline','disabled']

export default {
    data(){
        if(this.node['x-props'] && JSON.stringify(this.node['x-props']) != '{}'){
            return Object.assign({}, this.node['x-props'])
        }
        return{
            propMap: {
                type:'',
                underline: true,
                disabled: false,
                href: '',
                target: '',
                icon: ''
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
        onIconSelected(value){
            this.propMap.icon = value
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
    },
}
</script>

<style>

</style>