import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PiBankLight } from "react-icons/pi";
import { FiMenu, FiX } from 'react-icons/fi';
import { IoIosLogOut } from "react-icons/io";
import './style.scss';
import { AppContext } from '../../../core/state/AppContext';
import { logout } from '../../../core/state/auth/actions';

interface NavLink {
  to: string;
  label: string;
}

interface NavProps {
  links: NavLink[];
}

const Nav: React.FC<NavProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useContext(AppContext)!;
  const location = useLocation();

  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => document.body.classList.remove('no-scroll');
  }, [isOpen]);

  return (
    <nav className='nav'>
      <Link to="/inicio"><PiBankLight color='white' size={30} /></Link>
      
      <button className="nav-toggle" onClick={toggleMenu} aria-label="Toggle menu">
        {isOpen ? <FiX size={24} color="white" /> : <FiMenu size={24} color="white" />}
      </button>

      <ul className={`nav-list ${isOpen ? 'open' : ''}`}>
        {links.map((link, index) => (
          <li key={index} className="nav-item">
            <Link to={link.to} className="nav-link" onClick={() => setIsOpen(false)}>
              {link.label}
            </Link>
          </li>
        ))}
         {!isAuthRoute && (
          <li>
            <button className='logout-button' onClick={handleLogout} aria-label="Cerrar sesión">
              <IoIosLogOut size={20} color="white" />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
