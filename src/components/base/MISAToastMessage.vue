<template>
    <div class="m-toast" :class="{'d-flex': isShowToast}">
        <div class="status-icon"></div>
        <div class="toast-message" >{{message}}</div>
    </div>
</template>

<script>
export default {
    props: ["status","isShowToast"],
    data() {
        return {
            message: "Lưu dữ liệu thành công",
        }
    },
}
</script>

<style>

</style>