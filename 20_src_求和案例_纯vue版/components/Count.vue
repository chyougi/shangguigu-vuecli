<template>
  <div>
    <h1>当前求和为：{{ sum }}</h1>
    <select v-model.number="number">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incermentOdd">当前求和为奇数再加</button>
    <button @click="incrementWait">等一等再加</button>
  </div>
</template>

<script>
export default {
  name: "Count",
  data () {
    return {
      number:1, //用户选择的数字
      sum:0, //当前的和 
    }
  },
  methods: {
    increment(){
      this.sum += this.number
    },
    decrement(){
      this.sum -= this.number
    },
    incermentOdd(){
      if(this.sum % 2){
        this.sum += this.number
      }
    },
    incrementWait(){
      setTimeout(() => {
        this.sum += this.number
      }, 300);
    }
  },
};
</script>

<style>
button {
  margin-left: 10px;
}
</style>