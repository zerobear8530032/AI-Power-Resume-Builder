import { useEffect, useState } from 'react'
import RegisterForm from './components/form/RegisterForm';
import LoginForm from './components/form/LoginForm';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import About from './components/home/About';
import Contact from './components/home/Contact.jsx';
import { loginUser, setLoginUser } from '../redux/features/userLogin/userDataSlice';
import { useDispatch } from 'react-redux';
import ProtectedRoute from './components/form/ProtectedRoute';
import Logout from './components/form/Logout';
import PersonalInfoForm from './components/builder/PersonalInfoForm.jsx';


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
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<h1>forgotpassword</h1>} />
        <Route path="/build" element={<PersonalInfoForm/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/*" element={<h1>Wrong Page </h1>} />
      </Routes>
    </>
  )
}

export default App
