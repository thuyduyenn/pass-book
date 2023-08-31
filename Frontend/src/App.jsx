import Navbar from './components/Navbar'
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Create from './pages/Create'
import Dashboard from './pages/Dashboard'
import OptionsPage from './pages/OptionsPage'
import Login from "./pages/login-resgiter"
import './App.css'
function App() {
  return (
    <>
         <div className="layout">
            <div>
               <Navbar/>
            </div>
           
            <div className="router">
               <Routes>
                    <Route path="/options" element={<OptionsPage/>}></Route>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/create" element={<Create/>}></Route>
                    <Route path="/dashboard" element={<Dashboard/>}></Route>
                    <Route path="/login/register" element={<Login/>}></Route>
               </Routes>
              </div>   
         </div>   
    </>
  )
}

export default App
