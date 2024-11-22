import React from "react";

export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<any>>
) => {
  const { name, value } = e.target;
  setState((prev: any) => ({
    ...prev,
    dinBody: {
      ...prev.dinBody,
      [name]: name === "amount" ? parseFloat(value) : value,
    },
  }));
};

export const handleSelectChange = (
  fieldName: string,
  selectedOption: { value: string } | null,
  setState: React.Dispatch<React.SetStateAction<any>>
) => {
  setState((prev: any) => ({
    ...prev,
    dinBody: {
      ...prev.dinBody,
      [fieldName]: selectedOption?.value || "",
    },
  }));
};
