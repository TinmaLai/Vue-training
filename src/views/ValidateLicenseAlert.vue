<template>
    <div class="overlay" style="background-color: transparent;"></div>
   <div class="m-del-popup" style="display: flex;">
        <div class="row content">
            <div class="alert-icon"></div>
            <!-- <div class="alert-content">{{ this.message}}</div> -->
            <div class="alert-content"><slot></slot></div>
            
        </div>
        <div class="row popup-action" :class="{'d-flex': true}">
            <button ref="closeBtn" class="m-button" @click="selectOption()" @shortkey="selectOption()">Đóng</button>
        </div>
    </div>
</template>

<script>

export default {
    props:["isShowAlert","message"],
    mounted(){
        this.$refs.closeBtn.focus();
    },
    watch:{
        
        
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