import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import UploadImage from "../forms/UploadImage";
import { checkCode, saveItem, updateItem, uploadImage, saveItemAndChangeRole } from "./WebinarServicev2";
import { generateRandomId } from "utils";
import { KeyboardDatePicker, MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

class WebinarEditorDialog extends Component {
  state = {
    id: "",
    name: "",
    code: "",
    description: "",
    startTime: new Date(),
    endTime: new Date(),
    // isActive: false
    imageUrl: "",
    imagePreviewUrl: ""
  };

  handleChange = (event, source) => {
    event.persist();
    // if (source === "switch") {
    //   this.setState({ isActive: event.target.checked });
    //   return;
    // }
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = () => {
    let { id } = this.state;
    let { code } = this.state;
    var checkTime = moment(this.state.startTime).isBefore(this.state.endTime);
    var checkTime2 = new Date() <= (this.state.endTime);
    checkCode(id, code).then((result) => {
      //Nếu trả về true là code đã được sử dụng
      if (result.data) {
        toast.error("Mã đã tồn tại");
      } else {
        if (id) {
          if (checkTime && checkTime2) {
            updateItem({
              ...this.state,
            }).then((res) => {
              if (this.state.file !== null) {
                uploadImage(this.state.file, res.data.id);
              }
            }).then(() => {
              toast.success("Đã cập nhật thành công");
              this.props.handleOKEditClose();
            });
          } else {
            if (!checkTime) toast.error("Thời gian bắt đầu phải trước thời gian kết thúc");
            if (!checkTime2) toast.error("Thời gian kết thúc phải sau thời gian hiện tại");
          }
        } else {
          if (checkTime) {
            saveItemAndChangeRole({
              ...this.state,
            },1).then((res) => {
              if (this.state.file != null) {
                this.setState(
                  {
                    webinarId: res.data.id,
                  },
                  () => {
                    console.log(this.state.webinarId);
                  }
                );
                uploadImage(this.state.file, res.data.id);
              }
            }).then(() => {
              toast.success("Đã thêm thành công");
              this.props.handleOKEditClose();
            });
          } else {
            toast.error("Thời gian bắt đầu phải sớm hơn thời gian kết thúc");
          }
        }
        //Nếu trả về false là code chưa sử dụng có thể dùng
      }
    });
  };

  handleFileSelect = (file) => {
    this.setState({
      file: file,
    });
  };


  handleDateChange = (date, name) => {
    this.setState({
      [name]: date
    });
  }

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
      id,
      name,
      code,
      description,
      startTime,
      endTime,
      imageUrl,
      imagePreviewUrl
    } = this.state;

    return (
      <Dialog
        open={open}
        maxWidth="sm"
        fullWidth
      >
        <div className="p-24">
          <h4 className="mb-20">{t('SaveUpdate')}</h4>
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
            <Grid className="mb-16" container spacing={6}>
              <Grid item sm={12} xs={12}>
                <Grid item sm={12} xs={12}>
                  <UploadImage
                    className="w-100 mb-16"
                    handleImageSelect={this.handleImageSelect}
                    handleImageRemove={this.handleImageRemove}
                    imageUrl={imageUrl}
                    imagePreviewUrl={imagePreviewUrl}
                    t={t}
                  />
                </Grid>
                <TextValidator
                  className="w-100 mb-16"
                  label={t('Code')}
                  onChange={this.handleChange}
                  type="text"
                  name="code"
                  value={code}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label={t('Name')}
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  value={name}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextValidator
                  className="w-100 mb-20"
                  label={t('Description')}
                  onChange={this.handleChange}
                  type="text"
                  name="description"
                  value={description}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <Grid item sm={12} xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                      className="w-100 mb-20"
                      margin="none"
                      id="mui-pickers-date"
                      format="dd/MM/yyyy kk:mm"
                      label="Thời gian bắt đầu"
                      inputVariant="standard"
                      autoOk={true}
                      value={startTime}
                      onChange={date => this.handleDateChange(date, "startTime")}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item sm={12} xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                      className="w-100"
                      margin="none"
                      id="mui-pickers-date"
                      format="dd/MM/yyyy kk:mm"
                      label="Thời gian kết thúc"
                      inputVariant="standard"
                      autoOk={true}
                      value={endTime}
                      onChange={date => this.handleDateChange(date, "endTime")}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </Grid>

            <div className="flex flex-space-between flex-middle">
              <Button variant="contained" color="secondary" onClick={() => this.props.handleClose()}>Cancel</Button>
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

export default WebinarEditorDialog;
