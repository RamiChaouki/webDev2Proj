import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Feed() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const useAuthState = useAuth().authState;
  const getAuth = useAuth().GetAuth;
  useEffect(() => {
    getAuth();
    axios.get("http://localhost:3001/Feed/getFeed/", {
      headers: { accessToken: localStorage.getItem("token") },
    }).then((res)=>{
      setPosts(res.data);
    });
  }, []);

  return <div></div>;
}
export default Feed;
