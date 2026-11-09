<template>
    <div>
        <div style="width:80%;display:inline-block;margin-right:5px;">
            <mu-text-field style="width:100%;" v-model="propMap.data" label="数据源" ></mu-text-field>
        </div>
        &nbsp;
        <div style="display:inline-block;">
            <MockEditor @change="onDataMock" :data="node.mockMap ? (JSON.stringify(node.mockMap[propMap.data]) || '') : ''" />
        </div>
        <mu-tooltip placement="left" content="Table 的高度">
            <mu-text-field style="width:100%;" v-model="propMap.height" suffix="px" label="Table的高度" ></mu-text-field>
        </mu-tooltip>
        <mu-tooltip placement="left" content="Table 的最大高度">
            <mu-text-field style="width:100%;" v-model="propMap.maxHeight" suffix="px" label="Table 的最大高度" ></mu-text-field>
        </mu-tooltip>
        <div style="margin:5px 0px">
            <mu-tooltip placement="left" content="是否为斑马纹 table">
                <mu-switch v-model="propMap.stripe" label="斑马纹" ></mu-switch>
            </mu-tooltip>
        </div>
        <div style="margin:5px 0px">
            <mu-tooltip placement="left" content="是否带有纵向边框">
                <mu-switch v-model="propMap.border" label="纵向边框" ></mu-switch>
            </mu-tooltip>
        </div>
        <mu-tooltip placement="left" content="Table 的尺寸">
            <mu-select label="尺寸" v-model="propMap.size" full-width >
                <mu-option label="medium" value="medium"></mu-option>
                <mu-option label="small" value="small"></mu-option>
                <mu-option label="mini" value="mini"></mu-option>
            </mu-select>
        </mu-tooltip>
        <div style="margin:5px 0px">
            <mu-tooltip placement="left" content="列的宽度是否自撑开">
                <mu-switch v-model="propMap.fit" label="自动撑开列" ></mu-switch>
            </mu-tooltip>
        </div>
        <div style="margin:5px 0px">
            <mu-tooltip placement="left" content="是否显示表头">
                <mu-switch v-model="propMap.showHeader" label="显示表头" ></mu-switch>
            </mu-tooltip>
        </div>
        <div style="margin:5px 0px">
            <mu-tooltip placement="left" content="是否要高亮当前行">
                <mu-switch v-model="propMap.highlightCurrentRow" label="高亮当前行" ></mu-switch>
            </mu-tooltip>
        </div>
        <mu-tooltip placement="left" content="为所有行设置一个固定的 className">
            <mu-text-field style="width:100%;" v-model="propMap.rowClassName" label="行的 className" ></mu-text-field>
        </mu-tooltip>
        <mu-tooltip placement="left" content="为所有单元格设置一个固定的 className">
            <mu-text-field style="width:100%;" v-model="propMap.cellClassName" label="单元格的 className" ></mu-text-field>
        </mu-tooltip>
        <mu-tooltip placement="left" content="为所有表头行设置一个固定的 className">
            <mu-text-field style="width:100%;" v-model="propMap.headerRowClassName" label="表头行的 className" ></mu-text-field>
        </mu-tooltip>
        <mu-tooltip placement="left" content="为所有表头单元格设置一个固定的 className">
            <mu-text-field style="width:100%;" v-model="propMap.headerCellClassName" label="表头单元格的 className " ></mu-text-field>
        </mu-tooltip>
        <mu-tooltip placement="left" content="空数据时显示的文本内容，默认为：暂无数据">
            <mu-text-field style="width:100%;" v-model="propMap.emptyText" label="空数据显示的文本" ></mu-text-field>
        </mu-tooltip>
        <mu-tooltip placement="left" content="tooltip effect 属性">
            <mu-select label="Tooltip效果" v-model="propMap.tooltipEffect" full-width >
                <mu-option label="normal" value=""></mu-option>
                <mu-option label="dark" value="dark"></mu-option>
                <mu-option label="light" value="light"></mu-option>
            </mu-select>
        </mu-tooltip>
        <div style="margin:5px 0px">
            <mu-tooltip placement="left" content="是否在表尾显示合计行">
                <mu-switch v-model="propMap.showSummary" label="合计行" ></mu-switch>
            </mu-tooltip>
        </div>
        <mu-tooltip placement="left" content="合计行第一列的文本，默认为：合计">
            <mu-text-field style="width:100%;" v-model="propMap.sumText" label="合计行第一列文本" ></mu-text-field>
        </mu-tooltip>
        <mu-tooltip placement="left" content="显示树形数据时，该属性是必填的">
            <mu-text-field style="width:100%;" v-model="propMap.rowKey" label="行数据的 Key" ></mu-text-field>
        </mu-tooltip>
    </div>
</template>

<script>
import { hyphenate, createAttrs } from '@/views/design/tag-editor/helper/propsHelper.js'
import MockEditor from '@/views/design/tag-editor/common/MockEditor.vue'

const defaultMap = {
    stripe:false,
    border:false,
    fit:true,
    showHeader:true,
    highlightCurrentRow:false,
    showSummary:false,
}
const bindArr = ['data','stripe','border','fit','showHeader','highlightCurrentRow','showSummary']

export default {
    data(){
        if(this.node['x-props'] && JSON.stringify(this.node['x-props']) != '{}'){
            return Object.assign({}, this.node['x-props'])
        }
        return{
            propMap: {
                data:this.node.attrsMap[':data'],
                height:'',
                maxHeight:'',
                stripe:false,
                border:false,
                size:'',
                fit:true,
                showHeader:true,
                highlightCurrentRow:false,
                rowClassName:'',
                cellClassName:'',
                headerRowClassName:'',
                headerCellClassName:'',
                emptyText:'',
                tooltipEffect:'',
                showSummary:false,
                sumText:'',
                rowKey:''
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
            if(this.propMap.data && this.propMap.data.trim().length > 0){
                this.setMockMap(this.propMap.data, eval(value))
            }
        }
    }
}
</script>