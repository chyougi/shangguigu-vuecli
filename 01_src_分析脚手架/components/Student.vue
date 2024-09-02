<template>
  <!-- //组建的结构 -->
  <div>
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生年龄：{{ address }}</h2>
    <button @click="showName">点我提示学生姓名</button>
  </div>
</template>

<script>
//组件交互相关的代码（数据、方法等等）
export default {
  name: "MyStudent",
  data() {
    return {
      name: "张三",
      age: 18,
    };
  },
  methods: {
    showName() {
      alert(this.name);
      // console.log(this);
    },
  },
};
</script>
