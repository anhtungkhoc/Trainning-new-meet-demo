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
import { checkCode, saveItem, updateItem, saveItemAndChangeRole } from "./WebinarCategoryService";
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

var key = "";

class WebinarCategoryDialog extends Component {
    state = {
        id: "",
        categories: [],
        category: [],
        webinars: [],
        webinar: {}
    };

    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);

    }

    handleTextChange(event) {
        key = event.target.value
        // this.setState({ keyword: event.target.value },()=>{
        //   console.log(this.state.keyword)
        // });
    }

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
        var { t } = this.props;

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

        let searchObject = {}
        searchObject.keyword = this.state.keyword
        searchObject.pageIndex = 1
        searchObject.pageSize = 10000
        getCategory(searchObject).then(({ data }) => {
            this.setState({ categories: [...data.content] }, () => {
            })
        })
        console.log("aasf", this.state.categories);
        getWebinar(searchObject).then(({ data }) => {
            this.setState({ webinars: [...data.content] }, () => {
            })
        })
    }

    // handleImageSelect = (file) => {
    //     let reader = new FileReader();

    //     reader.onloadend = () => {
    //         this.setState({
    //             file: file,
    //             imagePreviewUrl: reader.result,
    //         });
    //     };

    //     reader.readAsDataURL(file);
    // };

    // handleImageRemove = () => {
    //     this.setState({
    //         file: null,
    //         imagePreviewUrl: "",
    //     });
    // };

    render() {
        let { open, handleClose, handleOKEditClose, t, i18n } = this.props;
        let {
            id,
            categories,
            category,
            webinars,
            webinar
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
                                <Autocomplete
                                    id="combo-box"
                                    options={categories ? categories : []}
                                    value={this.state.category != null ? this.state.category : null}
                                    renderInput={(params) => <TextField {...params}
                                        value={this.state.category != null ? this.state.category : null}
                                        label={<span><span style={{ color: "red" }}></span>{t("webinarCategory.category")}</span>}
                                        variant="outlined"
                                        size="small"
                                    />}
                                    onChange={(event, value) => {
                                        this.setState({ category: value })
                                    }}
                                    getOptionLabel={(option) => option.name}
                                    getOptionSelected={(option, value) =>
                                        option.id === value.id
                                    }
                                    validators={["required"]}
                                    errorMessages={[t("general.required")]}
                                />
                            </Grid>

                            <Grid item sm={12} xs={12}>
                                <Autocomplete
                                    id="combo-box"
                                    options={webinars ? webinars : []}
                                    value={this.state.webinar != null ? this.state.webinar : null}
                                    renderInput={(params) => <TextField {...params}
                                        value={this.state.webinar != null ? this.state.webinar : null}
                                        label={<span><span style={{ color: "red" }}></span>{t("webinarCategory.webinar")}</span>}
                                        variant="outlined"
                                        size="small"
                                    />}
                                    onChange={(event, value) => {
                                        this.setState({ webinar: value })
                                    }}
                                    getOptionLabel={(option) => option.name}
                                    getOptionSelected={(option, value) =>
                                        option.id === value.id
                                    }
                                    validators={["required"]}
                                    errorMessages={[t("general.required")]}
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

export default WebinarCategoryDialog;
