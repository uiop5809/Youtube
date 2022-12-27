import React, { useState } from "react";
import { Typography, Button, Form, Input, Icon } from "antd";
import Dropzone from "react-dropzone";
import axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

const PrivateOptions = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

const CategoryOptions = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" },
];

function VideoUploadPage() {
  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState("Film & Animation");

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "title") {
      setVideoTitle(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "private") {
      setPrivate(value);
    } else if (name === "category") {
      setCategory(value);
    }
  };

  const handleDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    console.log(files);

    axios.post("/api/video/uploadfiles", formData, config).then((res) => {
      if (res.data.success) {
        console.log(res.data);
      } else {
        alert("비디오 업로드를 실패했습니다.");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Upload Video</Title>
      </div>
      <Form>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* DropZone */}
          <Dropzone onDrop={handleDrop} multiple={false} maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: "3rem" }} />
              </div>
            )}
          </Dropzone>

          {/* Thumbnail */}
          <div>
            <img />
          </div>
        </div>

        <br />
        <br />
        <label>Title</label>
        <Input onChange={handleChange} name="title" value={VideoTitle} />
        <br />
        <br />
        <label>Description</label>
        <TextArea
          onChange={handleChange}
          name="description"
          value={Description}
        />
        <br />
        <br />

        <select onChange={handleChange} name="private">
          {PrivateOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <br />
        <br />
        <select onChange={handleChange} name="category">
          {CategoryOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <br />
        <br />
        <Button type="primary" size="large">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default VideoUploadPage;
