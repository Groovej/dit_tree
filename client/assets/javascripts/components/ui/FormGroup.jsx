import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import Input from "./Input";

class FormGroupComponent extends React.Component {
  render() {
    return (
      <div key="new_form_wrapper">
        |--[ <Input {...this.props} /> ]
      </div>
    );
  }
}

export default FormGroupComponent;
