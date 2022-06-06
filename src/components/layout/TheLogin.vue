<template>
    <div id="frmLogin">
        <div class="login w-100 h-100">
            <div class="grid-login">
                <div class="half-ctn img-login"></div>
                <div class="half-ctn">
                    <div class="main-login-ctn">
                        <div class="logo"></div>
                        <div class="logo-text">
                            Đăng nhập để làm việc với <b>MISA QLTS</b>
                        </div>
                        
                        <form @submit.prevent="submit" id="normal-login">
                            <div class="grid-login-normal">
                                <div class="username-login">
                                    <input v-model="form.username" id="iptUserName" class="input-login" placeholder="Username, email hoặc số điện thoại">
                                </div>
                                <div class="password-login">
                                    <input v-model="form.password" id="iptPassword" type="password" placeholder="Mật khẩu" class="input-login">
                                    <div class="eye on-eye">
                                    </div>
                                </div>
                            
                                <div class="button-login" style="margin-top: 20px;">
                                    <button type="submit" class="button button-text" id="login">Đăng nhập</button>
                                </div>
                            </div>
                        </form>
                        
                    </div>
                <div v-if="this.showError" class="wrong-login">
                    <div style="text-align:left; font-weight: 700;">Sai tài khoản hoặc mật khẩu, vui lòng đăng nhập lại.</div>
                    <div @click="this.showError = false" class="closeBtn"><button class="m-button">Đóng</button></div>
                </div>
            </div>
          </div>
      </div>
    </div>

</template>

<script>
import axios from 'axios';
import { mapActions } from "vuex";
import store from '../../store/store';
axios.defaults.withCredentials = true;

export default {
    methods: {
    ...mapActions(["login"]),
    /**
    * Mô tả: Hàm đăng nhập với userform, chuyển trang vào main, show màn hình sai tài khoản mật khẩu nếu cần
    * @param
    * @return
    * Created by: nbtin
    * Created date: 17:15 03/06/2022
    */
    async submit() {
        const user = {
            username: this.form.username,
            password: this.form.password
        }
        await this.login(user);
        if(store.getters.isWrongPass == false){
            this.$router.push("/main");
            this.showError = false;
        } else {
            this.showError = true;
        }
       
    },
  },
    data() {
        return {
            form: {
                username: '',
                password: '',          
            },
            showError: false
        }
    },
}

    
</script>

<style scoped>
    @import url(../../css/components/login.css);
</style>