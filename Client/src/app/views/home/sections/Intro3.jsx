import React, { Component } from "react";import {
  Icon,
  Grid,
  Fab
} from "@material-ui/core";
import ConstantList from "../../../appConfig";
import Moment from 'moment';
import { connect } from "react-redux";
import { logoutUser } from "app/redux/actions/UserActions";
import { PropTypes } from "prop-types";
import Carousel from "../common/Carousel";

class Intro3 extends Component {
  handleSignOut = () => {this.props.logoutUser();};
  constructor(props) {
    super(props);
  }

  state = {
    currentEQARound: null,
  };
  render() {
    const { t, i18n } = this.props;
    const background = { backgroundColor: 'black' }
    
    let {
      currentEQARound
    } = this.state;
    return (
      <section className="section section-intro1 section-intro3" id="intro3" style={background}>
        <div className="container">
          <Grid container spacing={1} justify="center">
            <Grid item xs={12} sm={12} md={12} lg={12} >
              <Carousel/>
              
            </Grid>
          </Grid>
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
  {logoutUser}
)(Intro3);