import * as React from "react";
import { connect } from "react-redux";
import Paper from "material-ui/Paper";
import { updateFirstName, updateLastName, updateEmail, updatePhone, updateAddress, updateGender } from "../redux/actionCreators";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

interface ICICProps {
  clientInfo: any;
  updateFirstName: (firstName: string) => any;
  updateLastName: (lastName: string) => any;
  updateEmail: (email: string) => any;
  updatePhone: (phone: string) => any;
  updateAddress: (address: string) => any;
  updateGender: (gender: string) => any;
}

const ClientInfoComponent: React.SFC<ICICProps> = props => {
  const { updateFirstName, updateLastName, updateEmail, updatePhone, updateAddress, updateGender, clientInfo } = props;
  console.log(clientInfo.gender);
  
  return (
    <Paper className="info-client-survey">
      <TextField
        hintText="Enter your first name here"
        floatingLabelText="First Name"
        value={clientInfo.firstName || ""}
        onChange={(e: any) => updateFirstName(e.target.value)}
        className="input-info-client"
      />
      <TextField
        hintText="Enter your last name here"
        floatingLabelText="Last Name"
        value={clientInfo.lastName || ""}
        onChange={(e: any) => updateLastName(e.target.value)}
        className="input-info-client"
      />
      <TextField
        hintText="Enter your email here"
        floatingLabelText="Email"
        value={clientInfo.email || ""}
        onChange={(e: any) => updateEmail(e.target.value)}
        className="input-info-client"
      />
      <TextField
        hintText="Enter your phone number here"
        floatingLabelText="Phone Number"
        value={clientInfo.phone || ""}
        onChange={(e: any) => updatePhone(e.target.value)}
        className="input-info-client"
      />
      <TextField
        hintText="Enter your address here"
        floatingLabelText="Address"
        value={clientInfo.address || ""}
        onChange={(e: any) => updateAddress(e.target.value)}
        className="input-info-client"
      />
      <SelectField
        floatingLabelText="Gender"
        hintText="Input your gender"
        value={clientInfo.gender || "Other"}
        onChange={(e, i, v) => updateGender(v)}
        className="input-info-client"
      >
        <MenuItem value={"Male"} primaryText="Male" />
        <MenuItem value={"Female"} primaryText="Female" />
        <MenuItem value={"Other"} primaryText="Other" />
      </SelectField>
    </Paper>
  );
};

const mapStateToProps = (state: any) => ({
  clientInfo: state.clientSurveyData.clientInfo,
});

const mapDispatchToProps = (dispatch: any) => ({
  updateFirstName: (firstName: string) => dispatch(updateFirstName(firstName)),
  updateLastName: (lastName: string) => dispatch(updateLastName(lastName)),
  updateEmail: (email: string) => dispatch(updateEmail(email)),
  updatePhone: (phone: string) => dispatch(updatePhone(phone)),
  updateAddress: (address: string) => dispatch(updateAddress(address)),
  updateGender: (gender: string) => dispatch(updateGender(gender)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ClientInfoComponent);
