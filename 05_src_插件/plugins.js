export default {
    install(Vue) {
        // console.log('@@@install',Vue);
        Vue.filter('mySlice', function (value) {
            return value.slice(0, 4)
        })
        Vue.directive('fbind', {
            //指令与元素成功绑定时
            bind(element, binding) {
                element.value = binding.value
                console.log('bind');
            },
            //指令所在元素被插入页面时
            inserted(element, binding) {
                element.focus()
                console.log('inserted');
            },
            //指令所在的模板被重新解析时
            update(element, binding) {
                element.value = binding.value
                console.log('update');
            }
        })
        //定义混入
        Vue.mixin({
            data() {
                return {
                    x: 100,
                    y: 200
                }
            }
        })
        //给Vue原型上添加一个方法（vm和vc就都能用了）
        Vue.prototype.hello = () => {
            alert('你好啊')
        }
    }
}