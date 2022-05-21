import { createStore } from 'vuex';
import api, { setBearerToken } from '../services'
import * as storage from '../views/auth/storage'
const store = createStore({

    state:{
        user:'',
        token:''
    },
    getters:{
        getUser(state){
            return state.user;
        },
        getToken(state){
            return state.token;
        }
    },
    mutations:{
        SET_USER(state, user){
            state.user = user;
        },
        SET_TOKEN(state, token){
            state.token = token;
        }
    },
    actions:{
        setUser({ commit }, user){
            commit('SET_USER', user);
            storage.setLocalUser(user);
        },
        setToken({ commit }, token){
            //setBearerToken(token);
            storage.setLocalToken(token);
            commit('SET_TOKEN', token);
        },
        loadSession({ dispatch }){
            return new Promise(async (resolve, reject) => {
                api.get(`/api/auth/load-session`).then((res) => {
                    const user = res.data.user;
                    dispatch('setUser', user);
                    resolve();
                }).catch(function(error){
                    dispatch('signOut');
                    reject(error);
                });
            });
        },
        checkToken({ dispatch, state }){
            if(state.token){
                return Promise.resolve(state.token);
            }

            const token = storage.getLocalToken();

            if(!token){
                return Promise.reject(new Error('Token inválido'))
            }

            dispatch('setToken', token);
            return dispatch('loadSession');
        },
        checkUser({ dispatch, state }){
            if(state.user){
                return Promise.resolve(state.user);
            }

            const user = storage.getLocalUser();

            if(!user){
                return Promise.reject(new Error('Usuário não autenticado'))
            }

            dispatch('setUser', user);
            return dispatch('loadSession');
        },
        signOut({ dispatch }){
            setBearerToken('');
            storage.deleteLocalToken();
            storage.deleteLocalUser();
            dispatch('setUser', '');
            dispatch('setToken', '');
        }

    },
    modules:{}
});

export default store;
