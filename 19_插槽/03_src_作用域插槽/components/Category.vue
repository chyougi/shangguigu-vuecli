<template>
  <div class="category">
    <h3>{{ title }}分类</h3>
    <!-- 定义一个插槽（挖个坑，等着组件的使用者进行填充） -->
    <slot :games="games">我是一些默认值，当使用者没有传递具体结构时，我会出现</slot>
  </div>
</template>

<script>
export default {
    name:'Category',
    props: ['title'],
    data() {
    return {
      games: ["NBA2K25", "龙珠电光火石", "维多利亚3", "荒野大镖客2"]
    };
  },
}
</script>

<style>
.category{
    background-color: skyblue;
    width: 200px;
    height: 300px;
}
h3{
    text-align: center;
    background-color: orange;
}
img{
    width: 100%;
    height: 50%;
}
</style>