import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

import Button from './Button';
import TextWithDescription from './TextWithDescription';
import ProfileIcon from '../../assets/ProfileIcon';
import MyAccountIcon from '../../assets/MyAccountIcon';

const ProfileDropdown= ({ name, phoneNumber ,onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target )) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        aria-label="Profile" 
        className="p-2 rounded-full hover:bg-gray-100"
        onClick={toggleDropdown}
      >
        <ProfileIcon />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50">
          <div className=" flex justify-center p-4 border-b border-gray-100">
            <TextWithDescription 
              title={name}
              description={phoneNumber}
              titleClassName="font-medium text-lg text-gray-800"
            />
          </div>

          {/* <div className=" flex justify-center p-2 border-b border-gray-100">
            <Link to="/my_account" className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-md" onClick={() => setIsOpen(false)}>
              <MyAccountIcon />
              <TextWithDescription 
                title="My Account"
                description="Edit account profile"
              />
            </Link>
          </div> */}

          <div className="p-4">
            <Button 
              text="Log Out" 
              onClick={onLogout}
              className="w-full text-center py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
