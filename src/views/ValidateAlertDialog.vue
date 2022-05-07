<template>
   <div class="m-del-popup" :class="{'d-flex' : isShowAlert}">
        <div class="row content">
            <div class="alert-icon"></div>
            <div class="alert-content">{{this.message}}</div>
        </div>
        <div class="row popup-action" :class="{'d-flex': true}">
            <div class="m-second-button" @click="selectOption(false)">Đóng</div>
        </div>
    </div>
</template>

<script>
export default {
    props:["isShowAlert","formMode"],
}
</script>

<style>

</style>