import React, { Component } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";

// import * as actionCreators from "./store/actionCreators";
import { actionCreators } from "./store";

import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  Addition,
  Button,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoList,
  SearchInfoItem,
  SearchWrapper,
  NavSearch
} from "./style";

class Header extends Component {
  getListArea() {
    if (this.props.focused) {
      return (
        <SearchInfo>
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch>换一批</SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            {this.props.list.map(item => {
              return <SearchInfoItem key={item}>{item}</SearchInfoItem>;
            })}
          </SearchInfoList>
        </SearchInfo>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <HeaderWrapper>
        <Logo href="./" />
        <Nav>
          <NavItem className="left active">首页</NavItem>
          <NavItem className="left">下载APP</NavItem>
          <NavItem className="right">登录</NavItem>
          <NavItem className="right">
            <i className="iconfont">&#xe636;</i>
          </NavItem>
          <SearchWrapper>
            <CSSTransition
              in={this.props.focused}
              timeout={200}
              classNames="slide"
            >
              <NavSearch
                className={this.props.focused ? "focused" : ""}
                onFocus={this.props.handleInputFocus}
                onBlur={this.props.handleInputBlur}
              ></NavSearch>
            </CSSTransition>
            <i className={this.props.focused ? "focused iconfont" : "iconfont"}>
              &#xe614;
            </i>
            {this.getListArea()}
          </SearchWrapper>
        </Nav>
        <Addition>
          <Button className="writting">
            <i className="iconfont">&#xe615;</i>写文章
          </Button>
          <Button className="reg">注册</Button>
        </Addition>
      </HeaderWrapper>
    );
  }
}

// 此时Header是一个无状态组件，改写成函数，无状态组件性能高
// const Header = props => {
//   return (props.focused);
// };

// store中取数据
const mapStateToProps = state => {
  return {
    // 原始写法
    // focused: state.header.focused
    // 引入immutable写法
    // focused: state.header.get("focused")
    // 引入redux-immutable把state也变成了不可变对象
    //focused: state.get("header").get("focused")
    // getIn方法为不可变对象state下header下的focused
    focused: state.getIn(["header", "focused"]),
    list: state.getIn(["header", "list"])
  };
};

// 派发动作
const mapDispatchToProps = dispatch => {
  return {
    handleInputFocus() {
      // 派发获取list tab的数据
      dispatch(actionCreators.getList());
      // 派发聚焦操作
      dispatch(actionCreators.searchFocus());
    },
    handleInputBlur() {
      dispatch(actionCreators.searchBlur());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
