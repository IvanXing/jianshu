// 把header组件下的store统一到index.js中暴露向外

import reducer from "./reducer";
import * as actionCreators from "./actionCreators";
import * as constants from "./constants";

export { reducer, actionCreators, constants };
