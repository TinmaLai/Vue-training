<template>
    <div class="m-toast" :class="{'d-flex': isShowToast}">
        <div class="status-icon" :class="{'status-false' : !status}"></div>
        <div class="toast-message" >{{status == true ? "Lưu dữ liệu thành công" : "Lưu dữ liệu thất bại"}}</div>
    </div>
</template>

<script>
export default {
    props: ["status","isShowToast"],
    data() {
        return {
            message: "Lưu",
        }
    },
}
</script>

<style>

</style>