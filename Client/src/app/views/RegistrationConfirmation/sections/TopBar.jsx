import React, { Component } from 'react'
import { debounce, classList } from 'utils'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'

class TopBar extends Component {
  state = {
    isTop: true,
    isClosed: true,
  }
  handleScrollRef
  scrollableElement
  componentDidMount() {
    this.scrollableElement = document.querySelector('.scrollable-content')
    if (!this.scrollableElement) this.scrollableElement = window
    if (this.scrollableElement) {
      this.handleScrollRef = this.handleScroll()
      this.scrollableElement.addEventListener('scroll', this.handleScrollRef)
    }
  }

  componentWillUnmount() {
    if (this.scrollableElement) {
      this.scrollableElement.removeEventListener('scroll', this.handleScrollRef)
    }
  }

  handleScroll() {
    return debounce(() => {
      if (this.scrollableElement) {
        let isTop = this.scrollableElement.scrollY < 100
        if (isTop !== this.state.isTop) {
          this.setState({ isTop })
        }
      }
    }, 20)
  }

  close = () => {
    this.setState({ isClosed: true })
  }

  render() {
    let toggleIcon = this.state.isClosed ? 'menu' : 'close'
    return (
      <section
        className={classList({
          header: true,
          'header-fixed': !this.state.isTop,
          closed: this.state.isClosed,
        })}
      >
        <div className="container header-container">
          <div className="brand">
            <img src="./assets/images/logo345.png" alt="logo" />
          </div>
          <IconButton
            className="header__toggle"
            onClick={() => {
              this.setState({ isClosed: !this.state.isClosed })
            }}
          >
            <Icon>{toggleIcon}</Icon>
          </IconButton>
        </div>
      </section>
    )
  }
}

export default TopBar
