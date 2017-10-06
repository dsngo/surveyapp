import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Template from "./Template";
import { getRecentForms } from "./redux/actionCreators";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class SelectQuestionType extends React.Component {
    state = {
        index: -1,
    }
    constructor(props: any) {
        super(props);
    }

    render() {
        const { index } = this.state;
        return (
            <div>
                <SelectField
                    floatingLabelText="Answer"
                    fullWidth={true}
                    value={area.questionType}
                    onChange={(event: object, key: number, payload: any) => {
                        changeTypeAnswer(index, payload);
                    }}
                    className="mui-select"
                >
                    <MenuItem value="shortQuestion" label="Short answer">
                        Short answer
                    </MenuItem>
                    <MenuItem value="longQuestion" label="Long answer">
                        Long answer
                    </MenuItem>
                    <MenuItem value="checkbox" label="Checkbox">
                        Checkbox
                    </MenuItem>
                    <MenuItem value="multipleChoices" label="Multiple choice">
                        Multiple choice
                    </MenuItem>
                    <MenuItem value="dropdown" label="Dropdown">
                        Dropdown
                    </MenuItem>
                    <MenuItem value="priority" label="Priority">
                        Priority
                    </MenuItem>
                    <MenuItem value="multiDropdown" label="Priority">
                        Multiple dropdown
                    </MenuItem>
                </SelectField>
            </div>
        )
    }
    
}