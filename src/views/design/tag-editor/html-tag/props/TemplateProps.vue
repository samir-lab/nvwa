<template>
    <div>
        <mu-text-field v-model="slotScope" label="slot-scope" disabled></mu-text-field>
    </div>
</template>

<script>

export default {
    data(){
        return{
            slotScope:'scope'
        }
    },
    props:{
        node:{}
    }
}
</script>