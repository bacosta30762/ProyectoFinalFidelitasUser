import React from 'react';
import { Field, ErrorMessage } from 'formik';

const ValidatedInput = ({ name, type = "text", placeholder, className }) => {
  return (
    <div className="input-container">
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        className={className}
      />
      <ErrorMessage name={name} component="div" className="error-message" />
    </div>
  );
};

export default ValidatedInput;