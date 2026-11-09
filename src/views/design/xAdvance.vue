<template>
    <div style="padding:10px;">
        <component v-if="node.tag && node.tag.trim()" v-bind:is="`${tags[node.tag]}Advance`"  :node="node"></component>
        <div v-else style="text-align:center;margin-top:50px;">请选择要编辑的节点！</div>
    </div>
</template>

<script>
import TAG_MAP_HTML from '@/views/design/tag-editor/html-tag/config.js'
import TAG_MAP_ELEMENT_UI from '@/views/design/tag-editor/element-ui-tag/config.js'

export default {
    data(){
        return{
            tags: { ...TAG_MAP_HTML, ...TAG_MAP_ELEMENT_UI }
        }
    },
    props:{
        node:{}
    }
}
</script>