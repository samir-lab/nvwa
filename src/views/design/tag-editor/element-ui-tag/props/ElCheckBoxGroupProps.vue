<template>
    <div>
        <div style="width:80%;display:inline-block;margin-right:5px;">
            <mu-text-field style="width:100%;"  v-model="propMap.vModel" label="绑定变量"></mu-text-field>
        </div>
        &nbsp;
        <div style="display:inline-block;">
            <MockEditor @change="onDataMock" :data="node.mockMap ? (JSON.stringify(node.mockMap[propMap.vModel]) || '[]') : '[]'" />
        </div>
        <mu-tooltip placement="left" content="多选框组尺寸，仅对按钮形式的 Checkbox 或带有边框的 Checkbox 有效">
            <mu-select label="尺寸" v-model="propMap.size" full-width>
                <mu-option label="normal" value=""></mu-option>
                <mu-option label="medium" value="medium"></mu-option>
                <mu-option label="small" value="small"></mu-option>
                <mu-option label="mini" value="mini"></mu-option>
            </mu-select>
        </mu-tooltip>
        <mu-text-field v-model="propMap.min" type="number" label="可勾选 checkbox 最小数量"></mu-text-field>
        <mu-text-field v-model="propMap.max" type="number" label="可勾选 checkbox 最大数量"></mu-text-field>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.disabled" label="是否禁用" ></mu-switch>
        </div>
        <mu-tooltip placement="left" content="按钮形式的 Checkbox 激活时的文本颜色">
            <div style="margin:15px 0px;">
                <span style="line-height: 40px;margin-right:10px;position: relative;left: 0px;top: -10px;"> 文本颜色 </span>
                <el-color-picker show-alpha size="mini" v-model="propMap.textColor" ></el-color-picker>
            </div>
        </mu-tooltip>
        <mu-tooltip placement="left" content="按钮形式的 Checkbox 激活时的填充色和边框色">
            <div style="margin:15px 0px;">
                <span style="line-height: 40px;margin-right:10px;position: relative;left: 0px;top: -10px;"> 填充色和边框色 </span>
                <el-color-picker show-alpha size="mini" v-model="propMap.fill" ></el-color-picker>
            </div>
        </mu-tooltip>
        <mu-tooltip placement="left" content="多选框组尺寸，仅对按钮形式的 Checkbox 或带有边框的 Checkbox 有效">
            <mu-select label="尺寸" v-model="propMap.size" full-width>
                <mu-option label="normal" value=""></mu-option>
                <mu-option label="medium" value="medium"></mu-option>
                <mu-option label="small" value="small"></mu-option>
                <mu-option label="mini" value="mini"></mu-option>
            </mu-select>
        </mu-tooltip>
    </div>
</template>

<script>
import { hyphenate, createAttrs } from '@/views/design/tag-editor/helper/propsHelper.js'
import MockEditor from '@/views/design/tag-editor/common/MockEditor.vue'

const defaultMap = {
    disabled:false,
    textColor:'#ffffff',
    fill:'#409EFF',
    min:null,
    max:null
}

const bindArr = [
    'disabled','min','max'
]

export default {
    data(){
        if(this.node['x-props'] && JSON.stringify(this.node['x-props']) != '{}'){
            return Object.assign({}, this.node['x-props'])
        }
        return{
            propMap: {
                size:this.node.attrsMap['size'] || '',
                vModel:this.node.attrsMap['v-model'] || '',
                disabled:this.node.attrsMap[':disabled'] || false,
                textColor:'#ffffff',
                fill:'#409EFF',
                min:this.node.attrsMap[':min'] || null,
                max:this.node.attrsMap[':max'] || null
            }
        }
    },
    components:{
        MockEditor
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
        setMockMap(key, value){
            let mock = JSON.parse(JSON.stringify(this.node.mockMap || {}))
            mock[key] = value
            this.$set(this.node, 'mockMap', mock)
            this.$set(this.node, 'x-props', this.$data)
        },
        onDataMock(value){
            if(this.propMap.vModel && this.propMap.vModel.trim().length > 0){
                this.setMockMap(this.propMap.vModel, eval(value))
            }
        }
    }
}
</script>