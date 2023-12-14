import {ref, computed, onMounted} from 'vue';
import {defineStore} from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        userInfo: {
                id:'',
                username:'',
                updateTime:'',
                createTime:'',
                head:'',
        },
        isAuthenticated: false,
    }),
    getters: {
        hasUserInfo: (state) => !!state.userInfo,
    },
    actions: {
        setToken(token: any) {
            this.token = token;
        },
        setUserInfo(userInfo: any) {
            this.userInfo = {...this.userInfo, ...userInfo};
        },
        setAuthenticated(status: any) {
            this.isAuthenticated = status;
        },
        clearUserInfo() {
            this.userInfo = {
                id:'',
                username:'',
                updateTime:'',
                createTime:'',
                head:'',
            };
            this.isAuthenticated = false;
            this.token = null;
            localStorage.removeItem('token');
        },
    },
});

