<template>
  <div id="app">
    <div class="space-between">
      <span>
        <!-- This empty span is neccesary for the layout to work correctly -->
      </span>
      <h1>todos</h1>
      <button type="button" class="clear-button" @click="clear()">
        Clear All
      </button>
    </div>
    <ul class="todo-list">
      <li v-for="todo in list" :key="todo.id" class="todo-item space-between">
        <div class="todo-item-body">
          <span>{{ todo.body }}</span>
          <span class="priority">{{ priorityLabel(todo.priority) }}</span>
        </div>
        <button
          type="button"
          class="todo-item-delete"
          alt="Delete item"
          @click="remove(todo.id)"
        >
          &times;
        </button>
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
    },

    /**
     * Return the corresponding text for a priority number
     *
     * @param {Number} priority
     * @return {String}
     */
    priorityLabel(priority) {
      return PRIORITIES[priority];
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
  margin-bottom: -0.0625rem;
}

.todo-item-body {
  padding: 1rem;
}

.todo-item-delete {
  background: transparent;
  border: none;
  border-radius: 0;
  color: #ccc;
  cursor: pointer;
  display: inline-block;
  font-size: 1.5rem;
  line-height: 1;
  margin: 0;
  padding: 1rem;
  text-align: center;
  text-transform: uppercase;
  transition: color 0.15s ease-in-out;
  user-select: none;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  /* TODO: shift baseline up so the X is exactly in the middle */
}

.todo-item-delete:hover {
  color: #2c3e50;
}

.priority {
  display: inline-block;
  font-size: 75%; /* try to match the x-height of the body copy */
  line-height: 1;
  text-align: center;
  vertical-align: baseline;
  border-radius: 0.25rem;
  background: #f5f5f5;
  padding: 0.25em 0.5em;
  font-weight: bold;

  /* MAYBE: consider separating margin into a utility class */
  margin-left: 0.5rem;
}

/**
 * Display elements side-by side.
 *
 * See https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 */
.space-between {
  display: flex;
  justify-content: space-between;
}

.clear-button {
  /** TODO: abstract common button attributes into a `button` or `btn` class */
  display: inline-block;
  font-weight: 400;
  color: #2c3e50;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 0.0625rem solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 0.9rem;
  line-height: 1.6;
  border-radius: 0.25rem;
  cursor: pointer;

  font-weight: 400;
  color: #3490dc;
  text-decoration: none;

  margin: 1.5rem 0;
}

.clear-button:hover {
  text-decoration: underline;
}
</style>
