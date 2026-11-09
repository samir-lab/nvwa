<template>
    <div>
        <div>
            <mu-tooltip placement="left" content="当用户手动勾选数据行的 Checkbox 时触发的事件">
                <mu-text-field v-model="events.select" label="select事件"></mu-text-field>
            </mu-tooltip>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            events:{
                select:''
            }
        }
    },
    props:{
        node:{}
    },
}
</script>