<template>
    <div>
        <mu-text-field v-model="propMap.vModel" label="绑定变量"></mu-text-field>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.readonly" label="完全只读" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.disabled" label="禁用" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.editable" label="文本框可输入" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.clearable" label="是否显示清除按钮" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.isRange" label="是否为时间范围选择" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.arrowControl" label="使用箭头进行时间选择" ></mu-switch>
        </div>
        <mu-select label="输入框尺寸" v-model="propMap.size" full-width>
            <mu-option label="normal" value=""></mu-option>
            <mu-option label="medium" value="medium"></mu-option>
            <mu-option label="small" value="small"></mu-option>
            <mu-option label="mini" value="mini"></mu-option>
        </mu-select>
        <mu-text-field v-model="propMap.placeholder" label="非范围选择时的占位内容"></mu-text-field>
        <mu-text-field v-model="propMap.startPlaceholder" label="范围选择开始日期占位内容"></mu-text-field>
        <mu-text-field v-model="propMap.endPlaceholder" label="范围选择结束日期占位内容"></mu-text-field>
        <mu-tooltip placement="left" content="绑定值的格式。不指定则绑定值为 Date 对象">
            <mu-text-field v-model="propMap.valueFormat" label="绑定值的格式" @mouseover="formatTip = true" @mouseout="formatTip = false"></mu-text-field>
        </mu-tooltip>
        <!-- 直接复制element-ui文档上的表格 -->
        <div v-show="formatTip" style="position:fixed;background:#FFF;top:333px;right:16.6%">
            <table border=1 style="border-collapse: collapse;border-spacing: 1px 1px;border: 2px solid #2196F3;"><thead><tr><th>格式</th><th>含义</th><th>备注</th><th>举例</th></tr></thead><tbody><tr><td><code>yyyy</code></td><td>年</td><td></td><td>2017</td></tr><tr><td><code>M</code></td><td>月</td><td>不补0</td><td>1</td></tr><tr><td><code>MM</code></td><td>月</td><td></td><td>01</td></tr><tr><td><code>W</code></td><td>周</td><td>仅周选择器的 <code>format</code> 可用；不补0</td><td>1</td></tr><tr><td><code>WW</code></td><td>周</td><td>仅周选择器的 <code>format</code> 可用</td><td>01</td></tr><tr><td><code>d</code></td><td>日</td><td>不补0</td><td>2</td></tr><tr><td><code>dd</code></td><td>日</td><td></td><td>02</td></tr><tr><td><code>H</code></td><td>小时</td><td>24小时制；不补0</td><td>3</td></tr><tr><td><code>HH</code></td><td>小时</td><td>24小时制</td><td>03</td></tr><tr><td><code>h</code></td><td>小时</td><td>12小时制，须和 <code>A</code> 或 <code>a</code> 使用；不补0</td><td>3</td></tr><tr><td><code>hh</code></td><td>小时</td><td>12小时制，须和 <code>A</code> 或 <code>a</code> 使用</td><td>03</td></tr><tr><td><code>m</code></td><td>分钟</td><td>不补0</td><td>4</td></tr><tr><td><code>mm</code></td><td>分钟</td><td></td><td>04</td></tr><tr><td><code>s</code></td><td>秒</td><td>不补0</td><td>5</td></tr><tr><td><code>ss</code></td><td>秒</td><td></td><td>05</td></tr><tr><td><code>A</code></td><td>AM/PM</td><td>仅 <code>format</code> 可用，大写</td><td>AM</td></tr><tr><td><code>a</code></td><td>am/pm</td><td>仅 <code>format</code> 可用，小写</td><td>am</td></tr><tr><td><code>timestamp</code></td><td>JS时间戳</td><td>仅 <code>value-format</code> 可用；组件绑定值为<code>number</code>类型</td><td>1483326245000</td></tr><tr><td><code>[MM]</code></td><td>不需要格式化字符</td><td>使用方括号标识不需要格式化的字符 (如  [A] [MM])</td><td>MM</td></tr></tbody></table>
        </div>
        <mu-select label="对齐方式" v-model="propMap.align" full-width>
            <mu-option label="left" value="left"></mu-option>
            <mu-option label="center" value="center"></mu-option>
            <mu-option label="right" value="right"></mu-option>
        </mu-select>
        <mu-text-field v-model="propMap.popperClass" label="TimePicker 下拉框的类名"></mu-text-field>
        <mu-text-field v-model="propMap.rangeSeparator" label="选择范围时的分隔符"></mu-text-field>
        <div class="prop-var-box">
            <EleIconSelect label="头部图标" @change="onPrefixIconSelected" :icon="propMap.prefixIcon" />
        </div>
        <div class="prop-var-box">
            <EleIconSelect label="清空图标" @change="onClearIconSelected" :icon="propMap.clearIcon" />
        </div>
    </div>
</template>

<script>
import EleIconSelect from '@/views/design/tag-editor/common/EleIconSelect.vue'
import { hyphenate, createAttrs } from '@/views/design/tag-editor/helper/propsHelper.js'

const defaultMap = {
    readonly:false,
    disabled:false,
    editable:true,
    clearable:true,
    align:'left',
    rangeSeparator:'-',
    prefixIcon:'el-icon-time',
    clearIcon:'el-icon-circle-close',
    isRange:false,
    arrowControl:false,
}
const bindArr = [
    'readonly','disabled','editable','clearable','isRange','arrowControl'
]

export default {
    data(){
        if(this.node['x-props'] && JSON.stringify(this.node['x-props']) != '{}'){
            return Object.assign({}, this.node['x-props'])
        }
        return{
            formatTip:false,
            propMap: {
                vModel:this.node.attrsMap['v-model'],
                readonly:false,
                disabled:false,
                editable:true,
                clearable:true,
                isRange:false,
                arrowControl:false,
                placeholder:this.node.attrsMap['placeholder'] || '',
                startPlaceholder:'',
                endPlaceholder:'',
                size:'',
                align:'left',
                popperClass:'',
                rangeSeparator:'-',
                valueFormat:'',
                prefixIcon:'el-icon-time',
                clearIcon:'el-icon-circle-close'
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
        onPrefixIconSelected(value){
            this.propMap.prefixIcon = value
        },
        onClearIconSelected(value){
            this.propMap.clearIcon = value
        }
    }
}
</script>