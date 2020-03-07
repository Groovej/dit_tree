import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as DirectoriesActions from "../../actions/directories/index";
import { isEmpty } from "underscore";
import styled from "styled-components";
import Child from "../ui/Child";
import FormGroup from "../ui/FormGroup";

const Container = styled.div`
  width: 100%
  padding: 50px;
`;

class DirectoriesIndexComponent extends React.Component {
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

  nodeElement = item => {
    const { directoriesActions, directories } = this.props;
    const { children } = directories.data;
    const nodeEntries = children.filter(
      ({ mpath }) => parseInt(mpath[0]) === item.id
    );
    const formProps = {
      propsChanged: this.addNewDirectory,
      name: "new_form",
      key: `root_key_for_${item.id}`,
      parent_id: item.id
    };
    return (
      <div key={`root_node_${item.id}`}>
        <div key={`title_wrapper_for${item.id}`}>
          {`|-- ${item.name}`}
          <small onClick={() => directoriesActions.changePath(item.id)}>
            &nbsp;&rarr;
          </small>
        </div>
        <div
          style={{ paddingLeft: "20px" }}
          key={`new_form_for_elelemnt_${item.id}`}
        >
          <FormGroup {...formProps} />
        </div>
        {nodeEntries.length !== 0 && (
          <Child parent={item} children={nodeEntries} />
        )}
      </div>
    );
  };

  render() {
    const { data } = this.props.directories;
    if (isEmpty(data)) {
      return false;
    }

    const { rootEntries, children } = data;

    const formProps = {
      propsChanged: this.addNewDirectory,
      name: "new_form",
      key: "root_key",
      parent_id: null
    };

    return (
      <Container>
        <h1 key="header">Directories SPA</h1>
        <FormGroup {...formProps} />
        {rootEntries.map(item => this.nodeElement(item))}
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
)(DirectoriesIndexComponent);
