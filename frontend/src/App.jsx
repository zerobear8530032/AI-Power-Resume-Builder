import { useEffect, useState } from 'react'
import FormLayout from "./components/form/FormLayout";
import RegisterForm from './components/form/RegisterForm';
import LoginForm from './components/form/LoginForm';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import About from './components/home/About';
import Contact from './components/home/Contact';
import { loginUser, setLoginUser } from '../redux/features/userLogin/userDataSlice';
import { useDispatch } from 'react-redux';
import ProtectedRoute from './components/form/ProtectedRoute';
import Logout from './components/form/Logout';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
          dispatch(setLoginUser(JSON.parse(savedUser)));
      }else{
        console.log("no user login");
      }
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/login" element={<FormLayout><LoginForm /></FormLayout>} />
        <Route path="/register" element={<FormLayout><RegisterForm /></FormLayout>} />
        <Route path="/forgot-password" element={<h1>forgotpassword</h1>} />
        <Route path="/*" element={<h1>Wrong Page </h1>} />
      </Routes>
    </>
  )
}

export default App
