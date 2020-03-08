import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as DirectoriesActions from "../../actions/directories/index";
import { isEmpty } from "underscore";
import styled from "styled-components";
import Child from "../ui/Child";
import FormGroup from "../ui/FormGroup";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%
  padding: 50px;
`;
const LinkWrapper = styled.span`
  font-size: 18px
  padding-left: 20px;
  & a {
    color: black
  };
`;

class DirectoriesShowComponent extends React.Component {
  UNSAFE_componentWillMount() {
    const { data } = this.props.directories;
    if (isEmpty(data)) {
      this.props.directoriesActions.loadDirectoriesData();
    }
  }
  addNewDirectory = props => {
    this.props.directoriesActions.addNewDirectory(props);
  };

  shouldComponentUpdate({ directories }) {
    const { error, data } = directories;
    return !isEmpty(data) && !error;
  }
  render() {
    const { directories, match, directoriesActions } = this.props;
    const { id: directoryId } = match.params;

    if (isEmpty(directories.data)) {
      return false;
    }
    const { rootEntries, children } = directories.data;
    let directory, childrenNodes;
    directory =
      rootEntries.filter(({ id }) => id === parseInt(directoryId))[0] ||
      children.filter(({ id }) => id === parseInt(directoryId))[0];
    childrenNodes = children.filter(({ mpath }) =>
      mpath.split("").includes(directoryId)
    );

    if (childrenNodes.length) {
      childrenNodes = childrenNodes.map(item => {
        item.mpath = `${String(directoryId)}${
          item.mpath.split(directory.id)[1]
        }`;
        return item;
      });
    }

    const formProps = {
      propsChanged: this.addNewDirectory,
      key: "root_key",
      parent_id: directory.id
    };
    const text = `Directory ${directory.name}`;

    return (
      <Container>
        <h1 key="header">
          {text}{" "}
          <LinkWrapper>
            <Link key="back_link" to={Routes.directories_path()}>
              Back
            </Link>
          </LinkWrapper>
        </h1>
        {`|-- ${directory.name} `}
        <div style={{ paddingLeft: "20px" }}>
          <FormGroup {...formProps} />
        </div>
        {childrenNodes.length !== 0 && (
          <Child parent={directory} children={childrenNodes} />
        )}
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
)(DirectoriesShowComponent);
