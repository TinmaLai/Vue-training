<template>
    <div class="m-toast" :class="{'d-flex': isShowToast}">
        <div class="status-icon" :class="{'status-false' : !status}"></div>
        <div class="toast-message" >{{message}}</div>
    </div>
</template>

<script>
export default {
    props: ["status","isShowToast","excel","successRowCount","failRowCount","message"],

    data() {
        return {
        }
    },
}
</script>

<style>

</style>