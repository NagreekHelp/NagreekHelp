import Home from '../src/components/pages/Home.jsx'
import RegistrationPage from '../src/components/pages/Register.jsx'
import { Routes, Route } from "react-router-dom";
import LoginPage from './components/pages/Login.jsx';
function App() {
  return (
    <>
      <Routes>
        <Route path= '/' element = {<Home/>}/>
        <Route path= '/login' element = {<LoginPage/>}/>
        <Route path= '/register' element = {<RegistrationPage/>}/>
      </Routes>
    </>
  )
}

export default App
