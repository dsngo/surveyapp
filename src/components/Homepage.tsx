import * as React from "react";
// import { clearSubmitStatus } from "./redux/actionCreators";
import { connect } from "react-redux";

import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import Template from "./Template";
import RecentForms from "./RecentForms";
import Forms from "./Forms";
interface IHomePage {
}

class Homepage extends React.Component<IHomePage> {
    state = {
        open: false,
        survey_id: "",
    };
    constructor(props: any) {
        super(props);
    }
    
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <Forms />
                <RecentForms />
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = (dispatch: any) => ({
    // clearSubmitStatus: () => dispatch(clearSubmitStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
