<template>
    <div>
        <mu-text-field v-model="propMap.vModel" label="绑定变量"></mu-text-field>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.disabled" label="是否禁用" ></mu-switch>
        </div>
        <mu-text-field v-model="propMap.width" suffix="px" type="number" label="switch 的宽度（像素）"></mu-text-field>
        <div class="prop-var-box">
            <EleIconSelect label="switch 打开图标" @change="onActiveIconSelected" :icon="propMap.activeIconClass" />
        </div>
        <div class="prop-var-box">
            <EleIconSelect label="switch 关闭图标" @change="onInactiveIconSelected" :icon="propMap.inactiveIconClass" />
        </div>
        <mu-text-field v-model="propMap.activeValue" label="switch 打开时的值"></mu-text-field>
        <mu-text-field v-model="propMap.inactiveValue" label="switch 关闭时的值"></mu-text-field>

        <div style="margin:5px 0px">
            <span style="line-height: 40px;margin-right:10px;position: relative;left: 0px;top: -10px;"> switch 打开时的背景色 </span>
            <el-color-picker show-alpha size="mini" v-model="propMap.activeColor" ></el-color-picker>
        </div>
        <div style="margin:5px 0px">
            <span style="line-height: 40px;margin-right:10px;position: relative;left: 0px;top: -10px;"> switch 关闭时的背景色 </span>
            <el-color-picker show-alpha size="mini" v-model="propMap.inactiveColor" ></el-color-picker>
        </div>
    </div>
</template>

<script>
import EleIconSelect from '@/views/design/tag-editor/common/EleIconSelect.vue'
import { hyphenate, createAttrs } from '@/views/design/tag-editor/helper/propsHelper.js'

const defaultMap = {
    disabled:false,
    width:40,
    activeValue:true,
    inactiveValue:false,
    activeColor:'#409EFF',
    inactiveColor:'#C0CCDA'
}
const bindArr = [
    'disabled','width','activeValue','inactiveValue'
]

export default {
    data(){
        if(this.node['x-props'] && JSON.stringify(this.node['x-props']) != '{}'){
            return Object.assign({}, this.node['x-props'])
        }
        return{
            propMap: {
                vModel:this.node.attrsMap['v-model'],
                disabled:false,
                width:40,
                activeIconClass:'',
                inactiveIconClass:'',
                activeText:'',
                inactiveText:'',
                activeValue:true,
                inactiveValue:false,
                activeColor:'#409EFF',
                inactiveColor:'#C0CCDA'
            }
        }
    },
    components:{
        EleIconSelect
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
    methods:{
        onActiveIconSelected(value){
            this.propMap.activeIconClass = value
        },
        onInactiveIconSelected(value){
            this.propMap.inactiveIconClass = value
        }
    }
}
</script>