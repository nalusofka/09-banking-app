import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "../../../../src/app/ui/components/Input";

describe("Componente Input", () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("se renderiza correctamente con valores iniciales", () => {
    render(
      <Input
        value="Texto inicial"
        onChange={mockOnChange}
        placeholder="Escribe algo"
      />
    );

    const input = screen.getByTestId("input-component");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("Texto inicial");
    expect(input).toHaveAttribute("placeholder", "Escribe algo");
  });

  it("dispara el evento onChange correctamente", () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState("");
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        mockOnChange(e);
      };
  
      return (
        <Input
          value={value}
          onChange={handleChange}
          placeholder="Escribe algo"
        />
      );
    };
  
    render(<Wrapper />);
  
    const input = screen.getByTestId("input-component");

    fireEvent.change(input, { target: { value: "Nuevo texto" } });
  
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue("Nuevo texto");
  });
  
  
  it("no permite valores negativos para type='number'", () => {
    render(
      <Input
        value=""
        onChange={mockOnChange}
        type="number"
      />
    );
  
    const input = screen.getByTestId("input-component");
  
    fireEvent.change(input, { target: { value: "-5" } });
  
    expect(mockOnChange).not.toHaveBeenCalled();
    expect(input.value).toBe("");
  });
  
  it("muestra el label correctamente si se proporciona", () => {
    render(
      <Input
        value=""
        onChange={mockOnChange}
        label="Etiqueta"
        id="test-input"
        color="primary"
      />
    );

    const label = screen.getByText("Etiqueta");
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("for", "test-input");
    expect(label).toHaveStyle("color: #6e6e6e");
  });

  it("muestra la clase adicional cuando se proporciona", () => {
    render(
      <Input
        value=""
        onChange={mockOnChange}
        className="extra-class"
      />
    );

    const input = screen.getByTestId("input-component");
    expect(input).toHaveClass("extra-class");
  });

  it("respeta la propiedad disabled", () => {
    render(
      <Input
        value=""
        onChange={mockOnChange}
        disabled
      />
    );

    const input = screen.getByTestId("input-component");
    expect(input).toBeDisabled();
  });

  it("muestra correctamente el placeholder", () => {
    render(
      <Input
        value=""
        onChange={mockOnChange}
        placeholder="Escribe algo"
      />
    );

    const input = screen.getByTestId("input-component");
    expect(input).toHaveAttribute("placeholder", "Escribe algo");
  });

  it("muestra la clase 'has-value' cuando hay un valor", () => {
    render(
      <Input
        value="Con valor"
        onChange={mockOnChange}
      />
    );

    const container = screen.getByTestId("input-component").parentElement;
    expect(container).toHaveClass("has-value");
  });

  it("no muestra la clase 'has-value' cuando no hay un valor", () => {
    render(
      <Input
        value=""
        onChange={mockOnChange}
      />
    );

    const container = screen.getByTestId("input-component").parentElement;
    expect(container).not.toHaveClass("has-value");
  });
});
