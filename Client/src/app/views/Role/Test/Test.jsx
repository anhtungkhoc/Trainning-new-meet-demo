import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  IconButton,
  Icon,
  Hidden,
  Grid,
  Button,
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
// import {
//   searchByPageChildOfOffer,
//   historyOfPrivateOfferPayout,
// } from "../Offer/OfferService";
// import localStorageService from "../../services/localStorageService";
import axios from "axios";
// import ScrollableTabsButtonForce from "./ScrollableTabsButtonForce";
// import ChangeHistoryPrivateOfferAgencyDialog from "./ChangeHistoryPrivateOfferAgencyDialog";
import { toast } from "react-toastify";
toast.configure({
  autoClose: 3000,
  draggable: false,
  limit: 3,
});
const USER_REQUESTED = "USER_REQUESTED";
const NEW = "NEW";
const APPROVED = "APPROVED";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// toast.configure({
//   autoClose: 2000,
//   draggable: false,
//   limit: 1,
//   //etc you get the idea
// });

class Test extends Component {
  state = {
    open: true,
    totalElements: 0,
    rowsPerPage: 25,
    page: 0,
    totalElementsHistory: 0,
    rowsPerPageHistory: 25,
    pageHistory: 0,
    url1: "awdaw",
    shouldOpenHistorySpecifixPublisher: false,
    itemListHistory: [],
    offerDto: {},
    trackerVisitUrl: ""
  };

  toggleSidenav = () => {
    this.setState({
      open: !this.state.open,
    });
  };

//   setPage = (page) => {
//     this.setState({ page }, function () {
//       this.updatePageData();
//     });
//   };

//   setRowsPerPage = (event) => {
//     this.setState({ rowsPerPage: event.target.value, page: 0 }, function () {
//       this.updatePageData();
//     });
//   };

//   handleChangePage = (event, newPage) => {
//     this.setPage(newPage);
//   };

//   setPageHistory = (pageHistory) => {
//     this.setState({ pageHistory }, function () {
//       this.updatePageDataHistory();
//     });
//   };

//   setRowsPerPageHistory = (event) => {
//     this.setState(
//       { rowsPerPageHistory: event.target.value, pageHistory: 0 },
//       function () {
//         this.updatePageDataHistory();
//       }
//     );
//   };

//   handleChangePageHistory = (event, newPage) => {
//     this.setPageHistory(newPage);
//   };

  handleClose = () => {
    this.setState({
      shouldOpenHistorySpecifixPublisher: false,
    });
  };

  componentDidMount = () => {
    // const offerId = this.props.match.params.offerId;
    // this.props.getOffer(offerId);

    // axios.get(ConstantList.API_ENPOINT + "/api/offer/" + offerId).then(res => {
    //   this.setState({ isPublicPayout: res.data.isPublicPayout })
    // const s = document.createElement('script');
    // s.type = 'text/javascript';
    // s.async = true;
    // if (this.state.isPublicPayout) {
    //   s.innerHTML = '    var a = document.getElementsByTagName("a") \n for(var i = 0; i < a.length;i++) \n { if(a[i].href.includes("offers/list")){ \n a[i].classList.add("active")} \n } ';
    // } else if (this.state.isPublicPayout === false) {
    //   s.innerHTML = '    var a = document.getElementsByTagName("a") \n for(var i = 0; i < a.length;i++) \n { if(a[i].href.includes("offers/my-list")){ \n a[i].classList.add("active")} \n } ';
    // }
    // if (s != null) {
    //   this.instance.appendChild(s);
    // }
    // });
  };

//   updatePageDataHistory() {
//     var searchObject = {};
//     searchObject.keyword = this.state.keyword;
//     searchObject.pageIndex = this.state.pageHistory + 1;
//     searchObject.pageSize = this.state.rowsPerPageHistory;
//     searchObject.id = this.props.match.params.offerId;
//     historyOfPrivateOfferPayout(searchObject).then(({ data }) => {
//       this.setState({
//         itemListHistory: [...data.content],
//         totalElementsHistory: data.totalElements,
//       });
//     });
//   }

//   updatePageData() {
//     const user = localStorageService.getLoginUser();
//     if (user?.netWork) {
//       var searchObject = {};
//       searchObject.keyword = this.state.keyword;
//       searchObject.locations = this.state.locations;
//       searchObject.pageIndex = this.state.page + 1;
//       searchObject.pageSize = this.state.rowsPerPage;
//       searchObject.agencyId = user.id;
//       searchByPageChildOfOffer(
//         searchObject,
//         this.props.match.params.offerId
//       ).then(({ data }) => {
//         this.setState({
//           itemList: [...data.content],
//           totalElements: data.totalElements,
//         });
//       });
//     }
//   }

  componentWillMount() {
    // this.updatePageData();
    // this.updatePageDataHistory();

    // axios.get(ConstantList.API_ENPOINT + "/api/offer/" + this.props.match.params.offerId).then((res) => {
    //   this.setState({ offerDto: res.data })
    // });

  }

  componentWillUnmount() {
    // const s = document.createElement('script');
    // s.type = 'text/javascript';
    // s.async = true;
    // if (this.state.isPublicPayout) {
    //   s.innerHTML = '    var a = document.getElementsByTagName("a") \n for(var i = 0; i < a.length;i++) \n { if(a[i].href.includes("offers/list")){ \n a[i].classList.remove("active")} \n } ';
    // } else {
    //   s.innerHTML = '    var a = document.getElementsByTagName("a") \n for(var i = 0; i < a.length;i++) \n { if(a[i].href.includes("offers/my-list")){ \n a[i].classList.remove("active")} \n } ';
    // }
    // this.instance.appendChild(s);
  }

  renderLandingPages = (landingPage) => {
    return (
      <p className="w-100 p-12 m-0">
        <a href={landingPage.url} target="_blank" rel="noopener noreferrer">
          {landingPage.url}
        </a>{" "}
        <a href={landingPage.url} target="_blank" rel="noopener noreferrer">
          <IconButton>
            <Icon className="inline-block verticle-bottom text-green">
              open_in_new
            </Icon>
          </IconButton>
        </a>
      </p>
    );
  };

  selectOffer = () => {
    const offerId = this.props.match.params.offerId;
    let updatedOffer = this.props.offer;
    updatedOffer.status = USER_REQUESTED;
    this.props.updateOffer(offerId, updatedOffer);
  };

  deselectOffer = () => {
    const offerId = this.props.match.params.offerId;
    let updatedOffer = this.props.offer;
    updatedOffer.status = NEW;
    this.props.updateOffer(offerId, updatedOffer);
  };

  handleFormSubmit = () => {
    const { t } = this.props;
    let landing = this.state.offerDto.product.landingPages;
    let checkLP = false;
    let checkPLP = false;

    for (let i = 0; i < landing.length; i++) {
      if (
        landing[i].type === "Landing Page"
        && landing[i].checked === true
      ) {
        checkLP = true;
      }

      if (
        landing[i].type === "Pre Landing Page"
        && landing[i].checked === true
      ) {
        checkPLP = true;
      }
    }

    if (checkLP === false || checkPLP === false) {
      if (checkPLP === false && checkLP === false) {
        return toast.error(t("Offer.landing_select_both"))
      }

      if (checkLP === false) {
        return toast.error(t("Offer.landing_select_LP"))
      }

      if (checkPLP === false) {
        return toast.error(t("Offer.landing_select_PLP"))
      }

    }

    axios.post(ConstantList.API_ENPOINT + "/api/offerLandingpage", this.props.offerDto).then((res) => {
      // alert("sucess");
      if (res && res.data) {
        toast.success(t("Offer.landing_update"));
        // if (res.data.messageType == "success") {
        //   toast.success(res.data.message);
        // }
        // else{
        //   toast.warning(res.data.message);
        // }
      }
      else {
        toast.error(t("Offer.landing_update_error"));
      }
    }).catch((err) => {
      toast.error(t("Offer.landing_update_error"));
    });;
  }

  handleFormSubmitName = (e) => {
    e.preventDefault();
    const { t } = this.props;
    const temp = this.state.offerDto.id;

    axios.put(ConstantList.API_ENPOINT + "/api/offer/updateNameCampaign/"+temp,this.state.offerDto).then((res) => {
      // alert("sucess");
      if (res && res.data) {
        toast.success(t("Offer.name_update"));
        // if (res.data.messageType == "success") {
        //   toast.success(res.data.message);
        // }
        // else{
        //   toast.warning(res.data.message);
        // }
      }
      else {
        toast.error(t("Offer.name_update_error"));
      }
    }).catch((err) => {
      toast.error(t("Offer.name_update_error"));
    });;
    // console.log(this.state.offerDto.name);

  }

  handleFormSubmitGeneratorURL = () => {
    this.setState({ trackerVisitUrl: this.state.offerDto.trackerVisitUrl })
  };

  handleChangeSelectLandingPage = (landingPage) => {
    var offerDtoFake = {};
    offerDtoFake = this.state.offerDto;
    offerDtoFake.product.landingPages.forEach(element => {
      if (element.id === landingPage.id) {
        if (element.checked) {
          element.checked = false;
        } else {
          element.checked = true;
        }
      }
    });
    this.setState({ offerDto: offerDtoFake })
  };

  render() {
    const { offer, t } = this.props;
    let {
      page,
      totalElements,
      shouldOpenHistorySpecifixPublisher,
      totalElementsHistory,
      rowsPerPage,
      rowsPerPageHistory,
      pageHistory,
      offerDto,
      trackerVisitUrl
    } = this.state;
    // const user = localStorageService.getLoginUser();


    return (
      <div className="left-sidenav-card">
        <div className="left-sidenav-card__content offerDetail">
          {/* <div ref={(el) => (this.instance = el)} /> */}
          <EgretSidenavContainer>
            <Grid xs={12} lg={3} style={{
              display: "block"
            }}>
              <EgretSidenav
                width="100%"
                bgClass="bg-transperant"
                open={this.state.open}
                toggleSidenav={this.toggleSidenav}
              >
                <div className="left-sidenav-card__sidenav">
                  <div className="bg-default">
                    <Grid item lg={12} md={12} sm={12} xs={12} className="p-12">
                      <div class="movie-card">
                        <div
                          class="movie-header"
                          style={{
                            backgroundImage:
                              'url("' + offer.product?.mainImageUrl + '")',
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        >
                        </div>

                        <div class="movie-content">
                          <div class="movie-content-header">
                            <a href="#">
                              <h3 class="movie-title">{offer.product?.name}</h3>
                            </a>
                            {/* <div class="imax-logo"></div> */}
                          </div>
                          <div class="movie-info">
                            <div class="info-section_offerDetail">
                              <span> {t("Offer.price")}: </span>
                            </div>
                            <div class="info-section_offerDetail">
                              <label>
                                {" "}
                                {offer.product?.price.toLocaleString("en-US")}
                                {currencyIcon}
                              </label>
                            </div>
                          </div>
                        </div>

                        {offer?.status === NEW ? (
                          <span></span>
                        ) : (
                            <div class="movie-content">
                              <div class="movie-info">
                                <div class="info-section_offerDetail">
                                  <span> {t("Offer.Origin_Payout")}: </span>
                                </div>
                                <div class="info-section_offerDetail">
                                  <label>
                                    {" "}
                                    {offer?.status === NEW ? (
                                      <span className="text-muted">
                                        {offer.product.payoutValue?.toLocaleString(
                                          "en-US"
                                        )}
                                      </span>
                                    ) : (
                                        offer.product?.currentPayout?.toLocaleString(
                                          "en-US"
                                        )
                                      )}
                                    {currencyProductPayoutIcon}
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}

                        <div class="movie-content">
                          <div class="movie-info">
                            <div class="info-section_offerDetail">
                              <span> {t("Offer.payout")}: </span>
                            </div>
                            <div class="info-section_offerDetail">
                              {offer.status === NEW ? (
                                <label>
                                  {offer.product.currentPayout?.toLocaleString(
                                    "en-US"
                                  )}
                                &nbsp; {currencyProductPayoutIcon}
                                </label>
                              ) : (
                                  <label>
                                    {offer.payoutValue?.toLocaleString("en-US")}
                                &nbsp; {currencyPayoutIcon}
                                  </label>
                                )}
                            </div>
                          </div>
                        </div>

                        <div class="movie-content">
                          <div class="movie-info">
                            <div class="info-section_offerDetail">
                              <span> {t("Offer.conversion_type")}: </span>
                            </div>
                            <div class="info-section_offerDetail">
                              <label> {offer.product?.conversionType}</label>
                            </div>
                          </div>
                        </div>

                        <div class="movie-content">
                          <div class="movie-info">
                            <div class="info-section_offerDetail">
                              <span> {t("Offer.geography")}:</span>
                            </div>
                            <div class="info-section_offerDetail">
                              <label> {offer.product?.location}</label>
                            </div>
                          </div>
                        </div>

                        <div class="movie-content">
                          <div class="movie-info">
                            <div class="info-section_offerDetail">
                              <span> {t("Offer.category")}: </span>
                            </div>
                            <div class="info-section_offerDetail">
                              <label>
                                {" "}
                                {offer.product?.categories
                                  .map((category) => category.name)
                                  .join()}
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* <div class="movie-content">
                        <div class="movie-info">
                          <div class="info-section_offerDetail">
                            <span> {t("Offer.description")}:</span>
                          </div>
                          <div class="info-section_offerDetail">
                            <label> {offer.product?.description}</label>
                          </div>
                        </div>
                      </div> */}
                      </div>

                      {/* {this.state.offerDto.isPublicPayout === true && user.userManage?.id !== null ? (
                        offer?.status === USER_REQUESTED ? (
                          <Button
                            variant="contained"
                            color="secondary"
                            className="mt-10"
                            onClick={this.deselectOffer}
                          >
                            {t("Offer.deselect_this_offer")}
                            <Clear className="ml-10 mb-4" />
                          </Button>
                        ) : offer?.status !== APPROVED ? (
                          <Button
                            variant="contained"
                            color="primary"
                            className="mt-10"
                            onClick={this.selectOffer}
                          >
                            <span>{t("Offer.select_this_offer")}</span>
                            <Check className="ml-10 mb-4" />
                          </Button>
                        ) : (
                              ""
                            )
                      ) : (
                          ""
                        )} */}
                    </Grid>
                  </div>
                </div>
              </EgretSidenav>
            </Grid>
            <Grid xs={12} lg={9}>
              <EgretSidenavContent>
                <EgretSidenav width="100%">
                  {/* <Grid
                  className="content-card m-4"
                  elevation={2}
                  container
                  width={100}
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                >
                  <div className="card-header flex flex-wrap flex-middle ml-8">
                    <div className="show-on-mobile">
                      <IconButton onClick={this.toggleSidenav}>
                        <Icon>short_text</Icon>
                      </IconButton>
                    </div>
                    <div className="hide-on-mobile">
                      <div className="pl-16"></div>
                    </div>
                    {/* <div>Target URL</div>
                  </div>
                  <Divider /> */}
                  {/* <Grid container spacing={1}>
                    <Grid
                      container
                      item
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      className="p-12"
                    >
                      <p style={{ fontWeight: "bold", margin: "10px" }}>
                        Landing Pages
                      </p>
                      {typeof landingPages !== "undefined" &&
                      landingPages !== null
                        ? landingPages
                            .filter(
                              (landingPage) =>
                                landingPage.type === "Landing Page"
                            )
                            .filter((landingPage) => landingPage.isShow)
                            .map((landingPage) =>
                              this.renderLandingPages(landingPage)
                            )
                        : ""}
                    </Grid>
                    <Grid
                      container
                      item
                      lg={6}
                      md={6}
                      sm={6}
                      xs={6}
                      className="p-12"
                    >
                      <p style={{ fontWeight: "bold", margin: "10px" }}>
                        Pre Landing Pages
                      </p>
                      {typeof landingPages !== "undefined" &&
                      landingPages !== null
                        ? landingPages
                            .filter(
                              (landingPage) =>
                                landingPage.type === "Pre Landing Page"
                            )
                            .filter((landingPage) => landingPage.isShow)
                            .map((landingPage) =>
                              this.renderLandingPages(landingPage)
                            )
                        : ""}
                    </Grid>
                  </Grid> */}
                  {/* </Grid> */}

                  {/* {offer.isPublicPayout === false ? ( */}
                  {/* <ScrollableTabsButtonForce
                    t={t}
                    trackerVisitUrl={trackerVisitUrl}
                    columnsHistory={columnsHistory}
                    itemListHistory={this.state.itemListHistory}
                    totalElementsHistory={totalElementsHistory}
                    rowsPerPageHistory={rowsPerPageHistory}
                    pageHistory={pageHistory}
                    handleChangePageHistory={this.handleChangePageHistory}
                    setRowsPerPageHistory={this.setRowsPerPageHistory}
                    columns={columns}
                    itemList={this.state.itemList}
                    totalElements={totalElements}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleChangePage={this.handleChangePage}
                    setRowsPerPage={this.setRowsPerPage}
                    offer={offerDto}
                    user={user}
                    handleChangeSelectLandingPage={this.handleChangeSelectLandingPage}
                    handleFormSubmit={this.handleFormSubmit}
                    handleFormSubmitGeneratorURL={this.handleFormSubmitGeneratorURL}
                    handleFormSubmitName={this.handleFormSubmitName} 
                  /> */}
                  {/* ) : (
                    ""
                  )} */}

                  {/* {offer.isPublicPayout === false ? (
                  <Card className="content-card m-4" elevation={2}>
                    <div className="card-header flex flex-wrap flex-middle ml-8">
                      <div className="show-on-mobile">
                        <IconButton onClick={this.toggleSidenav}>
                          <Icon>short_text</Icon>
                        </IconButton>
                      </div>
                      <div className="hide-on-mobile">
                        <div className="pl-16"></div>
                      </div>
                      <h5>History Change Payout Offer</h5>
                    </div>
                    <Divider />

                    <MaterialTable
                      title={t("Offer.private_offer_list")}
                      localization={{
                        body: {
                          emptyDataSourceMessage: `${t('general.emptyDataMessageTable')}`
                        },
                        toolbar: {
                          nRowsSelected: `${t('general.selects')}`
                        }
                      }}
                      data={this.state.itemListHistory ? this.state.itemListHistory : []}
                      columns={columnsHistory}

                      options={{
                        headerStyle: {
                          color: "#ffffff",
                          backgroundColor: "#000099"
                        },
                        rowStyle: rowData => ({
                          backgroundColor: (rowData.tableData.id % 2 == 1) ? '#EEE' : '#FFF',
                        }),
                        maxBodyHeight: '450px',
                        minBodyHeight: '370px',
                        selection: false,
                        padding: "dense",
                        actionsColumnIndex: -1,
                        paging: false,
                        search: false,
                        toolbar: false
                      }}
                      components={{
                        Toolbar: (props) => <MTableToolbar {...props} />,
                      }}
                      onSelectionChange={(rows) => {
                        this.data = rows;
                      }}
                    />
                    <TablePagination
                      align="left"
                      className="px-16"
                      labelRowsPerPage={t("general.rowperpage")}
                      rowsPerPageOptions={[1, 5, 10, 25, 50]}
                      component="div"
                      count={totalElementsHistory}
                      rowsPerPage={rowsPerPageHistory}
                      page={pageHistory}
                      backIconButtonProps={{
                        "aria-label": "Previous Page",
                      }}
                      nextIconButtonProps={{
                        "aria-label": "Next Page",
                      }}
                      onChangePage={this.handleChangePageHistory}
                      onChangeRowsPerPage={this.setRowsPerPageHistory}
                    />

                  </Card>
                ) : ""}


                {user?.netWork === true && offer.isPublicPayout === false ? (
                  <Card className="content-card m-4" elevation={2}>
                    <div className="card-header flex flex-wrap flex-middle ml-8">
                      <div className="show-on-mobile">
                        <IconButton onClick={this.toggleSidenav}>
                          <Icon>short_text</Icon>
                        </IconButton>
                      </div>
                      <div className="hide-on-mobile">
                        <div className="pl-16"></div>
                      </div>
                      <h5>Offer Payout for specific Publisher</h5>
                    </div>
                    <Divider />
                    <MaterialTable
                      title={t("Offer.private_offer_list")}
                      localization={{
                        body: {
                          emptyDataSourceMessage: `${t('general.emptyDataMessageTable')}`
                        },
                        toolbar: {
                          nRowsSelected: `${t('general.selects')}`
                        }
                      }}
                      data={this.state.itemList ? this.state.itemList : []}
                      columns={columns}

                      options={{
                        headerStyle: {
                          color: "#ffffff",
                          backgroundColor: "#7467ef"
                        },
                        rowStyle: rowData => ({
                          backgroundColor: (rowData.tableData.id % 2 == 1) ? '#EEE' : '#FFF',
                        }),
                        maxBodyHeight: '450px',
                        minBodyHeight: '370px',
                        selection: false,
                        padding: "dense",
                        actionsColumnIndex: -1,
                        paging: false,
                        search: false,
                        toolbar: false
                      }}
                      components={{
                        Toolbar: (props) => <MTableToolbar {...props} />,
                      }}
                      onSelectionChange={(rows) => {
                        this.data = rows;
                      }}
                    />
                    <TablePagination
                      align="left"
                      className="px-16"
                      labelRowsPerPage={t("general.rowperpage")}
                      rowsPerPageOptions={[1, 5, 10, 25, 50]}
                      component="div"
                      count={totalElements}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      backIconButtonProps={{
                        "aria-label": "Previous Page",
                      }}
                      nextIconButtonProps={{
                        "aria-label": "Next Page",
                      }}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.setRowsPerPage}
                    />
                  </Card>
                ) : ""} */}
                </EgretSidenav>
              </EgretSidenavContent>
            </Grid>
          </EgretSidenavContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    offer: state.ecommerce.offer,
  };
};

export default connect(mapStateToProps, {
  
})(Test);
