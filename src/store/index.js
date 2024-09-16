//该文件用于创建vuex中最为核心的store

//引入vue
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'
//使用vuex
Vue.use(Vuex)
import countOptions from './count'
import personOptions from './person'



//创建并导出store
export default new Vuex.Store({
    modules: {
        countAbout: countOptions,
        personAbout: personOptions
    }
})

