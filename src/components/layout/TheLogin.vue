<template>
    <div>
        Trang login
        <div>
            <label>Username: </label>
            <input v-model="this.loginForm.username"/>
        </div>
         <div>
            <label>Password: </label>
            <input v-model="this.loginForm.password"/>
        </div>
        <router-link to="/main"><button @click="login">Đăng nhập</button></router-link>
    </div>

</template>

<script>
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
    methods: {
        async login(){
            var me = this;
            await axios.post("http://localhost:5062/api/v1/Users",me.loginForm,
                {
                    withCredentials: true,
                    headers:{
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type':'application/json',
                    },
                    
                }
                
            ).then(function(response) {
                console.log(response);
                console.log('hehehehe');
                me.$store.commit('setIsAuth',true);

                
            }).catch(function(err){
                console.log(err.response);
                me.$store.commit('setIsAuth',false);
            })
        }
    },
    data() {
        return {
            loginForm: {
                username: '',
                password: '',          
            }
        }
    },
}

    
</script>

<style>

</style>