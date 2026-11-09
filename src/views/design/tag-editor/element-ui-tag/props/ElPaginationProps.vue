<template>
    <div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.small" label="小型分页样式" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.background" label="分页按钮添加背景色" ></mu-switch>
        </div>
        <div style="margin:5px 0px">
            <mu-switch v-model="propMap.hideOnSinglePage" label="只有一页时是否隐藏" ></mu-switch>
        </div>
        <mu-text-field v-model="propMap.pageSize" type="number" label="每页显示条目个数"></mu-text-field>
        <mu-text-field v-model="propMap.total" type="number" label="总条目数"></mu-text-field>
        <mu-tooltip placement="left" content="当总页数超过该值时会折叠（大于等于 5 且小于等于 21 的奇数）">
            <mu-text-field v-model="propMap.pagerCount" type="number" label="页码按钮的数量"></mu-text-field>
        </mu-tooltip>
        <mu-text-field v-model="propMap.currentPage" type="number" label="当前页数"></mu-text-field>
        <mu-tooltip placement="left" content="分页功能选项，按选中顺序依次从左到右排列">
            <div style="margin:5px 0px">功能选项</div>
        </mu-tooltip>
        <mu-checkbox style="display:block;width: fit-content;" v-for="item in ['total', 'sizes', 'prev', 'pager', 'next', 'jumper']" :key="item"
            :value="item" v-model="layout" :label="item">
        </mu-checkbox>
        <mu-tooltip placement="left" content="每页显示个数选择器的选项设置">
            <div style="margin:5px 0px">分页选择器设置</div>
        </mu-tooltip>
        <mu-checkbox style="display:block;width: fit-content;height:" v-for="item in [10, 20, 30, 40, 50, 100, 150, 200, 250, 300]" :key="item"
            :value="item" v-model="pageSizes" :label="item + ' 条/页'">
        </mu-checkbox>
    </div>
</template>

<script>
import { hyphenate, createAttrs } from '@/views/design/tag-editor/helper/propsHelper.js'

const defaultMap = {
    small:false,
    background:false,
    pageSize:10,
    pagerCount:7,
    layout:'prev, pager, next',
    pageSizes:"[10, 20, 30, 40, 50, 100]",
    hideOnSinglePage:false
}

const bindArr = ['small','background','pageSize','total','pagerCount',"currentPage","pageSizes", "hideOnSinglePage"]

export default {
    data(){
        if(this.node['x-props'] && JSON.stringify(this.node['x-props']) != '{}'){
            return Object.assign({}, this.node['x-props'])
        }
        return{
            layout:[],
            pageSizes:[10, 20, 30, 40, 50, 100],
            propMap: {
                small:false,
                background:false,
                pageSize:10,
                total:this.node.attrsMap[':total'] || 210,
                pagerCount:7,
                currentPage:1,
                layout:this.node.attrsMap['layout'] || 'prev, pager, next',
                pageSizes:"[10, 20, 30, 40, 50, 100]",
                hideOnSinglePage:false
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
        },
        layout(val){
            this.propMap.layout = val.join(',')
        },
        pageSizes(val){
            let temp = JSON.parse(JSON.stringify(val))
            this.propMap.pageSizes = JSON.stringify(temp.sort((x,y) => {return x - y}))
        },
    },
}
</script>

<style>

</style>