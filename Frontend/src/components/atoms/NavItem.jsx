import React from 'react';
import { Link } from 'react-router-dom';
import '../../index.css'


const NavItem = ({ name, path, isActive }) => {
  return (
    <Link
      to={path}
      className={`
        relative
        py-2
        px-1
        font-medium
        transition-colors
        ${isActive ? 'font-semibold text-gray-900' : 'text-gray-700 hover:text-gray-900'}
      `}
    >
      {name}
      {isActive && (
        <span 
          className="absolute bottom-0 left-0 w-full h-[2px] rounded-full bg-[var(--color-primary-green)]" 
        />
      )}
    </Link>
  );
};

export default NavItem;