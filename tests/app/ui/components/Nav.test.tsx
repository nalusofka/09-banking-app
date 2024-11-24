import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContextProvider } from "../../../../src/app/core/state/AppContext";
import Nav from "../../../../src/app/ui/components/Nav";
import { logout } from "../../../../src/app/core/state/auth/actions";
import React from "react";
import "@testing-library/jest-dom";

vi.mock("../../../core/state/auth/actions", () => ({
  logout: vi.fn(),
}));

describe("Nav Component", () => {
  const mockDispatch = vi.fn();
  const links = [
    { to: "/inicio", label: "Inicio" },
    { to: "/servicios", label: "Servicios" },
    { to: "/contacto", label: "Contacto" },
  ];

  const renderComponent = (path: string) =>
    render(
      <AppContextProvider value={{ dispatch: mockDispatch }}>
        <Router>
          <Nav links={links} />
        </Router>
      </AppContextProvider>
    );

  beforeEach(() => {
    mockDispatch.mockClear();
    vi.clearAllMocks();
  });

  it("muestra los enlaces correctamente", () => {
    renderComponent("/inicio");

    links.forEach((link) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
  });

  it("abre y cierra el menú al hacer clic en el botón toggle", () => {
    renderComponent("/inicio");

    const toggleButton = screen.getByLabelText("Toggle menu");
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(document.body.classList.contains("no-scroll")).toBeTruthy();
    expect(screen.getByRole("list")).toHaveClass("open");

    fireEvent.click(toggleButton);
    expect(document.body.classList.contains("no-scroll")).toBeFalsy();
    expect(screen.getByRole("list")).not.toHaveClass("open");
  });

  it("cierra el menú al hacer clic en un enlace", () => {
    renderComponent("/inicio");

    const toggleButton = screen.getByLabelText("Toggle menu");
    fireEvent.click(toggleButton);

    const link = screen.getByText(links[0].label);
    fireEvent.click(link);

    expect(document.body.classList.contains("no-scroll")).toBeFalsy();
    expect(screen.getByRole("list")).not.toHaveClass("open");
  });

  it("oculta el botón de logout en rutas no autenticadas", () => {
    renderComponent("/login");

    expect(screen.queryByRole("button", { name: /logout/i })).not.toBeInTheDocument();
  });
});
