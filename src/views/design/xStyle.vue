<template>
    <div style="width:100%;height:100%">
        <MonacoEditor
            theme="vs-dark"
            language="css"
            :options="options"
            @change="onChange"
            :value="warpCode" >
        </MonacoEditor>
    </div>
</template>

<script>
import MonacoEditor from '@/components/common/MonacoEditor.vue';
export default {
    data(){
        return{
            style:'.default{}',
            options: {
                //Monaco Editor Options
            }
        }
    },
    created(){
        this.init()
    },
    components:{
        MonacoEditor
    },
    computed:{
        warpCode(){
            return this.$prettyCss(this.style)
        }
    },
    watch:{
        '$store.state.currentPage'(newVal,oldVal){
            this.init()
        }
    },
    methods: {
        init(){
            if(localStorage.currentPage && localStorage.pages && JSON.parse(localStorage.pages)[localStorage.currentPage]){
                let page = JSON.parse(localStorage.pages)[localStorage.currentPage]
                if(page.style){
                    this.style = page.style
                }
            }
        },
        onChange(value) {
            //console.log(value);
        }
    }
}
</script>

<style>

</style>