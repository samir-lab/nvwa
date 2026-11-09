<template>
    <div>
        <mu-tooltip content="Mock数据">
            <i class="el-icon-edit" style="font-size:20px;cursor:pointer;" @mouseover="onMouseOver"></i>
        </mu-tooltip>
        <div class="mock-data-editor" v-if="show" >
            <div style="font-weight:bold;display:inline-block;">Mock数据</div>
            <div style="float:right;display:inline-block;" @click="onClose">
                <i class="el-icon-close" style="font-size:18px;font-weight:bold;cursor:pointer;"></i>
            </div>
            <div style="width:100%;height:96%;">
                <textarea  class="mock-data-editor-input" v-model="value" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            value:'',
            show:false
        }
    },
    props:{
        data:''
    },
    created(){
        
    },
    methods:{
        onClose(){
            this.show = false
            this.$emit('change', this.value)
        },
        onMouseOver(){
            this.show = true
            if(this.data){
                this.value = this.data
            }
        }
    }
}
</script>

<style>
.mock-data-editor{
    width: 350px;
    height: 70%;
    background:#FFFFFF;
    position: absolute;
    top:90px;
    padding: 13px;
    border-radius: 3px;
    border:1px solid gray;
    left:-350px;
    z-index: 9999;
}
.mock-data-editor-input{
    background:#1E1E1E;
    width: 100%;
    height: 100%;
    color:#F08020;
    border:none;
    border-radius: 3px;
    outline:none;
    padding: 5px;
}
</style>