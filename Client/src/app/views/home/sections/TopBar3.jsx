import {
  Icon,
  IconButton,
  Fab,
} from "@material-ui/core";
import { connect } from "react-redux";
import { logoutUser } from "app/redux/actions/UserActions";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { debounce, classList } from "utils";
import { NavLink } from "react-router-dom";
import ScrollTo from "../common/ScrollTo";
import ConstantList from "../../../appConfig";

class TopBar3 extends Component {
  handleSignOut = () => { this.props.logoutUser(); };
  state = {
    isTop: true,
    isClosed: true
  };
  handleScrollRef;
  scrollableElement;
  componentDidMount() {
    this.scrollableElement = document.querySelector(".scrollable-content");
    if (!this.scrollableElement) this.scrollableElement = window;
    if (this.scrollableElement) {
      this.handleScrollRef = this.handleScroll();
      this.scrollableElement.addEventListener("scroll", this.handleScrollRef);
    }
  }

  componentWillUnmount() {
    if (this.scrollableElement) {
      this.scrollableElement.removeEventListener(
        "scroll",
        this.handleScrollRef
      );
    }
  }

  handleScroll() {
    return debounce(() => {
      if (this.scrollableElement) {
        let isTop = this.scrollableElement.scrollY < 100;
        if (isTop !== this.state.isTop) {
          this.setState({ isTop });
        }
      }
    }, 20);
  }

  close = () => {
    this.setState({ isClosed: true });
  };
  render() {
    const styleImg = {width:'350px'};
    const { t, i18n } = this.props;
    const background = { backgroundColor: 'black' }
    let toggleIcon = this.state.isClosed ? "menu" : "close";
    return (
      <section
        style={background}
        className={classList({
          header: true,
          "header-fixed ": !this.state.isTop,
          closed: this.state.isClosed
        })}
      >
        <div className="container header-container ">
          <div className="landing ">
            <NavLink to="/">
              <img style={styleImg} src="./assets/images/logos/logomeet.png" alt=""/>
            </NavLink>
          </div>
          <div className="mr-0">
            <input type="text" className="form-controll search-bar" placeholder="Tìm kiếm" name="text" />
            {/* <div className="m-auto" /> */}
            {/* <Fab
              variant="extended"
              size="medium"
              color="secondary"
              aria-label="Buy"
              className="mr-16"
              href={ConstantList.ROOT_PATH + "session/signup-register-account"}
            >
              <Icon className="mr-16">person_add</Icon>
              {t("sign_up.title")}
            </Fab>
            <Fab
              variant="extended"
              background={"black"}
              size="medium"
              color="secondary"
              aria-label="Buy"
              className="mr-16"
              href={ConstantList.ROOT_PATH + "session/signin"}
            >
              <Icon className="mr-16">person_pin</Icon>
              {t("sign_in.title")}
            </Fab> */}
            <div className="d-flex mb-0">
              <ul className="nav d-flex align-items-center" id="pc-nav-menu">
                <li className="nav-item">
                  <a className="nav-link active" href="/">Trang chủ</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="/about-us">Giới thiệu</a>
                </li>
                <li className="nav-item ">
                  <a className="nav-link " href={ConstantList.ROOT_PATH + "session/signin"}>Đăng nhập</a>
                </li>
                <li className="nav-item ">
                  <a className="nav-link" href={ConstantList.ROOT_PATH + "session/signup-register-account"}>Đăng ký</a>
                </li>
              </ul>
            </div>
          </div>
          {/* <Button
            variant="extended"
            size="medium"
            color="default"
            aria-label="Buy"
            className=""
            href={ConstantList.ROOT_PATH + "session/signin"}>
                {t("sign_in.title")}
          </Button> */}
          {/* <IconButton
            className="header__toggle"
            onClick={() => {
              this.setState({ isClosed: !this.state.isClosed });
            }}
          >
            <Icon>{toggleIcon}</Icon>
          </IconButton> */}
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  logoutUser: PropTypes.func.isRequired,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(TopBar3);