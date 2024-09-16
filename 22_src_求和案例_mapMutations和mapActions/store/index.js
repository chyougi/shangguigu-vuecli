//该文件用于创建vuex中最为核心的store

//引入vue
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'
//使用vuex
Vue.use(Vuex)
//准备actions——用于相应组件中的动作
const actions = {
    // increment(context, value) {
    //     console.log('actions中的加法被调用了', context, value);
    //     context.commit('INCERMENT', value)
    // },
    // decrement(context, value) {
    //     context.commit('DECREMENT', value)
    // },
    incermentOdd(context, value) {
        if (context.state.sum % 2) {
            context.commit('INCERMENT', value)
        }
    },
    incrementWait(context, value) {
        setTimeout(() => {
            context.commit('INCERMENT', value)
        }, 500);
    }
}
//准备mutations——用于操作数据（state）
const mutations = {
    INCERMENT(state, value) {
        console.log('mutations中的加法被调用了',state,value);
        state.sum += value
    },
    DECREMENT(state, value) {
        // console.log('mutations中的加法被调用了',state,value);
        state.sum -= value
    }
}
//准备state——用于存储数据
const state = {
    sum: 0, //当前的和
    school:'尚硅谷',
    subject:'前端'
}
//准备getters——用于将state中的数据进行加工
const getters = {
    bigSum(state) {
        return state.sum * 10
    }
}


//创建并导出store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})

