import Home from '../src/components/pages/Home.jsx'
import RegistrationPage from '../src/components/pages/Register.jsx'
import { Routes, Route } from "react-router-dom";
import LoginPage from './components/pages/Login.jsx';
import UserHome from './components/pages/UserHome.jsx';
import AdminHome from './components/pages/AdminHome.jsx';
import Layout from './components/atoms/Layout.jsx';
import PrevRequest from './components/pages/PrevRequest.jsx';
import PendingRequest from './components/pages/PendingRequest.jsx';
import Help from './components/pages/Help.jsx';
function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
        <Route path= '/' element = {<Home/>}/>
        <Route path= '/login' element = {<LoginPage/>}/>
        <Route path= '/register' element = {<RegistrationPage/>}/>
        <Route path= '/userHome' element = {<UserHome/>}/>
        <Route path= '/adminHome' element = {<AdminHome/>}/>
        <Route path='/prevrequest' element ={<PrevRequest/>}/>
        <Route path='/pendingrequest' element ={<PendingRequest/>}/>
        <Route path='/help' element ={<Help/>}/>


 </Route>
      </Routes>
    </>
  )
}

export default App
