
import './App.css'
import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./pages/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import PageNotFound from "./pages/PageNotFound";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
 <div className="">
        <div className="auth-Wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
               <Route path="/admin-login" element={<AdminLogin />} />

               <Route path="/admin-dashboard" element={ <ProtectedRoute allowedRoles={["Admin"]}>
                   <Dashboard />
                 </ProtectedRoute>
               }/>
               <Route path = "/unauthorized" element={<Unauthorized />} />
               <Route path = "*" element={<PageNotFound />} />
            </Routes>
            <ToastContainer aria-label={undefined} />
          </div>
        </div>
      </div>
  )
}

export default App
