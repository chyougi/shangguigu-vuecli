<template>
  <div class="container">
    <Category title="美食">
      <img
        slot="center"
        src="https://img1.baidu.com/it/u=1498569108,2766801127&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067"
        alt=""
      />
      <a slot="footer" href="http://baidu.com">更多美食</a>
    </Category>
    <Category title="游戏">
      <ul slot="center">
        <li v-for="(game, index) in games" :key="index">{{ game }}</li>
      </ul>
      <div class="foot" slot="footer">
        <a href="https://www.gamersky.com/">单机游戏</a>
        <a href="https://www.ali213.net/">网络游戏</a>
      </div>
    </Category>
    <Category title="电影">
      <template v-slot:footer>
        <div class="foot">
        <a href="http://baidu.com">经典</a>
        <a href="http://baidu.com">热门</a>
        <a href="http://baidu.com">推荐</a>
      </div>
      <h4>欢迎前来观影</h4>
      </template>
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
.container,.foot {
  display: flex;
  justify-content: space-around;
}
h4{
  text-align: center;
}
</style>