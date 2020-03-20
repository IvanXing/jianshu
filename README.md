## 1.项目搭建（styled-components & Reset.css）

- index.js 中全局导入 CSS 全局可用，但容易造成冲突，应减少耦合，组件化。
- 引入模块 yarn add styled-components@3.3.2
- 注意 styled-components 版本 4 已经升级
- injectGlobal 注入全局, CSS 文件后缀改成 js
- 样式初始化 reset css 不同浏览器对不同标签样式默认处理不同，需要统一。

## 2.Header 组件布局

- src/common/header
- 引入 inconfont，放在全局，index 中导入
- 修改 inconfont.css 为.js，文件中的 src 以及 url 中加./
- 搜索框动画 => 通过数据改变更新 DOM (onFocus 以及 onBlur)
- yarn add react-transition-group 动画效果
- CSSTransition: in 控制变量，timeout 控制时间，slide( slide-enter / slide-enter-active / slide-exit / slide-exit-active)

```js
<CSSTransition in={this.state.focused} timeout={200} classNames="slide">
  <NavSearch
    className={this.state.focused ? "focused" : ""}
    onFocus={this.handleInputFocus}
    onBlur={this.handleInputBlur}
  ></NavSearch>
</CSSTransition>
```

## 3.使用 React-Redux 管理数据

- yarn add redux
- yarn add react-redux
- store -> action -> reducer -> store
- Provider -> connent -> mapStateToProps / mapDispatchToProps
- 无状态组件性能高

## 4.使用 combineReducers 完成数据拆分管理

- redux-devtools-extension 的启用
- 最外层 reducer 代码冗余，根据组件拆分 reducer，并在最外层 combineReducers
- 引入路径的改造

## 5.actionCreators 与 constants 的拆分

- actionCreators 把 action 命名提出，导入直接调用
- constants 常量，把 action 命名集中在一起
- store 中的所有内容都通过 store/index.js 导出暴露出统一位置，方便别的文件引入

## 6.使用 immutable.js

- yarn add immutable（避免自己手动修改 state 的风险）
- immutable 提供一个 fromJS 方法，把 reducer 中的 state 变成不可变对象
- 设置以及返回不可变对象的 set 和 get 方法
- immutable 的 set 方法会结合之前 immutable 对象的值，和设置的值，返回一个全新的对象，保证纯函数
- state.header 下的 focused 已经是一个 immutable 对象，为了取值统一，应该把最外层 state 也设置成不可变对象，就需要
- yarn add redux-immutable
- 原始的 combineReducers 从 redux 中来，改造的 combineReducers 从 redux-immutable 中来

```js
const mapStateToProps = state => {
  return {
    // 未把state变成immutable对象
    focused: state.header.get("focused")
    // 引入redux-immutable把state也变成了不可变对象
    focused: state.get("header").get("focused")
    // getIn方法为不可变对象state下header下的focused
    focused: state.getIn(['header', 'focused'])
  };
};
```

## 7.使用 redux-thunk 中间件构建 ajax 获取数据部分

- yarn add redux-thunk 在 action 中做异步的操作
- redux-thunk 是 action 和 store 之间的中间件
- 最外层 store 中从 redux 中导入 applyMiddleware，创建 store 时，调用 thunk

```js
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
```

- yarn add axios
- 注意 immutable 的数据类型的赋值也需要是 immutable 格式的数据
- mock 数据：先找真实路径，再找 public/api/headerList.json
- state -> mapStateToProps -> this.props.xxx -> mapDispatchToProps -> actionCreator -> diapatch -> state -> mapStateToProps
