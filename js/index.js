import { createStore } from 'redux';
import $ from 'jquery';

const reducer = (state, action) => {
  if (action.type === 'INC') {
    return state + action.payload;
  }

  if (action.type === 'DEC') {
    return state - action.payload;
  }

  return state;
};

const initialState = 0;

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

store.subscribe(() => {
  console.log('store changed', store.getState());
  $('#count').text(store.getState());
});

$(document).ready(() => {
  $('#inc').on('click', () => {
    store.dispatch({
      type: 'INC',
      payload: 1,
    });
  });

  $('#dec').on('click', () => {
    store.dispatch({
      type: 'DEC',
      payload: 1,
    });
  });

  $('#firstInput').on('keyup', function () {
    let userInput = $(this).val();
    userStore.dispatch({
      type: 'FIRST',
      payload: userInput,
    });
  });

  $('#lastInput').on('keyup', function () {
    let userInput = $(this).val();
    userStore.dispatch({
      type: 'LAST',
      payload: userInput,
    });
  });
});

const userReducer = (state, action) => {

  if (action.type === 'FIRST') {
    return Object.assign({}, state, { first: action.payload, });
  }

  if (action.type === 'LAST') {
    return Object.assign({}, state, { last: action.payload, });
  }

  return state;
};

const userInitialState = {
  first: '',
  last: '',
};

const userStore = createStore(
  userReducer,
  userInitialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

userStore.subscribe(() => {
  console.log('user store changed', userStore.getState());
  const { first, last } = userStore.getState();

  $('#first').text(first);
  $('#last').text(last);
});
