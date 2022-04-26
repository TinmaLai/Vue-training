<template>
     <div class="m-del-popup" :class="{'d-flex' : isShowAlert}">
        <div class="row content">
            <div class="alert-icon"></div>
            <div class="alert-content">Bạn có muốn xóa {{this.delList.length}} tài sản?</div>
        </div>
        <div class="row popup-action">
            <div class="m-second-button" @click="selectOption(false)">Không</div>
            <div class="m-button" @click="selectOption(true)">Xóa</div>
        </div>
    </div>
</template>

<script>
export default {
    props:["isShowAlert","delList"],
    watch: {
        // delList: function(newValue){
            
        // }
    },
    methods:{
        // emits không/xóa, không: false, xóa: true
        selectOption(isDel){
            console.log(this.delList);
            this.$emit("getDelOption",isDel);
        }
    }
}
</script>

<style>

</style>