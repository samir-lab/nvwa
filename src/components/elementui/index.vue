<template>
    <div style="padding:10px 10px 100px 10px;">
        <div v-for="(comp, index) in comps" :key="index">
            <span class="group-desc">♘ {{comp.desc}}</span>
            <mu-divider></mu-divider>
            <p class="drag-box" draggable="true" @dragstart="dragstart($event, comp)">
                <TplComp :html="comp.tpl" :dataScope="comp.data" />
            </p>
        </div>
    </div>
</template>

<script>
import complist from './complist'
export default {
    name:"element-ui-list",
    data() {
        return {
            comps: complist
        }
    },
    methods:{
        dragstart(event, comp){
            event.dataTransfer.setData("_html", comp.tpl);
            if(comp.data){
                event.dataTransfer.setData("_dataScope", JSON.stringify(comp.data));
            }
        }
    }
}
</script>

<style>
.group-desc {
    color:#00509D;
    font-weight: bold;
}
.drag-box{
    user-select: none;
}
.drag-box:hover{
    cursor:grab
}
.drag-box:active{
    cursor:grabbing;
}
</style>