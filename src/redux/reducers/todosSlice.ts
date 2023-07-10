import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of your state
type Todo = {
  _id?: string;
  id: string;
  title: string;
  content: string;
  done: boolean;
  writerEmail: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type TodosState = {
  todos: Todo[] | null;
  todo: Todo | null;
  hasMoreTodos:boolean,
  Loading:boolean,
  haveNew:boolean,
  modalOn:boolean,
  viewMode:number,
  viewMethod:number,
  page:number,
  haveWorking:number,
  haveDone:number,
};

// Define payload types for actions as needed
type LoadTodosPayload = {
  length: number;
  todos: Todo[];
  pageNum: number;
  Todos: Todo[];
};

const initialState:TodosState = {
  todos:null,
  todo:null,
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
    loadTodos: (state:TodosState, action: PayloadAction<LoadTodosPayload>) => {
      console.log(state.todos)
      state.todos = action.payload.Todos
    },
    loadTodo: (state:TodosState, action: PayloadAction<LoadTodosPayload>) => {
      if(state.todos instanceof Array) state.todos = state.todos.concat(action.payload)
    },
    loadTodosWorking:(state:TodosState, action: PayloadAction<LoadTodosPayload>) => {
      if(state.todos instanceof Array) state.todos = state.todos.concat(action.payload)
      state.hasMoreTodos = action.payload.length === 10
    },
    loadTodosDone:(state:TodosState, action: PayloadAction<LoadTodosPayload>) => {
      if(state.todos instanceof Array) state.todos = state.todos.concat(action.payload)
      state.hasMoreTodos = action.payload.length === 10
    },
    loadTodosPaging:(state:TodosState, action: PayloadAction<LoadTodosPayload>) => {
      console.log(state.todos)
      state.todos = action.payload.todos
      state.page = action.payload.pageNum
    },
    loadTodosWorkingPaging: (state:TodosState, action: PayloadAction<LoadTodosPayload>) => {
      state.todos = action.payload.todos
      state.page = action.payload.pageNum
    },
    loadTodosDonePaging: (state:TodosState, action: PayloadAction<LoadTodosPayload>) => {
      state.todos = action.payload.todos
      state.page = action.payload.pageNum
    },
    resetTodos: (state:TodosState, action: PayloadAction<LoadTodosPayload>) => {
      state.todos = []
      state.hasMoreTodos=true
      state.viewMode=1
      state.viewMethod=1
    },
    TodoAdd: (state:TodosState, action: PayloadAction<LoadTodosPayload>) => {
      if(state.todos instanceof Array) state.todos = state.todos.concat(action.payload)
    },
    TodoDelete: (state:TodosState, action: PayloadAction<LoadTodosPayload>) => {
      if(state.todos instanceof Array) state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleDone:(state:TodosState, action: PayloadAction<LoadTodosPayload>) => {
      if(state.todos instanceof Array)
      state.todos = state.todos.map(todo =>
        todo.id === action.payload
          ? {...todo, done: !todo.done}
          : todo
      );
    },
    trueHaveNew: (state:TodosState, action: PayloadAction<LoadTodosPayload>) => {
      state.haveNew = true
    },
    falseHaveNew: (state:TodosState, action: PayloadAction<LoadTodosPayload>) => {
      state.haveNew = false
    },
    trueLoading:(state:TodosState, action: PayloadAction<LoadTodosPayload>) => {
      state.Loading = true
    },
    falseLoading:(state:TodosState, action: PayloadAction<LoadTodosPayload>) => {
      state.Loading = false
    },
    trueModal:(state:TodosState, action: PayloadAction<LoadTodosPayload>) => {
      state.modalOn = true
      state.todo = action.payload as Todo
    },
    falseModal:(state:TodosState, action: PayloadAction<LoadTodosPayload>) => {
      state.modalOn = false
      state.todo = null
    },
    changeContent:(state:TodosState, action: PayloadAction<LoadTodosPayload>) => {
      state.todo = action.payload as Todo
    },
    changeViewMode:(state:TodosState, action: PayloadAction<LoadTodosPayload>) => {
      state.todos = []
      state.viewMode = action.payload as number
      state.hasMoreTodos=true
    },
    changeViewMethod:(state:TodosState, action: PayloadAction<LoadTodosPayload>) => {
      state.todos = []
      state.viewMethod = action.payload as number
      state.hasMoreTodos=true
    },
    authTodos:(state:TodosState, action: PayloadAction<LoadTodosPayload>) => {
      if(state.todos instanceof Array) state.todos = state.todos.concat(action.payload)
    },
  },
})

export const {loadTodos,trueLoading,falseLoading,changeContent,trueModal,falseModal,loadTodo,loadTodosWorking,trueHaveNew,falseHaveNew,loadTodosDone,resetTodos,loadTodosWorkingPaging,loadTodosDonePaging,loadTodosPaging ,changeViewMethod ,changeViewMode ,TodoDelete,toggleDone,authTodos} = todosSlice.actions

export default todosSlice.reducer