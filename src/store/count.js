//求和相关的配置
export default {
    namespaced: true,
    actions: {
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
    },
    mutations: {
        INCERMENT(state, value) {
            console.log('mutations中的加法被调用了', state, value);
            state.sum += value
        },
        DECREMENT(state, value) {
            // console.log('mutations中的加法被调用了',state,value);
            state.sum -= value
        },
    },
    state: {
        sum: 0, //当前的和
        school: '尚硅谷',
        subject: '前端',
    },
    getters: {
        bigSum(state) {
            return state.sum * 10
        }
    }
}