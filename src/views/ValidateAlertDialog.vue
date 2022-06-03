<template>
   <div class="m-del-popup" :class="{'d-flex' : isShowAlert}">
        <div class="row content">
            <div class="alert-icon"></div>
            <div class="alert-content">{{ this.message}}</div>
        </div>
        <div class="row popup-action" :class="{'d-flex': true}">
            <div class="m-button" @click="selectOption()" v-shortkey="['esc']" @shortkey="selectOption()">Đóng</div>
        </div>
    </div>
</template>

<script>
export default {
    props:["isShowAlert","message"],
    methods:{
        selectOption(){
            this.$emit("selectOption");
        }
    }
}
</script>

<style>

</style>