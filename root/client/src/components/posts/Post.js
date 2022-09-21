import axios from "axios";
import React, { useState } from "react";

export default class Post extends React.Component {
  state = {
    post: {},
    postUser: {},
  };
  post = {};
  //   const [post, setPost] = useState({});

  async componentDidMount() {
    const postR = await axios.get("http://localhost:3001/Feed/getPost/1");
    console.log(postR);
    const postUserR = await axios.get(
      `http://localhost:3001/User/User/${postR.data.userId}`
    );

    this.setState(
      {
        post: { post: postR.data },
        postUser: postUserR.data,
      },
      () => {
        console.log(this.state);
      }
    );

    // axios.get(`http://localhost:3001/Feed/getPost/1`).then((response) => {
    //   const post = response.data;
    //   this.setState({ post: post },(response)=>{
    //     console.log("post added to state");
    //   });
    // });

    // const id = this.state.post.userId;
    // axios.get(`http://localhost:3001/User/User/${id}`).then((response) => {
    //   const postUser = response.data;
    //   this.setState({ postUser: postUser },(response)=>{
    //     console.log(response);
    //   });
    // });
  }

  render() {
    return (
      <div className="commentContainer">
        <div className="postName">
          <h1>{this.state.postUser.firstName + " " + this.state.postUser.lastName}</h1>
        </div>
        {/* <ul>
          {this.state.post.map(postR => (
            <li key={postR.id}>{postR.postText}</li>
          ))}
        </ul> */}
      </div>
    );
  }
}
