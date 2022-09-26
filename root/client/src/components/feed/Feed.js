import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import './Feed.css';

function Feed() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const useAuthState = useAuth().authState;
  const getAuth = useAuth().GetAuth;
  useEffect(() => {
    getAuth();
    axios
      .get("http://localhost:3001/Feed/getFeed/", {
        headers: { accessToken: localStorage.getItem("token") },
      })
      .then((res) => {
        setPosts(res.data);
      });
  }, []);

  return (
    <div>
      {posts.map((value, key) => {
        return (
          <div
            key={key}
            className="post card"
            onClick={() => {
              navigate(`/Post/${value.id}`);
            }}
          >
            <div
              className="postText"
              onClick={() => {
                navigate(`/Post/${value.id}`);
              }}
            >
              {value.postText}
            </div>
            <div className="footer">
              <div className="username">{value.user.username}</div>
              <div className="postDate">{value.postDate}</div>
            </div>
          </div>
        );
      })}
      ;
    </div>
  );
}
export default Feed;
