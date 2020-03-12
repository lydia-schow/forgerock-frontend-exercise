<template>
  <div id="app">
    <h1>todos</h1>
  </div>
</template>

<script>
const PRIORITIES = {
  1: "life changing",
  2: "important",
  3: "meh"
};

export default {
  name: "App",
  data() {
    return {
      todoList: [],
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
     * @property {String} todo.id a unique identifier
     * @property {String} todo.body describes what needs to be done
     * @property {Number} todo.priority a priority, from 1 to 3
     */
    add(todo) {},

    /**
     * Remove a todo item
     *
     * @param {String} id the unique identifier of the item you want to remove
     */
    remove(id) {},

    /**
     * Remove all todo items at once
     */
    clear() {}
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
