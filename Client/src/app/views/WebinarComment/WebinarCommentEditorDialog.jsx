import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Checkbox,
  TextField,
  FormControlLabel
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { getUserByUsername, saveItem, updateItem, addNewUser, getAllRoles, saveUserZoom, getUserZoom, updateUserZoom } from "./WebinarCommentService";
import { searchByPage as getAllWebinars } from "../Webinar/WebinarServicev2";
import AsynchronousAutocomplete from "../utilities/AsynchronousAutocomplete";
import ControlledExpansionPanels from "../material-kit/expansion-panel/ControlledAccordion";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

class WebinarCommentEditorDialog extends Component {
  constructor(props) {
    super(props);
    getAllWebinars({
      pageIndex: 1,
      pageSize: 20,
      text: ''
    }).then((result) =>{
      console.log(result);
      let listWebinar = result.data.content;
      this.setState({ listWebinar: listWebinar });
    })
  }
  state = {
    id: "",
    webinar: {},
    comment: "",
    listWebinar: []
    // listWebinar: [
    //   {
    //     id: "3c782e05-964c-450c-83c1-7aaf2d17a6dc",
    //     name: "Hoi thao 1"
    //   }, 
    //   {
    //     id: "9e1cda12-bc94-4c0b-b44f-13bdbdb87664",
    //     name: "Hoi thao 2"
    //   }
    // ] 
    
  };


  handleChange = (event, source) => {
    event.persist();
    if (source === "comment") {
      let { comment } = this.state;
      comment = comment ? comment : "";
      comment = event.target.value;
      this.setState({ comment: comment });
      return;
    }
    if (source === "webinar") {
      let { webinar } = this.state;
      webinar = webinar ? webinar : {};
      webinar = this.state.listWebinar.find(w => w.id === event.target.value);
      this.setState({ webinar: webinar });
      return;
    }
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = () => {
    let { id } = this.state;
    let { t } = this.props;
    if(id != 0 && id != null) {
      updateItem(id, { 
        id: id,
        webinar: this.state.webinar,
        comment: this.state.comment
      }).then(({ data }) =>{
        toast.success(t("webinar_comment.noti.updateSuccess"));
        this.props.handleOKEditClose();
      });
    } else {
      saveItem({
        webinar: this.state.webinar,
        comment: this.state.comment
      }).then(({ data }) =>{
        toast.success(t("webinar_comment.noti.addSuccess"));
        this.props.handleOKEditClose();
      });
    }
  };

  selectRoles = (rolesSelected) => {
    this.setState({ roles: rolesSelected }, function () {
    });
  }

  componentWillMount() {
    let { open, handleClose, item } = this.props;
    this.setState(item);
  }

  

  render() {
    let { open, handleClose, handleOKEditClose, t, i18n } = this.props;
    let {
      id,
      webinar,
      comment,
      listWebinar
    } = this.state;

    return (
      <Dialog onClose={handleClose} open={open} maxWidth={'md'} fullWidth={true}>
        <div className="p-24">
          <h4 className="mb-20">{t('SaveUpdate')}</h4>
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
            <Grid className="mb-16" container spacing={2}>
              <Grid item sm={12} xs={12}>
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="gender-simple">{t('webinar.webinarName')}</InputLabel>
                  <Select
                    value={webinar ? webinar.id : ''}
                    onChange={webinar => this.handleChange(webinar, "webinar")}
                    inputProps={{
                      name: "gender",
                      id: "gender-simple"
                    }}
                  >
                    {listWebinar.map(item => {
                      return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={t('webinar_comment.comment')}
                  onChange={comment => this.handleChange(comment, "comment")}
                  type="text"
                  name="name"
                  value={comment ? comment : ''}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
              
              
            </Grid>

            <div className="flex flex-space-between flex-middle">
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
              <Button variant="contained" color="secondary" onClick={() => this.props.handleClose()}>Cancel</Button>
            </div>
          </ValidatorForm>
        </div>
      </Dialog>
    );
  }
}

export default WebinarCommentEditorDialog;
