<template>
    <div style="padding:10px;">
        <div v-if="node.tag && node.tag.trim()">
            <component v-bind:is="`${tags[node.tag]}Props`"  :node="node"></component>
            <CustomProps v-if="node.tag.trim() != 'text'" @addCustomProp="addCustomProp" :customProps="node.customAttrs" />
        </div>
        <div v-else style="text-align:center;margin-top:50px;">请选择要编辑的节点！</div>
    </div>
</template>

<script>
import TAG_MAP_HTML from '@/views/design/tag-editor/html-tag/config.js'
import TAG_MAP_ELEMENT_UI from '@/views/design/tag-editor/element-ui-tag/config.js'
import CustomProps from '@/views/design/tag-editor/common/CustomProps.vue'

export default {
    data(){
        return{
            tags: { ...TAG_MAP_HTML, ...TAG_MAP_ELEMENT_UI }
        }
    },
    props:{
        node:{}
    },
    components:{
        CustomProps
    },
    methods:{
        addCustomProp(propsMap){
            this.$set(this.node, 'customAttrs', propsMap)
        }
    },
    watch:{
    }
}
</script>