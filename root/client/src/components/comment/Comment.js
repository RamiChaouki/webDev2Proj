import React from "react";

function Comment(props) {
  return (
    <div className="commentCard">
      <div className="commentBody">{props.comment.postText}</div>
      <div className="footer">
        <div className="username">{postUser.username}</div>
        <div className="postDate">{post.postDate}</div>
      </div>
    </div>
  );
}

export default Comment;
