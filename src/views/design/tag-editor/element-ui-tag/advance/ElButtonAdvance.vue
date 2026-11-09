<template>
    <div>
        <div>
            <div style="width:35%;display:inline-block;margin-right:5px;"><mu-text-field v-model="clickMethod" label="点击事件" ></mu-text-field></div>
            <div style="width:40%;display:inline-block;"><mu-text-field v-model="args" label="参数" prefix="(" suffix=")" ></mu-text-field></div>
            <div style="width:10%;display:inline-block;"></div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            clickMethod:'',
            args:''
        }
    },
    created(){
        if(this.node.attrsMap && this.node.attrsMap['@click']){
            this.clickMethod = this.node.attrsMap['@click']
        }
    },
    props:{
        node:{}
    },
    watch:{
        clickMethod(val, old){
            let attr = JSON.parse(JSON.stringify(this.node.attrsMap))
            if(!val || !val.trim()){
                delete attr['@click'] 
            } else {
                if(!/^[a-zA-Z]*$/.test(val)){
                    this.clickMethod = old
                    return
                }
                attr['@click'] = val
            }
            this.$set(this.node, 'attrsMap', attr)
        }
    }
}
</script>