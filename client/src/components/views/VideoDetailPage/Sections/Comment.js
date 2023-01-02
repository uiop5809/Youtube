import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment.js";

function Comment(props) {
  const user = useSelector((state) => state.user);
  const [commentValue, setCommentValue] = useState("");

  const handleChange = (e) => {
    setCommentValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: commentValue,
      writer: user.userData._id,
      postId: props.postId,
    };

    axios.post("/api/comment/saveComment", variables).then((res) => {
      if (res.data.success) {
        setCommentValue("");
        props.refreshFunction(res.data.result);
      } else {
        alert("코멘트를 저장하지 못했습니다.");
      }
    });
  };

  return (
    <div>
      <br />
      <p> Replies</p>
      <hr />

      {/* Comment Lists */}
      {props.CommentLists &&
        props.CommentLists.map(
          (comment, index) =>
            !comment.responseTo && ( // responseTo가 없는 것만 출력
              <>
                <SingleComment
                  key={index}
                  comment={comment}
                  postId={props.postId}
                  refreshFunction={props.refreshFunction}
                />
                <ReplyComment
                  postId={props.postId}
                  parentCommentId={comment._id}
                  CommentLists={props.CommentLists}
                  refreshFunction={props.refreshFunction}
                />
              </>
            )
        )}

      {/* Root Comment Form */}
      <form style={{ display: "flex" }} onSubmit={handleSubmit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleChange}
          value={commentValue}
          placeholder="코멘트를 작성해주세요"
        />
        <br />
        <button style={{ width: "20%", height: "52px" }} onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comment;
