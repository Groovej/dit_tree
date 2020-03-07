import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as DirectoriesActions from "../../actions/directories/index";
import { isEmpty } from "underscore";
import styled from "styled-components";
import Input from "../ui/Input";

const Container = styled.div`
  width: 100%
  padding: 50px;
`;

class AdminRTBDashboardComponent extends React.Component {
  UNSAFE_componentWillMount() {
    this.props.directoriesActions.loadDirectoriesData();
  }

  shouldComponentUpdate({ directories }) {
    const { error, data } = directories;
    return !isEmpty(data) && !error;
  }

  addNewDirectory = props => {
    debugger;
  };

  render() {
    const { data } = this.props.directories;
    if (isEmpty(data)) {
      return false;
    }

    debugger;
    const imputProps = {
      propsChanged: this.addNewDirectory,
      name: "my_cool_name",
      key: "input"
    };

    return (
      <Container>
        <h1 key="header">Directories SPA</h1>
        <Input {...imputProps} />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    directories: state.application
  };
};
const mapDispatchToProps = dispatch => {
  return {
    directoriesActions: bindActionCreators(DirectoriesActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminRTBDashboardComponent);
