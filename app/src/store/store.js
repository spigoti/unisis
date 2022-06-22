import {createStore} from 'vuex';
import axios from "axios";

const store = createStore({
    state() {
        return {
            count: 0
        }
    },
    mutations: {
        AUTH_USER() {
            state.count++;
        }
    },
    actions: {
        authUser({state, commit}, payload) {
            return new Promise((resolve, reject) => {
                axios.post('http://localhost:4000/auth', payload)
                    .then((response) => {
                        localStorage.setItem('userToken', response.data.token);
                        localStorage.setItem('appUser', JSON.stringify(response.data.user));
                        resolve(response)
                    }, error => {
                        reject(error);
                    })
            })
        }
    },
})

export default store;