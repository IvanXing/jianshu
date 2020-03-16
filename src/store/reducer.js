// 原始的 combineReducers 从 redux 中来，改造的 combineReducers 从 redux-immutable 中来
// import { combineReducers } from "redux";

import { combineReducers } from "redux-immutable";

// 导入路径太长
// import headerReducer from "../common/header/store/reducer";
// index改造 会自动找store下的reducer，并重命名为headerReducer

import { reducer as headerReducer } from "../common/header/store";

const reducer = combineReducers({
  header: headerReducer
});

export default reducer;

// export default combineReducers({
//   header: headerReducer
// });
