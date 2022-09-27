import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Feed.css";

function Feed() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const useAuthState = useAuth().authState;
  const getAuth = useAuth().GetAuth;
  useEffect(() => {
    getAuth();
    axios
      .get(`${process.env.REACT_APP_API_HOST}/Feed/getFeed/`, {
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
              <img
                src={value.user.profile}
                className="postPic"
              ></img>
              <div className="username">from: {value.user.username}</div>
              <div className="postDate">date: {value.postDate}</div>
            </div>
          </div>
        );
      })}
      ;
    </div>
  );
}
export default Feed;
