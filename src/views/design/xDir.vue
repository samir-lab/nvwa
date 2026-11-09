<template>
  <div>
    <span v-if="title && title != ''">{{ title }}</span>
    <hr v-if="title && title != ''" />
    <el-input v-if="(showAddRootBtn || showSaveBtn || showRefreshBtn) && !forceHideFilterBox" size="mini" placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    <p v-if="(showAddRootBtn || showSaveBtn || showRefreshBtn) && !forceHideFilterBox"/>
    <el-button type="primary" size="mini" icon="el-icon-document-add" @click="onAddRootNode" v-show="showAddRootBtn">添加根节点</el-button>
    <el-button type="primary" size="mini" icon="el-icon-coin" @click="onSaveTree"  v-show="showSaveBtn">保存</el-button>
    <el-button type="primary" size="mini" icon="el-icon-refresh" @click="onTreeRefresh" v-show="showRefreshBtn">刷新</el-button>
    <el-tree :style='{"overflow": "auto","height": treeHeight}'
      ref="xtree"
      :data="data"
      :show-checkbox="showCheckBox"
      node-key="id"
      @node-click="onNodeClick"
      :default-expand-all="defaultExpandAll"
      :filter-node-method="filterNode"
      :highlight-current="true"
      :expand-on-click-node="expandOnClickNode"
      :check-on-click-node="checkOnClickNode"
      :default-checked-keys="defaultCheckedKeys"
      draggable
      @check="onCheck"
      :check-strictly="false"
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span v-show="showCustomTreeNode">
          <el-button v-if="(node.label != 'views')"
            type="text"
            size="mini"
            icon="el-icon-edit"
            title="编辑"
            @click="() => edit(node, data)">
          </el-button>
          <el-button v-if="(node.label.indexOf('.vue') < 0)"
            type="text"
            size="mini"
            icon="el-icon-document-add"
            title="添加子项"
            style="color:rgb(26, 146, 26)"
            @click="() => append(node, data)" >
          </el-button>
          <el-button v-if="(node.label != 'views')"
            type="text"
            size="mini"
            title="删除"
            icon="el-icon-delete"
            style="color:red;"
            @click="() => remove(node, data)">
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<style>

</style>


<script>
  import Message from 'muse-ui-message';
  export default {
    data() {
      return {
        filterText:''
      }
    },
    props: {
      title: {
        type: String,
      },
      treeHeight:{
        type: String,
        default:function(){
          return ''
        }
      },
      data: {
        type: Array,
        default: function() {
          return []
        }
      },
      showCustomTreeNode:{
        type: Boolean,
        default :function(){
          return true
        }
      },
      showAddRootBtn:{
        type: Boolean,
        default :function(){
          return false
        }
      },
      forceHideFilterBox:{
        type: Boolean,
        default :function(){
          return false
        }
      },
      showSaveBtn:{
        type: Boolean,
        default :function(){
          return false
        }
      },
      showRefreshBtn:{
        type: Boolean,
        default :function(){
          return false
        }
      },
      defaultExpandAll:{
        type: Boolean,
        default :function(){
          return true
        }
      },
      showCheckBox:{
        type: Boolean,
        default :function(){
          return false
        }
      },
      defaultCheckedKeys:{
        type: Array,
        default:function(){
          return []
        }
      },
      expandOnClickNode:{
        type : Boolean,
        default: function(){
          return false
        }
      },
      checkOnClickNode:{
        type : Boolean,
        default: function(){
          return false
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.xtree.filter(val)
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      append(node,data) {
        let self = this
        Message.prompt('请输入文件或目录名', '提示', {
          validator (value) {
            return {
              valid: value && /^[a-zA-Z0-9]+/.test(value),
              message: '输入不能为空，且只能包含字母和数字！'
            }
          }
        }).then(({ result, value }) => {
          if (result) {
            if(self.findNodeByLabel(self.data, value.trim())){
              self.$toast.error('文件或目录名已存在！');
              return
            }
            let nextId = self.getNextId(self.data[0]) + 1
            let newChild = { id: nextId, parentId: data.id, label: value.trim(), children: [] }
            self.$refs.xtree.append(newChild, data)
            self.$emit('onNodeAdded',JSON.parse(JSON.stringify(self.data)))
          } else {
            self.$toast.message('已取消');
          }
        });
      },
      findNodeByLabel(data, label){
        let node = null
        data.some(item => {
          if(item.label == label) {
            node = item
            return true
          } else if(item.children && item.children.length > 0){
            node = this.findNodeByLabel(item.children, label)
            if(node != null){
              return true
            }
          }
        })
        return node
      },
      getNextId(data){
        let id = data.id
        if(data.children && data.children.length > 0){
          data.children.forEach(e => {
            let cid = this.getNextId(e)
            if(cid > id){
              id = cid
            }
          });
        }
        return id;
      },
      edit(node,data){
        let self = this
        Message.prompt('请输入文件或目录名', '提示', {
          inputValue: node.label,
          validator (value) {
            return {
              valid: value && /^[a-zA-Z0-9]+/.test(value),
              message: '输入不能为空，且只能包含字母和数字，文件必须以.vue结尾！'
            }
          }
        }).then(({ result, value }) => {
          if (result) {
            if(node.label.indexOf(".vue") != -1 && value.indexOf(".vue") == -1){
              self.$toast.error('文件不可更改为目录，文件必须以.vue结尾');
              return
            }
            if(self.findNodeByLabel(self.data, value.trim())){
              self.$toast.error('文件或目录名已存在！');
              return
            }
            if(node.label == value){
              self.$toast.message('未修改');
              return
            }
            let oldLabel =  node.label
            this.resetLabel(data, value.trim())
            let args = {oldLabel: oldLabel, newLabel:value.trim(), newTree: JSON.parse(JSON.stringify(self.data))}
            self.$emit('onNodeEdit', args)
          } else {
            self.$toast.message('已取消');
          }
        });
      },
      resetLabel(nodeData, value){
        let node = this.findNodeById(this.data, nodeData.id)
        node.label = value
      },
      findNodeById(data, id){
        let node = null
        data.some(item => {
          if(item.id == id) {
            node = item
            return true
          } else if(item.children && item.children.length > 0){
            node = this.findNodeById(item.children, id)
            if(node != null){
              return true
            }
          }
        })
        return node
      },
      remove(node, data) {
        //弹窗确认
        Message.confirm(`此操作将永久删除【${node.label}】节点，是否继续?`, '警告', {
          width:'500',
          type: 'warning'
        }).then(({ result }) => {
          if(result){
            if(!data || (data.children && data.children.length > 0)){
                this.$toast.error("该节点存在子节点,不可直接删除!")
            } else {
                this.$refs.xtree.remove(node)
                this.$emit('onNodeDelete',{delNode:node,newTree:JSON.parse(JSON.stringify(this.data))})
            }
          } else {
            this.$toast.message('已取消删除');
          }
        }).catch(() => {
          this.$toast.error('操作异常');
        })
      },
      onSaveTree(){
        let keys = []
        // this.$refs.xtree.getHalfCheckedKeys().map(key => {
        //   keys.push(key)
        // })
        this.$refs.xtree.getCheckedKeys().map(key => {
          keys.push(key)
        })
        this.$emit('onSaveTree',keys)
      },
      onCheck(){
        let keys = []
        this.$refs.xtree.getCheckedKeys().map(key => {
          keys.push(key)
        })
        this.$emit('onTreeNodeChecked',keys)
      },
      onAddRootNode(){
        // const rootNode = { id: , parentId: 0, label: 'new', children: [] }
        // this.$refs.xtree.append(rootNode)
      },
      onNodeClick(data,node,event){
        if(!data.label || data.label.indexOf('.vue') < 0){
            return
        }
        this.$emit('onNodeClick',data,node)
      },
      onTreeRefresh(){
        this.$emit('onTreeRefresh')
      },
      //--- 拖动事件 start ---//
      handleDragStart(node, ev) {
        
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        
      },
      handleDragOver(draggingNode, dropNode, ev) {
        
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        //console.log('onNodeDrop')
      },
      allowDrop(draggingNode, dropNode, type) {
        return false
      },
      allowDrag(draggingNode) {
        return false
      }
      //--- 拖动事件 end ---//

    }
  }
</script>




