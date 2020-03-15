import { combineReducers } from "redux";
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
