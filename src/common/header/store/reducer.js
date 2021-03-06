import * as constants from "./constants";
import { fromJS } from "immutable";

const defaultState = fromJS({
  focused: false,
  mouseIn: false, // 鼠标是否在小tab上
  list: [],
  page: 1,
  totalPage: 1
});

// reducer导出一个纯函数（固定输入有固定输出且无副作用）
// 接收了state即defaultState但是不能修改，只能返回一个新值，且需纯函数
// 把state变成一个immutable对象

export default (state = defaultState, action) => {
  console.log("接收参数action::", action);

  switch (action.type) {
    case constants.SEARCH_FOCUS:
      return state.set("focused", true);
    case constants.SEARCH_BLUR:
      return state.set("focused", false);
    case constants.CHANGE_LIST:
      // return state.set("list", action.data).set("totalPage", action.totalPage);
      // set多次会返回多个immutable，性能问题，merge只执行一次
      return state.merge({
        list: action.data,
        totalPage: action.totalPage
      });
    case constants.MOUSE_ENTER:
      return state.set("mouseIn", true);
    case constants.MOUSE_LEAVE:
      return state.set("mouseIn", false);
    case constants.CHANGE_PAGE:
      return state.set("page", action.page);
    default:
      return state;
  }

  // 每条case没有break是因为已经return了

  // if (action.type === constants.SEARCH_FOCUS) {
  //   // immutable 的 set 方法会结合之前 immutable 对象的值，和设置的值，返回一个全新的不可变对象
  //   return state.set("focused", true);
  // }
  // if (action.type === constants.SEARCH_BLUR) {
  //   return state.set("focused", false);
  //   // return { focused: false };
  // }
  // if (action.type === constants.CHANGE_LIST) {
  //   return state.set("list", action.data);
  // }
  // return state;
};
