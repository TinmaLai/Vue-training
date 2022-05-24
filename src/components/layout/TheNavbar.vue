<template>
    <div class="menu-left" :class="{'menu-left-minimize': isMinimize}">
        <div class="menu-left-item brand">
            <button id="toggle-button"><div class="toggle-img"></div></button>
            <a href="demo.html" >
                <span class="heading">MISA QLTS</span>
            </a>
        </div>
        <div class="menu-left-item">
            <div class="item-btn">
                <div class="general"></div>
            </div>
            <span class="item-text">Tổng quan</span>
        </div>
        <div class="menu-left-item collapse">
            <div class="item-btn actived">
                <div class="asset"></div>
            </div>
            <span class="item-text">Tài sản</span>
            <span class="collapse-icon"></span>
        </div>
        <div class="menu-left-item collapse">
            <div class="item-btn">
                <div class="assetHT"></div>
            </div>
            <span class="item-text">Tài sản HT-ĐB</span>
            <span class="collapse-icon"></span>
        </div>
        <div class="menu-left-item collapse">
            <div class="item-btn">
                <div class="tools"></div>
            </div>
            <span class="item-text">Công cụ dụng cụ</span>
            <span class="collapse-icon"></span>
        </div>
        <div class="menu-left-item">
            <div class="item-btn">
                <div class="category"></div>
            </div>
            <span class="item-text">Danh mục</span>
        </div>
        <div class="menu-left-item collapse">
            <div class="item-btn">
                <div class="search"></div>
            </div>
            <span class="item-text">Tra cứu</span>
            <span class="collapse-icon"></span>
        </div>
        <div class="menu-left-item collapse">
            <div class="item-btn">
                <div class="report"></div>
            </div>
            <span class="item-text">Báo cáo</span>
            <span class="collapse-icon"></span> 
        </div>
        <div class="menu-footer">
            <div id="minimize-menu-btn" class="minimize" @click="toggleMenu(isMinimize)"></div>
        </div>
    </div>
</template>

<script>
export default {
    props:["isMinimize"],
    methods:{
        /**
        * Mô tả: Thực hiện thu gọn/phóng to menu ở bên trái
        * @param
        * @return
        * Created by: nbtin
        * Created date: 07:23 24/05/2022
        */
        toggleMenu(isMinimize){
            this.$emit("toggleMinimize",!isMinimize);
        }
    },
    updated() {
        
        
    },
    data() {
        return {
        
        }
    },
}
</script>

<style>

</style>