# 笔记

## 脚手架文件结构

    |—— node_modules
    |—— public
    |   |—— favicon.ico：页签图标
        |—— index.html：主页面

## 关于不同版本的Vue

    1.vue.js与vue.runtime.xxx.js的区别:
        (1).vue.js是完整版的Vue，包含：核心功能 + 模板解析器
        (2).vue.runtime.xxx.js试运行版的Vue，只包含：核心功能，但没有模板解析器。

    2.因为vue.runtime.xxx.js没有模板解析器，所以不能使用temlate配置项，需要使用
      render函数接收到的createElement函数去指定具体内容。

## Vue.config.js配置文件
>
> 使用vue inspect > output.js可以查看到Vue脚手架的默认配置
> 使用vue.config.js可以对脚手架进行个性化定制，详情见：<https://cli.vuejs.org/zh>

## ref属性

    1.被用来给元素或子组件注册引用信息（id的替代者）
    2.应用在html标签上获取的是真是DOM元素，应用在组件标签上是组件实例对象（vc）
    3.使用方式：
        打标识：<h1 ref="xxx">......</h1> 或 <School ref="sch" />
        获取：this.$refs.xxx

## 配置项props

    功能：让组件接收外部传过来的数据
    (1).传递数据：
        <Demo name="xxx"/>
    (2).接收数据：
        第一种方式（只接收）：
        props:['name']

        第二种方式（限制类型）：
        props:{
            name:String
        }

        第三种方式（限制类型、限制必要性、指定默认值）：
        props:{
            name:{
                type:String;//类型
                required:true;//必要性
                default:'老王'//默认值
            }
        }
    备注：props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。

## mixin(混入)

    功能：可以把多个组件共用的配置提取成一个混入对象
    使用方式：
        第一步定义混合，例如：
            {
                data(){......},
                methods:{......}
                ......
            }
        第二步使用混入，例如：
            (1).全局混入：Vue.mixin(xxx)
            (2).局部混入：mixins:['xxx']

## 插件

    功能：用于增强Vue
    本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。
    定义插件：
        对象.install = function(Vue, options){
            //1. 添加全局过滤器
            Vue.filter(....)

            //2. 添加全局指令
            Vue.directive(....)

            //3. 配置全局混入(合)
            Vue.mixin(....)

            //4. 添加实例方法
            Vue.prototype.$myMethod = function () {....}
            Vue.prototype.$myProperty = xxxxx
        }
    使用插件： Vue.use()

## scoped样式

    作用：让样式在局部生效，防止冲突
    写法：<style scoped>.

## 总结TodoList案例

1. 组件化编程流程：

    (1).拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。

    (2).实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：

        1).一个组件在用：放在组件自身即可。

        2).一些组件在用：放在他们共同的父组件上（<span style="color:red">状态提升</span>）

    (3).实现交互：从绑定事件开始。

2. props适用于：

    (1).父组件==>子组件 通信

    (2).子组件==>父组件 通信（要求父先给子一个函数）

3. 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！

4. props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。

## 组建的自定义事件

1. 一种组件间通信的方式，适用于：子组件 ===> 父组件

2. 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（事件的回调在A中）。

3. 绑定自定义事件：

   1. 第一种方式，在父组件中：`<Demo @atguigu="test"/>` 或 `<Demo v-on:atguigu="test"/>`

   2. 第二种方式，在父组件中：

        ```javascript
        <Demo ref="demo"/>
        ......
        mounted(){
            this.$refs.xxx.$on('atguigu',this.test)
        }
        ```
    3. 若想让自定义事件只能触发一次，可以使用once修饰符，或$once方法。

4. 触发自定义事件：`this.$emit('atguigu',数据)`
5. 解绑自定义事件：`this.$off('atguigu')`
6. 组件上也可以绑定原生DOM事件，需要使用`native`修饰符。
7. 注意：通过`this.$refs.xxx.$on('atguigu',回调)`绑定自定义事件时，回调要么配置在methods中，要么用箭头函数，否则this指向会出问题！

## 全局事件总线(GlobalEventBus)
1. 一种组件间通信的方式，适用于任意组件间通信。
2. 安装全局事件总线：
   ```javascript
        new Vue({
            ......
            beforeCreate(){
                Vue.prototype.$bus = this
            },
            ......
        })
    ```
3. 使用事件总线：
   1. 接收数据：A组件像接收数据，则在A组件中给$bus绑定自定义事件，时间的回调在A组件自身
   ```javascript
        methods(){
            demo(data){......}
        }
        ......
        mounted(){
            this.$bus.$on('xxxx',this.demo)
        }
    ```
    2. 提供数据：`this.$bus.$emit('xxxx',数据)`
4. 最好在beforeDestory钩子中，用$off去解绑当前组件所用到的事件。

## 消息订阅预发布(pubsub)
1. 一种组件间通信的方式，适用于任意组件间通信。
2. 使用步骤：
   1. 安装pubsub:`npm i pubsub-js`
   2. 引入：`import pubsub from 'pubsub-js'`
   3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身。
    ```javascript
        methods(){
            demo(){......}
        }
        ......
        mounted(){
            this.pubId = pubsub.subscribe('xxx',this.demo)
        }
    ```
    4. 提供数据：`pubsub.publish('xxx',数据)`
    5. 最好在beforeDestory钩子中，用`pubsub.unsubscribe(pubId)`去取消订阅。

## nextTick
1. 语法：`this.$nextTick(回调函数)`
2. 作用：在下一次DOM更新结束后执行其指定的回调。
3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。

## Vue封装的过渡与动画
1. 作用：在插入、更新或移除DOM元素时，再合适的时候给元素添加样式类名。
2. 图示：
3. 写法：
   1. 准备好样式：
      1. 元素进入的样式：
         1. v-enter：进入的起点
         2. v-enter-active：进入过程中
         3. v-enter-to：进入的终点
      2. 元素离开的样式：
         1. v-leave：离开的起点
         2. v-leave-active：离开过程中
         3. v-leave-to：离开的终点
   2. 使用`<transition>`包裹要过渡的元素，并配置name属性：
        ```javascript
        <transition name="hello" appear>
            <h1 v-show="isShow">你好啊！</h1>
        </transition>
        ```
    3. 备注：若有多个元素需要过度，则需要使用：`<transition-group>`，且每个元素都要指定`key`值。

## 插槽
1. 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于父组件===>子组件。
2. 分类：默认插槽、具名插槽、作用域插槽。
3. 使用方法：
   1. 默认插槽：
   ```javascript
   父组件中：
        <Category>
            <div>html结构</div>
        </Category>
    子组件中：
        <template>
            <div>
                <slot>插槽默认内容...</slot>
            </div>
        </template>
   ```
   2. 具名插槽：
   ```javascript
    父组件中：
        <Category>
            <template slot="center">
                <div>html结构1</div>
            </template>

            <template v-slot:footer>
                <div>html结构2</div>
            </template>
        </Category>
    子组件中：
        <template>
            <div class="category">
                <!-- 定义插槽 -->
                <slot name="center">插槽默认内容...</slot>
                <slot name="footer">插槽默认内容...</slot>
            </div>
        </template>
   ```
   3. 作用域插槽：
      1. 理解：数据在组件的自身，但根据数据生成的结构需要组建的使用者来决定（games数据在Category组件中，但使用数据遍历出来的结构由App组件决定）
      2. 具体编码：
           ```javascript
            父组件中：
                <Category title="游戏">
                    <template slot-scope="atguigu">
                        <ul>
                            <li v-for="(game, index) in atguigu.games" :key="index">{{ game }}</li>
                        </ul>
                    </template>
                </Category>
                <Category title="游戏">
                    <template slot-scope="atguigu">
                        <ol>
                            <li v-for="(game, index) in atguigu.games" :key="index">{{ game }}</li>
                        </ol>
                    </template>
                </Category>
                <Category title="游戏">
                    <template slot-scope="atguigu">
                        <h4 v-for="(game, index) in atguigu.games" :key="index">{{ game }}</h4>
                    </template>
                </Category>
            子组件中：
                <template>
                  <div>
                    <slot :games="games"></slot>
                  </div>
                </template>

                <script>
                export default {
                    name:'Category',
                    props: ['title'],
                    //数据在组件自身
                    data() {
                    return {
                      games: ["NBA2K25", "龙珠电光火石", "维多利亚3", "荒野大镖客2"]
                    };
                  },
                }
                </script>
   ```

## Vuex
6. 四个map方法的使用
   1. mapState方法：用于帮助我们映射`state`中的数据为计算属性
   ```javascript
   computed:{
        //借助mapState生成计算属性，从state中读取数据。（对象写法）
        ...mapState({ sum: "sum", school: "school", subject: "subject" }),

        //借助mapState生成计算属性，从state中读取数据。（数组写法）
        ...mapState(['sum','school','subject']),
   }
   ```
   2. mapGetters方法：用于帮助我们映射`getters`中的数据为计算属性
   ```javascript
      computed:{
        //借助mapGetters生成计算属性，从getters中读取数据。（对象写法）
        ...mapGetters({ bigSum:'bigSum' }),

        //借助mapGetters生成计算属性，从getters中读取数据。（数组写法）
        ...mapGetters(['bigSum'])
   }
   ```

7. 模块化+命名空间
   1. 目的：让代码更好维护，让多种数据分类更加明确。
   2. 修改`store.js`
   ```javascript
   const countAbout = {
    namespaced:true,//开启命名空间
    state:{x:1},
    mutations:{...},
    actions:{...},
    getters:{
        bigSum(state){
            return state.sum * 10
        }
    }
   }

    const personAbout = {
    namespaced:true,//开启命名空间
    state:{...},
    mutations:{...},
    actions:{...}
   }

   const store = new Vuex.Store({
    modules: {
        countAbout,
        personAbout
    }
   })
   ```
   3. 开启命名空间后，组件中读取state数据：
   ```javascript
   //方式一：自己直接读取
   this.$store.state.personAbout.list
   //方式二：借助mapState读取：
   ...mapState('countAbout',['sum','school','subject'])
   ```
   4. 开启命名空间后，组件中读取getters数据：
   ```javascript
   //方式一：自己直接读取：
   this.$store.getters['personAbout/firstPersonName']
   //方式二：借助mapGetters读取：
   ...mapGetters('countAbout',['bigSum'])
   ```
   5. 开启命名空间后，组件中调用dispatch
   ```javascript
   //方式一：自己直接dispatch
   this.$store.dispatch('personAbout/addPersonWang',person)
   //方式二：借助mapActions
   ...mapActions("countAbout", ["incermentOdd", "incrementWait"])
   ```
   6. 开启命名空间后，组件中调用commit
   ```javascript
   //方式一：自己直接commit
   this.$store.commit('personAbout/ADD_PERSON',person)
   //方式二：借助mapMutations
   ...mapMutations('countAbout',{increment: "INCERMENT",decrement: "DECREMENT",})
   ```