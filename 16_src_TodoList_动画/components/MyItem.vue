<template>
  <transition name="todo" appear>
    <li>
      <label>
        <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)" />
        <span v-show="!todo.isEditing">{{ todo.title }}</span>
        <input v-show="todo.isEditing" type="text" :value="todo.title" @blur="handleBlur(todo, $event)"
          ref="inputTitle">
      </label>
      <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
      <button v-show="!todo.isEditing" class="btn btn-edit" @click="handleEdit(todo)">编辑</button>
    </li>
  </transition>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
  name: "MyItem",
  props: ['todo'],
  methods: {
    //勾选or取消勾选
    handleCheck(id) {
      //通知App组件，将对应的todo对象的done值取反
      // this.checkTodo(id)
      this.$bus.$emit('checkTodo', id)
    },
    //删除
    handleDelete(id) {
      if (confirm('确定删除吗？')) {
        // this.deleteTodo(id) // 子传父方法
        // this.$bus.$emit('deleteTodo',id) //全局事件总线方法
        pubsub.publish('deleteTodo', id)
      }
    },
    //编辑
    handleEdit(todo) {
      if (todo.hasOwnProperty('isEditing')) {
        todo.isEditing = true
      } else {
        this.$set(todo, 'isEditing', true)
      }
      this.$nextTick(function () {
        this.$refs.inputTitle.focus()
      })
    },
    handleBlur(todo, e) {
      todo.isEditing = false
      this.$bus.$emit('updateTodo', todo.id, e.target.value)
    }
  }
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #ddd;
}

li:hover button {
  display: block;
}

.todo-enter-active {
    animation: atguigu 0.5s linear;
}

.todo-leave-active {
    animation: atguigu 1s reverse linear;
}

@keyframes atguigu {
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(0px);
    }
}
</style>