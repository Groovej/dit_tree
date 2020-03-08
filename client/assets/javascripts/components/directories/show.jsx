import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as DirectoriesActions from "../../actions/directories/index";
import { isEmpty } from "underscore";
import styled from "styled-components";
import Child from "../ui/Child";
import FormGroup from "../ui/FormGroup";
import Input from "../ui/Input";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%
  padding: 50px;
`;
const LinkWrapper = styled(Link)`
  font-size: 18px
  padding-left: 20px;
  color: black
`;
const Small = styled.small`
  cursor: pointer;
`;

class DirectoriesShowComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "show"
    };
  }
  UNSAFE_componentWillMount() {
    const { data } = this.props.directories;
    if (isEmpty(data)) {
      this.props.directoriesActions.loadDirectoriesData();
    }
  }
  addNewDirectory = props => {
    this.props.directoriesActions.addNewDirectory(props);
  };

  updateItem = props => {
    this.props.directoriesActions.updateDirectory(props);
    this.setState({ view: "show" });
  };

  editItem = () => {
    this.setState({ view: "edit" });
  };
  deleteItem = id => {
    if (
      window.confirm(
        "Do you really want to delete Directory with all siblings?"
      )
    ) {
      this.props.directoriesActions.deleteDirectory(id);
    }
  };

  shouldComponentUpdate({ directories }) {
    const { error, data } = directories;
    return !isEmpty(data) && !error;
  }
  render() {
    const { view } = this.state;
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

    const { name, id } = directory;
    const formProps = {
      propsChanged: this.addNewDirectory,
      key: "root_key",
      parent_id: id
    };
    const updateProps = {
      propsChanged: this.updateItem,
      key: "root_update_key",
      parent_id: id,
      defaultValue: name
    };
    const text = `Directory ${name}`;
    const showView = view === "show";
    const editView = view === "edit";
    const previewItem = showView ? name : "";
    return (
      <Container>
        <h1 key="header">
          {text}{" "}
          <LinkWrapper key="back_link" to={Routes.directories_path()}>
            Back
          </LinkWrapper>
        </h1>
        {`|-- ${previewItem}`}
        {editView && <Input {...updateProps} />}
        {showView && (
          <span>
            <Small onClick={() => this.editItem()} key="edit_icon">
              &nbsp;&#9998;&nbsp;
            </Small>
            <Small
              onClick={() => this.deleteItem(directory.id)}
              key="delet_icon"
            >
              &nbsp;&#215;&nbsp;
            </Small>
          </span>
        )}
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
