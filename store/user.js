// 数据的储存
export const state = () => {
    return { userInfo: {} }
}

// 操作数据的方式
export const mutations = {
    setUserInfo(state, data) {
        state.userInfo = data
    }
}

// 异步的方式用action
export const actions = {
    // 登入
     login(store,data) {
        return this.$axios({
            url: '/accounts/login',
            method: 'POST',
            data: data
        }).then(res => {
            store.commit('setUserInfo', res.data)
        })
    },
    // 获取验证码
     captcha(store,data){
         return this.$axios({
                    url:'/captchas',
                    method:'POST',
                    data:{ tel: data }
                })
     },
    //  注册
     register(store,data){
         return this.$axios({
                    url:'/accounts/register',
                    method: 'POST',
                    data
                }).then(res=>{
                    console.log(res)
                    store.commit('setUserInfo',res.data)
                })
     }
}