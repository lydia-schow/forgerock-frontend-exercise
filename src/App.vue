<template>
  <div id="app">
    <h1>todos</h1>
    <ul class="todo-list">
      <li v-for="todo in list" :key="todo.id" class="todo-item">
        {{ todo.body }}
      </li>
    </ul>
  </div>
</template>

<script>
import { v4 as uuid } from "uuid";

import faker from "faker";

/**
 * Generate a single todo item
 */
const makeTodo = () => ({
  id: uuid(),
  body: faker.random.words(6),
  priority: faker.random.arrayElement([1, 2, 3])
});

/**
 * Generate a list of todo items
 *
 * @param {Number} count the number of items to create
 * @return {Array} an array of todo items
 */
const makeTodoList = (count = 5) => {
  const list = [];

  for (let i = 0; i < count; i++) {
    list.push(makeTodo());
  }

  return list;
};

const PRIORITIES = {
  1: "life changing",
  2: "important",
  3: "meh"
};

export default {
  name: "App",
  data() {
    return {
      list: makeTodoList(5),
      form: {
        body: "",
        priority: PRIORITIES[3]
      }
    };
  },
  methods: {
    /**
     * Add a new todo item to the list.
     *
     * @param {Object} todo
     * @property {String} [todo.body] describes what needs to be done
     * @property {Number} [todo.priority] a priority, from 1 to 3
     */
    add({ body = "", priority = 3 }) {
      this.list.push({
        id: uuid(),
        body,
        priority
      });
    },

    /**
     * Remove a todo item
     *
     * @param {String} id the unique identifier of the item you want to remove
     */
    remove(id) {
      this.list = this.list.filter(todo => todo.id !== id);
    },

    /**
     * Remove all todo items at once
     */
    clear() {
      this.list = [];
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 3.75rem auto 0;
  max-width: 35rem;
}

h1 {
  text-align: center;
}

.todo-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.todo-item {
  border: 0.0625rem solid #f5f5f5;
  padding: 1rem;
  margin-bottom: -0.0625rem;
}
</style>
