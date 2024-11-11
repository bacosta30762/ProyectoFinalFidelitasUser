import React from 'react';
import { ErrorMessage } from 'formik';

const ValidatedInputOrden = ({ name, type = "text", placeholder, value, onChange, onBlur, error, touched }) => {
  return (
    <div className="input-container">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={error && touched ? "input-error" : ""}
      />
      {error && touched && <div className="error-message">{error}</div>}
    </div>
  );
};

export default ValidatedInputOrden;

