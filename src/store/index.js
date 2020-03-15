import { createStore, compose } from "redux";
import reducer from "./reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers());

// const store = createStore(reducer); // 原始，引入插件需改造

export default store;

// compose是一个包装函数，可以向这个函数中传递多个方法，传递的方法会依次执行
