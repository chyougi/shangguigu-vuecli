//人员管理相关的配置
import axios from "axios";
export default {
    namespaced: true,
    actions: {
        addPersonWang(context, value) {
            if (value.name.indexOf('王') === 0) {
                context.commit('ADD_PERSON', value)
            } else {
                alert('请添加王姓')
            }
        },
        addPersonFromServer(context) {
            axios.get('http://localhost:8080/api/students').then(
                response => {
                    // console.log(response.data[0]);
                    response.data.forEach(item => context.commit('ADD_PERSON', item))
                    // context.commit('ADD_PERSON',response.data[0])
                },
                error => {
                    alert(error.message)
                }
            )
        }
    },
    mutations: {
        ADD_PERSON(state, value) {
            console.log('mutations中的ADD_PERSON被调用了', state, value);
            state.personList.unshift(value)
        }
    },
    state: {
        personList: [
            { id: '001', name: '张三' }
        ]
    },
    getters: {
        firstPersonName(state) {
            return state.personList[0].name
        }
    }
}