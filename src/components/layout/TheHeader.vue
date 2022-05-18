<template>
    <div class="m-top-header">
        <div class="brand-name">
            <p class="brand-name-text">Danh sách tài sản</p>
        </div>
        <div class="user-action">
            <div class="location">
                <span>Sở Tài Chính</span>
            </div>
            <div class="year-filter">
                <span>Năm</span>
                <span><b>{{new Date().getFullYear()}}</b></span>
                <div class="change-year-group-btn">
                    <div class="incre-year"></div>
                    <div class="decre-year"></div>
                </div>
            </div>
            <a href="#">
                <div class="user-action-item notification">
                </div>
            </a>
            <a href="#"><div class="user-action-item extension"></div></a>
            <a href="#"><div class="user-action-item question"></div></a>
            <a href="#" class="avatar-block">
                <div class="user-action-item avatar"></div>
                <div class="arrow-down"></div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    components:{}
}
</script>

<style>

</style>