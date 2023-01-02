import React, { useEffect, useState } from "react";
import { Tooltip, Icon } from "antd";
import axios from "axios";

function LikeDislikes(props) {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);

  let variable = {};
  if (props.video) {
    variable = { videoId: props.videoId, userId: props.userId };
  } else {
    variable = { commentId: props.commentId, userId: props.userId };
  }
  useEffect(() => {
    axios.post("/api/like/getLikes", variable).then((res) => {
      if (res.data.success) {
        // 얼마나 많은 좋아요를 받았는지
        setLikes(res.data.likes.length);

        // 내가 이미 그 좋아요를 눌렀는지
        res.data.likes.map((like) => {
          if (like.userId === props.userId) setLikeAction("liked");
        });
      } else {
        alert("Failed to get likes");
      }
    });

    axios.post("/api/like/getDislikes", variable).then((res) => {
      if (res.data.success) {
        // 얼마나 많은 싫어요를 받았는지
        setDislikes(res.data.dislikes.length);

        // 내가 이미 그 싫어요를 눌렀는지
        res.data.dislikes.map((dislike) => {
          if (dislike.userId === props.userId) setDislikeAction("liked");
        });
      } else {
        alert("Failed to get dislikes");
      }
    });
  }, []);

  return (
    <div>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={LikeAction === "liked" ? "filled" : "outlined"}
            onClick
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Likes}</span>
      </span>
      <span key="comment-basic-dislike">
        <Tooltip title="DisLike">
          <Icon
            type="dislike"
            theme={LikeAction === "disliked" ? "filled" : "outlined"}
            onClick
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Dislikes}</span>
      </span>
    </div>
  );
}

export default LikeDislikes;
