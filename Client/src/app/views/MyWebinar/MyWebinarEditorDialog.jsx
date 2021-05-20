import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import UploadImage from "../forms/UploadImage";
import {
  checkCode,
  saveItem,
  updateItem,
  uploadImage,
  saveItemAndChangeRole,
  getAllUser,
  getWebinarByCode,
} from "./MyWebinarServicev2";
import { generateRandomId } from "utils";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getAllWebinar } from "./MyWebinarServicev2";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { findUserByUserName, searchByPage, getUserByUsername } from "../User/UserService";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

class MyWebinarEditorDialog extends Component {
  state = {
    idWebinar: "",
    idUser: "",
    name: "",
    description: "",
    startTime: new Date(),
    endTime: new Date(),
    // isActive: false
    imageUrl: "",
    imagePreviewUrl: "",
    dataAllWebinar: [],
    listCode: [],
    code: "",
    listUser: [],
    userName: "",
    role: "",

    isHost: "",
    isAttendee: "",
    isPanelist: "",
    isFavourite: "",
    isJoin: ""
  };

  handleChangeText(event) {
    const name = event.target.name;
    this.setState({
      ...this.state,
      [name]: event.target.value,
    });
  }

  componentDidMount() {
    getAllWebinar().then((res) => {
      this.setState({ dataAllWebinar: res.data});
    });
    searchByPage(1, 10).then(({ data }) => {
      this.setState({ itemList: [...data.content] });
    });
  }

  selectCode = (codeSelected) => {
    this.setState({ code: codeSelected });
    getWebinarByCode(codeSelected.name).then(res => {
      let object = res.data;
      this.setState({name: object.name,
                    startTime: object.startTime,
                    endTime: object.endTime,
                    idWebinar: res.data.id})
    })
  };
  
  selectUsername = (userNameSelected) => {
    this.setState({ userName: userNameSelected, idUser: userNameSelected.id });
  };

  selectRole = (roleSelected) => {
    this.setState({ role: roleSelected });
    let abc = roleSelected.text;
    let isHost = "isHost";
    let isAttendee = "isAttendee";
    let isPanelist = "isPanelist";
    let isFavourite = "isFavourite";
    let isJoin = "isJoin";
    if(isHost === abc.toString()) {
      this.setState({isHost: 1, role: "isHost"})
    } else if(isAttendee === abc.toString()) {
      this.setState({isAttendee: 1, role: "isAttendee"})
    } else if(isPanelist === abc.toString()) {
      this.setState({isPanelist: 1, role: "isPanelist"})
    } else if(isFavourite === abc.toString()) {
      this.setState({isFavourite: 1, role: "isFavourite"})
    } else if(isJoin === abc.toString()) {
      this.setState({isJoin: 1, role: "isJoin"})
    }
    
  };

  handleChange = (event, source) => {
    event.persist();
    // if (source === "switch") {
    //   this.setState({ isActive: event.target.checked });
    //   return;
    // }
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFormSubmit = () => {
    
    var obj = {}
    
    if(this.state.isHost == "") {
      this.setState({isHost: 0})
    }
    if(this.state.isAttendee == "") {
      this.setState({isAttendee: 0})
    }
    if(this.state.isPanelist == "") {
      this.setState({isPanelist: 0})
    }
    if(this.state.isFavourite == "") {
      this.setState({isFavourite: 0})
    }
    if(this.state.isJoin == "") {
      this.setState({isJoin: 0})
    }

    const { idUser, idWebinar, isHost, isAttendee, isPanelist, isFavourite, isJoin } = this.state
    
    obj.user = {
      id: idUser
    };
    obj.webinar = {
      id: idWebinar
    };
    obj.isHost = isHost;
    obj.isAttendee = isAttendee;
    obj.isPanelist = isPanelist;
    obj.isFavourite = isFavourite;
    obj.isJoin = isJoin;
    
    saveItem(obj).then(res => {
      console.log("djfdj"+res.data)
    })
  };

  handleFileSelect = (file) => {
    this.setState({
      file: file,
    });
  };

  handleDateChange = (date, name) => {
    this.setState({
      [name]: date,
    });
  };

  componentWillMount() {
    //getUserById(this.props.uid).then(data => this.setState({ ...data.data }));
    let { open, handleClose, item } = this.props;
    this.setState(item);
  }

  handleImageSelect = (file) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  handleImageRemove = () => {
    this.setState({
      file: null,
      imagePreviewUrl: "",
    });
  };

  render() {
    let { open, handleClose, handleOKEditClose, t, i18n } = this.props;
    let {
      code,
      dataAllWebinar,
      itemList,
      userName,
      role,
    } = this.state;

    const top100Films = [
      { text: "isHost"},
      { text: "isAttendee"},
      { text: "isPanelist"},
      { text: "isFavourite"},
      { text: "isJoin"},
    ];

    return (
      <Dialog open={open} maxWidth="sm" fullWidth>
        <div className="p-24">
          <h4 className="mb-20">{t("SaveUpdate")}</h4>
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
            <Grid className="mb-16" container spacing={6}>
              <Grid item sm={12} xs={12}>
                {dataAllWebinar && (
                  <Autocomplete
                    style={{ width: "100%" }}
                    id="combo-box-demo"
                    defaultValue=""
                    options={dataAllWebinar}
                    getOptionSelected={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) => option.code}
                    onChange={(event, value) => {
                      this.selectCode(value);
                    }}
                    renderInput={(params) => (
                      <TextValidator
                        {...params}
                        value={code}
                        label={"Mã hội thảo"}
                        fullWidth
                        validators={["required"]}
                        errorMessages={[t("user.please_select_permission")]}
                      />
                    )}
                  />
                )}

                {itemList && (
                  <Autocomplete
                    style={{ width: "100%" }}
                    id="combo-box-demo"
                    defaultValue=""
                    options={itemList}
                    getOptionSelected={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) => option.username}
                    onChange={(event, value) => {
                      this.selectUsername(value);
                    }}
                    renderInput={(params) => (
                      <TextValidator
                        {...params}
                        value={userName}
                        label={"Username"}
                        fullWidth
                        validators={["required"]}
                        errorMessages={[t("user.please_select_permission")]}
                      />
                    )}
                  />
                )}

                {top100Films && (
                  <Autocomplete
                    style={{ width: "100%" }}
                    id="combo-box-demo"
                    defaultValue=""
                    options={top100Films}
                    getOptionSelected={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) => option.text}
                    onChange={(event, value) => {
                      this.selectRole(value);
                    }}
                    renderInput={(params) => (
                      <TextValidator
                        {...params}
                        value={role}
                        label={"Check Role"}
                        fullWidth
                        validators={["required"]}
                        errorMessages={[t("user.please_select_permission")]}
                      />
                    )}
                  />
                )
                }
              </Grid>
            </Grid>

            <div className="flex flex-space-between flex-middle">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => this.props.handleClose()}
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </div>
          </ValidatorForm>
        </div>
      </Dialog>
    );
  }
}

export default MyWebinarEditorDialog;
