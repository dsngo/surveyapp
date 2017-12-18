import * as React from "react";
import { connect } from "react-redux";
import Paper from "material-ui/Paper";
import { updateClientSurveyInfo } from "../redux/actionCreators";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

interface ICICProps {
  clientInfo: any;
  updateClientSurveyInfo: (infoKey: string, value: any) => any;
}

const ClientInfoComponent: React.SFC<ICICProps> = ({ updateClientSurveyInfo, clientInfo }) => {
  return (
    <Paper className="info-client-survey" zDepth={1}>
      <div className="info-section">
      <TextField
        hintText="Enter your first name here"
        floatingLabelText="First Name"
        value={clientInfo.firstName || ""}
        onChange={(e: any) => updateClientSurveyInfo("firstName", e.target.value)}
        className="input-info-client"
      />
      </div>
      <div className="info-section">
      <TextField
        hintText="Enter your last name here"
        floatingLabelText="Last Name"
        value={clientInfo.lastName || ""}
        onChange={(e: any) => updateClientSurveyInfo("lastName", e.target.value)}
        className="input-info-client"
      />
      </div>
      <div className="info-section">
      <TextField
        hintText="Enter your email here"
        floatingLabelText="Email"
        value={clientInfo.email || ""}
        onChange={(e: any) => updateClientSurveyInfo("email", e.target.value)}
        className="input-info-client"
      />
      </div>
      <div className="info-section">
      <TextField
        hintText="Enter your phone number here"
        floatingLabelText="Phone Number"
        value={clientInfo.phone || ""}
        onChange={(e: any) => updateClientSurveyInfo("phoneNumber", e.target.value)}
        className="input-info-client"
      />
      </div>
      <div className="info-section">
      <TextField
        hintText="Enter your address here"
        floatingLabelText="Address"
        value={clientInfo.address || ""}
        onChange={(e: any) => updateClientSurveyInfo("address", e.target.value)}
        className="input-info-client"
      />
      </div>
      <div className="info-section">
      <SelectField
        floatingLabelText="Gender"
        hintText="Input your gender"
        value={clientInfo.gender || "Other"}
        onChange={(e, i, v) => updateClientSurveyInfo("gender", v)}
        className="input-info-client"
      >
        <MenuItem value={"Male"} primaryText="Male" />
        <MenuItem value={"Female"} primaryText="Female" />
        <MenuItem value={"Other"} primaryText="Other" />
      </SelectField>
      </div>
    </Paper>
  );
};

const mapStateToProps = (state: any) => ({
  clientInfo: state.clientSurveyData.clientInfo,
});

const mapDispatchToProps = (dispatch: any) => ({
  updateClientSurveyInfo: (infoKey: string, value: any) => dispatch(updateClientSurveyInfo(infoKey, value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ClientInfoComponent);
