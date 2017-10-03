import * as React from "react";
import { addArea, divideSection, clearSubmitStatus } from "./redux/actionCreators";
import { connect } from "react-redux";

import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Checkbox from "material-ui/Checkbox";
import ActionFavorite from "material-ui/svg-icons/action/favorite";
import ActionFavoriteBorder from "material-ui/svg-icons/action/favorite-border";
import Visibility from "material-ui/svg-icons/action/visibility";
import VisibilityOff from "material-ui/svg-icons/action/visibility-off";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";


interface IStatus {
    status: any;
    clearSubmitStatus: () => any;
}

class StatusComponent extends React.Component<IStatus> {
    state = {
        open: false,
        survey_id: "",
    };
    constructor(props: any) {
        super(props);
    }
    componentDidUpdate() {
        if (this.props.status.submitResponse === "success") {
            this.setState({
                open: true,
            });
            this.props.clearSubmitStatus();
        }
    }

    handleRefresh = () => {
        window.location.reload();
    };

    handleBackToIndex = () => {
        window.location.href = "/";
    };
    render() {
        console.log(this.props.status);

        const actions = [
            <FlatButton
                label="Back to survey"
                primary={true}
                onClick={e => {
                    this.handleRefresh();
                }}
            />,
            <FlatButton
                label="Back to index"
                primary={true}
                onClick={e => {
                    this.handleBackToIndex();
                }}
            />,
        ];

        return (
            <div>
                <Dialog actions={actions} modal={false} open={this.state.open}>
                    Thank you for submitting.
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    status: state.status,
});

const mapDispatchToProps = (dispatch: any) => ({
    clearSubmitStatus: () => dispatch(clearSubmitStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StatusComponent);
