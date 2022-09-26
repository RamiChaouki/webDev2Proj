import React from "react";

function Comment(props) {
  return (
    <div className="commentCard">
      <div className="commentBody">{props.comment.postText}</div>
      <div className="footer">
        <div className="username">{props.comment.user.username}</div>
        <div className="postDate">{props.comment.postDate}</div>
      </div>
    </div>
  );
}

export default Comment;
