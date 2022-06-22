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
        :disabled="disabled"
        ref="inputTxt"
        @focus="this.$refs.inputTxt.select()">
         
</template>

<script>
export default {
    mounted() {
        this.content = this.controlledContent;
         /**
        * Mô tả: Theo dõi field name để gắn vào alert message ở dưới
        * @param
        * @return
        * Created by: nbtin
        * Created date: 09:27 17/06/2022
        */
       if(this.fieldName != undefined)
        this.messageAlert = this.fieldName + " không được để trống.";
    },
    props:["controlledContent","title","placeholder","type","tag","fieldName","isRequired","disabled","area"],
    watch:{
        /**
        * Mô tả: Watch controlledContent để nhận vào dữ liệu được nhập từ phía component cha
        * Created by: nbtin
        * Created date: 23:13 23/05/2022
        */
        controlledContent : function(newValue){
            if(newValue != "") this.isAlert = false;
            this.content = newValue;
        },
       
    },
    methods:{
        /**
        * Mô tả: Hàm set focus cho ô input, thường dùng để focus vào ô đầu tiên trong form
        * Created by: nbtin
        * Created date: 23:19 23/05/2022
        */
        setFocus(){
            this.$refs.inputTxt.focus();
        },
        /**
        * Mô tả: Hàm emit dữ liệu từ input lên form, theo dạng tên trường - dữ liệu
        * @param field: tên trường được truyền vào từ cha
        * Created by: nbtin
        * Created date: 23:20 23/05/2022
        */
        bindingDataInput(field){
            field = this.tag;
            this.$emit("bindingData",field,this.content);
        },
        /**
        * Mô tả: Check rỗng của input khi được focus ra ngoài
        * @param
        * @return
        * Created by: nbtin
        * Created date: 23:20 23/05/2022
        */
        checkNullValue(){
            // console.log(this.isRequired);
            if(this.isRequired != false){
                if(this.content === "" || this.content == undefined){
                    this.isAlert = true;
                } else {
                    this.isAlert = false;
                }
            }
        },
    },
    data() {
        return {
            content: "",
            isAlert: false,
            isFocus: false,
            messageAlert: "Không được để trống ô này.",
        }
    },

}
</script>

<style>

</style>