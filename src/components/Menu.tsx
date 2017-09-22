import * as React from "react";
import { connect } from "react-redux";
import Scrollbars from "react-custom-scrollbars";
import Forms from "./Forms";
import RecentForms from "./RecentForms";

const Menu: React.SFC = props => (
    <Scrollbars style={{ height: "calc(100vh - 65px)", width: "100vw"}} autoHide>
        <Forms />
        <RecentForms />
    </Scrollbars>
);

export default connect()(Menu);
