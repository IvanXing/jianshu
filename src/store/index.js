import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;

// const store = createStore(reducer); // 原始版本创建store，引入插件需改造

// compose是一个包装函数，可以向这个函数中传递多个方法，传递的方法会依次执行
