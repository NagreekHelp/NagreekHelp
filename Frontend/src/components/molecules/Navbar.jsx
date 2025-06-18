import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { logout } from '../../slices/authSlice';
// import Logo from '../../assets/icons/Logo';
import NavItem from '../atoms/NavItem';
import NotificationIcon from '../../assets/NotificationIcon';
import ProfileDropdown from '../atoms/ProfileDropdown';
import Button from '../atoms/Button';
import MenuToggleIcon from '../../assets/MenuToggleIcon';
import { profileApi } from '../../services/profileApi';
import { setUserProfile } from '../../slices/authSlice';
import { useMemo } from 'react';
const NavBar = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = localStorage.getItem("token");

//   const [userProfile, setUserProfile] = useState({
//     firstName: "",
//     lastName: "",
//   });
  const profile = useSelector((state) => state.auth.profile);
// console.log(profile?.firstName); // Will be available after fetch

  // Track loading state
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  // Use redux state
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  console.log(user)
  // Load profile data based on user role
  useEffect(() => {
  if (!user || !token || profile) return; // prevent re-fetch if profile already exists
  if (isLoadingProfile) return;

  const fetchData = async () => {
    setIsLoadingProfile(true);
    try {
      const userResponse = await profileApi.getUserProfile(token);
      if (userResponse?.data) {
        dispatch(setUserProfile(userResponse.data));
        console.log(userResponse.data)
        console.log('profile', profile)
      
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  fetchData();
}, [user, token, profile]);

  // Define navigation items based on user role
  const getNavItems = () => {
    // Default navigation for visitors (not logged in)
    if (!isLoggedIn || !user) {
      return [
        { name: 'Home', path: '/' },
      ];
    }
    
    // Role-specific navigation
    switch (user.role) {
      case 'Admin':
        return [
          { name: 'Home', path: '/adminHome' },
          { name: 'Pending Requests', path: '/pendingrequest' },
          { name: 'History', path: '/history' },
          { name: 'Help', path: '/help' },
        ];
      case 'User':
      default:
        return [
          { name: 'Home', path: '/userHome' },
          { name: 'Previous Requests', path: '/prevRequest' },
          { name: 'Help', path: '/h  elp' },
        ];
    }
  };

  const navItems = getNavItems();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path) => {
    return path === '/' ? location.pathname === path : location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleLogoClick = () => {
    // Redirect to role-specific dashboard if logged in
    if (isLoggedIn && user) {
      switch (user.role) {
        case 'Admin':
          navigate('/adminHome');
          break;
        case 'User':
          navigate('/userHome');
          break;
        default:
          navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  // Prepare display name with fallback
  const displayName = useMemo(() => {
  if (profile?.firstName || profile?.lastName ) {
    
    return `${profile.firstName} `;
  }
  return user?.phoneNumber?.split('@')[0] || 'User';
}, [profile, user]);

  return (
    <nav className="w-full h-16 sticky top-0 left-0 bg-white z-50 px-6 flex items-center justify-between border-b border-gray-100">
      <div className="flex items-center">
        <div 
          onClick={handleLogoClick} 
          className="flex items-center cursor-pointer"
        >
          {/* <Logo /> */}
          <span className="mx-2 font-bold text-lg sm:text-xl text-gray-800">NagreekHelp</span>
        </div>

        <div className="hidden md:flex md:space-x-8 md:ml-12">
          {navItems.map((item) => (
            <NavItem
              key={item.name}
              name={item.name}
              path={item.path}
              isActive={isActive(item.path)}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {isLoggedIn && user ? (
          <>
            <button aria-label="Notifications" className="p-2 relative">
              <NotificationIcon />
              {/* Optional notification badge */}
              {/* <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span> */}
            </button>
            <ProfileDropdown 
              name={`${displayName} ${user.role ? `(${user.role})` : ''}`} 
              phoneNumber={user.phoneNumber} 
              city = {profile?.city || 'N/A'}
              pincode ={profile?.pincode || 'N/A'}
              onLogout={handleLogout} 
            /> 
          </>
        ) : (
          <div className="flex space-x-2">
            <Link to="/login">
              <Button text="Log In" className="border sm:text-xl border-gray-400 px-4 py-1 rounded-md" />
            </Link>
          </div>
        )}

        <button 
          className="md:hidden ml-2" 
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <MenuToggleIcon isOpen={isMenuOpen} />
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md z-50">
          <div className="flex flex-col py-2">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                className={`px-6 py-3 relative ${isActive(item.path) ? 'font-semibold text-gray-900 bg-gray-50' : 'text-gray-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className="absolute left-0 h-full w-1 top-0" style={{ backgroundColor: '#9ACD32' }} />
                )}
              </Link>
            ))}
            
            {/* Add logout option to mobile menu when logged in */}
            {isLoggedIn && (
              <button 
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="px-6 py-3 text-left text-red-600 font-medium"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;