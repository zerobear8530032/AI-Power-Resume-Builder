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
import ProfessionalSummary from './components/builder/ProfessionalSummary.jsx';
import EducationForm from './components/builder/EducationForm.jsx';
import SkillsForm from './components/builder/SkillsForm.jsx';
import ProjectForm from './components/builder/ProjectForm.jsx';
import ExperienceForm from './components/builder/ExperienceForm.jsx';


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
        <Route path="/build/1" element={<PersonalInfoForm/>} />
        <Route path="/build/2" element={<ProfessionalSummary/>} />
        <Route path="/build/3" element={<EducationForm/>} />
        <Route path="/build/4" element={<SkillsForm/>} />
        <Route path="/build/5" element={<ProjectForm/>} />
        <Route path="/build/6" element={<ExperienceForm/>} />
        <Route path="/build/7" element={<h1>"you finished your resume !"</h1>} />
        {/* this route is for debugging dont keep it  */}
        <Route path="/currentUser" element={<h1>{localStorage.getItem("user")}</h1>} />
        {/* this route is for debugging dont keep it  */}
        <Route path="/logout" element={<Logout/>} />
        <Route path="/*" element={<h1>Wrong Page </h1>} />
      </Routes>
    </>
  )
}

export default App
