import React, { Component } from "react";
import {
    Dialog,
    Button,
    Grid,
    FormControlLabel,
    Switch,
    TextField
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import UploadImage from "../forms/UploadImage";
import { checkCode, saveItem, updateItem, saveItemAndChangeRole } from "./CategoryService";
import { generateRandomId } from "utils";
import { KeyboardDatePicker, MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { searchByPage as getCategory } from "../Category/CategoryService";
import { searchByPage as getWebinar } from "../Webinar/WebinarServicev2";
import Autocomplete from "@material-ui/lab/Autocomplete";

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});

class CategoryDialog extends Component {
    state = {
        id: "",
        name: "",
        code: ""
    };

    handleChange = (event, source) => {
        event.persist();
        if (source === "switch") {
            this.setState({ isActive: event.target.checked });
            return;
        }
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleFormSubmit = () => {
        let { id } = this.state;
        let { code } = this.state;
        var { t } = this.props;
        checkCode(id, code).then((result) => {
            //Nếu trả về true là code đã được sử dụng
            if (result.data) {
                toast.warning(t("general.dupli_code"));
                // alert("Code đã được sử dụng");
            } else {
                //Nếu trả về false là code chưa sử dụng có thể dùng
                if (id) {
                    updateItem({
                        ...this.state,
                    }).then((res) => {
                        toast.success(t("general.updateSuccess"));
                        this.props.handleOKEditClose();
                    });
                } else {
                    saveItem({
                        ...this.state,
                    }).then((res) => {
                        toast.success(t("general.addSuccess"));
                        this.props.handleOKEditClose();
                    });
                }
            }
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

    render() {
        let { open, handleClose, handleOKEditClose, t, i18n } = this.props;
        let {
            id,
            name,
            code
        } = this.state;

        return (
            <Dialog
                open={open}
                maxWidth="sm"
                fullWidth
            >
                <div className="p-24">
                    <h4 className="mb-20">{t('general.saveUpdate')}</h4>
                    <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                        <Grid className="mb-16" container spacing={6}>
                            <Grid item sm={12} xs={12}>
                                <TextValidator
                                    className="w-100 mb-16"
                                    label={t('general.code')}
                                    onChange={this.handleChange}
                                    type="text"
                                    name="code"
                                    value={code}
                                    validators={["required"]}
                                    errorMessages={["this field is required"]}
                                />
                                <TextValidator
                                    className="w-100 mb-16"
                                    label={t('general.name')}
                                    onChange={this.handleChange}
                                    type="text"
                                    name="name"
                                    value={name}
                                    validators={["required"]}
                                    errorMessages={["this field is required"]}
                                />
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

export default CategoryDialog;
