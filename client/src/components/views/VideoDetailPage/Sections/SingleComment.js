import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";

const { TextArea } = Input;

function SingleComment(props) {
  const user = useSelector((state) => state.user);
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");

  const handleClickReply = () => {
    setOpenReply(!OpenReply);
  };

  const handleChange = (e) => {
    setCommentValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      postId: props.postId,
      responseTo: props.comment._id,
    };

    axios.post("/api/comment/saveComment", variables).then((res) => {
      if (res.data.success) {
        setCommentValue("");
        setOpenReply(false);
        props.refreshFunction(res.data.result);
      } else {
        alert("코멘트를 저장하지 못했습니다.");
      }
    });
  };

  const actions = [
    <span onClick={handleClickReply} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt />}
        content={<p>{props.comment.content}</p>}
      ></Comment>

      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={handleSubmit}>
          <textarea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={handleChange}
            value={CommentValue}
            placeholder="코멘트를 작성해주세요"
          />
          <br />
          <button
            style={{ width: "20%", height: "52px" }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
