import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Input from "./Input";
import FormGroup from "./FormGroup";
import { partition } from "underscore";
import * as DirectoriesActions from "../../actions/directories/index";

const ChildWrapper = styled.div`
  padding-left: 20px;
`;

class ChildComponent extends React.Component {
  constructor(props) {
    super(props);
    let { parent, children } = props;
    let rootNodes = [],
      others = [];
    const parentId = parent.id;
    let childrenData = [];

    children.forEach(item => {
      if (item && !Object.is(item.mpath, null)) {
        const replacement = item.mpath.replace(`${parentId}`, "");
        const deepCopy = { ...item };
        deepCopy.mpath = replacement.length === 0 ? null : replacement;
        if (!Object.is(deepCopy.mpath, null)) {
          deepCopy.mpath = deepCopy.mpath.replace(".", "");
        }

        childrenData.push(deepCopy);
      }
    });
    childrenData = childrenData.filter(child => typeof child !== "undefined");

    if (childrenData.length) {
      [rootNodes, others] = partition(childrenData, ({ mpath }) =>
        Object.is(mpath, null)
      );
    }
    this.state = {
      rootNodes,
      children: others,
      parent
    };
  }

  nodeElement = item => {
    const { directoriesActions } = this.props;
    const { children } = this.state;
    const nodeEntries = children.filter(
      ({ mpath }) => parseInt(mpath) === item.id
    );
    const formProps = {
      propsChanged: this.addNewDirectory,
      name: "new_form",
      key: `root_key_for_${item.id}`,
      parent_id: item.id
    };

    return (
      <div key={`root_node_${item.id}`}>
        <div key="title_${item.id}">
          {`|-- ${item.name}`}
          <small onClick={() => directoriesActions.changePath(item.id)}>
            &nbsp;&rarr;
          </small>
        </div>
        <div style={{ paddingLeft: "20px" }} key={`new_form_for_${item.id}`}>
          <FormGroup {...formProps} />
        </div>

        {nodeEntries.length !== 0 && (
          <ChildComponent parent={item} children={nodeEntries} />
        )}
      </div>
    );
  };

  render() {
    const { rootNodes, children, parent } = this.state;

    return (
      <ChildWrapper key={`child_${parent.id}`}>
        {rootNodes.length !== 0 &&
          rootNodes.map(item => this.nodeElement(item))}
      </ChildWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    directoriesActions: bindActionCreators(DirectoriesActions, dispatch)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ChildComponent);
