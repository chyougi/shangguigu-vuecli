<template>
  <div class="student">
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <button @click="sendStudentName">点击我发送学生姓名到学校组件中</button>
  </div>
</template>

<script>
import pubsub, { PubSub } from 'pubsub-js'
export default {
  name: "MySchool",
  data() {
    return {
      name: '张三',
      sex:'男',
    };
  },
  methods: {
    sendStudentName(){
      // this.$bus.$emit('hello',this.name)
      pubsub.publish('hello',666)
    }
  },
};
</script>

<style lang="less" scoped>
.student {
  background-color: orange;
  padding: 5px;
  margin-top: 30px;
}
</style>