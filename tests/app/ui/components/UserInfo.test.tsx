import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import UserInfo from '../../../../src/app/ui/components/UserInfo';

describe('Componente UserInfo', () => {
  it('renderiza correctamente con nombre, apellido y nombre de usuario', () => {
    const { getByText, asFragment } = render(
      <UserInfo name="John" lastname="Doe" username="johndoe" />
    );

    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('johndoe')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('aplica estilos predeterminados correctamente', () => {
    const { container, asFragment } = render(
      <UserInfo name="Jane" lastname="Smith" username="janesmith" />
    );

    const userInfo = container.querySelector('.user-info');
    expect(userInfo).toBeInTheDocument();
    expect(userInfo).toHaveClass('user-info');
    expect(asFragment()).toMatchSnapshot();
  });

  it('maneja correctamente la ausencia de propiedades opcionales', () => {
    const { container, asFragment } = render(<UserInfo />);

    const userInfo = container.querySelector('.user-info');
    expect(userInfo).toBeInTheDocument();
    expect(container).not.toHaveTextContent(/John|Doe|johndoe/i);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renderiza correctamente solo con el nombre de usuario', () => {
    const { getByText, asFragment } = render(<UserInfo username="usernameOnly" />);

    expect(getByText('usernameOnly')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
