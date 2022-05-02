<template>
    <input autocomplete="on" 
    :placeholder="placeholder" 
    v-model="content"
    @change="bindingDataInput" 
    class="m-field-input mt-input"
    :type="type"
    :title="this.isAlert == true ? title : ''"
    :class="{'danger' : this.isAlert}"
    tabindex="0"     
    @blur="checkNullValue"
      >
</template>

<script>
export default {
    props:["controlledContent","title","placeholder","type"],
    watch:{
        controlledContent : function(newValue){
            this.content = newValue;
        }
    },
    methods:{
        bindingDataInput(field){
            field = this.tag;
            this.$emit("bindingData",field,this.content);
        },
        checkNullValue(){
            if(this.content == ""){
                this.isAlert = true;
            } else {
                this.isAlert = false;
            }
        }
    },
    data() {
        return {
            content: "",
            isAlert: false
        }
    },

}
</script>

<style>

</style>