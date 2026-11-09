<template>
    <div style="width:100%;height:100%">
        <MonacoEditor
            theme="vs-dark"
            language="html"
            :options="options"
            @change="onChange"
            :value="code" >
        </MonacoEditor>
    </div>
</template>

<script>
import MonacoEditor from '@/components/common/MonacoEditor.vue';
export default {
    data(){
        return{
            code:'<template></template>',
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
                this.code = this.$prettyHtml(`${page.code || ''}`)
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