import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Comment from '../comment/Comment';

// export default class Post extends React.Component {
//   state = {
//     post: {},
//     postUser: {},
//     comments: []
//   };
//   //   const [post, setPost] = useState({});

//   async componentDidMount() {
//     const postR = await axios.get("http://localhost:3001/Feed/getPost/1")
//     ;
//     console.log(postR);
//     const postUserR = await axios.get(
//       `http://localhost:3001/User/User/${postR.data.userId}`
//     );
//     const commentsR = await axios.get(
//       `http://localhost:3001/User/User/${postR.data.userId}`
//     );

//     this.setState(
//       {
//         post: postR.data,
//         postUser: postUserR.data,
//       },
//       () => {
//         console.log(this.state);
//       }
//     );

//     // axios.get(`http://localhost:3001/Feed/getPost/1`).then((response) => {
//     //   const post = response.data;
//     //   this.setState({ post: post },(response)=>{
//     //     console.log("post added to state");
//     //   });
//     // });

//     // const id = this.state.post.userId;
//     // axios.get(`http://localhost:3001/User/User/${id}`).then((response) => {
//     //   const postUser = response.data;
//     //   this.setState({ postUser: postUser },(response)=>{
//     //     console.log(response);
//     //   });
//     // });
//   }

//   render() {
//     return (
//       <div className="commentContainer">
//         <div className="postName">
//           <h1>{this.state.postUser.firstName + " " + this.state.postUser.lastName}</h1>
//         </div>
//         <div className="postUsername">{this.state.postUser.username}</div>
//         <div className="postTextBody">{this.state.post.postText}</div>
//         <div className="postDate">{this.state.post.postDate}</div>
//       </div>
//     );
//   }
// }
function Post(props) {
  const useAuthState = useAuth().authState;
  // const getAuth=useAuth().GetAuth;
  const [post, setPost] = useState({});
  const [postUser, setPostUser] = useState({});
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const postR = axios
      .get(`http://localhost:3001/Feed/getPost/${id}`)
      .then((response) => {
        setPost(response.data);
        const postUserR = axios
          .get(`http://localhost:3001/User/User/${response.data.userId}`)
          .then((response) => {
            setPostUser(response.data);
          });
        const commentsR = axios
          .get(`http://localhost:3001/Feed/getComments/${response.data.id}`)
          .then((response) => {
            setComments(response.data);
          });
      });
  }, []);
  return (
    <div className="postPage">
      <div className="post card">
        <div className="postText">{post.postText}</div>
        <div className="footer">
          <div className="username">{postUser.username}</div>
          <div className="postDate">{post.postDate}</div>
        </div>
        <div className="addCommentComponent">
          
        </div>
      </div>
      {comments.map((value, key) => {
        return(
          <div key={key} className="comment">
            <Comment comment={value}/>
          </div>
        )})};
    </div>
  );
}
export default Post;
