<template>
    
        <input autocomplete="on" 
        :placeholder="placeholder" 
        :value="modelValue"
        @input="bindingDataInput" 
        class="m-field-input mt-input"
        :type="type"
        :title="this.isAlert == true ? title : ''"
        :class="{'danger' : this.isAlert}"  
        :maxlength="this.maxlength"  
        @blur="checkNullValue"
        :disabled="disabled"
        @keypress="isNumber"
        @focus="this.$refs.inputTxt.select()"
        ref="inputTxt">
        <span :class="{'d-opacity': this.isAlert}" style="color: red; opacity: 0"><small>{{this.messageAlert}}</small></span>
    
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
    props:["controlledContent","title","placeholder","type","tag","fieldName","isRequired","disabled","area","modelValue","notNumber","maxlength"],
    emits: ['update:modelValue'],
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
        * Mô tả : Chặn sự kiện nhập chữ ở các ô input số
        * @param $event
        * Created by: nbtin
        * Created date: 11:44 08/05/2022
        */
        isNumber($event) {
            if(this.notNumber == true){
                let keyCode = $event.keyCode ? $event.keyCode : $event.which;
                if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
                    // 46 is dot
                    $event.preventDefault();
                }
            }
        },
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
        bindingDataInput($event){
            
            this.$emit("update:modelValue",$event.target.value);
        },
        /**
        * Mô tả: Check rỗng của input khi được focus ra ngoài
        * @param
        * @return
        * Created by: nbtin
        * Created date: 23:20 23/05/2022
        */
        checkNullValue(){
            console.log(this.isRequired);
            if(this.isRequired != false){
                if(this.$refs.inputTxt.value === "" || this.$refs.inputTxt.value == undefined){
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