import React, { memo } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import Input from "./Input";

const FormGroupComponent = memo(props => {
  return (
    <div key="new_form_wrapper">
      |--[ <Input {...props} key="input_on_form_group" /> ]
    </div>
  );
});

export default FormGroupComponent;
