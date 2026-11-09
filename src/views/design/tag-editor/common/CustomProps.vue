<template>
    <div style="margin-top:15px;">
        自定义属性
        <div v-for="(item,index) in propsMap" :key="index">
            <div style="width:40%;display:inline-block;margin-right:5px;"><mu-text-field v-model="item.key" label="key" ></mu-text-field></div>:
            <div style="width:40%;display:inline-block;"><mu-text-field v-model="item.value" label="value" ></mu-text-field></div>
            <div v-if="index == propsMap.length - 1" style="width:10%;display:inline-block;">
                <mu-button fab small color="teal" @click="onAddProp" style="width:26px;height:26px"><mu-icon value="add"></mu-icon></mu-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            propsMap:[
                { key:'', value:'' }
            ]
        }
    },
    created(){
        this.propsMap = JSON.parse(JSON.stringify(this.customProps || []))
        if(!this.propsMap || this.propsMap.length == 0){
            this.propsMap.push({ key:'', value:'' })
        }
    },
    methods:{
        onAddProp(){
            let val = this.propsMap.some(e => {
                if(!e.key || !e.value || !e.key.trim() || !e.value.trim()){
                    return true
                }
                if(!/^[a-zA-Z]*$/.test(e.key) || !/^[a-zA-Z]*$/.test(e.value)){
                    return true
                }
            })
            if(!val){
                this.propsMap.push({ key:'', value:'' })
            }
        }
    },
    props:{
        customProps:Array
    },
    watch:{
        propsMap:{
            deep:true,
            handler(newVal){  
                let val = newVal.some(e => {
                    if(!e.key || !e.value || !e.key.trim() || !e.value.trim()){
                        return true
                    }
                    if(!/^[a-zA-Z]*$/.test(e.key) || !/^[a-zA-Z]*$/.test(e.value)){
                        return true
                    }
                })
                if(!val){
                    this.$emit('addCustomProp',JSON.parse(JSON.stringify(newVal)))
                }    
            }
        }
    }
}
</script>

<style>

</style>