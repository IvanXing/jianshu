import * as constants from "./constants";
import axios from "axios";
import { fromJS } from "immutable";

export const searchFocus = () => ({
  type: constants.SEARCH_FOCUS
});

export const searchBlur = () => ({
  type: constants.SEARCH_BLUR
});

export const mouseEnter = () => ({
  type: constants.MOUSE_ENTER
});

export const mouseLeave = () => ({
  type: constants.MOUSE_LEAVE
});

export const changePage = page => ({
  type: constants.CHANGE_PAGE,
  page
});

const changeList = data => {
  return {
    type: constants.CHANGE_LIST,
    data: fromJS(data), // reducer中设置的是immutable的数据，此处先转换
    totalPage: Math.ceil(data.length / 10) // Math.ceil取整
  };
};

// 异步获取数据 返回一个对象 dispatch操作
// 获取数据 创建action然后dispatch
export const getList = () => {
  return dispatch => {
    axios
      .get("/api/headerList.json")
      .then(res => {
        const data = res.data.data;
        const action = changeList(data);
        dispatch(action);
      })
      .catch(() => {
        console.log("error");
      });
  };
};
