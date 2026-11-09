<template>
    <div>
        <el-tree :style='{"overflow": "auto"}'
            ref="xtree"
            :data="distAst"
            node-key="id"
            @node-click="onNodeClick"
            :expand-on-click-node="false"
            :default-expand-all="false"
            :highlight-current="true"
            :default-expanded-keys="[1]"
            draggable
            :check-strictly="false" >
            <span class="custom-tree-node" slot-scope="{ node, data }" @keyup.delete="remove(node, data, false)" tabindex="0">
                <span>{{ node.label }}</span>
                <span>
                    <el-button v-if="node.level != 1"
                        type="text"
                        size="mini"
                        title="复制"
                        icon="el-icon-document-copy"
                        style="color:orange;"
                        @click.stop="() => copyNode(node, data)">
                    </el-button>
                    <el-button v-if="node.level != 1"
                        type="text"
                        size="mini"
                        title="删除"
                        icon="el-icon-delete"
                        style="color:red;"
                        @click.stop="() => remove(node, data, true)">
                    </el-button>
                </span>
            </span>
        </el-tree>
    </div>
</template>

<script>
import { buildDistAst,nextId } from '@/helpers/AstHelper.js'
import Message from 'muse-ui-message';

export default {
    data() {
      return {
          distAst:[],
          idIndex:0
      }
    },
    props: {
      ast: {
        type: Object,
        default: function() {
          return {}
        }
      },
      editNode:{
        type: Object,
        default: function() {
          return {}
        }
      }
    },
    watch:{
        ast(newVal, oldVal){
            this.distAst = []
            let temp = buildDistAst({}, newVal, this.idIndex)
            this.distAst.push(temp.dist)
            this.idIndex = 0;
        },
        editNode:{
            handler(newVal,oldVal){
                if(JSON.stringify(newVal) != '{}'){
                    let node = this.findNodeById(newVal.id, this.distAst)
                    if(!node){
                        return
                    }
                    node.tag = newVal.tag
                    node.attrsMap = newVal.attrsMap
                    node.attrsMap = newVal.attrsMap
                    node.customAttrs = newVal.customAttrs
                    node.mockMap = newVal.mockMap
                    node['x-css'] = newVal['x-css']
                    node['x-props'] = newVal['x-props']
                    if(node.text){
                        node.text = newVal.text
                        node.textBindVar = newVal.textBindVar
                        node.textMockVal = newVal.textMockVal
                    }
                }
            },
            deep:true
        },
        distAst:{
            deep:true,
            handler(newVal){
                this.$store.dispatch('updateContextCompAst', this.distAst[0])
            }
        }
    },
    methods:{
        findNodeById(nodeId, tree){
            let node = null
            tree.some(item => {
                if(item.id == nodeId) {
                    node = item
                    return true
                } else if(item.children && item.children.length > 0){
                    node = this.findNodeById(nodeId, item.children)
                    if(node != null){
                        return true
                    }
                }
            })
            return node
        },
        remove(node, data, needConfirm) {
            if(!needConfirm && node.level != 1){
                this.$refs.xtree.remove(node)
                return
            }
            //弹窗确认
            Message.confirm(`此操作将永久删除【${node.label}】节点，是否继续?`, '警告', {
                width:'500',
                type: 'warning'
            }).then(({ result }) => {
                if(result && node.level != 1){
                    this.$refs.xtree.remove(node)
                } else {
                    this.$toast.message('取消删除');
                }
            }).catch(() => {
                this.$toast.error('操作异常');
            })
        },
        onNodeClick(data, node, event) {
            this.$emit('onNodeClick', data)
        },
        copyNode(node, data){
            const newData = JSON.parse(JSON.stringify(data))
            newData.id = nextId(this.distAst[0]) + 1
            this.$refs.xtree.append(newData, node.parent)
        }
    }
}
</script>

<style>

</style>