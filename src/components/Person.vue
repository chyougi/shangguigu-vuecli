<template>
  <div>
    <h1>人员列表</h1>
    <h3 style="color: red">Count组件求和为：{{ sum }}</h3>
    <h3>列表中第一个人的名字是：{{ firstPersonName }}</h3>
    <input type="text" placeholder="请输入名字" v-model="name" />
    <button @click="add">添加</button>
    <button @click="addPersonWang">添加一个姓王的人</button>
    <button @click="addPersonFromServer">从数据库得到列表</button>
    <ul v-for="person in personList" :key="person.id">
      <li>{{ person.name }}</li>
    </ul>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import { nanoid } from "nanoid";
export default {
  name: "person",
  data() {
    return {
      name: "",
    };
  },
  methods: {
    add() {
      const personObj = { id: nanoid(), name: this.name };
      this.$store.commit("personAbout/ADD_PERSON", personObj);
      this.name = "";
    },
    addPersonWang() {
      const personObj = { id: nanoid(), name: this.name };
      this.$store.dispatch("personAbout/addPersonWang", personObj);
      this.name = "";
    },
    addPersonFromServer(){
      this.$store.dispatch("personAbout/addPersonFromServer")
    }
  },
  computed: {
    personList() {
      return this.$store.state.personAbout.personList;
    },
    // ...mapState(['personList']),
    sum() {
      return this.$store.state.countAbout.sum;
    },
    firstPersonName() {
      return this.$store.getters["personAbout/firstPersonName"];
    },
  },
};
</script>

<style>
</style>