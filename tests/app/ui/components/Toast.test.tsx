import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Toast from "../../../../src/app/ui/components/Toast";
import React from "react";
import "@testing-library/jest-dom";

describe("Toast Component", () => {
  it("debería renderizar el mensaje correctamente", () => {
    const message = "Operation successful!";
    const type = "success";
    const onClose = vi.fn();

    render(<Toast message={message} type={type} onClose={onClose} />);

    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByText(message).parentElement).toHaveClass("toast--success");
  });

  it("debería ejecutar la función onClose al hacer clic en el Toast", () => {
    const message = "Something went wrong!";
    const type = "error";
    const onClose = vi.fn();

    render(<Toast message={message} type={type} onClose={onClose} />);

    const toast = screen.getByText(message).parentElement;

    fireEvent.click(toast!);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("debería tener la clase correspondiente según el tipo de Toast", () => {
    const message = "Operation failed!";
    const type = "error";
    const onClose = vi.fn();

    render(<Toast message={message} type={type} onClose={onClose} />);

    const toast = screen.getByText(message).parentElement;
    expect(toast).toHaveClass("toast--error");
  });
});
