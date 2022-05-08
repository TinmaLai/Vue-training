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
    props:["controlledContent","title","placeholder","type","tag","isError","fieldName"],
    watch:{
        controlledContent : function(newValue){
            if(newValue != "" && newValue != "0") this.isAlert = false;
            this.content = newValue;
        },
        isError: function(newValue){
            console.log(newValue);
        }
    },
    methods:{
        // emit trường - dữ liệu từ input lên form
        bindingDataInput(field){
            field = this.tag;
            this.$emit("bindingData",field,this.content);
        },
        // check Null khi blur
        checkNullValue(){
            if(this.content == "" || this.content == "0"){
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