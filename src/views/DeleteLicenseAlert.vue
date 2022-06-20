<template>
    <div class="m-del-popup" :class="{'d-flex' : isShowAlert}">
        <div class="row content">
            <div class="alert-icon"></div>
            <!-- <div class="alert-content">{{this.message}} <span style="font-weight: 700">{{this.deleteInfor.LicenseCode}}</span>?</div> -->
            <div class="alert-content"><slot></slot></div>
        </div>
        <div class="row popup-action" :class="{'d-flex': true} " >
            <div class="m-second-button" @click="selectOption(false)">Không</div>
            <button ref="btnDel" class="m-button" @click="selectOption(true)">Xóa</button>
        </div>
    </div>
</template>

<script>


export default {
    props:["isShowAlert","delList","deleteInfor","message","removeType"],
    
    methods:{
        // emits không/xóa, không: false, xóa: true
        selectOption(isDel){
            if(this.removeType == false){
                this.$emit("getDelOption",isDel,this.deleteInfor.LicenseId);
            } else {
                this.$emit("getDelOption",isDel);
            }
        }
    },
    data() {
        return {
           
        }
    },
}
</script>

<style>

</style>