import * as React from "react";
// import { clearSubmitStatus } from "./redux/actionCreators";
import { connect } from "react-redux";

import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";


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
    // clearSubmitStatus: () => dispatch(clearSubmitStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StatusComponent);
