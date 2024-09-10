<template>
  <div class="container">
    <Category title="美食">
      <img
        src="https://img1.baidu.com/it/u=1498569108,2766801127&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067"
        alt=""
      />
    </Category>
    <Category title="游戏">
      <ul>
        <li v-for="(game, index) in games" :key="index">{{ game }}</li>
      </ul>
    </Category>
    <Category title="电影">

    </Category>
  </div>
</template>

<script>
import Category from "./components/Category.vue";
export default {
  name: "App",
  components: { Category },
  data() {
    return {
      foods: ["小龙虾", "糖醋排骨", "锅包肉", "羊肉串"],
      games: ["NBA2K25", "龙珠电光火石", "维多利亚3", "荒野大镖客2"],
      films: ["《千机变》", "《头文字D》", "《嫁个有钱人》", "《尚硅谷》"],
    };
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: space-around;
}
</style>