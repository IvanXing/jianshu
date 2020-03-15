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
