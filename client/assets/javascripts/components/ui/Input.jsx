import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const Input = styled.input`
  border: 1px solid black;
  padding: 0 10px;
  margin: 0;
  width: 150px;
  height: 22px;
  font-size: 12px;
  line-height: 1.5;
  background-color: white;
  border-radius: 2px;
`;

const ENTER_KEY_CODES = 13;

class InputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.inputValue = React.createRef();
  }

  inputFieldChanged = event => {
    let value = this.inputValue.current.value.trim();
    if (ENTER_KEY_CODES === event.which && value.length) {
      const { name, propsChanged } = this.props;
      propsChanged({ [name]: value });
    }
  };

  shouldComponentUpdate(nextProps) {
    const { defaultValue } = nextProps;
    if (
      typeof defaultValue !== "undefined" &&
      !Object.is(defaultValue, null) &&
      defaultValue !== "null" &&
      defaultValue.length === 0 &&
      this.inputValue.current.value.length > 0
    ) {
      this.inputValue.current.value = "";
    }
    return true;
  }

  render() {
    const {
      placeholder = "Enter name",
      defaultValue = "",
      type = "text",
      name
    } = this.props;
    if (
      !Object.is(defaultValue, null) &&
      defaultValue.length !== 0 &&
      this.inputValue.current
    ) {
      this.inputValue.current.value = defaultValue;
    }
    const inputProps = {
      type,
      defaultValue,
      placeholder,
      autoComplete: "off",
      ref: this.inputValue,
      onKeyUp: this.inputFieldChanged,
      key: `input_for_${name}`
    };

    return <Input {...inputProps} />;
  }
}

export default InputComponent;

InputComponent.propTypes = {
  name: PropTypes.string.isRequired,
  propsChanged: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string
};
