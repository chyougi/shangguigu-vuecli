<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <h2>学生年龄：{{ myAge + 1 }}</h2>
    <button @click="updateAge">尝试修改收到的年龄+1</button>
  </div>
</template>

<script>
export default {
  name: "MySchool",
  data() {
    console.log(this);
    return {
      msg: "我是一个尚硅谷的学生",
      myAge: this.age
    };
  },
  //简单声明接受
  props:['name','age','sex'],
  methods:{
    updateAge(){
      this.myAge++
    }
  }

  //接受的同时对数据进行类型限制
  /*   props:{
    name: String,
    age: Number,
    sex: String
  } */

  //接受的同时对数据：进行类型限制+默认值的指定+必要性的限制
/*   props: {
    name: {
      type: String, //name的类型是字符串
      required: true, //name是必要的
    },
    age: {
      type: Number,
      default: 99,
    },
    sex: {
      type: String,
      reqquired: true,
    },
  }, */
};
</script>

<style>
.school {
  background-color: gray;
}
</style>