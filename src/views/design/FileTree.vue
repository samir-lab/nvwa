<template>
    <div style="padding:10px">
        <xDir :forceHideFilterBox="true"
            @onNodeClick="onNodeClick" 
            :data="resTreeData" 
            @onTreeRefresh="onTreeRefresh" 
            @onNodeDelete="onNodeDelete"
            @onNodeAdded="onNodeAdded"
            @onNodeEdit="onNodeEdit" >
        </xDir>
    </div>
</template>

<script>
import xDir from './xDir'
export default {
    data(){
        return{
            resTreeData: []
        }
    },
    components:{
        xDir
    },
    created() {
        this.initResTree()
    },
    methods:{
        initResTree(){
            if(localStorage.fileTree){
                this.resTreeData = JSON.parse(localStorage.fileTree)
            }
            if(!this.resTreeData || this.resTreeData.length == 0){
                this.resTreeData = [{
                    id: 1,
                    label: 'views',
                    children: []
                }]
            }
        },
        onTreeRefresh(){
            this.initResTree()
        },
        onNodeClick(data, node){
            this.$store.dispatch('updateCurrentPage', data.label)
        },
        onNodeAdded(data){
            this.resTreeData = data
            this.$store.dispatch('updateFileTree', data)
        },
        onNodeDelete(data){
            this.resTreeData = data.newTree
            this.$store.dispatch('updateFileTree', data.newTree)
            this.$store.dispatch('delPageSetting', data.delNode.label)
            this.$store.dispatch('updateCurrentPage', '')
        },
        onNodeEdit(args){
            this.resTreeData = args.newTree
            this.$store.dispatch('updateFileTree', args.newTree)
            // 更新 state.pages & state.currentPage
            if(args.oldLabel.indexOf('.vue') > -1) {
                this.$store.dispatch('renamePageSetting', args)
                this.$store.dispatch('updateCurrentPage', args.newLabel)
            }
        }
    }
}
</script>

<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    outline: none;
}
</style>