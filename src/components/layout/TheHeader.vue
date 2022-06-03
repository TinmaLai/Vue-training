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
            <a @click="this.isShowLogout = !this.isShowLogout" href="#" class="avatar-block">
                <div class="user-action-item avatar"></div>
                <div  class="arrow-down"></div>
                <div @click="logoutBtn" v-if="this.isShowLogout" class="logout-btn m-button">Đăng xuất</div>
            </a>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: 'App',
    components:{},
    data() {
        return {
            isShowLogout: false,
        }
    },
    methods:{
         ...mapActions(["logout"]),
        /**
        * Mô tả: Hàm đăng xuất, chuyển trang về login, call api ở store
        * @param
        * @return
        * Created by: nbtin
        * Created date: 17:14 03/06/2022
        */
        async logoutBtn(){
            this.$router.push('/');
            await this.logout();
            
        }
    }
}
</script>

<style>

</style>