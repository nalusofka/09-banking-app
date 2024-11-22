import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Card from "../../../../src/app/ui/components/Card";

describe("Componente Card", () => {
  const mockProps = {
    title: "Título de Prueba",
    description: "Descripción de prueba para el componente Card.",
    to: "/ruta-de-prueba",
  };

  it("renderiza correctamente el título y la descripción", () => {
    const { getByText } = render(
      <Router>
        <Card {...mockProps} />
      </Router>
    );

    expect(getByText(mockProps.title)).toBeInTheDocument();
    expect(getByText(mockProps.description)).toBeInTheDocument();
  });

  it("contiene el enlace correcto", () => {
    const { container } = render(
      <Router>
        <Card {...mockProps} />
      </Router>
    );

    const links = container.querySelectorAll("a");

    links.forEach((link) => {
      expect(link).toHaveAttribute("href", mockProps.to);
    });
  });

  it("renderiza el ícono correctamente", () => {
    const { container } = render(
      <Router>
        <Card {...mockProps} />
      </Router>
    );

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("aplica las clases CSS correctamente", () => {
    const { container } = render(
      <Router>
        <Card {...mockProps} />
      </Router>
    );

    const card = container.querySelector(".card");
    const cardTitle = container.querySelector(".card-title");
    const cardDescription = container.querySelector(".card-description");
    const cardLink = container.querySelector(".card-link");

    expect(card).toHaveClass("card");
    expect(cardTitle).toHaveClass("card-title");
    expect(cardDescription).toHaveClass("card-description");
    expect(cardLink).toHaveClass("card-link");
  });

  it("genera un snapshot válido", () => {
    const { asFragment } = render(
      <Router>
        <Card {...mockProps} />
      </Router>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
