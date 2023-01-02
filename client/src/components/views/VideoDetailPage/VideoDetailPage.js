import React, { useEffect, useState } from "react";
import { List, Avatar, Row, Col } from "antd";
import axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
import Comment from "./Sections/Comment";

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const variable = { videoId: videoId };

  const [VideoDetail, setVideoDetail] = useState([]);
  const [CommentLists, setCommentLists] = useState([]);

  useEffect(() => {
    axios.post("/api/video/getVideoDetail", variable).then((res) => {
      if (res.data.success) {
        setVideoDetail(res.data.videoDetail);
      } else {
        alert("Failed to get video Info");
      }
    });

    axios.post("/api/comment/getComments", variable).then((res) => {
      if (res.data.success) {
        console.log(res.data.comments);
        setCommentLists(res.data.comments);
      } else {
        alert("Failed to get comments Info");
      }
    });
  }, []);

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };

  if (VideoDetail.writer) {
    // 구독자와 작성자가 같지 않을 때만 구독 버튼을 보여준다.
    const subscribeButton = VideoDetail.writer._id !==
      localStorage.getItem("userId") && (
      <Subscribe
        userTo={VideoDetail.writer._id}
        userFrom={localStorage.getItem("userId")}
      />
    );
    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${VideoDetail.filePath}`}
              controls
            />
            <List.Item actions={[subscribeButton]}>
              <List.Item.Meta
                avater={
                  <Avatar
                    src={VideoDetail.writer && VideoDetail.writer.image}
                  />
                }
                title={VideoDetail.writer.name}
                description
              />
            </List.Item>
            {/* Comments */}
            <Comment
              CommentLists={CommentLists}
              postId={VideoDetail._id}
              refreshFunction={updateComment}
            />
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>...loading</div>;
  }
}

export default VideoDetailPage;
