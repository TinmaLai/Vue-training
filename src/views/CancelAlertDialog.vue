<template>
    <div class="overlay" style="background-color: transparent;"></div>
    <div class="m-del-popup" style="display: flex;">
       
        <div class="row content">
            <div class="alert-icon"></div>
            <div class="alert-content">{{this.message}}</div>
        </div>
        <div class="row popup-action .add" :class="{'d-flex' : this.add}">
            <div class="m-second-button" @click="selectOption(false)" title="ESC">Không</div>
            <button ref="cancelBtn" class="m-button" @click="selectOption(true)" title="ENTER">Hủy bỏ</button>
        </div>
        <div class="row popup-action .edit" :class="{'d-flex' : this.edit}">
            <div class="m-second-button" @click="selectOption(false)">Hủy bỏ</div>
            <div class="m-button m-spec-button" @click="selectOption('nosave')">Không lưu</div>
            <button ref="cancelAndSaveBtn" class="m-button" @click="selectOption('save')">Lưu</button>
        </div>
    </div>
</template>

<script>
import messageResource from '../resources/resource';

export default {
    props:["isShowAlert","formMode"],
    watch: {
        isShowAlert: function(newValue){
            if(newValue == true){
                if(this.formMode == 1 || this.formMode == 2){
                    this.$nextTick(() => {
                        this.$refs.cancelBtn.focus();
                    })
                } else if(this.formMode == 0){
                   
                    this.$nextTick(() => {
                        this.$refs.cancelAndSaveBtn.focus();
                    })
                }
            }
        }
    },
    mounted(){
        if(this.formMode == 1 || this.formMode == 2){
            
            this.message = messageResource.CANCEL_QUESTION_ADD;
            //Gán lại trạng thái data để hiện hàng action button  tùy theo trạng thái form
            this.add = true;
            this.edit = false;
                
        } else if(this.formMode == 0){
            this.message = messageResource.CANCEL_QUESTION_UPDATE;
            //Gán lại trạng thái data để hiện hàng action button  tùy theo trạng thái form
            this.add = false;
            this.edit = true;
            
        }
        
    },
    methods:{
        /**
        * Mô tả: Hàm emit lên option chọn từ alert
        * @param
        * @return
        * Created by: nbtin
        * Created date: 07:54 24/05/2022
        */
        selectOption(select){
            this.$emit("getCancelOption",select);
        }
    },
    data() {
        return {
            message: "",
            add: false,
            edit: false,
        }
    },
}   
</script>

<style>

</style>