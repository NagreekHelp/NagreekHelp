import { Outlet, useLocation } from "react-router-dom"
import NavBar from "../molecules/Navbar";
 
export default function Layout(){
    const location  = useLocation();
    const hideNavbar = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/confirm-signup';
    return (
        <>
            {!hideNavbar && <NavBar/>}
            <Outlet/>
        </>
    )
}