import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Title from '../../../../src/app/ui/components/Title';

describe('Componente Title', () => {
  it('renderiza correctamente como h1', () => {
    const { asFragment } = render(<Title as="h1">Título H1</Title>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renderiza correctamente como h2', () => {
    const { asFragment } = render(<Title as="h2">Título H2</Title>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renderiza correctamente con className personalizado', () => {
    const { asFragment } = render(
      <Title as="h3" className="custom-title">
        Título H3
      </Title>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renderiza con el contenido correcto', () => {
    const { getByTestId } = render(<Title as="h4">Contenido del título</Title>);
    const titleElement = getByTestId('title-component');
    expect(titleElement).toHaveTextContent('Contenido del título');
  });

  it('aplica la clase personalizada correctamente', () => {
    const { getByTestId } = render(<Title as="h5" className="custom-class">Título H5</Title>);
    const titleElement = getByTestId('title-component');
    expect(titleElement).toHaveClass('custom-class');
  });

  it('aplica la clase por defecto cuando no se pasa className', () => {
    const { getByTestId } = render(<Title as="h6">Título H6</Title>);
    const titleElement = getByTestId('title-component');
    expect(titleElement).toHaveClass('title');
  });
});