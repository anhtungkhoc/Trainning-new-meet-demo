import React, { Component } from "react";
import {
  Grid,
  IconButton,
  Icon,
  TablePagination,
  Button,
  TextField
} from "@material-ui/core";
import MaterialTable, { MTableToolbar, Chip, MTableBody, MTableHeader } from 'material-table';
import { Breadcrumb, ConfirmationDialog } from "egret";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import moment from "moment";
import { roleSystem } from "../../role";
import localStorageService from "app/services/localStorageService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { deleteItem, searchByPage, getItemById, addWebinar, checkExits, likeWebinar } from "./UserWebinarServicev2";
import { searchByPage } from "./MyWebinarServicev2";
// import { searchByPage } from "../Webinar/WebinarServicev2";
// import { addWebinar, checkExits, likeWebinar } from "./UserWebinarServicev2";
import WebinarEditorDialog from "./MyWebinarEditorDialog";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

function MaterialButton(props) {
  const { t, i18n } = useTranslation();
  const item = props.item;
  const role = props.role;
  const nowUser = props.nowUser
  return <div>
    <IconButton onClick={() => props.onSelect(item, 0)}>
      <Icon color="">edit</Icon>
    </IconButton>
    {/* <IconButton onClick={() => props.onSelect(item, 1)}>
      <Icon color="error">delete</Icon>
    </IconButton> */}
  </div>;
}

class MyWebinar extends Component {
  state = {
    keyword: '',
    rowsPerPage: 10,
    page: 0,
    item: {},
    view: 'module',
    role: '',
    itemList: [],
    selectAllItem: false,
    selectedList: [],
    totalElements: 0,
    shouldOpenEditorDialog: false,
    shouldOpenConfirmationDialog: false,
    shouldOpenAddWebinarDialog: false,
    shouldOpenConfirmationDeleteAllDialog: false
  };

  numSelected = 0;
  rowCount = 0;

  handleTextChange = event => {
    this.setState({ keyword: event.target.value }, function () {
    })
  };

  handleKeyDownEnterSearch = e => {
    if (e.key === 'Enter') {
      this.search();
    }
  };

  setPage = page => {
    this.setState({ page }, function () {
      this.updatePageData();
    })
  };

  setRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value, page: 0 }, function () {
      this.updatePageData();
    });
  };

  componentDidMount() {
    this.updatePageData();
  }

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  search() {
    this.setState({ page: 0 }, function () {
      var searchObject = {};
      searchObject.text = this.state.keyword;
      searchObject.pageIndex = this.state.page + 1;
      searchObject.pageSize = this.state.rowsPerPage;
      searchByPage(searchObject, this.state.page, this.state.rowsPerPage).then(({ data }) => {
        this.setState({ itemList: [...data.content], totalElements: data.totalElements })
      });
    });
    
  }

  updatePageData = () => {
    var searchObject = {};
    searchObject.text = this.state.keyword;
    searchObject.pageIndex = this.state.page + 1;
    searchObject.pageSize = this.state.rowsPerPage;
    searchByPage(searchObject, this.state.page, this.state.rowsPerPage).then(({ data }) => {
      this.setState({ itemList: [...data.content], totalElements: data.totalElements })
    });
    
  };

  handleDialogClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false,
      shouldOpenAddWebinarDialog: false,
      shouldOpenConfirmationDeleteAllDialog: false
    });
  };

  handleOKEditClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false,
      shouldOpenAddWebinarDialog: false,
    });
    this.updatePageData();
  };

  handleConfirmationResponse = () => {
    // deleteItem(this.state.id).then(() => {
    //   this.updatePageData();
    //   this.handleDialogClose();
    // });
  };

  componentWillMount() {
    this.setState({
      role: localStorageService.getLoginUser().roles
    })
    this.updatePageData();
  }

  componentDidMount() {
    const nowUser = localStorageService.getLoginUser();
    this.setState({ nowUser })
  }

  handleEditItem = item => {
    let { t } = this.props
    // checkExits().then((result) => {
    //   if (result.data) {
        this.setState({
          item: item,
          shouldOpenEditorDialog: true
        });
    //   } else {
    //     toast.warning(t("webinar.userZoom"));
    //   }
    // })
  };

  handleDelete = id => {
    this.setState({
      id,
      shouldOpenConfirmationDialog: true
    });
  };

  async handleDeleteList(list) {
    // for (var i = 0; i < list.length; i++) {
    //   await deleteItem(list[i].id);
    // }
  }

  handleDeleteAll = (event) => {
    this.handleDeleteList(this.data).then(() => {
      this.updatePageData();
      this.handleDialogClose();
    }
    );
  };

  render() {
    const { t, i18n } = this.props;
    let {
      keyword,
      rowsPerPage,
      page,
      totalElements,
      itemList,
      item,
      nowUser,
      role,
      shouldOpenConfirmationDialog,
      shouldOpenEditorDialog,
      shouldOpenConfirmationDeleteAllDialog
    } = this.state;
    
    // if(itemList.isHost) {
    //   this.setState({role: "isHost"})
    // } else if(itemList.isFavourite) {
    //   this.setState({role: "isFavourite"})
    // } else if(itemList.isAttendee) {
    //   this.setState({role: "isAttendee"})
    // } else if(itemList.isJoin) {
    //   this.setState({role: "isJoin"})
    // } else if(itemList.isPanelist) {
    //   this.setState({role: "isPanelist"})
    // }

    let columns = [
      { title: t("webinar.webinarName"), field: "webinarDto.name", width: "160" },
      { title: t("webinar.webinarId"), field: "webinarDto.code", width: "150" },
      {
        title: "Thời gian bắt đầu", field: "webinarDto.startTime", align: "left", width: "150",
        render: (rowData) => moment(rowData.webinarDto.startTime).format("DD-MM-YYYY - kk:mm")
      },
      {
        title: "Thời gian kết thúc", field: "webinarDto.endTime", align: "left", width: "150",
        render: (rowData) => moment(rowData.webinarDto.endTime).format("DD-MM-YYYY - kk:mm")
      },
      { title: t("username"), field: "user.username", width: "150" },
      
      {
        title: t("general.roles"), field: "isJoin", align: "left", width: "150"
      },
      {
        title: t("Action"),
        field: "custom",
        align: "left",
        width: "250",
        render: rowData => <MaterialButton item={rowData}
          onSelect={(rowData, method) => {
            if (method === 0) {
              // getItemById(rowData.id).then(({ data }) => {
              //   if (data.parent === null) {
              //     data.parent = {};
              //   }
              //   this.setState({
              //     item: data,
              //     shouldOpenEditorDialog: true
              //   });
              // })
            } else if (method === 1) {
              this.handleDelete(rowData.id);
            } else {
              alert('Call Selected Here:' + rowData.id);
            }
          }}
        />
      },
    ];
    function createData(name, calories, fat, carbs, protein) {
      return { name, calories, fat, carbs, protein };
    }
    const rows = [
      // this.state.itemList.map((res) => {
      //   let x = res.data;
      //   createData(x.id);
      // })
    ];
    // if(this.state.itemlist != null || this.state.itemlist != "") {
    //   this.state.itemlist.map(res => (
    //     console.log("jjjj"+res.webinarDto.name)
    //   ))
    // }
    // console.log("jdfj"+this.state.itemList+"xx")
    
    return (
      <div className="m-sm-30">
        
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: t('user.title') }]} />
        </div>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            {shouldOpenConfirmationDeleteAllDialog && (
              <ConfirmationDialog
                open={shouldOpenConfirmationDeleteAllDialog}
                onConfirmDialogClose={this.handleDialogClose}
                onYesClick={this.handleDeleteAll}
                text={t('DeleteAllConfirm')}
              />
            )}
            <TextField
              label={t('general.enterSearch')}
              className="mb-16 mr-10"
              type="text"
              name="keyword"
              value={keyword}
              onKeyDown={this.handleKeyDownEnterSearch}
              onChange={this.handleTextChange} />
            <Button
              className="mb-16 mr-16 align-bottom"
              variant="contained"
              color="primary"
              onClick={() => this.search(keyword)}>
              {t('Search')}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <div>
              {/* {shouldOpenEditorDialog && (
                <WebinarEditorDialog t={t} i18n={i18n}
                  handleClose={this.handleDialogClose}
                  open={shouldOpenEditorDialog}
                  handleOKEditClose={this.handleOKEditClose}
                  item={item}
                />
              )} */
              }

              {shouldOpenConfirmationDialog && (
                <ConfirmationDialog
                  title={t("confirm")}
                  open={shouldOpenConfirmationDialog}
                  onConfirmDialogClose={this.handleDialogClose}
                  onYesClick={this.handleConfirmationResponse}
                  text={t('DeleteConfirm')}
                />
              )}
            </div>
            {

            }
            <MaterialTable
              title={t('general.list')}
              data={this.state.itemList}
              columns={columns}
              //parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
              parentChildData={(row, rows) => {
                var list = rows.find((a) => a.id === row.parentId)
                return list
              }}
              localization={{
                body: {
                  emptyDataSourceMessage: `${t('general.emptyDataMessageTable')}`
                },
                toolbar: {
                  // nRowsSelected: '${t('general.selects')}',
                  nRowsSelected: `${t('general.selects')}`
                }
              }}

              options={{
                selection: false,
                actionsColumnIndex: -1,
                paging: false,
                search: false,
                rowStyle: rowData => ({
                  backgroundColor: (rowData.tableData.id % 2 === 1) ? '#EEE' : '#FFF',
                }),
                maxBodyHeight: '450px',
                minBodyHeight: '370px',
                headerStyle: {
                  backgroundColor: '#00bfff',
                  color: '#fff',
                },
                padding: 'dense',
                toolbar: false
              }}
              components={{
                Toolbar: (props) => <MTableToolbar {...props} />,
              }}
              onSelectionChange={(rows) => {
                this.setState({ data: rows })
              }}
            />
            {/* <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}
            
            <TablePagination
              align="left"
              className="px-16"
              rowsPerPageOptions={[1, 2, 3, 5, 10, 25]}
              component="div"
              labelRowsPerPage={t('general.rows_per_page')}
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${t('general.of')} ${count !== -1 ? count : `more than ${to}`}`}
              count={this.state.totalElements}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.setRowsPerPage}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default MyWebinar;