import React from "react";
import styled from "styled-components";
import Input from "./Input";
import FormGroup from "./FormGroup";
import NodeItem from "./NodeItem";
import { partition } from "underscore";
import * as DirectoriesActions from "../../actions/directories/index";

const ChildWrapper = styled.div`
  padding-left: 20px;
`;
const nodesTranspiler = ({ children, parentId }) => {
  let rootNodes = [],
    others = [],
    childrenData = [];
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
  return { rootNodes, others };
};

class ChildComponent extends React.Component {
  constructor(props) {
    super(props);
    const { parent, children } = props;
    const parentId = parent.id;
    const { rootNodes, others } = nodesTranspiler({ children, parentId });

    this.state = {
      rootNodes,
      children: others,
      parent
    };
  }

  componentWillReceiveProps(lastProps) {
    const { id: parentId } = this.state.parent;
    const { children } = lastProps;
    const { rootNodes, others } = nodesTranspiler({ children, parentId });

    this.setState({
      rootNodes,
      children: others
    });
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.children.length > 0;
  }

  addNewDirectory = props => {
    this.props.directoriesActions.addNewDirectory(props);
  };

  nodeElement = item => {
    const { directoriesActions } = this.props;
    const { children } = this.state;
    const nodeEntries = children.filter(
      ({ mpath }) => parseInt(mpath) === item.id
    );
    const formProps = {
      propsChanged: this.addNewDirectory,
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
          <ChildComponent
            parent={item}
            children={nodeEntries}
            directoriesActions={directoriesActions}
          />
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

export default ChildComponent;
