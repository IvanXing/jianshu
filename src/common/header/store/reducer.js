import * as constants from "./constants";

const defaultState = {
  focused: false
};

// reducer导出一个纯函数（固定输入有固定输出且无副作用）
export default (state = defaultState, action) => {
  console.log("接收参数action::", action);
  if (action.type === constants.SEARCH_FOCUS) {
    return {
      focused: true
    };
  }
  if (action.type === constants.SEARCH_BLUR) {
    return {
      focused: false
    };
  }
  return state;
};
