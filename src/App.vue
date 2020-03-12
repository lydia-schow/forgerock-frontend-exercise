<template>
  <div id="app">
    <h1>todos</h1>
  </div>
</template>

<script>
import { v4 as uuid } from "uuid";

const PRIORITIES = {
  1: "life changing",
  2: "important",
  3: "meh"
};

export default {
  name: "App",
  data() {
    return {
      list: [],
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
