<template>
  <div id="app">
    <!-- Header -->
    <div class="space-between">
      <span>
        <!-- This empty span is neccesary for the layout to work correctly -->
      </span>
      <!-- FIXME: the title isn't quite centered -->
      <h1>todos</h1>
      <button type="button" class="clear-button" @click="clear()">
        Clear All
      </button>
    </div>

    <!-- Form -->
    <form @submit="onSubmit" class="space-between">
      <label for="form-body" class="sr-only">What needs to be done?</label>
      <input
        type="text"
        class="form-body"
        id="form-body"
        autocomplete="off"
        autofocus
        v-model="form.body"
      />
      <select class="form-priority" id="form-priority" v-model="form.priority">
        <option
          v-for="(label, key) in $options.priorities"
          :key="key"
          :value="key"
          >{{ label }}</option
        >
      </select>
    </form>

    <!-- List -->
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

export default {
  name: "App",
  priorities: {
    1: "life changing",
    2: "important",
    3: "meh"
  },
  defaultPriority: 3,
  data() {
    return {
      list: [],
      form: {
        body: "",
        priority: this.$options.defaultPriority
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
    add({ body = "", priority = this.$options.defaultPriority }) {
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
      return this.$options.priorities[priority];
    },

    /**
     * Handle the form's submit event
     */
    onSubmit(event) {
      // Stop the page from refreshing
      event.preventDefault();

      // Validate the form
      if (this.form.body == null || this.form.body === "") {
        // Do nothing
        return;
      }
      // TODO: validate priority

      // WARNING: priority being a string might cause issues down stream
      this.add(this.form);

      // Reset the form
      this.form.body = "";
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

.form-body,
.form-priority {
  border: 0.0625rem solid #eee;
  padding: 1rem;
  margin-bottom: -0.0625rem;
  border-radius: 0;
}

.form-body {
  width: 100%;
  margin-right: -0.0625rem;
}

.form-priority {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: #fff;
  display: block;
  box-sizing: border-box;
  box-shadow: none;
  padding-right: 1.75rem;

  /** Caret from Bootstrap 4 https://getbootstrap.com/docs/4.0/components/input-group/#custom-select*/
  background: #fff
    url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E")
    no-repeat right 0.75rem center;
  background-size: 8px 10px;
}

.form-priority::-ms-expand {
  display: none;
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
  padding: 0 1rem;
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

/** See Bootstrap 4 or https://www.w3.org/WAI/tutorials/forms/labels/ */
.sr-only {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
</style>
