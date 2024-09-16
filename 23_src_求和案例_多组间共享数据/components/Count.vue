<template>
  <div>
    <h1>当前求和为：{{ sum }}</h1>
    <h1>当前的和乘十为：{{ bigSum }}</h1>
    <h3>我在{{ school }}学习{{ subject }}</h3>
    <h3 style="color:red">Person组件的总人数是：{{ personList.length }}</h3>
    <select v-model.number="number">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment(number)">+</button>
    <button @click="decrement(number)">-</button>
    <button @click="incermentOdd(number)">当前求和为奇数再加</button>
    <button @click="incrementWait(number)">等一等再加</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "Count",
  data() {
    return {
      number: 1, //用户选择的数字
    };
  },
  computed: {
    //借助mapState生成计算属性，从state中读取数据。（对象写法）
    // ...mapState({ sum: "sum", school: "school", subject: "subject" }),

    //借助mapState生成计算属性，从state中读取数据。（数组写法）
    ...mapState(["sum", "school", "subject","personList"]),

    // ==============================================

    // bigSum() {
    //   return this.$store.getters.bigSum;
    // },
    //借助mapGetters生成计算属性，从getters中读取数据。（数组写法）
    ...mapGetters(["bigSum"]),
  },
  methods: {
    //借助mapMutations生成对应的方法，方法中会调用commit去联系mutations（对象写法）
    ...mapMutations({ increment: "INCERMENT", decrement: "DECREMENT" }),

    //借助mapMutations生成对应的方法，方法中会调用commit去联系mutations（数组写法）
    // ...mapMutations(['INCERMENT','DECREMENT']),  //组件中的方法名必须与vuex中mutations中的方法名一致

    /* ********************************************* */

    //借助mapActions生成对应的方法，方法中会调用dispatch去联系actions（对象写法）
    // ...mapActions({incermentOdd:'incermentOdd',incrementWait:'incrementWait'})

    //借助mapActions生成对应的方法，方法中会调用dispatch去联系actions（数组写法）
    ...mapActions(["incermentOdd", "incrementWait"]),
  },
  // mounted() {
  //   const x = mapState({ sum: "sum", school: "school", subject: "subject" });
  //   console.log(x);
  // },
};
</script>

<style>
button {
  margin-left: 10px;
}
</style>