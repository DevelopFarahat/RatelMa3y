import React, { useEffect, useState } from "react";
import AddPostStyles from "./AddPost.module.css";
import Form from "react-bootstrap/Form";
import { RiFolder5Fill } from "react-icons/ri";
import { MdOutlineClear } from "react-icons/md";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import axios from "axios";
const AddPost = () => {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
  });
  const [img, setImg] = useState();

  const [postImage, setPostImage] = useState("");
  const [isUserMadeAPost, setIsUserMadeAPost] = useState(false);

  const openFile = (event) => {
    let reader = new FileReader();
    reader.onload = function () {
      let dataURL = reader.result;
      //console.log(event.target.value);
      console.log(event.target.files[0])
      setPostImage(event.target.value);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const clearImagePath = () => {
    setImg(null);
    setPostImage("");
  };

  //Submit the form

  const handleSubmit = (event) => {
    event.preventDefault();

    /*
            axios.post(`http://localhost:5000/api/events`,postData).then((res)=>{
                console.log(res);
            }).catch((error)=>{
                console.log(error);
            }); 
            */

    const data = new FormData();
    data.append("article_img", img);
    data.append("content", postData.content);
    data.append("title", postData.title);

    //Upload on the server

    axios
      .post("https://ratel-may.herokuapp.com/api/events",data)
      .then((res) => console.log("results", res.data))
      .catch((err) => console.error(err));

    //========================== FARAHAT

    // setIsUserMadeAPost(true);

    // setTimeout(()=>{
    //     setIsUserMadeAPost(false)
    // },1000)

    // console.log(postData);
  };
  return (
    <>
      {isUserMadeAPost ? (
        <div className={AddPostStyles["post-alert-container"]}>
          <span>Posted Successfully</span>
        </div>
      ) : null}
      <form
        className={AddPostStyles["add-post-main-container"]}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div>
          <Form.Label htmlFor="postImage">Post Image</Form.Label>
          <div
            id="postImage"
            className={AddPostStyles["post-image-area"]}
            style={{
              backgroundImage:
                postImage === "" ? "" : `url(http://localhost:3000/one.png)`,
            }}
          ></div>
          <div className={AddPostStyles["button-group"]}>
            <div className={` ${AddPostStyles["button-container"]}`}>
              <button type="button">
                Upload <RiFolder5Fill size={20} />
              </button>
              <Form.Control
                type="file"
                id="file"
                name="post_img"
                onChange={(event) => {
                 
                  setImg(event.target.files[0]);
                  openFile(event);
                }}
              />
            </div>
          </div>
          <button
            type="button"
            className={`${AddPostStyles["btn"]} ${AddPostStyles["clear-btn"]}`}
            onClick={clearImagePath}
          >
            Clear <MdOutlineClear size={25} />
          </button>
        </div>
        <div>
          <Form.Label htmlFor="postTitle">Title</Form.Label>
          <Form.Control
            type="text"
            id="postTitle"
            name="title"
            value={postData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <Form.Label htmlFor="postPargraph">Content</Form.Label>
          <Form.Control
            as="textarea"
            id="postPargraph"
            name="content"
            className={` ${AddPostStyles["post-paragraph-area"]}`}
            value={postData.content}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className={AddPostStyles["btn"]}>
          Post <BsFillFileEarmarkPostFill size={15} />
        </button>
      </form>
    </>
  );
};
export default AddPost;
