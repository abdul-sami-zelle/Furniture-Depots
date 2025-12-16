import React, { useRef, useState } from "react";
import './InputText.css'

const InputText = ({label, payload, error, isAllowed, input_name, value, onChange, maxLen = 150, readOnly = false, width = '100%', require= false}) => {
    const inputRef = useRef();
    const [focusedField, setFocusedField] = useState('')
  return (
    <div
      className={`delivery-input-container ${
        focusedField === input_name || value
          ? "focused"
          : ""
      }`}
      style={{
        width: width,
        border: error ? "1px solid var(--primary-color)" : "",
      }}
      onClick={() => {
        isAllowed ? undefined : inputRef.current?.focus();
      }}
    >
      {isAllowed && <div className="input-overlay"></div>}
      <label className={`floating-label`} style={{color: error ? 'var(--primary-color)' : 'var(--text-gray)'}}>{label}</label>
      <input
        type="text"
        className="input-field-email"
        ref={inputRef}
        onFocus={() => setFocusedField(input_name)}
        onBlur={() => setFocusedField("")}
        name={input_name}
        value={value}
        maxLength={maxLen}
        readOnly={readOnly}
        onChange={onChange}
        required={require}
      />
    </div>
  );
};

export default InputText;
