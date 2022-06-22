import {createStore} from 'vuex';
import axios from "axios";

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userToken');
const store = createStore({
    state() {
        return {
            appUser: null,
        }
    },
    mutations: {
        AUTH_USER(state, payload) {
            state.appUser = payload;
        },
        SIGN_OUT(state) {
            state.appUser = null;
            localStorage.removeItem('userToken');
            localStorage.removeItem('appUser');
        }
    },
    actions: {
        authUser({state, commit}, payload) {
            return new Promise((resolve, reject) => {
                axios.post('http://localhost:4000/auth', payload)
                    .then((response) => {
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
                        commit('AUTH_USER', response.data.user.email);
                        resolve(response)
                    }, error => {
                        reject(error.response.data.message);
                    })
            })
        },
        listProtocols({state, commit}) {
            return new Promise((resolve, reject) => {
                axios.get('http://localhost:4000/protocol')
                    .then((response) => {
                        resolve(response.data)
                    }, error => {
                        reject(error);
                    })
            })
        },
        createProtocol({state, commit}, payload) {
            return new Promise((resolve, reject) => {
                axios.post('http://localhost:4000/protocol', payload)
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        readProtocol({state, commit}, protocolId) {
            return new Promise((resolve, reject) => {
                axios.get('http://localhost:4000/protocol/' + protocolId)
                    .then((response) => {
                        resolve(response.data);
                    }, error => {
                        reject(error);
                    })
            })
        },
        deleteProtocol({state, commit}, protocolId) {
            return new Promise((resolve, reject) => {
                axios.delete('http://localhost:4000/protocol/' + protocolId)
                    .then((response) => {
                        resolve(response.data);
                    }, error => {
                        reject(error);
                    })
            })
        },
        search({state, commit}, payload) {
            return new Promise((resolve, reject) => {
                axios.post('http://localhost:4000/search', payload)
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
    },
})

export default store;