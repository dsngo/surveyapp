import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setSearchTerm } from "./redux/actionCreators";
// import

interface INavBar {
    showSearch: boolean;
    setSearchTerm: (value: any) => string;
    brandName: string;
    searchTerm: string;
    surveyData: any[];
}

const NavBar: React.SFC<INavBar> = props => {
    const { showSearch, setSearchTerm, brandName = "Daniel Test", searchTerm = "", surveyData } = props;
    const utilSpace = showSearch ? (
        <div className="col-md-4 col-xs-6">
            <div id="search-container">
                <div className="input-group stylish-input-group input-field">
                    <i className="material-icons prefix">search</i>
                    <input
                        className="validate"
                        type="text"
                        onChange={e => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        placeholder="Test Search"
                    />
                </div>
            </div>
        </div>
    ) : (
        <h2>
            <Link to="/search">Back</Link>
        </h2>
    );
    return (
        <div className="header">
            <div className="row">
                <div className="col-md-2 col-xs-3 logo-title">
                    <Link to="/" onClick={() => props.setSearchTerm("")}>
                        {brandName}
                    </Link>
                </div>
                {utilSpace}
            </div>
        </div>
    );
};


const mapStateToProps = (state: any) => ({
    searchTerm: state.searchTerm,
    brandName: state.brandName,
    surveyData: state.surveyData
});

const mapDispatchToProps = (dispatch: any) => ({
    setSearchTerm: (searchTerm: string) => dispatch(setSearchTerm(searchTerm)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
