import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import { v4 as uuid } from 'uuid'
import faker from 'faker'

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
}

describe('App.vue', () => {

  it('mounts #smoke', () => {
    const wrapper = mount(App);
    expect(wrapper.exists()).toBe(true);
  })

  it('can add a todo', () => {
    const wrapper = mount(App);

    // The list should be empty before we add an item
    expect(wrapper.vm.list).toHaveLength(0);

    // Add an item
    const todo = {
      body: faker.random.words(6),
      priority: faker.random.arrayElement([1, 2, 3])
    };
    wrapper.vm.add(todo);

    // The item should have been added to the todo list
    const actual = wrapper.vm.list[0];
    expect(wrapper.vm.list).toHaveLength(1);
    expect(actual.body).toEqual(todo.body);
    expect(actual.priority).toEqual(todo.priority);

  });

  it('can remove a todo', () => {
    const count = 5;

    const wrapper = mount(App, {
      data() {
        return {
          list: makeTodoList(count),
        }
      }
    });

    // There should be count number of todos in the list
    expect(wrapper.vm.list).toHaveLength(count);

    // Remove a random item
    const todo = faker.random.arrayElement(wrapper.vm.list);
    wrapper.vm.remove(todo.id);

    // The item should no longer be in the list
    expect(wrapper.vm.list).toHaveLength(count - 1)
    expect(wrapper.vm.list).not.toContainEqual(todo)
  });

  it.todo('can clear all todos');

})
