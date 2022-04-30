import {  Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import OperationCreate from "./components/create/OperationCreate";
import ModifyOperation from "./components/modify/ModifyOperation";
import Login from "./components/login/Login";
import { AuthProvider } from "./components/AuthProvider";
import Register from "./components/register/Register";
import{ProtectedRoute} from "./components/ProtectedRoute";
import PageNotFound from "./components/not-foud/PageNotFound";
// import { Prueba } from "./components/AuthProvider";


function App() {
  return (
    <div >
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/registrer" element= {<Register/>} />
        
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home/> 
            </ProtectedRoute>
          } />

        <Route
          path="/createOperation"
          element={
            <ProtectedRoute>
              <OperationCreate/> 
            </ProtectedRoute>
          } />
          
        <Route 
          path="/modifyOperation/:id" 
          element={  
            <ProtectedRoute>
              <ModifyOperation/>
            </ProtectedRoute>
          } />

        <Route path="*" element={<PageNotFound/>} />
      </Routes> 
      </AuthProvider>
    </div>
  );
}

export default App;
