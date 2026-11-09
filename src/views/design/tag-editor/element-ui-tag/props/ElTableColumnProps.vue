<template>
    <div>
        <div>
            <mu-text-field v-model="propMap.label" label="字段标题" ></mu-text-field>
            <mu-text-field v-model="propMap.prop" label="字段名" ></mu-text-field>
            <mu-tooltip placement="left" content="表头对齐方式，若不设置该项，则使用表格的对齐方式">
                <mu-select label="表头对齐方式" v-model="propMap.headerAlign" full-width >
                    <mu-option label="unset" value=""></mu-option>
                    <mu-option label="left" value="left"></mu-option>
                    <mu-option label="center" value="center"></mu-option>
                    <mu-option label="right" value="right"></mu-option>
                </mu-select>
            </mu-tooltip>
            <mu-tooltip placement="left" content="内容对齐方式">
                <mu-select label="内容对齐方式" v-model="propMap.align" full-width >
                    <mu-option label="left" value="left"></mu-option>
                    <mu-option label="center" value="center"></mu-option>
                    <mu-option label="right" value="right"></mu-option>
                </mu-select>
            </mu-tooltip>
            <mu-tooltip placement="left" content="对应列的类型。如果设置了 selection 则显示多选框；如果设置了 index 则显示该行的索引（从 1 开始计算）；如果设置了 expand 则显示为一个可展开的按钮">
                <mu-select label="类型" v-model="propMap.type" full-width >
                    <mu-option label="unset" value=""></mu-option>
                    <mu-option label="selection" value="selection"></mu-option>
                    <mu-option label="index" value="index"></mu-option>
                    <mu-option label="expand" value="expand"></mu-option>
                </mu-select>
            </mu-tooltip>
            <mu-tooltip placement="left" content="column 的 key，如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件">
                <mu-text-field v-model="propMap.columnKey" label="列标识（用于过滤选项）"></mu-text-field>
            </mu-tooltip>
            <mu-text-field v-model="propMap.width" label="列宽" ></mu-text-field>
            <mu-text-field v-model="propMap.minWidth" label="最小列宽" ></mu-text-field>
            <mu-tooltip placement="left" content="列是否固定在左侧或者右侧">
                <mu-select label="固定位置" v-model="propMap.fixed" full-width >
                    <mu-option label="unset" value=""></mu-option>
                    <mu-option label="left" value="left"></mu-option>
                    <mu-option label="right" value="right"></mu-option>
                </mu-select>
            </mu-tooltip>
            <div style="margin:5px 0px">
                <mu-tooltip placement="left" content="对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件">
                    <mu-select label="排序" v-model="propMap.sortable" full-width >
                        <mu-option label="custom" value="'custom'"></mu-option>
                        <mu-option label="true" value="true"></mu-option>
                        <mu-option label="false" value="false"></mu-option>
                    </mu-select>
                </mu-tooltip>
            </div>
            <div style="margin:5px 0px">
                <mu-tooltip placement="left" content="对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）">
                    <mu-switch v-model="propMap.resizable" label="可改变列宽" ></mu-switch>
                </mu-tooltip>
            </div>
            <div style="margin:5px 0px">
                <mu-tooltip placement="left" content="当内容过长被隐藏时显示 tooltip">
                    <mu-switch v-model="propMap.showOverflowTooltip" label="Tooltip提示" ></mu-switch>
                </mu-tooltip>
            </div>
            <mu-tooltip placement="left" content="列的 className">
                <mu-text-field v-model="propMap.className" label="列样式名"></mu-text-field>
            </mu-tooltip>
            <mu-tooltip placement="left" content="当前列标题的自定义类名">
                <mu-text-field v-model="propMap.labelClassName" label="列标题样式名"></mu-text-field>
            </mu-tooltip>
        </div>
    </div>
</template>

<script>
import { hyphenate, createAttrs } from '@/views/design/tag-editor/helper/propsHelper.js'


const defaultMap = {
    resizable:true,
    showOverflowTooltip:false,
    align:'left',
    sortable:false
}

const bindArr = ['resizable','showOverflowTooltip','sortable']

export default {
    data(){
        if(this.node['x-props'] && JSON.stringify(this.node['x-props']) != '{}'){
            return Object.assign({}, this.node['x-props'])
        }
        return{
            propMap:{
                type:'',
                columnKey:'',
                label:this.node.attrsMap['label'] || '',
                prop:this.node.attrsMap['prop'] || '',
                width:'',
                minWidth:'',
                fixed:'',
                sortable:false,
                resizable:true,
                showOverflowTooltip:false,
                align:'left',
                headerAlign:'',
                className:'',
                labelClassName:'',
            }
        }
    },
    props:{ 
        node:{}
    },
    created(){
        
    },
    watch:{
        propMap:{
            deep:true,
            handler(val){
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