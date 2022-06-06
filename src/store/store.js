
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import { createStore } from "vuex";

const store = createStore({
    
    state(){
        return {
            user: null,
            wrongPass: false,
        };
    },
    mutations: {
        /**
        * Mô tả: Set lại user
        * Created by: nbtin
        * Created date: 17:13 03/06/2022
        */
        setUser(state, username) {
            state.user = username;
        },
        /**
        * Mô tả: Hàm đăng xuất, xóa user trên store
        * @param
        * @return
        * Created by: nbtin
        * Created date: 17:13 03/06/2022
        */
        logout(state){
            state.user = null;
        },
        /**
        * Mô tả: Set trạng thái có sai mật khẩu hay không
        * @param
        * @return
        * Created by: nbtin
        * Created date: 09:05 06/06/2022
        */
        setWrongPass(state, isWrongPass){
            state.wrongPass = isWrongPass;
        }
    },
    getters: {
        /**
        * Mô tả: Hàm kiểm tra authen hay chưa bằng cách so sánh user
        * @param
        * @return
        * Created by: nbtin
        * Created date: 17:14 03/06/2022
        */
        isAuthentication(state) {
            return !!state.user;
        },
        /**
        * Mô tả: Check và lấy ra xem mật khẩu có đang sai hay không
        * @param
        * @return
        * Created by: nbtin
        * Created date: 08:49 06/06/2022
        */
        isWrongPass(state){
            return state.wrongPass;
        }
    },
    actions: {
        /**
        * Mô tả: Hàm thực hiện login ở vuex với user được commit lên
        * @param user (FormData), commit
        * @return
        * Created by: nbtin
        * Created date: 11:32 03/06/2022
        */
        async login({commit}, user){
            // var me = this;
            await axios.post("http://localhost:5062/api/v1/Users",user,{
                withCredentials: true,
                headers:{
                    'Content-Type': 'application/json'
                }
                
            })
            .then(async function(res){
                console.log(res.data);
                if(res.data != -1){
                    await commit("setUser", user.username); 
                    await commit("setWrongPass", false);
                } else {
                    await commit("setWrongPass", true);
                }
                
            })
        
            
        },
        /**
        * Mô tả: Hàm đăng xuất, call api xóa cookie
        * @param
        * @return
        * Created by: nbtin
        * Created date: 17:13 03/06/2022
        */
        async logout({ commit }) {
            await commit("logout");
            await axios.get("http://localhost:5062/api/v1/Users")
            
        },
    },
    plugins: [createPersistedState()],
    
    
    }
);

export default store;