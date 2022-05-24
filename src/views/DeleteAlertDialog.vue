<template>
    <div class="m-del-popup" :class="{'d-flex' : isShowAlert}">
        <div class="row content">
            <div class="alert-icon"></div>
            <div class="alert-content">{{this.message}}</div>
        </div>
        <div class="row popup-action" :class="{'d-flex': true} " >
            <div class="m-second-button" @click="selectOption(false)">Không</div>
            <div class="m-button" @click="selectOption(true)">Xóa</div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import messageResource from '../resources/resource';

export default {
    props:["isShowAlert","delList"],
    async updated() {
        if(this.delList.length == 1){
            var me = this;
            await axios.get(`https://localhost:7062/api/v1/FixedAssets/`+me.delList[0])
            .then(function(res){
                me.message = "Bạn có muốn xóa tài sản " + res.data.FixedAssetCode + " - " + res.data.FixedAssetName + "?";
            }).catch(function(err){
                console.log(err);
            })
            
        } else {
            var pre = this.delList.length < 10 ? "0" : "";
            this.message = pre + this.delList.length + messageResource.DELETE_QUESTION;
        }
    },
    methods:{
        // emits không/xóa, không: false, xóa: true
        selectOption(isDel){
            this.$emit("getDelOption",isDel);
        }
    },
    data() {
        return {
            message: ""
        }
    },
}
</script>

<style>

</style>