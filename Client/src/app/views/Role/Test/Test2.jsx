import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  Grid,
} from "@material-ui/core";
import {
  EgretSidenavContainer,
  EgretSidenav,
  EgretSidenavContent,
} from "egret";
import ConstantList from "../../appConfig";
// import { getOffer, updateOffer } from "../../redux/actions/EcommerceActions";
import { Check, Clear } from "@material-ui/icons";
import { useTranslation, t } from "react-i18next";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

class Test2 extends Component {

    render() {
        return(
            <div>
                {/* <EgretSidenavContainer> */}
                <Grid item container xs={12} lg={12} md={3} sm={3} spacing={2} style={{align:"center"}}>
                    <Grid xs={5} lg={5} md={4} sm={4}  spacing={1} 
                      direction="row" 
                    >
                        {/* <EgretSidenav
                            width="100%"
                            bgClass="bg-transperant"
                        > */}
                            <div className="product__image-box flex flex-center flex-middle position-relative justify-content-center" >
                              <img
                                  src={ConstantList.ROOT_PATH + "assets/images/WebinarDefault.jpg"}
                                  alt={"publicOffer"}
                                  style={{ border: '5px ', borderRadius: '5px' }}
                                  className="img"
                              />
                                  
                            </div>
                          </Grid>

                        {/* </EgretSidenav> */}
                    
                    <Grid item lg={5} md={5} sm={5} xs={5} className="p-10 b-w">
                            <div className="movie-card">
                                {/*--- Tên hội thảo -----*/}
                                <div className="movie-content" >
                                  <div className="movie-content-header">
                                    <h3 className="movie-title_grid">Tên hội thảo </h3>
                                  </div>
                                  <div className="movie-info">
                                    <div className="info-section_grid">
                                      <label>Tên</label>
                                    </div>
                                  </div>
                                </div>
                                {/*----- Mã hội thảo -------*/}
                                <div className="movie-content" >
                                  <div className="movie-content-header">
                                    <h3 className="movie-title_grid">Mã hội thảo </h3>
                                  </div>
                                  <div className="movie-info">
                                    <div className="info-section_grid">
                                      <label>Code</label>
                                    </div>
                                  </div>
                                </div>
                                {/*----- Mô tả hội thảo ----*/}
                                <div className="movie-content" >
                                  <div className="movie-content-header">
                                    <h3 className="movie-title_grid">Mô tả </h3>
                                  </div>
                                  <div className="movie-info">
                                    <div className="info-section_grid">
                                      <label>Mô tả</label>
                                    </div>
                                  </div>
                                </div>
                                {/*---- Ngày bắt đầu ---------*/}
                                <div className="movie-content" >
                                  <div className="movie-content-header">
                                    <h3 className="movie-title_grid">Thời gian</h3>
                                  </div>
                                  <div className="movie-info">
                                    <div className="info-section_grid">
                                      <label>
                                       Ngày bắt đầu
                                      </label>
                                      <label>
                                        Ngày kết thúc
                                      </label>
                                    </div>
                                  </div>
                                </div>
                            </div>
                          <div className="movie-card">
                        
                            Donald John Trump (born June 14, 1946) is an American media personality and businessman who served as the 45th president of the United States from 2017 to 2021.

Born and raised in Queens, New York City, Trump attended Fordham University for two years and received a bachelor's degree in economics from the Wharton School of the University of Pennsylvania. He became the president of his father Fred Trump's real estate business in 1971, and renamed it to The Trump Organization. Trump expanded the company's operations to building and renovating skyscrapers, hotels, casinos, and golf courses. He later started various side ventures, mostly by licensing his name. Trump and his businesses have been involved in more than 4,000 state and federal legal actions, including six bankruptcies. He owned the Miss Universe brand of beauty pageants from 1996 to 2015. From 2003 to 2015 he co-produced and hosted the reality television series The Apprentice.
</div>  
                    </Grid>  
                    </Grid>
            </div>
        );
    }
}
export default Test2;