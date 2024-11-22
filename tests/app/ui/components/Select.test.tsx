import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomSelect from "../../../../src/app/ui/components/Select";

describe("Componente CustomSelect", () => {
  const mockOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const mockOnChange = vi.fn();

  it("renderiza correctamente con un value inicial", () => {
    const { getByText } = render(
      <CustomSelect
        value={{ value: "option2", label: "Option 2" }}
        onChange={mockOnChange}
        options={mockOptions}
      />
    );

    expect(getByText("Option 2")).toBeInTheDocument();
  });

  it("renderiza correctamente las opciones pasadas como props", () => {
    const { getByText, container } = render(
      <CustomSelect value={null} onChange={mockOnChange} options={mockOptions} />
    );

    const selectContainer = container.querySelector(".select-container");
    fireEvent.keyDown(selectContainer!.firstChild!, { key: "ArrowDown", code: "ArrowDown" });

    mockOptions.forEach(option => {
      expect(getByText(option.label)).toBeInTheDocument();
    });
  });

  it("muestra correctamente el placeholder", () => {
    const placeholderText = "Selecciona una opción";
    const { getByText } = render(
      <CustomSelect value={null} onChange={mockOnChange} options={mockOptions} />
    );

    expect(getByText(placeholderText)).toBeInTheDocument();
  });

  it("aplica correctamente la clase pasada como className", () => {
    const { container } = render(
      <CustomSelect value={null} onChange={mockOnChange} options={mockOptions} />
    );

    const selectContainer = container.querySelector(".select-container");
    expect(selectContainer).toBeInTheDocument();
    expect(selectContainer).toHaveClass("select-container");
  });
});
