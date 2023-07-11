import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  todos: [],
  todo:{},
  hasMoreTodos:true,
  Loading:false,
  haveNew:true,
  modalOn:false,
  viewMode:1,
  viewMethod:1,
  page:1,
  haveWorking:0,
  haveDone:0,
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    loadTodos: (state, action) => {
      console.log(state.todos)
      state.todos = action.payload.Todos
    },
    loadTodo: (state, action) => {
      state.todos = state.todos.concat(action.payload)
    },
    loadTodosWorking: (state, action) => {
      state.todos = state.todos.concat(action.payload)
      state.hasMoreTodos = action.payload.length === 10
    },
    loadTodosDone: (state, action) => {
      state.todos = state.todos.concat(action.payload)
      state.hasMoreTodos = action.payload.length === 10
    },
    loadTodosPaging: (state, action) => {
      console.log(state.todos)
      state.todos = action.payload.todos
      state.page = action.payload.pageNum
    },
    loadTodosWorkingPaging: (state, action) => {
      state.todos = action.payload.todos
      state.page = action.payload.pageNum
    },
    loadTodosDonePaging: (state, action) => {
      state.todos = action.payload.todos
      state.page = action.payload.pageNum
    },
    resetTodos: (state, action) => {
      state.todos = []
      state.hasMoreTodos=true
      state.viewMode=1
      state.viewMethod=1
    },
    TodoAdd: (state, action) => {
      state.todos = state.todos.concat(action.payload)
    },
    TodoDelete: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleDone: (state, action) => {
      state.todos = state.todos.map(todo =>
        todo.id === action.payload
          ? {...todo, done: !todo.done}
          : todo
      );
    },
    trueHaveNew: (state, action) => {
      state.haveNew = true
    },
    falseHaveNew: (state, action) => {
      state.haveNew = false
    },
    trueLoading: (state, action) => {
      state.Loading = true
    },
    falseLoading: (state, action) => {
      state.Loading = false
    },
    trueModal: (state, action) => {
      state.modalOn = true
      state.todo = action.payload
    },
    falseModal: (state, action) => {
      state.modalOn = false
      state.todo = null
    },
    changeContent: (state, action) => {
      state.todo = action.payload
    },
    changeViewMode: (state, action) => {
      state.todos = []
      state.viewMode = action.payload
      state.hasMoreTodos=true
    },
    changeViewMethod: (state, action) => {
      state.todos = []
      state.viewMethod = action.payload
      state.hasMoreTodos=true
    },
    authTodos: (state, action) => {
      state.todos = state.todos.concat(action.payload)
    },
  },
})

export const {loadTodos,trueLoading,falseLoading,changeContent,trueModal,falseModal,loadTodo,loadTodosWorking,trueHaveNew,falseHaveNew,loadTodosDone,resetTodos,loadTodosWorkingPaging,loadTodosDonePaging,loadTodosPaging ,changeViewMethod ,changeViewMode ,TodoDelete,toggleDone,authTodos} = todosSlice.actions

export default todosSlice.reducer