
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import { createStore } from "vuex";

const store = createStore({
    
    state(){
        return {
            user: null,
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
            await axios.post("http://localhost:5062/api/v1/Users",user,
                {
                    withCredentials: true,
                    headers:{
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type':'application/json',
                    },  
                }
            )
            await commit("setUser", user.username);
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