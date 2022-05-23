<template>
    <div class="m-del-popup" :class="{'d-flex' : isShowAlert}">
        <div class="row content">
            <div class="alert-icon"></div>
            <div class="alert-content">{{this.message}}</div>
        </div>
        <div class="row popup-action .add" :class="{'d-flex' : this.add}">
            <div class="m-second-button" @click="selectOption(false)">Không</div>
            <div class="m-button" @click="selectOption(true)">Hủy bỏ</div>
        </div>
        <div class="row popup-action .edit" :class="{'d-flex' : this.edit}">
            <div class="m-second-button" @click="selectOption(false)">Hủy bỏ</div>
            <div class="m-button m-spec-button" @click="selectOption('nosave')">Không lưu</div>
            <div class="m-button" @click="selectOption('save')">Lưu</div>
        </div>
    </div>
</template>

<script>
export default {
    props:["isShowAlert","formMode"],
    mounted(){
        if(this.formMode == 1 || this.formMode == 2){
                this.message = "Bạn có muốn hủy bỏ khai báo tài sản này";
                this.add = true;
                this.edit = false;
        } else if(this.formMode == 0){
            this.message = "Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?";
            this.add = false;
            this.edit = true;
        }
        
    },
    methods:{
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