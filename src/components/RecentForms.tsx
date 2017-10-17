import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getRecentFormsFromDb, updateTempId } from "./redux/actionCreators";
interface IRecentForms {
    recentForms: any;
    getRecentFormsFromDb: () => any;
    updateTempId: (id: string) => any;
}
class RecentForms extends React.Component<IRecentForms> {
    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        this.props.getRecentFormsFromDb();
    }

    handleSurvey(id: string) {
        this.props.updateTempId(id)
    }
    renderTemplate() {
        return this.props.recentForms.map((form: any) => {
            return (
                <Link className="col-sm-4 template-card-container" to={"/survey"} onClick={() => this.handleSurvey(form.formId)}>
                    <div className="template-card">
                        <div className="template-card-thumbnail" />
                        <div className="template-name">{form.title}</div>
                    </div>
                </Link>
            );
        });
    }
    render() {
        return (
            <div className="your-forms">
                <div className="container your-forms">
                    <div className="row title-your-forms">Your recent forms</div>
                    <div className="row">{this.renderTemplate()}</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    recentForms: state.recentForms,
});
const mapDispatchToProps = (dispatch: any) => ({
    getRecentFormsFromDb: () => dispatch(getRecentFormsFromDb()),
    updateTempId: (id: string) => dispatch(updateTempId(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(RecentForms);
