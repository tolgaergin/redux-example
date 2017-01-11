import $ from 'jquery';
import { createStore } from 'redux';

// http://redux.js.org/docs/recipes/reducers/ImmutableUpdatePatterns.html

const initialTodo = [
  { id: 1, text: 'Counter', status: 'COMPLETED' },
  { id: 2, text: 'Greeting', status: 'COMPLETED' },
  { id: 3, text: 'Weather', status: 'ACTIVE' },
  { id: 4, text: 'TODO', status: 'ACTIVE' },
];

let todoLength = initialTodo.length + 1;

function renderTodo(todo) {
  let classList;

  if (todo.status === 'COMPLETED') {
    classList = 'completed';
  } else if (todo.status === 'ACTIVE') {
    classList = '';
  }

  let template = `
  <li data-id=${todo.id} class=${classList}>
    <span class="todoText">${todo.text}</span>
    <button class="removeTodo">&times;</button>
    <button class="toggleEdit">Edit</button>
    <div class="hidden editForm">
      <input type="text" value=${todo.text}>
      <button class="editTodo">Edit Todo</button>
    </div>
  </li>`;
  return template;
}

function renderList(state) {
  state.sort(function (a, b) {
    return (a.id - b.id);
  });

  const liElements = state.map(todo => renderTodo(todo));
  $('#todoList').html(liElements);
}

// dispatcher
$(document).ready(function () {
  store.dispatch({
    type: 'SAMPLE',
    data: initialTodo,
  });

  $(document).on('click', '.removeTodo', function () {
    store.dispatch({
      type: 'REMOVE',
      id: $(this).parent().data('id'),
    });
  });

  $(document).on('click', '#addTodo', function () {
    store.dispatch({
      type: 'ADD',
      data: {
        id: todoLength,
        text: $('#newTodo').val(),
        status: 'ACTIVE',
      },
    });

    $('#newTodo').val('');
    todoLength++;
  });

  $(document).on('click', '.toggleEdit', function () {
    $(this).next('div').removeClass('hidden');
  });

  $(document).on('click', '.editTodo', function () {

    store.dispatch({
      type: 'EDIT',
      data: {
        id: $(this).parents('li').data('id'),
        text: $(this).prev('input').val(),
        status: 'ACTIVE',
      },
    });
  });

});

// reducers
const reducerTodo = (state, action) => {
  if (action.type === 'SAMPLE') {
    return action.data;
  }

  if (action.type === 'REMOVE') {
    const newState = state.filter(element => element.id !== action.id);

    return newState;
  }

  if (action.type === 'ADD') {
    const newState = [
      ...state,
      action.data,
    ];

    return newState;
  }

  if (action.type === 'EDIT') {
    const findIndex = state.findIndex(todo => todo.id === action.data.id);

    const newState = [
      ...state.slice(0, findIndex),
      ...state.slice(findIndex + 1),
      action.data,
    ];

    return newState;
  }

  return state;
};

// store
const store = createStore(
  reducerTodo,
  initialTodo,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

// subscribe
store.subscribe(() => {
  renderList(store.getState());
});
