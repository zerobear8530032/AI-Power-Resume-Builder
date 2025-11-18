import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/features/userLogin/userDataSlice.js';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const dispatch = useDispatch();
  const navigate= useNavigate();

  useEffect(() => {
    localStorage.removeItem("user");
    dispatch(logoutUser());
    navigate("/");
  }, [dispatch]); // run once when component mounts

  return null; // no UI needed
}

export default Logout;
