import * as constants from "./constants";
import { fromJS } from "immutable";

const defaultState = fromJS({
  focused: false,
  list: []
});

// reducer导出一个纯函数（固定输入有固定输出且无副作用）
// 接收了state即defaultState但是不能修改，只能返回一个新值，且需纯函数
// 把state变成一个immutable对象

export default (state = defaultState, action) => {
  console.log("接收参数action::", action);
  if (action.type === constants.SEARCH_FOCUS) {
    // immutable 的 set 方法会结合之前 immutable 对象的值，和设置的值，返回一个全新的不可变对象
    return state.set("focused", true);
  }
  if (action.type === constants.SEARCH_BLUR) {
    return state.set("focused", false);
    // return { focused: false };
  }
  if (action.type === constants.CHANGE_LIST) {
    return state.set("list", action.data);
  }
  return state;
};
