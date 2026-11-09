<template>
    <div>
        <TplComp :html="content" :dataScope="dataScope" :methodsScope="methodsScope" ></TplComp>
    </div>
</template>

<script>
export default {
    data(){
        return{
            content:'<div style="width:100%;line-height:100px;text-align:center">暂无内容</div>',
            dataScope:{},
            methodsScope:{}
        }
    },
    created(){
        // TODO 暂时先预览当前编辑页，交互暂不处理，后期优化
        if(localStorage.currentPage && localStorage.pages && JSON.parse(localStorage.pages)[localStorage.currentPage]){
            let page = JSON.parse(localStorage.pages)[localStorage.currentPage];
            this.content = page.code.substring(10, page.code.length - 11)
            page.layout.forEach(element => {
                Object.assign(this.dataScope, element.dataScope)
                Object.assign(this.methodsScope, element.methodsScope)
            });
        }
    }
}
</script>

<style>
</style>