<template>
    <input autocomplete="on" 
    :placeholder="placeholder" 
    v-model="content"
    @input="bindingDataInput" 
    class="m-field-input mt-input"
    :type="type"
    :title="this.isAlert == true ? title : ''"
    :class="{'danger' : this.isAlert}"    
    @blur="checkNullValue"

    >
</template>

<script>
export default {
    mounted() {
        this.content = this.controlledContent;
    },
    props:["controlledContent","title","placeholder","type","tag","isError"],
    watch:{
        controlledContent : function(newValue){
            
            this.content = newValue;
        },
        isError: function(newValue){
            console.log(newValue);
        }
    },
    methods:{
        bindingDataInput(field){
            field = this.tag;
            this.$emit("bindingData",field,this.content);
        },
        checkNullValue(){
            if(this.content == "" || this.content == "0" || this.content == null || this.content == undefined){
                this.isAlert = true;
            } else {
                this.isAlert = false;
            }
        },
    },
    data() {
        return {
            content: "",
            isAlert: false,
            isFocus: false,
        }
    },

}
</script>

<style>

</style>