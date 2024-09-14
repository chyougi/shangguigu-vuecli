<template>
  <div class="container">
    <Category title="游戏">
      <template slot-scope="atguigu">
        <ul>
          <li v-for="(game, index) in atguigu.games" :key="index">
            {{ game }}
          </li>
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
  </div>
</template>

<script>
import Category from "./components/Category.vue";
export default {
  name: "App",
  components: { Category },
};
</script>

<style>
.container,
.foot {
  display: flex;
  justify-content: space-around;
}
h4 {
  text-align: center;
}
</style>