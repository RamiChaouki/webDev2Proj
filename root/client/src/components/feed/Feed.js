import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import React from "react";
import { useNavigate } from "react-router-dom";


function Feed() {
  const navigate = useNavigate();
  const useAuthState = useAuth().authState;
  const getAuth = useAuth().GetAuth;
  useEffect(() => {
    getAuth();
  }, []);

  
  return <div></div>;
}
export default Feed;
