import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Body from '../../../../src/app/ui/components/Body';

describe('Componente Body', () => {
  it('renderiza correctamente con el contenido proporcionado', () => {
    const { asFragment } = render(<Body>Contenido de prueba</Body>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('aplica la clase correcta según el color primario', () => {
    const { getByTestId } = render(<Body color="primary">Contenido primario</Body>);
    const bodyElement = getByTestId('body-component');
    expect(bodyElement).toHaveClass('body-primary');
  });

  it('aplica la clase correcta según el color secundario', () => {
    const { getByTestId } = render(<Body color="secondary">Contenido secundario</Body>);
    const bodyElement = getByTestId('body-component');
    expect(bodyElement).toHaveClass('body-secondary');
  });

  it('aplica una clase personalizada cuando se proporciona', () => {
    const { getByTestId } = render(
      <Body className="custom-class">Contenido personalizado</Body>
    );
    const bodyElement = getByTestId('body-component');
    expect(bodyElement).toHaveClass('custom-class');
  });

  it('renderiza correctamente con una clase combinada', () => {
    const { getByTestId } = render(
      <Body color="primary" className="custom-class">
        Contenido combinado
      </Body>
    );
    const bodyElement = getByTestId('body-component');
    expect(bodyElement).toHaveClass('custom-class');
    expect(bodyElement).not.toHaveClass('body-primary');
  });
});
