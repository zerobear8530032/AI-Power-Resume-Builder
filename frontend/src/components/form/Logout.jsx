import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/features/userLogin/userDataSlice.js';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function clearRefreshToken() {
    try {
      const json_response = await fetch("http://localhost:8000/logout", {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        method: "POST",
      })
      const response = await json_response.json();
      navigate("/");
      return response;
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Unable to connect to server. Please try again later.",
      };
    }
  }
  useEffect(async() => {
    localStorage.removeItem("user");
    dispatch(logoutUser());
    const response=await clearRefreshToken();
    navigate("/");
  }, [dispatch]); // run once when component mounts

  return null; // no UI needed
}

export default Logout;
