import React from "react";
import Select from "react-select";
import "./style.scss";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  value: Option | null;
  onChange: (selectedOption: Option | null) => void;
  options: Option[];
}

const CustomSelect: React.FC<SelectProps> = ({ value, onChange, options }) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      placeholder="Selecciona una opción"
      isClearable
      className="select-container"
    />
  );
};

export default CustomSelect;
