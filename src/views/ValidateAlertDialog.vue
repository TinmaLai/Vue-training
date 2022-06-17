<template>
   <div class="m-del-popup" :class="{'d-flex' : isShowAlert}">
        <div class="row content">
            <div class="alert-icon"></div>
            <div class="alert-content">{{ this.message}}</div>
        </div>
        <div class="row popup-action" :class="{'d-flex': true}">
            <button ref="closeBtn" class="m-button" @click="selectOption()" @shortkey="selectOption()">Đóng</button>
        </div>
    </div>
</template>

<script>

export default {
    props:["isShowAlert","message"],
    watch:{
        isShowAlert: function(newValue){
            if(newValue == true){
                 this.$nextTick(() => {
                    this.$refs.closeBtn.focus();
                })
            }
        }
    },
    methods:{
        selectOption(){
            this.$emit("selectOption");
        }
    }
}
</script>

<style>

</style>