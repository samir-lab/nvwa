import Vue from 'vue'

Vue.component('TplComp',{
    props: {
        html: String,
        dataScope: {
            type: Object,
            default(){
                return {}
            }
        },
        methodsScope: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    render(h) {
        let self = this;
        let ms = {}
        for(let name in self.methodsScope){
            ms[name] = new Function('return ' + self.methodsScope[name])
        }
        const com = Vue.extend({
            template: self.html,
            data() {
                return self.dataScope
            },
            created(){
                
            },
            methods: {
                ...ms
            }
        })

        return h(com,{
        })
    },
    watch:{
        dataScope(val){
            this.$forceUpdate();
        },
        methodsScope(val){
            this.$forceUpdate();
        }
    }
})