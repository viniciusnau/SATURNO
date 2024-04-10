import React, { useState } from "react";
import styles from "../Styles/Input.module.css";
import TextField from "@mui/material/TextField";
import { IMaskInput } from "react-imask";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface iInput {
  className?: string;
  name?: any;
  value?: any;
  label?: string;
  mask?: string;
  fieldType?: string;
  placeholder?: string;
  type?: any;
  onChange?: any;
}

const Input: React.FC<iInput> = ({
  className,
  label,
  mask,
  fieldType,
  placeholder,
  onChange,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const IMaskInputWithTextField: React.FC<any> = React.forwardRef(
    (props, ref) => (
      <IMaskInput
        {...props}
        mask={mask}
        definitions={{
          "#": /[1-9]/,
        }}
        placeholder={placeholder || ""}
        onAccept={(value: string) =>
          onChange &&
          onChange({ target: { name: props.name, value: props.value } })
        }
        inputRef={ref}
        overwrite
      />
    )
  );

  const fieldComponents: { [key: string]: JSX.Element } = {
    outlined: mask ? (
      <TextField
        className={`${styles.content} ${className}`}
        variant="outlined"
        label={label}
        placeholder={placeholder || ""}
        onChange={onChange}
        InputProps={{
          inputComponent: IMaskInputWithTextField,
        }}
        {...props}
      />
    ) : (
      <TextField
        className={`${styles.content} ${className}`}
        variant="outlined"
        label={label}
        placeholder={placeholder || ""}
        {...props}
        onChange={onChange}
      />
    ),
    password: (
      <TextField
        className={`${styles.content} ${className}`}
        variant="outlined"
        label={label}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder || ""}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={handlePasswordVisibility}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...props}
        onChange={onChange}
      />
    ),
    checkbox: (
      <FormControlLabel
        control={<Checkbox {...(props as CheckboxProps)} />}
        label={label}
        className={`${styles.content} ${className}`}
      />
    ),
    default: (
      <input
        className={`${styles.content} ${className}`}
        placeholder={placeholder || ""}
        {...props}
        onChange={onChange}
      />
    ),
  };

  const FieldComponent = fieldComponents[fieldType || "default"];

  return FieldComponent;
};

export default Input;
