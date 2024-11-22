import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Button from '../../../../src/app/ui/components/Button';

describe('Componente Button', () => {
  it('renderiza correctamente', () => {
    const { asFragment } = render(<Button onClick={() => { }}>Click me</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renderiza con className', () => {
    const { asFragment } = render(<Button className="custom-class" onClick={() => { }}>Click me</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renderiza con el estado deshabilitado', () => {
    const { asFragment } = render(
      <Button onClick={() => { }} disabled>
        Click me
      </Button>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('dispara la función onClick cuando se hace click', () => {
    const mockOnClick = vi.fn();
    const { getByTestId } = render(<Button onClick={mockOnClick}>Click me</Button>);
    const button = getByTestId('button-component');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('no dispara onClick cuando está deshabilitado', () => {
    const mockOnClick = vi.fn();
    const { getByTestId } = render(
      <Button onClick={mockOnClick} disabled>
        Click me
      </Button>
    );
    const button = getByTestId('button-component');
    fireEvent.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
