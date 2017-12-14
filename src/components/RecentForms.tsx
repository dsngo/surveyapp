import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getRecentFormsFromDb, updateStateStatus } from "./redux/actionCreators";
interface IRecentForms {
  recentForms: any;
  getRecentFormsFromDb: () => any;
  updateStateStatus: (statusKey: string, value: any) => any;
}
class RecentForms extends React.Component<IRecentForms> {
  componentDidMount() {
    this.props.getRecentFormsFromDb();
  }
  renderTemplate = () => {
    const { recentForms, getRecentFormsFromDb, updateStateStatus } = this.props;
    return this.props.recentForms.map((form: any) => (
      <Link
        className="col-sm-4 template-card-container"
        to={form.completed ? `/survey/${form.formId}` : "/survey"}
        onClick={() => updateStateStatus("formId", form.formId)}
      >
        <div className="template-card">
          <div className="template-card-thumbnail" />
          <div className="template-name">{form.title}</div>
        </div>
      </Link>
    ));
  };
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
  updateStateStatus: (statusKey: string, value: any) => dispatch(updateStateStatus(statusKey, value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RecentForms);
