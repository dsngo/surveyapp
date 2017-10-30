import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import { clearSubmitStatus, getDataFromDbById, saveClientDataToDb } from "./redux/actionCreators";
import ClientSurveyRender from "./ClientSurveyRender";
import MultipleChoicesQuestion from "./MultipleChoicesQuestion";
import MultipleDropdownQuestion from "./MultipleDropdownQuestion";
import PriorityQuestion from "./PriorityQuestion";
import CheckboxQuestion from "./CheckboxQuestion";
import ShortQuestion from "./ShortQuestion";

interface ICSPProps {
  surveyInfo: any;
  surveyContents: any;
}

const ClientSurveyPreview: React.SFC<ICSPProps> = props => (
  <Scrollbars style={{ height: "calc(100vh - 65px)", width: "100%" }} autoHide>
    <ClientSurveyRender {...props} />
  </Scrollbars>
);
const mapStateToProps = (state: any) => ({
  surveyContents: state.surveyContents,
  surveyInfo: state.surveyInfo,
});

export default connect(mapStateToProps)(ClientSurveyPreview);
