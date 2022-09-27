import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Comment from "../comment/Comment";
import CreateComment from "../createComment/CreateComment";
import "./Post.css";

function Post(props) {
  const navigate = useNavigate();
  const useAuthState = useAuth().authState;
  // const getAuth=useAuth().GetAuth;
  const [post, setPost] = useState({});
  const [postUser, setPostUser] = useState({});
  const [comments, setComments] = useState([]);
  // const [queryError, setQueryError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/Feed/getPost/${id}`, {
        headers: { accessToken: localStorage.getItem("token") },
      })
      .catch((err) => {
        navigate("/QueryError");
      })
      .then((response) => {
        setPost(response.data);
        axios
          .get(`${process.env.REACT_APP_API_HOST}/User/User/${response.data.userId}`)
          .then((response) => {
            setPostUser(response.data);
          });
        axios
          .get(`${process.env.REACT_APP_API_HOST}/Feed/getComments/${response.data.id}`, {
            headers: { accessToken: localStorage.getItem("token") },
          })
          .then((response) => {
            setComments(response.data);
          });
      });
  }, []);

  const onSubmit = (data) => {
    const date = new Date();
    data.date = date.toISOString();
    // data.userId = useAuthState.id;
    data.parentId = id;
    axios
      .post(`${process.env.REACT_APP_API_HOST}/Feed/addComment/${post.id}`, data, {
        headers: { accessToken: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res);
        const newComment = {
          id: res.data.id,
          postText: res.data.postText,
          type: res.data.type,
          postDate: res.data.postDate,
          parentId: res.data.parentId,
          userId: res.data.userId,
          user: {
            firstName: res.data.user.firstName,
            lastName: res.data.user.lastName,
            username: res.data.user.username,
          },
        };
        setComments([...comments, newComment]);
      });
  };
  return (
    <div className="postPage">
      <div className="post card">
        <div className="postText">{post.postText}</div>
        <div className="postFooter">
          <img src={postUser.profile} className="postPic"></img>
          <div className="username">from: {postUser.username}</div>
          <div className="postDate">date: {post.postDate}</div>
        </div>
      </div>
      <div className="addCommentComponent card">
        <CreateComment parentId={post.id} onSubmit={onSubmit} />
      </div>
      <h4 className="commentH4">Comments:</h4>
      {comments.map((value, key) => {
        return (
          <div key={key} className="comment">
            <Comment comment={value} />
          </div>
        );
      })}
      ;
    </div>
  );
}
export default Post;