const defaultState = {
  focused: false
};

// reducer导出一个纯函数（固定输入有固定输出且无副作用）
export default (state = defaultState, action) => {
  if (action.type === "search_focus") {
    return {
      focused: true
    };
  }
  if (action.type === "search_blur") {
    return {
      focused: false
    };
  }
  return state;
};
